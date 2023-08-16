<?php

$sessionMiddleware = function ($request, $response, $next) {
    session_start();
    $next($request, $response);
};