<?php
$staticAssetsController = function ($request, $response) {
    $requestedPath = substr($request->path, 1);
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
    } else {
        header("Content-Type: text/html");
        $htmlContent = file_get_contents('dist/index.html');
        $response->send($htmlContent);
    }
};