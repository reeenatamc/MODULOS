<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Sistema CRUD de Empleados en PHP con PDO y MySQL">
    <title>Sistema CRUD de Empleados</title>

    <!-- CSS Dependencies -->
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" 
          crossorigin="anonymous">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- DataTables Bootstrap 5 -->
    <link rel="stylesheet" 
          href="https://cdn.datatables.net/2.0.1/css/dataTables.bootstrap5.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/home.css">
</head>
<body>
    <?php
    // Inclusión de archivos de configuración y control
    require_once("../config/config.php");
    require_once("../control/acciones.php");

    // Obtener datos del empleado si existe ID en la URL
    $datoEmpleadoEdit = [];
    if (isset($_GET['id'])) {
        $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
        if ($id) {
            $datoEmpleadoEdit = obtenerDatosEmpleado($conexion, $id);
        }
    }

    // Obtener lista de empleados
    $empleados = obtenerEmpleados($conexion);
    $totalEmpleados = $empleados->num_rows;
    ?>

    <!-- Header -->
    <h1 class="text-center mt-5 mb-5 fw-bold">CRUD USUARIOS</h1>

    <!-- Main Content -->
    <div class="container">
        <div class="row justify-content-md-center">
            <!-- Formulario Section -->
            <div class="col-md-4" style="border-right: 1px solid #dee2e6;">
                <?php include("formulario.php"); ?>
            </div>

            <!-- Lista de Usuarios Section -->
            <div class="col-md-8">
                <h1 class="text-center">
                    Lista de usuarios
                    <span class="float-end">
                        <a href="../modelo/exportar.php" 
                           class="btn btn-success" 
                           title="Exportar a CSV" 
                           download="empleados.csv">
                            <i class="bi bi-filetype-csv"></i>
                        </a>
                    </span>
                </h1>
                <hr>
                <p>Total de empleados: <strong><?php echo $totalEmpleados; ?></strong></p>
                <?php include("empleados.php"); ?>
            </div>
        </div>
    </div>

    <!-- JavaScript Dependencies -->
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <!-- Bootstrap Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
            crossorigin="anonymous"></script>
    <!-- Axios -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <!-- DataTables -->
    <script src="https://cdn.datatables.net/2.0.1/js/dataTables.js"></script>
    <script src="https://cdn.datatables.net/2.0.1/js/dataTables.bootstrap5.js"></script>
    <!-- Custom JS -->
    <script src="assets/js/home.js"></script>

    <!-- DataTables Initialization -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            new DataTable('#table_empleados', {
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json"
                }
            });
        });
    </script>
</body>
</html>