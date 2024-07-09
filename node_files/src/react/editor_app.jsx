import React from 'react'
import ReactDOM  from 'react-dom/client'
// import App from './App'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// routes
// import Root from './routes/Root';
import Cursos from './routes/Cursos';
import CursoVistaPrevia from './routes/CursoVistaPrevia'
// layouts
// import AppLayout from './layout/AppLayout';
import AppLayout from './layouts/AppLayout';
import EditorContextProvider from './contexts/EditorContext';
// // loader

import { CursosLoader } from './routes/Cursos';
// import { TestimonialLoader } from './routes/Testimonials';
// import { ProjectsLoader } from './routes/Projects';

// // actions
import { CursosCreateAction } from './routes/Cursos';

// import { TestimonialCreateAction } from './routes/Testimonials';
// import { ProjectsCreateAction } from './routes/Projects';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/editor/" element={<AppLayout />}  >
      <Route index element={<Navigate replace to={'cursos'} />}  />
      <Route path="cursos" loader={CursosLoader} action={CursosCreateAction} element={<Cursos />}>
         {/* <Route path=":id" loader={CursoLoader} element={<Navigate replace to={'vista-previa'} />}>
          <Route path="vista-previa" element={<CursoVistaPrevia /> } />
          <Route path="editando" />
        </Route> */}
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('editor-app'))
  root.render(
    <React.StrictMode>
      <EditorContextProvider>
        <RouterProvider router={router}/>
      </EditorContextProvider>
    </React.StrictMode>
  )