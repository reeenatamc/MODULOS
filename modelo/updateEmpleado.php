<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include("../config/config.php");

    $id = trim($_POST['id']);
    $nombre = trim($_POST['nombre']);
    $edad = trim($_POST['edad']);
    $cedula = trim($_POST['cedula']);
    $sexo = trim($_POST['sexo']);
    $telefono = trim($_POST['telefono']);
    $cargo = trim($_POST['cargo']);
    $avatar = null;

    // Verifica si se ha subido un nuevo archivo de avatar
    if (isset($_FILES['avatar']) && $_FILES['avatar']['size'] > 0) {
        $archivoTemporal = $_FILES['avatar']['tmp_name'];
        $nombreArchivo = $_FILES['avatar']['name'];
        $extension = strtolower(pathinfo($nombreArchivo, PATHINFO_EXTENSION));

        // Corregimos la ruta del directorio de fotos
        $dirLocal = "../vista/fotos_empleados";  // Corregido
        $nombreArchivo = substr(md5(uniqid(rand())), 0, 10) . "." . $extension;
        $rutaDestino = $dirLocal . '/' . $nombreArchivo;

        if (move_uploaded_file($archivoTemporal, $rutaDestino)) {
            $avatar = $nombreArchivo;
        }
    }

    // Actualiza los datos en la base de datos
    $sql = "UPDATE tbl_empleados SET 
            nombre='$nombre', 
            edad='$edad', 
            cedula='$cedula', 
            sexo='$sexo', 
            telefono='$telefono', 
            cargo='$cargo'";

    if ($avatar !== null) {
        $sql .= ", avatar='$avatar'";
    }

    $sql .= " WHERE id='$id'";

    if ($conexion->query($sql) === TRUE) {
        header("location: ../vista/index.php");  // Corregido
    } else {
        echo "Error al actualizar el registro: " . $conexion->error;
    }
}
?>