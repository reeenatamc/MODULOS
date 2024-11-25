<?php
$host = "localhost";
$usuario = "root";
$contrasena = "filomena2015";
$base_de_datos = "tbl_empleados";

$conexion = new mysqli($host, $usuario, $contrasena, $base_de_datos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
