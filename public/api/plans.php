<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $conn->query("SELECT * FROM plans");
    $plans = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Decode features JSON
    foreach ($plans as &$plan) {
        $plan['features'] = json_decode($plan['features']);
        $plan['highlight'] = (bool) $plan['highlight'];
    }

    echo json_encode($plans);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->id) && isset($data->price)) {
        $stmt = $conn->prepare("UPDATE plans SET price = ? WHERE id = ?");
        $stmt->execute([$data->price, $data->id]);
        echo json_encode(["success" => true]);
    } elseif (isset($data->id) && isset($data->features)) {
        $featuresJson = json_encode($data->features);
        $stmt = $conn->prepare("UPDATE plans SET features = ? WHERE id = ?");
        $stmt->execute([$featuresJson, $data->id]);
        echo json_encode(["success" => true]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid data"]);
    }
}
?>