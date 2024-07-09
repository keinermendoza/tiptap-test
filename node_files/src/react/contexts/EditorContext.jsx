import React from "react"; 
import { createContext, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph"
import Header from "@editorjs/header"
import List from "@editorjs/list"
import ImageTool from '@editorjs/image';
import axiosInstance from "../services/axios";
import CustomImage from "../components/Image";
export const EditorContext = createContext()

function EditorContextProvider(props) {
  const editorInstanceRef = useRef(null)

  const initEditor = (id) => {
    const editor = new EditorJS({
      onChange: (api, event) => {
        console.log(api, event)
      },
      holder: "editorjs",
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
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 2,
          }
        },
        list: {
          class: List,
          config: {
            defaultStyle: "unordered"
          }
        },
        image: {
            class: CustomImage,

            config: {
                uploader: {
                    uploadByFile(file) {
                        let formData = new FormData();
                        formData.append('image', file);
                        return axiosInstance.post(`cursos/${id}/image/upload/`, formData)
                        .then((response) => {return response.data})
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
      },
    })
    editorInstanceRef.current = editor
  }
  return (  
    <EditorContext.Provider value={{initEditor, editorInstanceRef}}>
      {props.children}
    </EditorContext.Provider>
  );
}

export default EditorContextProvider;