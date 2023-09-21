<?php
class GitLabController
{
    private $CLIENT_ID;
    private $CLIENT_SECRET;
    private $REDIRECT_URI;
    public function __construct()
    {
        $this->CLIENT_ID = $_SERVER['GITLAB_CLIENT_ID'];
        $this->CLIENT_SECRET = $_SERVER['GITLAB_CLIENT_SECRET'];
        $this->REDIRECT_URI = $_SERVER['URL'] . '/oauth/gitlab/callback';
    }
    public function oauthGitLab($request, $response)
    {
        // Generate a random state value for CSRF protection
        $state = bin2hex(random_bytes(16));
        $_SESSION['oauth_state'] = $state;

        // Redirect the user to GitLab for authorization with required scopes and state
        $scopeUnencoded = "read_api";
        $scope = urlencode($scopeUnencoded);
        $authorizeUrl = "https://gitlab.com/oauth/authorize?client_id=$this->CLIENT_ID&redirect_uri=$this->REDIRECT_URI&response_type=code&scope=$scope&state=$state";
        $response->headers['Location'] = $authorizeUrl;
        $response->send("Let's go!");
    }
    public function oauthGitLabCallback($request, $response)
    {
        if (!isset($_GET['code']) || !isset($_GET['state']))
            die("Authorization code or state missing.");

        $expectedState = $_SESSION['oauth_state'];
        unset($_SESSION['oauth_state']); // Remove state after use

        if ($_GET['state'] !== $expectedState)
            die("Invalid state parameter.");

        // Exchange authorization code for an access token
        $tokenUrl = "https://gitlab.com/oauth/token";
        $postData = [
            'client_id' => $this->CLIENT_ID,
            'client_secret' => $this->CLIENT_SECRET,
            'code' => $_GET['code'],
            'grant_type' => 'authorization_code',
            'redirect_uri' => $this->REDIRECT_URI,
        ];
        $ch = curl_init($tokenUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        $responseText = curl_exec($ch);
        curl_close($ch);

        $responseData = json_decode($responseText, true);

        if (!isset($responseData['access_token'])) {
            die("Access token not received.");
        }

        // Save the access token to access GitLab's API for subsequent requests
        $accessToken = $responseData['access_token'];
        $methodName = 'getEmailGitLab';
        $expirationTimestamp = time() + 8 * 3600; // 8 hours in seconds
        $_SESSION['credentials'] = serialize([
            'accessToken' => $accessToken,
            'expirationTimestamp' => $expirationTimestamp,
            'methodName' => $methodName,
        ]);

        $_SESSION['LAST_LOGIN'] = time();
        $response->redirect($_SERVER['URL'] . '/account');
    }
}