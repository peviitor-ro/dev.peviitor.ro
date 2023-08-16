<?php

$securityHeadersMiddleware = function ($request, $response, $next) {

    $response->headers['Content-Security-Policy'] = "default-src 'self'; style-src 'self' 'unsafe-inline';";
    $response->headers['Referrer-Policy'] = 'no-referrer-when-downgrade';
    $response->headers['Strict-Transport-Security'] = 'max-age=31536000'; // Enforce HTTPS for 1 year
    $response->headers['X-Content-Type-Options'] = 'nosniff';
    $response->headers['X-Frame-Options'] = 'SAMEORIGIN';
    $response->headers['X-XSS-Protection'] = '1; mode=block';

    $next($request, $response);
};