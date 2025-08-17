import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Protected, Login } from './components/index.js'
import {Home, AddPost, AllPost,EditPost,Post,Signup} from './components/pages/index.js'


const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Protected>
            <Login />
          </Protected>
        ),
      },
      {
            path: "/signup",
            element: (
                <Protected authentication={false}>
                    <Signup />
                </Protected>
            ),
        },
        {
            path: "/all-post",
            element: (
                <Protected authentication>
                    {" "}
                    <AllPost />
                </Protected>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Protected authentication>
                    {" "}
                    <AddPost />
                </Protected>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Protected authentication>
                    {" "}
                    <EditPost />
                </Protected>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
