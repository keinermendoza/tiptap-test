import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph"
import Header from "@editorjs/header"
import List from "@editorjs/list"

document.addEventListener('DOMContentLoaded', () => {

const editor = new EditorJS({
    holder: "id_description",
    data: {},
    placeholder: "Let's take a note!",
    tools: {
      paragraph: {
        class: Paragraph,
      },
      header: {
        class: Header,
        inlineToolbar: true,
        config: {
          placeholder: "Enter a Header",
          levels: [2, 3],
          defaultLevel: 2,
        }
      },
      list: {
        class: List,
        config: {
          defaultStyle: "unordered"
        }
      },
    //   image: {
    //       class: CustomImage,

    //       config: {
    //           uploader: {
    //               uploadByFile(file) {
    //                   let formData = new FormData();
    //                   formData.append('image', file);
    //                   return axiosInstance.post(`cursos/${id}/image/upload/`, formData)
    //                   .then((response) => {return response.data})
    //                   .catch(error => {
    //                       return {
    //                           success: 0,
    //                           file: {
    //                               url: ''
    //                           }
    //                       };
    //                   });

    //               },
    //           },
    //       }
    //   },
    },
    onReady: () => {
        console.log('Editor.js is ready to work!')
     }
  })

})
