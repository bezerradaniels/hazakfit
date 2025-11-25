<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $conn->query("SELECT * FROM gallery");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $stmt = $conn->prepare("INSERT INTO gallery (image_url) VALUES (?)");
    $stmt->execute([$data->image_url]);

    echo json_encode(["success" => true, "id" => $conn->lastInsertId()]);
} elseif ($method === 'DELETE') {
    $id = $_GET['id'];

    $stmt = $conn->prepare("DELETE FROM gallery WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(["success" => true]);
}
?>