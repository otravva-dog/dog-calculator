<?php
// Email authentication has been retired. Kept as a harmless compatibility stub.
http_response_code(410);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
echo json_encode(['error'=>'Вход по логину и паролю.'],JSON_UNESCAPED_UNICODE);
