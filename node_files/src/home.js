import Trix from "trix"
import axios from 'axios'

const myAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Ajusta esto según tu configuración
    withCredentials: true, // Esto asegura que se envíen las cookies con cada solicitud
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: "X-CSRFTOKEN",
    headers: {
        'Content-Type': 'multipart/form-data',
      }

});

// SETTING ENDPOINT FOR UPLOAD/DELETE IMAGES
let upload_enponit;
let delete_enponit;
document.addEventListener('DOMContentLoaded', () => {
    const endpoint =  JSON.parse(document.querySelector('#curso_endpoint').textContent)
    upload_enponit = endpoint + 'image/upload/'
    delete_enponit = endpoint + 'image/delete/'
})

// MAIN UPLOAD IMAGE FUNCTION
const uploadFileAttachment = async (attachment) => {
  const setProgress = (progress) => attachment.setUploadProgress(progress);
  const setAttributes = (attributes) => attachment.setAttributes(attributes);

  const response = await uploadFile(attachment.file, setProgress);
  if (response) {
    setAttributes({ url: response.url, href: response.url, id:response.id });
  }
};

// UPLOAD IMAGE HANDELER
const uploadFile = async (file, progressCallback) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
        const resp = await myAxios.post(upload_enponit, formData, {
            onUploadProgress: (event) => {
                const progress = (event.loaded / event.total) * 100;
                progressCallback(progress);
            }
        });
        return resp.data;
    } catch (error) {
        console.error("Error uploading file:", error);
    }
    return null;
};

    
// CALL MAIN UPLOAD IMAGE FUNCTION
window.addEventListener("trix-attachment-add", (event) => {
    if (event.attachment.file) {
    uploadFileAttachment(event.attachment);
    }
});

// DELETE IMAGE FUNCTION
window.addEventListener("trix-attachment-remove", async(event) => {
    const image_id = event.attachment.attachment.attributes.values.id
    try {
        const resp = await myAxios.delete(delete_enponit + image_id) 
        console.log(resp.data)
    } catch (error) {
        console.error("Error uploading file:", error);
    }
})

// TOOLBAR CONFIG CONFIG 
Trix.config.blockAttributes.heading2 = {
    tagName: "h2",
    breakOnReturn: true,
    group: false,
    terminal: true
}

Trix.config.blockAttributes.heading3 = {
    tagName: "h3",
    breakOnReturn: true,
    group: false,
    terminal: true
}

Trix.config.blockAttributes.heading4 = {
    tagName: "h4",
    breakOnReturn: true,
    group: false,
    terminal: true
}

Trix.config.blockAttributes.p = {
    tagName: "p",
    breakOnReturn: true,
    terminal: true
}

Trix.config.textAttributes.underlined = {
    tagName: "u",
    inheritable: true,
    parser(element) {
        const style = window.getComputedStyle(element);
        return style.textDecoration === "underline";
    },
}

// LOADING TOOLBAR
document.addEventListener("trix-before-initialize", () => {
    Trix.config.toolbar.getDefaultHTML = () => document.getElementById("trix-toolbar").innerHTML
})