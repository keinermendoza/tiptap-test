import React, { useEffect, useRef, useContext, useState } from 'react'

import { EditorContext } from '../contexts/EditorContext';
import { useLoaderData, useParams, Form } from 'react-router-dom';
import axiosInstance from '../services/axios';


export default function CursoEditando() {
    const {id} = useParams()
    const {curso} = useLoaderData()
    const {initEditor, editorInstanceRef} = useContext(EditorContext)
    const editorRef = useRef(null)
    useEffect(() => {
        if (!editorRef.current) {
            initEditor(id)
            editorRef.current = true
        }
    },[])

    return (
        <>
            <h1>Editando</h1>
            <Form>
                <input type="text" name='title' defaultValue={curso?.title} />
                <div id="editorjs"></div>
                <input type="checkbox" name='is_public' defaultChecked={curso?.is_public } />
            </Form>
        </>
    )
}


// const handleSave = () => {
//   console.log(editorInstanceRef.current)
// }



// return (
//     ...
//     ...
// )