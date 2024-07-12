import React from 'react'
import {Link} from "react-router-dom";
import axiosInstance from '../services/axios';
import { Form, useSubmit } from 'react-router-dom';

export default function CursoCard({title, id}) {

    
    // const handleDelete = async () => {
    //     const resp = await axiosInstance.delete(`cursos/${id}/`);
    //     navigate('/editor/cursos/', { replace: true })

    // }
    const submit = useSubmit();

    const handleDelete = (cursoId) => {
        const formData = new FormData();
        formData.append('id', cursoId);
    
        submit(formData, { method: 'delete' });
      };
    return (

        <article className="p-2 bg-gray-400 rounded-md flex flex-col gap-2">
            <h3 className='text-xl font-medium'>{title}</h3>
            <div className='flex justify-end gap-2'>
                <Form method='post' action={id + '/delete'}
                    className="rounded-md px-3 py-1 border-2 border-solid border-white hover:bg-white hover:bg-opacity-15"
                >

                <button type='submit'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
                </Form>

                <Link 
                    to={ id + '/editando'}
                    className="rounded-md px-3 py-1 border-2 border-solid border-white hover:bg-white hover:bg-opacity-15"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50"><path fill="currentColor" d="m9.6 40.4l2.5-9.9L27 15.6l7.4 7.4l-14.9 14.9zm4.3-8.9l-1.5 6.1l6.1-1.5L31.6 23L27 18.4z"/><path fill="currentColor" d="M17.8 37.3c-.6-2.5-2.6-4.5-5.1-5.1l.5-1.9c3.2.8 5.7 3.3 6.5 6.5z"/><path fill="currentColor" d="m29.298 19.287l1.414 1.414l-13.01 13.02l-1.414-1.41zM11 39l2.9-.7c-.3-1.1-1.1-1.9-2.2-2.2zm24-16.6L27.6 15l3-3l.5.1c3.6.5 6.4 3.3 6.9 6.9l.1.5zM30.4 15l4.6 4.6l.9-.9c-.5-2.3-2.3-4.1-4.6-4.6z"/></svg>

                </Link>

                <Link
                    to={ id + '/vista-previa'}
                    className="rounded-md px-3 py-1 border-2 border-solid border-white hover:bg-white hover:bg-opacity-15"

                
                >
                    ver
                </Link>
            </div>


        </article>

    )
}
