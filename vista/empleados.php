<div class="table-responsive">
    <table class="table table-hover" id="table_empleados">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Cédula</th>
                <th scope="col">Cargo</th>
                <th scope="col">Avatar</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($empleados as $empleado): ?>
                <tr id="empleado_<?php echo htmlspecialchars($empleado['id']); ?>">
                    <th scope="row"><?php echo htmlspecialchars($empleado['id']); ?></th>
                    <td><?php echo htmlspecialchars($empleado['nombre']); ?></td>
                    <td><?php echo htmlspecialchars($empleado['edad']); ?></td>
                    <td><?php echo htmlspecialchars($empleado['cedula']); ?></td>
                    <td><?php echo htmlspecialchars($empleado['cargo']); ?></td>
                    <td>
                        <img 
                            class="rounded-circle" 
                            src="./fotos_empleados/<?php echo htmlspecialchars($empleado['avatar']); ?>" 
                            alt="<?php echo htmlspecialchars($empleado['nombre']); ?>" 
                            width="50" 
                            height="50">
                    </td>
                    <td>
                        <a 
                            title="Ver detalles del empleado" 
                            href="visualizar.php?id=<?php echo htmlspecialchars($empleado['id']); ?>" 
                            class="btn btn-success">
                            <i class="bi bi-binoculars"></i>
                        </a>
                        <a 
                            title="Editar datos del empleado" 
                            href="index.php?id=<?php echo htmlspecialchars($empleado['id']); ?>" 
                            class="btn btn-warning">
                            <i class="bi bi-pencil-square"></i>
                        </a>
                        <a 
                            title="Eliminar datos del empleado" 
                            href="#" 
                            class="btn btn-danger" 
                            onclick="eliminarEmpleado(
                                <?php echo htmlspecialchars($empleado['id']); ?>, 
                                '<?php echo htmlspecialchars($empleado['avatar']); ?>'
                            )">
                            <i class="bi bi-trash"></i>
                        </a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
