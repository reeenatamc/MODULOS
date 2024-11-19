const API_URL = 'http://localhost:3000/api/usuarios';

// Función para manejar errores de la API
const handleApiError = (error) => {
    console.error('Error:', error);
    alert('Error: ' + (error.message || 'Error desconocido'));
};

// Función para obtener los valores del formulario
const getFormValues = () => {
    return {
        id_usuario: document.getElementById('id_usuario').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        contrasena: document.getElementById('contrasena').value,
        fecha_creacion: document.getElementById('fecha_creacion').value
    };
};

// Función para limpiar el formulario
const clearForm = () => {
    document.getElementById('userForm').reset();
};

// Función para crear un usuario
document.querySelector('.btn-create').addEventListener('click', async function() {
    try {
        const userData = getFormValues();
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        alert('Usuario creado: ' + data.id_usuario);
        clearForm();
    } catch (error) {
        handleApiError(error);
    }
});

// Función para verificar un usuario
document.querySelector('.btn-read').addEventListener('click', async function() {
    try {
        const userId = document.getElementById('id_usuario').value;
        const response = await fetch(`${API_URL}/${userId}`);
        if (response.ok) {
            const data = await response.json();
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('apellido').value = data.apellido;
            document.getElementById('email').value = data.email;
            document.getElementById('contrasena').value = data.contrasena;
            document.getElementById('fecha_creacion').value = data.fecha_creacion;
        } else {
            alert('Usuario no encontrado');
        }
    } catch (error) {
        handleApiError(error);
    }
});

// Función para actualizar un usuario
document.querySelector('.btn-update').addEventListener('click', async function() {
    try {
        const userId = document.getElementById('id_usuario').value;
        const userData = getFormValues();
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        alert('Usuario actualizado: ' + data.id_usuario);
        clearForm();
    } catch (error) {
        handleApiError(error);
    }
});

// Función para el  iminar un usuario
document.querySelector('.btn-delete').addEventListener('click', async function() {
    try {
        const userId = document.getElementById('id_usuario').value;
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Usuario eliminado');
            clearForm();
        } else {
            alert('Error al eliminar el usuario');
        }
    } catch (error) {
        handleApiError(error);
    }
});
