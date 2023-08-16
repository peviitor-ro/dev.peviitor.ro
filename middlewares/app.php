<?php

class Request
{
    public $method;
    public $path;
    public $queryParams;
    public $body;

    public function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $this->queryParams = $_GET;
        $this->body = file_get_contents('php://input');
    }
}

class Response
{
    public $statusCode;
    public $headers;
    public $body;

    public function __construct()
    {
        $this->statusCode = 200;
        $this->headers = [];
        $this->body = '';
    }

    public function status($statusCode)
    {
        $this->statusCode = $statusCode;
        return $this;
    }

    public function send($data)
    {
        $this->body = $data;
        $this->sendHeaders();
        echo $this->body;
    }

    public function redirect($url, $statusCode = 302)
    {
        $this->status($statusCode);
        $this->headers['Location'] = $url;
        $this->sendHeaders();
        exit(); // Terminate the script
    }

    private function sendHeaders()
    {
        http_response_code($this->statusCode);
        foreach ($this->headers as $header => $value) {
            header("$header: $value");
        }
    }
}

class App
{
    private $middlewares = [];
    private $routes = [];
    private $wildcardController;

    public function __construct($wildcardController)
    {
        $this->wildcardController = $wildcardController;
    }

    public function use ($middleware)
    {
        $this->middlewares[] = $middleware;
    }

    public function get($path, $controller)
    {
        $this->routes[] = ['method' => 'GET', 'path' => $path, 'controller' => $controller];
    }

    public function post($path, $controller)
    {
        $this->routes[] = ['method' => 'POST', 'path' => $path, 'controller' => $controller];
    }

    public function handleRequest($request)
    {
        $response = new Response();

        // Call the first middleware and create a chain
        $middlewareChain = $this->createMiddlewareChain($this->middlewares, $this->routes);

        $middlewareChain($request, $response);
    }

    private function createMiddlewareChain($middlewares, $routes)
    {
        return array_reduce(
            array_reverse($middlewares),
            function ($next, $middleware) {
                return function ($request, $response) use ($middleware, $next) {
                    $middleware($request, $response, $next);
                };
            },
            function ($request, $response) use ($routes) {
                $this->handleRoutes($request, $response, $routes);
            }
        );
    }

    private function handleRoutes($request, $response, $routes)
    {
        $matchedRoute = null;
        foreach ($routes as $route) {
            if ($request->method === $route['method'] && $request->path === $route['path']) {
                $matchedRoute = $route;
                break;
            }
        }

        if ($matchedRoute) {
            $controller = $matchedRoute['controller'];
            $controller($request, $response);
        } elseif ($request->method === 'GET') {
            // Handle undefined GET routes with a wildcard controller
            $wildcardController = $this->wildcardController;
            $wildcardController($request, $response);
        } else {
            $response->status(404)->send("Not Found");
        }
    }

    public function run()
    {
        $request = new Request();
        $this->handleRequest($request);
    }
}