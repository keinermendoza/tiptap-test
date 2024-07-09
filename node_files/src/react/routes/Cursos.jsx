import React from "react";
import axiosInstance from "../services/axios";
import { Form, useLoaderData, redirect } from 'react-router-dom'




export default function Cursos() {

  const {cursos} = useLoaderData()
  console.log(cursos)
  return (
  <section>
      <h2>Cursos Registrados</h2>
      {cursos.map(curso => (
          <p key={curso.id}>{curso.title}</p>
      ))
      }

    <Form method="post">
      <label htmlFor="title">
        <span>Titulo</span>
      <input placeholder="Registra un nuevo curso..." type="text" id="title" name="title" />
      </label>
      <button type="submit">Crear</button>
    </Form>

  </section>
  );
}

export async function CursosLoader() {
    const resp = await axiosInstance.get("cursos");
    return {cursos: resp.data};
  }
  

export async function CursosCreateAction({ request, params }) {
    const formData = await request.formData();
    const dataObject = Object.fromEntries(formData);
    const resp = await axiosInstance.post(
      "cursos",
      formData,
    );
    return redirect('');
    
    // return redirect(`/editor/cursos/${resp.id}`);

  }