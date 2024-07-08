import React from 'react'
import ReactDOM  from 'react-dom/client'
// import App from './App'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

// routes
// import Root from './routes/Root';
import Root from './routes/Root';
// layouts
// import AppLayout from './layout/AppLayout';
import AppLayout from './layouts/AppLayout';

// // loader
// import { TestimonialLoader } from './routes/Testimonials';
// import { ProjectsLoader } from './routes/Projects';

// // actions
// import { TestimonialCreateAction } from './routes/Testimonials';
// import { ProjectsCreateAction } from './routes/Projects';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/editor/" element={<AppLayout />}  >
      <Route index element={<Root />}  />
      
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('editor-app'))
  root.render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  )