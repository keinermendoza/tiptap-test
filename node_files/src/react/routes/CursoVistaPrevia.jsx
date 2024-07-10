import React from 'react'
import { useLoaderData } from 'react-router-dom'

export default function CursoVistaPrevia() {
    const {curso} = useLoaderData()

    return (
    <section>
        <h2>Cursos {curso.title}</h2>
        
    </section>
  )
}
