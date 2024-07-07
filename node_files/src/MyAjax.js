export const MyAjax = {
    upload(file, endpoint, csrftoken) {
      // Crear un objeto FormData para enviar el archivo
      let formData = new FormData();
      formData.append('image', file);
  
      // Construir la URL con el ID
    //   const uploadUrl = `/upload-endpoint/${id}`;
  
      // Realizar la solicitud POST al servidor
      return fetch(endpoint, {
        headers: {
            'X-CSRFToken': csrftoken,
            'Accept': 'application/json',
        },
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta del servidor
        if (data.success) {
          return {
            success: 1,
            file: {
              url: data.url, // URL devuelta por el servidor
              // cualquier otro dato que quieras almacenar
            }
          };
        } else {
          throw new Error('Upload failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        return {
          success: 0,
          file: {
            url: ''
          }
        };
      });
    }
  };
  