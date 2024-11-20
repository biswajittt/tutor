import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import routers from "./main";
export default function index() {
  return <div>index</div>;
}

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routers} />);
