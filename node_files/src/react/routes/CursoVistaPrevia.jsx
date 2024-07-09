import React from 'react'
import { useLoaderData } from 'react-router-dom'

export default function CursoVistaPrevia() {
    const {cursos} = useLoaderData()
    console.log(cursos)
    return (
    <section>
        <h2>Cursos Registrados</h2>
        {cursos.map(curso => (
            <p key={curso.id}>{curso.title}</p>
        ))

        }
    </section>
  )
}
