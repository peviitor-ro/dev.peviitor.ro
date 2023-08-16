<?php
class GitHubController
{
    private $CLIENT_ID;
    private $CLIENT_SECRET;
    private $REDIRECT_URI;
    public function __construct()
    {
        $this->CLIENT_ID = $_SERVER['GITHUB_CLIENT_ID'];
        $this->CLIENT_SECRET = $_SERVER['GITHUB_CLIENT_SECRET'];
        $this->REDIRECT_URI = $_SERVER['URL'] . '/oauth/github/callback';
    }
    public function oauthGitHub($request, $response)
    {
        // Generate a random state value for CSRF protection
        $state = bin2hex(random_bytes(16));
        $_SESSION['oauth_state'] = $state;

        // Redirect the user to GitHub for authorization with email scope and state
        $scopeUnencoded = "user:email";
        $scope = urlencode($scopeUnencoded);
        $authorizeUrl = "https://github.com/login/oauth/authorize?client_id=$this->CLIENT_ID&redirect_uri=$this->REDIRECT_URI&scope=$scope&state=$state";
        $response->headers['Location'] = $authorizeUrl;
        $response->send("Lets gooo");
    }
    public function oauthGitHubCallback($request, $response)
    {
        if (!isset($_GET['code']) || !isset($_GET['state']))
            die("Authorization code or state missing.");

        $expectedState = $_SESSION['oauth_state'];
        unset($_SESSION['oauth_state']); // Remove state after use

        if ($_GET['state'] !== $expectedState)
            die("Invalid state parameter.");

        // Exchange authorization code for an access token
        $tokenUrl = "https://github.com/login/oauth/access_token";
        $postData = [
            'client_id' => $this->CLIENT_ID,
            'client_secret' => $this->CLIENT_SECRET,
            'code' => $_GET['code'],
            'redirect_uri' => $this->REDIRECT_URI,
        ];
        $ch = curl_init($tokenUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        $responseText = curl_exec($ch);
        curl_close($ch);

        parse_str($responseText, $responseData);

        if (!isset($responseData['access_token'])) {
            die("Access token not received.");
        }

        // Save the access token to access GitHub's API for subsequent requests
        $accessToken = $responseData['access_token'];
        $methodName = 'getEmailGitHub';
        $expirationTimestamp = time() + 8 * 3600; // 8 hours in seconds
        $_SESSION['credentials'] = serialize([
            'accessToken' => $accessToken,
            'expirationTimestamp' => $expirationTimestamp,
            'methodName' => $methodName,
        ]);

        $response->redirect($_SERVER['URL'] . '/account');
    }
}