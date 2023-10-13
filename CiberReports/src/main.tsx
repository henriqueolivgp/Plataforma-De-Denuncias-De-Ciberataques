import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './client/screens/Home.tsx'
import './client/theme/index.css'
import ErrorPage from './client/screens/ErrorPage.tsx'

// importar/configurar o react-router-dom
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './client/routes/App.tsx'

// criação da const function
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,	
		// Pagina de erro
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
