import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from "@editorjs/list";
import Quote from '@editorjs/quote';
import SimpleImage from "@editorjs/simple-image";
import ImageTool from '@editorjs/image';
import getCookie from './getCookie.js';
window.htmx = require('htmx.org');
import { MyAjax } from './MyAjax.js';
import CustomToast from './toast.js';

window.htmx = require('htmx.org');

document.addEventListener('display_toast', (e) => {
    CustomToast({template_id:"toast-template", data:e.detail})
});

// catching when the incoming element is richTextEditor
document.addEventListener('htmx:afterSwap', (e) => {
    if (e.detail.elt.id === "save-full-post") {
        const event = new CustomEvent("activate-rich-text", {detail:e.detail.elt.dataset.pk});
        document.dispatchEvent(event)
    }
})

// init richTextEditor
document.addEventListener('activate-rich-text', (e) => {
    const UPLOAD_FILE_URL = `http://localhost:8000/post/image/upload/${e.detail}/`;
    const csrftoken = getCookie('csrftoken');
    const editor = new EditorJS( {
        holder : 'editorjs',
        tools: {
            header: {
                class: Header,
                config: {
                  placeholder: 'Intrduzca el Título',
                  levels: [2, 3, 4],
                  defaultLevel: 2
                }
            },
            list: {
                class: List,
                inlineToolbar: true,
                config: {
                  defaultStyle: 'unordered'
                }
            },
            quote: {
                class: Quote,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+O',
                config: {
                  quotePlaceholder: 'Enter a quote',
                  captionPlaceholder: 'Quote\'s author',
                },
            },
            image: {
                class: ImageTool,
                config: {
                    uploader: {
                        uploadByFile(file) {
                            const id = 'some-id'; // Reemplaza esto con el id que necesitas
                            return MyAjax.upload(file, UPLOAD_FILE_URL, csrftoken);
                        },
                    },
                }
            }
        },
        onReady: () => {
            console.log('Editor.js is ready to work!')
        }
    });
})
