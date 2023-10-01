import React from 'react'
import App from './App.tsx'
import About from './components/About.tsx';
import * as ReactDOM from "react-dom/client";
import './index.css'

import { Navbar, Nav, Container } from 'react-bootstrap';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CatchOptionsInfo from './components/CatchOptionsInfo.tsx';
import Navigation from './components/Navigation.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <App />
  },
  {
    path: "/about",
    element: <About />
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navigation />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
