<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!isset($data->username) || !isset($data->password)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing credentials"]);
        exit();
    }

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->execute([$data->username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data->password, $user['password'])) {
        echo json_encode(["success" => true, "message" => "Login successful"]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "error" => "Invalid credentials"]);
    }
}
?>