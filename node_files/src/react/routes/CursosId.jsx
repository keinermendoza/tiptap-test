import React, { useEffect, useRef, useContext, useState } from 'react'

import { EditorContext } from '../contexts/EditorContext';

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