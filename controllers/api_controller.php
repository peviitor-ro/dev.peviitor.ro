<?php
require_once 'models/oauth_model.php';
require_once 'models/api_model.php';
class ApiController
{
    private function isAuthorized($response)
    {
        $sessionExpiration = 30 * 60;
        if (!isset($_SESSION['LAST_LOGIN']) || (time() - $_SESSION['LAST_LOGIN'] > $sessionExpiration)) {
            $response->status(401)->send('Unauthorized');
            return false;
        }
        return true;
    }

    public function getUserData($request, $response)
    {
        if (!$this->isAuthorized($response)) {
            return;
        }
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
        if (!$this->isAuthorized($response)) {
            return;
        }
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
