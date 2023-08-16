<?php
require_once 'models/oauth_model.php';
class UserController
{
    public function login($request, $response)
    {
        if (getEmail())
            $response->send("Authorized");
        else
            $response->status(401)->send("Unauthorized");

    }
    public function logout($request, $response)
    {
        destroySession();
        $response->send("Logged out");
    }
}