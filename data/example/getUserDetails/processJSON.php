<?php

$jsonString = file_get_contents("index.json");
$users = json_decode($jsonString, true);

foreach ($users as $id => $user) {
  file_put_contents($id . ".json", json_encode($user, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK));
}
