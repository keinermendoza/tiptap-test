import axiosInstance from '../services/axios';
import { redirect } from 'react-router-dom';

export const CursoIdLoader = async ({params}) => {

    const resp = await axiosInstance.get(`cursos/${params.id}/`);
    console.log(resp.data)
    return {curso: resp.data};
}

export const CursoIdDelete = async ({params}) => {
    const resp = await axiosInstance.delete(`cursos/${params.id}/`);
    return redirect('/editor/cursos/')
} 