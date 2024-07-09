import React, { useEffect, useRef, useContext, useState } from 'react'
import { EditorContext } from '../contexts/EditorContext';
// import EditorJS from '@editorjs/editorjs';

// import Header from '@editorjs/header';
// import List from "@editorjs/list";
// import Quote from '@editorjs/quote';
// import ImageTool from '@editorjs/image';
// import { useParams } from 'react-router-dom';

// import { createReactEditorJS } from 'react-editor-js'
// import axiosInstance from '../services/axios'
// import EditorTools from '../tools/EditorTools';
import '../styles/editor.css'

// import Editor from '../tools/Editor';



export default function Root() {
  const {initEditor, editorInstanceRef} = useContext(EditorContext)
  const editorRef = useRef(null)

  const handleSave = () => {
    console.log(editorInstanceRef.current)
  }

  useEffect(() => {
    if (!editorRef.current) {
      initEditor(1)
      editorRef.current = true
    }
  },[])

  return (
    <div className="editor">
     <div id="editorjs"></div>
     <button 
     onClick={handleSave}
     className='rounded-md border border-blue-950 bg-blue-500 text-lg'>Salvar</button>
    </div>
  );
}