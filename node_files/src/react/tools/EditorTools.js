import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import List from '@editorjs/list';
import axiosInstance from '../services/axios';
// import { MyAjax } from '../../MyAjax';
// import getCookie from '../../getCookie.js';
const EditorTools = (id) => {
  const tools = {
    header: {
      class: Header,
      config: {
        placeholder: 'Enter a header',
        levels: [2, 3, 4],
        defaultLevel: 3
      }
    },
    image: {
      class: ImageTool,

      config: {
            uploader: {
                uploadByFile(file) {
                    let formData = new FormData();
                    formData.append('image', file);
                    axiosInstance.post(`post/image/upload/${id}/`, formData)
                    .then(response => {
                        console.log(response.data, response.data.success)
                        if (response.data.success) {
                            return { success: 1,
                                file: {
                                url: 'http://localhost:8000/' + response.data.file.url 
                                }
                            }
                        }
                    })
                    .catch(error => {
                        return {
                            success: 0,
                            file: {
                              url: ''
                            }
                        };
                    });
                },
            },
      }
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+O',
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: "Quote's author",
      },
    },
    list: {
      class: List,
      inlineToolbar: true,
      config: {
        defaultStyle: 'unordered'
      }
    },
  };

  return { tools };
};

export default EditorTools;
