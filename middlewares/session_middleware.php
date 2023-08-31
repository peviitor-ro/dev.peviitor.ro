<?php

$sessionMiddleware = function ($request, $response, $next) {
    
    session_start();
    $sessionExpiration = 30 * 60;

    if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > $sessionExpiration)) {
        session_unset();
        session_destroy();
    }

    $_SESSION['LAST_ACTIVITY'] = time();

    $next($request, $response);
};