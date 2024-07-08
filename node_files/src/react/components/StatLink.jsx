import React from "react";
import {NavLink} from "react-router-dom";


export default function StatLink({url, text}) {
  return (
    <NavLink 
        to={url}
        className="rounded-md px-3 py-1 border-2 border-solid border-white hover:bg-white hover:bg-opacity-15"
    >
        {text}
    </NavLink>
    )
}