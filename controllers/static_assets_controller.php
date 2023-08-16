<?php
$staticAssetsController = function ($request, $response) {
    $requestedPath = substr($request->path, 1);
    error_log($requestedPath);
    if (file_exists($requestedPath) && $requestedPath !== "" && strpos($requestedPath, 'dist') === 0) {
        $fileContent = file_get_contents($requestedPath);
        $extension = pathinfo($requestedPath, PATHINFO_EXTENSION);
        $contentType = '';
        switch ($extension) {
            case 'txt':
                $contentType = 'text/plain';
                break;
            case 'html':
                $contentType = 'text/html';
                break;
            case 'css':
                $contentType = 'text/css';
                break;
            case 'js':
                $contentType = 'application/javascript';
                break;
            case 'json':
                $contentType = 'application/json';
                break;
            case 'svg':
                $contentType = 'image/svg+xml';
                break;
            case 'woff2':
                $contentType = 'font/woff2';
                break;
            case 'ico':
                $contentType = 'image/x-icon';
                break;
            case 'png':
                $contentType = 'image/png';
                break;
        }
        // Set the content type header
        header("Content-Type: $contentType");
        $response->send($fileContent);
    } else if (file_exists($requestedPath)) {
        $response->status("403")->send("403 Unauthorized");
    } else if (in_array($requestedPath, ['', 'account', 'login', 'loginsteps'])) {
        header("Content-Type: text/html");
        $htmlContent = file_get_contents('dist/index.html');
        $response->send($htmlContent);
    } else $response->status("404")->send("404 Not Found");
};
