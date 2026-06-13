<?php
/**
 * Minimal GitHub OAuth handler for Sveltia/Decap CMS, hostable on Hostinger (PHP).
 *
 * SETUP (one-time):
 *  1. Create a GitHub OAuth App: https://github.com/settings/developers
 *       - Homepage URL:            https://melissacolin.ai
 *       - Authorization callback URL: https://melissacolin.ai/oauth
 *  2. Put the credentials in an UNTRACKED file next to this one, /oauth/secret.php:
 *       <?php
 *       define('OAUTH_CLIENT_ID', 'xxxxxxxx');
 *       define('OAUTH_CLIENT_SECRET', 'yyyyyyyy');
 *     (or set env vars OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET in Hostinger hPanel)
 *
 * Flow: CMS opens /oauth -> redirect to GitHub -> GitHub redirects back to /oauth?code=...
 *       -> exchange code for token -> postMessage the token back to the CMS window.
 */

if (file_exists(__DIR__ . '/secret.php')) {
    require __DIR__ . '/secret.php';
}
// Client ID is public (appears in the OAuth redirect); default to the app's ID.
$CLIENT_ID = defined('OAUTH_CLIENT_ID') ? OAUTH_CLIENT_ID : (getenv('OAUTH_CLIENT_ID') ?: 'Ov23lig2ziD7cZvvfTej');
$CLIENT_SECRET = defined('OAUTH_CLIENT_SECRET') ? OAUTH_CLIENT_SECRET : getenv('OAUTH_CLIENT_SECRET');

if (!$CLIENT_ID || !$CLIENT_SECRET) {
    http_response_code(500);
    exit('OAuth not configured: set OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET (see /oauth/index.php header).');
}

$host = 'https://' . $_SERVER['HTTP_HOST'];
$redirectUri = $host . '/oauth';

// Step 1: no code yet -> bounce to GitHub authorize
if (!isset($_GET['code'])) {
    $state = bin2hex(random_bytes(12));
    $url = 'https://github.com/login/oauth/authorize?' . http_build_query([
        'client_id' => $CLIENT_ID,
        'redirect_uri' => $redirectUri,
        'scope' => 'repo,user',
        'state' => $state,
    ]);
    header('Location: ' . $url);
    exit;
}

// Step 2: exchange the code for an access token
$ch = curl_init('https://github.com/login/oauth/access_token');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Accept: application/json'],
    CURLOPT_POSTFIELDS => http_build_query([
        'client_id' => $CLIENT_ID,
        'client_secret' => $CLIENT_SECRET,
        'code' => $_GET['code'],
        'redirect_uri' => $redirectUri,
    ]),
]);
$resp = curl_exec($ch);
curl_close($ch);
$data = json_decode($resp, true);

$ok = isset($data['access_token']);
$payload = $ok
    ? json_encode(['token' => $data['access_token'], 'provider' => 'github'])
    : json_encode(['error' => isset($data['error']) ? $data['error'] : 'no_token']);
$status = $ok ? 'success' : 'error';

header('Content-Type: text/html; charset=utf-8');
?>
<!doctype html><html><body><script>
(function () {
  function receive(e) {
    window.opener && window.opener.postMessage(
      'authorization:github:<?php echo $status; ?>:<?php echo addslashes($payload); ?>',
      e.origin
    );
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  window.opener && window.opener.postMessage('authorizing:github', '*');
})();
</script><p>Authentification… vous pouvez fermer cette fenêtre.</p></body></html>
