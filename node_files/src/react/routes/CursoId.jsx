import React, { useEffect, useRef, useContext, useState } from 'react'

import { EditorContext } from '../contexts/EditorContext';
import axiosInstance from '../services/axios';
import '../styles/editor.css'

// const {initEditor, editorInstanceRef} = useContext(EditorContext)
// const editorRef = useRef(null)

// const handleSave = () => {
//   console.log(editorInstanceRef.current)
// }

// useEffect(() => {
//   if (!editorRef.current) {
//     initEditor(1)
//     editorRef.current = true
//   }
// },[])

// return (
//     ...
//     <div id="editorjs"></div>
//     ...
// )
export const CursoIdLoader = async ({params}) => {

    const resp = await axiosInstance.get(`cursos/${params.id}/`);
    console.log(resp.data)
    return {curso: resp.data};
}