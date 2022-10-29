import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Settings from './components/comp_settings'
import Main from './components/comp_main'
import Login from './components/comp_login'
import Register from './components/comp_register';
import PostPage from './components/comp_postpage';
import NewPost from './components/comp_newpost'
import BigSpinner from './assets/bigspinner'
import SearchRes from './components/comp_searchres'
import AdminMenu from './components/comp_adminmenu'
import EditMenu from './components/comp_editmenu'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/posts/:id", 
    element: <PostPage />,
    errorElement: <BigSpinner />
  },
  {
    path: "/settings/:id", 
    element: <Settings />
  },
  {
    path: "/newpost",
    element: <NewPost />,
  },
  {
    path: "/search",
    element: <SearchRes />,
  },
  {
    path: "/admin/:id",
    element: <AdminMenu />,
  },
  { path: "/edit/:id",
    element: <EditMenu />,
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider 
    router={router}
    fallbackElement={<BigSpinner />}
     />
  </React.StrictMode>
);
