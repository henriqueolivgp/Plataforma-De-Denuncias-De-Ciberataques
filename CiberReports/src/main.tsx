// React libarys and imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// All css style
import './client/theme/index.css'
// All pages imports
import App from './client/routes/App.tsx'
import Home from './client/screens/Home.tsx'
import Login from './client/screens/Login.tsx'
import Profile from './client/screens/Profile.tsx'
import Register from './client/screens/Register.tsx'
import ErrorPage from './client/screens/ErrorPage.tsx'
import UpdatePassword from './client/screens/UpdatePassword.tsx'
// Authentication File
import { AuthProvider } from './providers/AuthProvider.tsx'
// React-Toastify imports
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
			},
			{
				path: "/signup",
				element: <Register />,
			},
			{
				path: "/signin",
				element: <Login />,
			},
			{
				path: "/profile",
				element: <Profile />
			},
			{
				path: "/update-password",
				element: <UpdatePassword />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<ToastContainer />
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>,
)
