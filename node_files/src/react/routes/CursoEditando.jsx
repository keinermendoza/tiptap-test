import React, { useEffect, useRef, useContext, useState } from 'react'

import { EditorContext } from '../contexts/EditorContext';
import { useLoaderData, useParams, Form } from 'react-router-dom';
import axiosInstance from '../services/axios';
import Switch from "react-custom-checkbox/switch";
import ReactFileReader from "react-file-reader";

export default function CursoEditando() {
    const {id} = useParams()
    const {curso} = useLoaderData()
    const [urlImage, setUrlImage] = useState(curso?.image);

   

   

    const {initEditor, editorInstanceRef} = useContext(EditorContext)
    const editorRef = useRef(null)

    useEffect(() => {
        if (!editorRef.current) {
            initEditor(id)
            editorRef.current = true
        }
    },[])

    const handleUploadImage = (file) => {
        setUrlImage(file.base64)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(e.target)
        const data = new FormData(e.target)
        
        console.log(...data)
        console.log(urlImage)

        for (let [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
        }
        

        const description = await editorInstanceRef.current.save()
        
        // .then((outputData) => {
        //     console.log('Article data: ', outputData)
        //   }).catch((error) => {
        //     console.log('Saving failed: ', error)
        //   });

        const resp = await axiosInstance.put(`cursos/${id}/`, {
            title:data.title,
            is_public:data.is_public,
            // image:urlImage,
            description: description
        })
        console.log(resp.data)
    }

    return (
        <>
            <h1>Editando</h1>
            <form method='post' onSubmit={handleSubmit} >
                <input type="text" name='title' defaultValue={curso?.title} />
                <div className='relative w-60 h-60 rounded-md '>
                    <figure className='w-full h-full overflow-hidden bg-gray-300'>
                    {urlImage &&
                        <img className='object-cover h-full w-full' src={urlImage} alt="introduzca su imagen aqui" />}

                    </figure>

                    <ReactFileReader
                        fileTypes={[".png", ".jpg"]}
                        base64={true}
                        handleFiles={handleUploadImage} >
                    <button
                        type='button'

                        className='absolute bottom-0 right-0 rounded-full grid place-content-center p-1  border-solid 
                        bg-gray-300 border-2 border-black transition-transform hover:scale-110'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50"><path fill="currentColor" d="m9.6 40.4l2.5-9.9L27 15.6l7.4 7.4l-14.9 14.9zm4.3-8.9l-1.5 6.1l6.1-1.5L31.6 23L27 18.4z"/><path fill="currentColor" d="M17.8 37.3c-.6-2.5-2.6-4.5-5.1-5.1l.5-1.9c3.2.8 5.7 3.3 6.5 6.5z"/><path fill="currentColor" d="m29.298 19.287l1.414 1.414l-13.01 13.02l-1.414-1.41zM11 39l2.9-.7c-.3-1.1-1.1-1.9-2.2-2.2zm24-16.6L27.6 15l3-3l.5.1c3.6.5 6.4 3.3 6.9 6.9l.1.5zM30.4 15l4.6 4.6l.9-.9c-.5-2.3-2.3-4.1-4.6-4.6z"/></svg>
                  </button>
                  </ ReactFileReader >
                </div>
               
                <div id="editorjs"></div>

                <Switch
                    checked={curso?.is_public}
                    name="is_public"
                    label="Hacer Público?"
                    labelClassName="text-sm italic font-medium"
                    icon={
                    <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                        <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                    </svg>
                    }
                />
                <button type='submit' className="bg-blue-500 px-3 py-1 rounded-md">Guardar</button>
            </form>
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