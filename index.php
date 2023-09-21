<?php

require_once 'env.php';
require_once 'middlewares/app.php';
require_once 'middlewares/session_middleware.php';
require_once 'middlewares/security_headers_middleware.php';
require_once 'controllers/static_assets_controller.php';
require_once 'controllers/user_controller.php';
require_once 'controllers/GitHub_controller.php';
require_once 'controllers/GitLab_controller.php';
require_once 'controllers/api_controller.php';

try {
    $app = new App($staticAssetsController);
    $app->use($sessionMiddleware);
    $app->use($securityHeadersMiddleware);

    $userController = new UserController();
    $app->get('/user/logout', [$userController, 'logout']);

    $gitHubController = new GitHubController();
    $app->get('/oauth/github', [$gitHubController, 'oauthGitHub']);
    $app->get('/oauth/github/callback', [$gitHubController, 'oauthGitHubCallback']);

    $gitLabController = new GitLabController();
    $app->get('/oauth/gitlab', [$gitLabController, 'oauthGitLab']);
    $app->get('/oauth/gitlab/callback', [$gitLabController, 'oauthGitLabCallback']);

    $apiController = new ApiController();
    $app->get('/api', [$apiController, 'getUserData']);
    $app->post('/api', [$apiController, 'updateUserData']);

    $app->run();
} catch (Exception $e) {
    // Handle the exception and return a 500 Internal Server Error response
    $exceptionMessage = $e->getMessage() . "\n" . $e->getTraceAsString();
    // Log the exception
    error_log("Exception: " . $exceptionMessage);
    
    http_response_code(500);
    echo "500 Internal Server Error: " . $e->getMessage();
}
