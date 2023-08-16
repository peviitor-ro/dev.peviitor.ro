<?php
class ApiModel
{
    private $API_GET;
    private $API_POST;
    private $DELAY_IN_S;
    public function __construct()
    {
        $this->API_GET = $_SERVER['API_GET'];
        $this->API_POST = $_SERVER['API_POST'];
        $this->DELAY_IN_S = $_SERVER['DELAY_IN_S'];
    }
    public function getUserData($email)
    {
        $queryParameters = http_build_query(['user' => $email]);
        $urlWithQueryParams = $this->API_GET . '?' . $queryParameters;

        $ch = curl_init($urlWithQueryParams);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $dataJSON = curl_exec($ch);
        error_log($urlWithQueryParams);
        error_log($dataJSON);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        $data = json_decode($dataJSON, true);

        if ($httpCode !== 200 || $data === null || !isset($data['apikey'])) {
            $query = http_build_query(['apikey' => 'A NEW APIKEY PLEASE!']);
            $this->updateUserData($email, $query);

            $ch = curl_init($urlWithQueryParams);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $dataJSON = curl_exec($ch);
            curl_close($ch);

            $data = json_decode($dataJSON, true);
        }

        return $data;
    }

    public function updateUserData($email, $query)
    {
        $data = $this->processQuery($email, $query);
        $dataJSON = json_encode($data);
        $headers = array(
            "Accept: application/json, text/plain, */*",
            "Content-Type: application/json",
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->API_POST);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataJSON);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);
        curl_close($ch);

        sleep($this->DELAY_IN_S); // Don't ask.

        return $response;
    }

    private function generateAPIKey()
    {
        $apikey = $this->v4();
        return $apikey;
    }

    private function getApiKey($email)
    {
        $data = $this->getUserData($email);
        return $data['apikey'];
    }
    private function v4()
    {
        if (function_exists('random_bytes')) {
            $data = random_bytes(16);
        } elseif (function_exists('openssl_random_pseudo_bytes')) {
            $data = openssl_random_pseudo_bytes(16);
        } else {
            return false;
        }

        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 4
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    private function processQuery($email, $query)
    {
        $data = [
            'id' => $email
        ];

        if (isset($query['company'])) {
            error_log("Updating company: " . $query['company'] . " for " . $email . "...");
            $data['company'] = [$query['company']];
        }

        if (isset($query['url'])) {
            error_log("Updating url: " . $query['url'] . " for " . $email . "...");
            $data['url'] = [$query['url']];
        }

        if (isset($query['apikey'])) {
            error_log("Updating apikey for " . $email . "...");
            $apikey = $this->generateAPIKey();
            $data['apikey'] = $apikey;
        } else {
            $apikey = $this->getApiKey($email);
            $data['apikey'] = $apikey;
        }

        return [$data];
    }
}