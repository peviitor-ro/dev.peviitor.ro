<?php
require_once 'models/oauth_model.php';
class UserController
{
    public function logout($request, $response)
    {
        destroySession();
        $response->send("Logged out");
    }
}