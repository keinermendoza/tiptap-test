import React from 'react'
import {Link} from "react-router-dom";

export default function CursoCard({title, id}) {
    return (
        <Link 
            to={ id + '/editando'}
            className="rounded-md px-3 py-1 border-2 border-solid border-white hover:bg-white hover:bg-opacity-15"
            >
            {title}
        </Link>
    )
}
