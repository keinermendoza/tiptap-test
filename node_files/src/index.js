import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from "@editorjs/list";
import Quote from '@editorjs/quote';
import SimpleImage from "@editorjs/simple-image";
import ImageTool from '@editorjs/image';
import getCookie from './getCookie.js';

import { MyAjax } from './MyAjax.js';
const UPLOAD_FILE_URL = 'http://localhost:8000/post/image/upload/1';

document.addEventListener('DOMContentLoaded', () => {
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
            // image: SimpleImage,
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