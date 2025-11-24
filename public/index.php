<?php
// Redirect all requests to index.html for SPA routing
$request_uri = $_SERVER['REQUEST_URI'];
$script_name = $_SERVER['SCRIPT_NAME'];

// Get the base path
$base_path = str_replace('index.php', '', $script_name);

// Check if the request is for a file that exists
$file_path = __DIR__ . str_replace($base_path, '/', $request_uri);

// If it's not a real file or directory, serve index.html
if (!is_file($file_path) && !is_dir($file_path)) {
    include __DIR__ . '/index.html';
    exit;
}
?>
