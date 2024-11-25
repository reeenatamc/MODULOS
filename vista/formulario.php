<?php
// Verificación de edición
$isEditing = isset($datoEmpleadoEdit['id']);
?>

<?php if ($isEditing): ?>
    <a href="../vista/index.php" class="float-end">
        <i class="bi bi-arrow-right-circle"></i>
    </a>
<?php endif; ?>

<form action="<?php echo $isEditing ? '../modelo/updateEmpleado.php' : '../control/acciones.php'; ?>" 
      method="POST" 
      enctype="multipart/form-data">
    
    <?php if ($isEditing): ?>
        <input type="hidden" name="id" value="<?php echo htmlspecialchars($datoEmpleadoEdit['id']); ?>" />
    <?php endif; ?>

    <!-- Nombre -->
    <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" 
               id="nombre"
               name="nombre" 
               class="form-control" 
               value="<?php echo htmlspecialchars($isEditing ? $datoEmpleadoEdit['nombre'] : ''); ?>"
               required />
    </div>

    <!-- Cédula -->
    <div class="mb-3">
        <label for="cedula" class="form-label">Cédula (NIT)</label>
        <input type="text" 
               id="cedula"
               name="cedula" 
               class="form-control" 
               value="<?php echo htmlspecialchars($isEditing ? $datoEmpleadoEdit['cedula'] : ''); ?>"
               required />
    </div>

    <div class="row">
        <!-- Edad -->
        <div class="col-md-6">
            <label for="edad" class="form-label">Seleccione la edad</label>
            <select class="form-select" id="edad" name="edad" required>
                <option value="">Edad</option>
                <?php
                for ($i = 18; $i <= 50; $i++) {
                    $selected = ($isEditing && $datoEmpleadoEdit['edad'] == $i) ? 'selected' : '';
                    echo "<option value='" . htmlspecialchars($i) . "' $selected>" . htmlspecialchars($i) . "</option>";
                }
                ?>
            </select>
        </div>

        <!-- Sexo -->
        <div class="col-md-6">
            <label class="form-label">Sexo</label>
            <div class="form-check">
                <input class="form-check-input" 
                       type="radio" 
                       name="sexo" 
                       id="sexo_m" 
                       value="Masculino" 
                       <?php echo (!$isEditing || ($isEditing && $datoEmpleadoEdit['sexo'] == 'Masculino')) ? 'checked' : ''; ?>>
                <label class="form-check-label" for="sexo_m">Masculino</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" 
                       type="radio" 
                       name="sexo" 
                       id="sexo_f" 
                       value="Femenino" 
                       <?php echo ($isEditing && $datoEmpleadoEdit['sexo'] == 'Femenino') ? 'checked' : ''; ?>>
                <label class="form-check-label" for="sexo_f">Femenino</label>
            </div>
        </div>
    </div>

    <!-- Teléfono -->
    <div class="mb-3">
        <label for="telefono" class="form-label">Teléfono</label>
        <input type="tel" 
               id="telefono"
               name="telefono" 
               class="form-control" 
               value="<?php echo htmlspecialchars($isEditing ? $datoEmpleadoEdit['telefono'] : ''); ?>"
               pattern="[0-9]+" 
               required />
    </div>

    <!-- Cargo -->
    <div class="mb-3">
        <label for="cargo" class="form-label">Seleccione el Cargo</label>
        <select id="cargo" name="cargo" class="form-select" required>
            <option value="">Cargo</option>
            <?php
            $cargos = ["Usuario", "Artista"];
            foreach ($cargos as $cargo) {
                $selected = ($isEditing && $cargo == $datoEmpleadoEdit['cargo']) ? 'selected' : '';
                echo "<option value='" . htmlspecialchars($cargo) . "' $selected>" . 
                     htmlspecialchars($cargo) . "</option>";
            }
            ?>
        </select>
    </div>

    <!-- Foto actual (solo en edición) -->
    <?php if ($isEditing && !empty($datoEmpleadoEdit['avatar'])): ?>
        <div class="mb-3 mt-4">
            <label class="form-label">Foto actual del empleado</label>
            <br>
            <img class="rounded-circle float-start" 
                 src="../vista/fotos_empleados/<?php echo htmlspecialchars($datoEmpleadoEdit['avatar']); ?>" 
                 alt="Foto del empleado" 
                 width="80">
        </div>
        <div class="clearfix mb-3"></div>
    <?php endif; ?>

    <!-- Input de foto -->
    <div class="mb-3 mt-4">
        <label for="avatar" class="form-label">
            <?php echo $isEditing ? 'Cambiar' : 'Subir'; ?> Foto del empleado
        </label>
        <input class="form-control form-control-sm" 
               type="file" 
               id="avatar"
               name="avatar" 
               accept="image/png, image/jpeg" 
               <?php echo !$isEditing ? 'required' : ''; ?> />
    </div>

    <!-- Botón submit -->
    <div class="d-grid gap-2">
        <button type="submit" class="btn btn-primary btn_add">
            <?php echo $isEditing ? 'Editar' : 'Agregar'; ?> empleado
        </button>
    </div>
</form>