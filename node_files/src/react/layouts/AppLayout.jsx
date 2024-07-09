import React from "react";
import { Outlet } from "react-router";
// import StatLink from "../components/StatLink";
import StatLink from "../components/StatLink";

export default function AppLayout() {
    return (
      <div className="flex gap-5">
        <aside className="flex flex-col gap-3 p-3 rounded-md bg-blue-800 text-white">
          <h2>Navegacion</h2>
          <StatLink url="posts" text="Publicaciones" />
        </aside>
        <main className="grow">
          <Outlet />

        </main>
      </div>
    );
}