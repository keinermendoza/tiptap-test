import React from 'react'
import { useLoaderData } from 'react-router-dom'

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', options);
}

export default function CursoVistaPrevia() {
    const {curso} = useLoaderData()
    const isEdited = curso.created === curso.updated
    return (
    <section>
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
        
        <p>Este curso {curso.is_public && 'NO'} es público</p>
        <p>{JSON.stringify(curso?.description?.blocks)}</p>
        
    </section>
  )
}
