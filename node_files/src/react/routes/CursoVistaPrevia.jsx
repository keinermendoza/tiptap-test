import React, {useEffect, useRef} from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import edjsHTML from "editorjs-html"

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', options);
}

export default function CursoVistaPrevia() {
    const {curso} = useLoaderData()
    const isEdited = curso.created === curso.updated
    const descriptionRef = useRef(null)

    useEffect(() => {
      const edjsParser = edjsHTML();
      let description = edjsParser.parse(curso?.description);
      descriptionRef.current.innerHTML = description.join(' ')
    },[])

    return (
    <section>
      <div className="flex flex-col gap-2 md:flex-row justify-between items-center ">
        <p>Este curso {curso.is_public && 'NO'} es público</p>
        <Link 
            to="../editando"
            className="rounded-md px-3 py-1 border-2 border-solid border-white hover:bg-white hover:bg-opacity-15"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50"><path fill="currentColor" d="m9.6 40.4l2.5-9.9L27 15.6l7.4 7.4l-14.9 14.9zm4.3-8.9l-1.5 6.1l6.1-1.5L31.6 23L27 18.4z"/><path fill="currentColor" d="M17.8 37.3c-.6-2.5-2.6-4.5-5.1-5.1l.5-1.9c3.2.8 5.7 3.3 6.5 6.5z"/><path fill="currentColor" d="m29.298 19.287l1.414 1.414l-13.01 13.02l-1.414-1.41zM11 39l2.9-.7c-.3-1.1-1.1-1.9-2.2-2.2zm24-16.6L27.6 15l3-3l.5.1c3.6.5 6.4 3.3 6.9 6.9l.1.5zM30.4 15l4.6 4.6l.9-.9c-.5-2.3-2.3-4.1-4.6-4.6z"/></svg>

        </Link>

      </div>

        <figure className=''>
          <img 
            className=''
            src={curso?.image} 
            alt={curso.title} />
        </figure>
        <h2>Cursos {curso.title}</h2>
        {isEdited
          ? (<p className=''>Actualizado el {formatearFecha(curso.updated)}</p>)
          : (<p className=''>Creado el {formatearFecha(curso.created)}</p>)
        }
        
        <div ref={descriptionRef} class="editorjs flex flex-col gap-3">
        </div>
        
    </section>
  )
}
