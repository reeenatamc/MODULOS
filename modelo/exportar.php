<?php
include("../config/config.php");

// Establecer los encabezados antes de cualquier salida
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="empleados_'.date("Y-m-d").'.csv"');

// Establecer el locale para caracteres especiales
setlocale(LC_ALL, 'es_ES.UTF-8');

// Abrir el buffer de salida
$output = fopen('php://output', 'w');
// Escribir el BOM UTF-8 para Excel
fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

// Encabezados para el archivo CSV
$fields = array('ID', 'Nombre', 'Edad', 'Cédula', 'Sexo', 'Teléfono', 'Cargo', 'Avatar');

// Escribir los encabezados
fputcsv($output, $fields);

// Consulta SQL para obtener los datos de los empleados
$sql = "SELECT id, nombre, edad, cedula, sexo, telefono, cargo, avatar FROM tbl_empleados ORDER BY id ASC";

try {
    // Ejecutar la consulta
    $result = $conexion->query($sql);

    if ($result && $result->num_rows > 0) {
        // Iterar sobre los resultados y agregar cada fila al archivo CSV
        while ($row = $result->fetch_assoc()) {
            // Si necesitas modificar la ruta del avatar para hacerla completa
            if (!empty($row['avatar'])) {
                $row['avatar'] = 'fotos_empleados/' . $row['avatar'];
            }
            fputcsv($output, $row);
        }
    } else {
        // Cerrar el archivo
        fclose($output);
        // Limpiar el buffer de salida
        ob_clean();
        // Mostrar mensaje de error
        die("No hay empleados para generar el reporte.");
    }
} catch (Exception $e) {
    // Cerrar el archivo
    fclose($output);
    // Limpiar el buffer de salida
    ob_clean();
    // Mostrar mensaje de error
    die("Error al generar el reporte: " . $e->getMessage());
}

// Cerrar la conexión a la base de datos
$conexion->close();