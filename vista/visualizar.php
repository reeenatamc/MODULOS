<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Sistema CRUD de Empleados - Visualización de datos">
    <title>Detalles del Empleado - Sistema CRUD</title>
    
    <!-- CSS Dependencies -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" 
          crossorigin="anonymous">
    <link rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="assets/css/home.css">
</head>
<body>
    <?php
    // Validación y obtención de datos
    if (!isset($_GET['id'])) {
        header("Location: ./");
        exit();
    }

    require_once("../config/config.php");
    require_once("../control/acciones.php");

    $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
    if (!$id) {
        header("Location: ./");
        exit();
    }

    $dataInfo = obtenerDatosEmpleado($conexion, $id);
    if (!$dataInfo) {
        header("Location: ./");
        exit();
    }
    ?>

    <!-- Main Content -->
    <div class="container py-5">
        <h1 class="text-center mb-5 fw-bold">Sistema CRUD de Empleados</h1>
        
        <div class="row justify-content-md-center">
            <!-- Formulario Section -->
            <div class="col-md-4" style="border-right: 1px solid #dee2e6;">
                <?php include("formulario.php"); ?>
            </div>

            <!-- Detalles del Empleado Section -->
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title mb-0">
                            <a href="./" class="btn btn-link float-start text-decoration-none">
                                <i class="bi bi-arrow-left-circle"></i>
                            </a>
                            Datos del empleado
                        </h2>
                    </div>
                    
                    <div class="card-body">
                        <div class="row">
                            <!-- Foto de perfil -->
                            <div class="col-md-4 text-center mb-4">
                                <img src="../vista/fotos_empleados/<?php echo htmlspecialchars($dataInfo['avatar']); ?>" 
                                     alt="Foto de <?php echo htmlspecialchars($dataInfo['nombre']); ?>" 
                                     class="img-fluid rounded-circle"
                                     style="width: 200px; height: 200px; object-fit: cover;">
                            </div>
                            
                            <!-- Información personal -->
                            <div class="col-md-8">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <i class="bi bi-person-circle me-2"></i>
                                        Nombre: <strong><?php echo htmlspecialchars($dataInfo['nombre']); ?></strong>
                                    </li>
                                    <li class="list-group-item">
                                        <i class="bi bi-card-text me-2"></i>
                                        Cédula: <strong><?php echo htmlspecialchars($dataInfo['cedula']); ?></strong>
                                    </li>
                                    <li class="list-group-item">
                                        <i class="bi bi-calendar me-2"></i>
                                        Edad: <strong><?php echo htmlspecialchars($dataInfo['edad']); ?></strong>
                                    </li>
                                    <li class="list-group-item">
                                        <i class="bi bi-gender-ambiguous me-2"></i>
                                        Sexo: <strong><?php echo htmlspecialchars($dataInfo['sexo']); ?></strong>
                                    </li>
                                    <li class="list-group-item">
                                        <i class="bi bi-telephone me-2"></i>
                                        Teléfono: <strong><?php echo htmlspecialchars($dataInfo['telefono']); ?></strong>
                                    </li>
                                    <li class="list-group-item">
                                        <i class="bi bi-briefcase me-2"></i>
                                        Cargo: <strong><?php echo htmlspecialchars($dataInfo['cargo']); ?></strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript Dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
            crossorigin="anonymous"></script>
    <script src="assets/js/home.js"></script>
</body>
</html>