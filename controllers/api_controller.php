<?php
require_once 'models/oauth_model.php';
require_once 'models/api_model.php';
class ApiController
{
    public function getUserData($request, $response)
    {
        $email = getEmail();
        if ($email) {
            $apiModel = new ApiModel();
            $data = $apiModel->getUserData($email);
            $dataJSON = json_encode($data);
            $response->send($dataJSON);
        } else
            $response->status(401)->send('Unauthorized');
    }
    public function updateUserData($request, $response)
    {
        $email = getEmail();
        if ($email) {
            $post = file_get_contents('php://input');
            $query = json_decode($post, true);
            $apiModel = new ApiModel();
            $result = $apiModel->updateUserData($email, $query);
            $response->send($result);
        } else
            $response->status(401)->send('Unauthorized');
    }
}