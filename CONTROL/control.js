const API_URL = 'http://localhost:3000/api/artistas';

// Función para manejar errores de la API
const handleApiError = (error) => {
    console.error('Error:', error);
    alert('Error: ' + (error.message || 'Error desconocido'));
};

// Función para obtener los valores del formulario
const getFormValues = () => {
    return {
        id: document.getElementById('id').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        tipo_arte: document.getElementById('tipo_arte').value,
        descripcion: document.getElementById('descripcion').value,
        contacto: document.getElementById('contacto').value,
        ubicacion: document.getElementById('ubicacion').value,
        imagen_url: document.getElementById('imagen_url').value
    };
};

// Función para limpiar el formulario
const clearForm = () => {
    document.getElementById('artistForm').reset();
};

// Función para crear un artista
document.querySelector('.btn-create').addEventListener('click', async function() {
    try {
        const artistData = getFormValues();
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artistData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al crear artista');
        }

        alert('Artista creado con éxito');
        clearForm();
    } catch (error) {
        handleApiError(error);
    }
});

// Función para verificar un artista
document.querySelector('.btn-read').addEventListener('click', async function() {
    try {
        const id = document.getElementById('id').value;
        
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Artista no encontrado');
        }

        const data = await response.json();
        
        // Rellenar el formulario con los datos
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('apellido').value = data.apellido;
        document.getElementById('tipo_arte').value = data.tipo_arte;
        document.getElementById('descripcion').value = data.descripcion;
        document.getElementById('contacto').value = data.contacto;
        document.getElementById('ubicacion').value = data.ubicacion;
        document.getElementById('imagen_url').value = data.imagen_url;
        
        alert('Artista encontrado');
    } catch (error) {
        handleApiError(error);
    }
});

// Función para actualizar un artista
document.querySelector('.btn-update').addEventListener('click', async function() {
    try {
        const artistData = getFormValues();
        
        const response = await fetch(`${API_URL}/${artistData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artistData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al actualizar artista');
        }

        alert('Artista actualizado con éxito');
    } catch (error) {
        handleApiError(error);
    }
});

// Función para eliminar un artista
document.querySelector('.btn-delete').addEventListener('click', async function() {
    try {
        const id = document.getElementById('id').value;
        
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al eliminar artista');
        }

        alert('Artista eliminado con éxito');
        clearForm();
    } catch (error) {
        handleApiError(error);
    }
});
