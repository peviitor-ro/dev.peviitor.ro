<?php

function getEmailGitHub($accessToken)
{
    $emailUrl = "https://api.github.com/user/emails?primary=true";
    $ch = curl_init($emailUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $authorizationHeader = "Authorization: Bearer " . $accessToken;
    $appName = $_SERVER['GITHUB_APP_NAME'];
    $userAgent = "User-Agent: " . $appName;
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        $authorizationHeader,
        $userAgent,
    ]);
    $emailData = json_decode(curl_exec($ch), true);
    curl_close($ch);

    $primaryEmail = null;
    foreach ($emailData as $emailEntry) {
        if (isset($emailEntry['primary']) && $emailEntry['primary'] == 1) {
            $primaryEmail = $emailEntry['email'];
            break;
        }
    }

    return $primaryEmail;
}
;
function getEmailGitLab($accessToken)
{
    $emailUrl = "https://gitlab.com/api/v4/user/emails";
    $ch = curl_init($emailUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $authorizationHeader = "Authorization: Bearer " . $accessToken;
    $appName = $_SERVER['GITLAB_APP_NAME'];
    $userAgent = "User-Agent: " . $appName;
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        $authorizationHeader,
        $userAgent,
    ]);
    $emailData = json_decode(curl_exec($ch), true);
    curl_close($ch);

    $email = null;
    foreach ($emailData as $emailEntry) {
        if (isset($emailEntry['email'])) {
            $email = $emailEntry['email'];
            break;
        }
    }

    return $email;
}

function destroySession()
{
    session_unset();
    session_destroy();
    if (isset($_COOKIE[session_name()])) {
        $cookie_params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 3600, $cookie_params['path'], $cookie_params['domain'], $cookie_params['secure'], $cookie_params['httponly']);
    }
}
function getEmail()
{
    if (!isset($_SESSION['credentials']))
        return null;
    $credentials = unserialize($_SESSION['credentials']);
    $expirationTimestamp = $credentials['expirationTimestamp'];
    if (time() >= $expirationTimestamp) {
        destroySession();
        return null;
    }
    $accessToken = $credentials['accessToken'];
    $methodName = $credentials['methodName'];
    $email = $methodName($accessToken);
    return $email;
}