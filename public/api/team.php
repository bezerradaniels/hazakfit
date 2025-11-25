<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $conn->query("SELECT * FROM team");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $stmt = $conn->prepare("INSERT INTO team (name, role, photo) VALUES (?, ?, ?)");
    $stmt->execute([$data->name, $data->role, $data->photo]);

    echo json_encode(["success" => true, "id" => $conn->lastInsertId()]);
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    $stmt = $conn->prepare("UPDATE team SET name = ?, role = ?, photo = ? WHERE id = ?");
    $stmt->execute([$data->name, $data->role, $data->photo, $data->id]);

    echo json_encode(["success" => true]);
} elseif ($method === 'DELETE') {
    $id = $_GET['id'];

    $stmt = $conn->prepare("DELETE FROM team WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(["success" => true]);
}
?>