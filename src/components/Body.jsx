
import React from 'react'
import Login from './Login'
import Browse from './Browse'
import PrivateRoute from './PrivateRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';



const Body = () => {
    


    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: (
              <PrivateRoute>
                <Browse />
              </PrivateRoute>
            )
          }
    ])

 
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>

    )
}

export default Body