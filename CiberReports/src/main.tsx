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
import AboutUs from './client/screens/AboutUs.tsx';
import Profile from './client/screens/Profile.tsx'
import Register from './client/screens/Register.tsx'
import ErrorPage from './client/screens/ErrorPage.tsx'
// Authentication File
import { AuthProvider } from './providers/AuthProvider.tsx'
// React-Toastify imports
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Support from './client/screens/Support.tsx';
import Repports from './client/screens/Repports.tsx';
import Chat from './client/screens/Chat.tsx';
import Explore from './client/screens/Explore.tsx';
import Contact from './client/screens/Contact.tsx';
import Settings from './client/screens/Settings.tsx';
import EditProfile from './client/screens/EditProfile.tsx';
import Status from './client/screens/Status.tsx';

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
				element: <Profile />,
				// elementos e caminhos filhos para a rota "/profile"
				children: [
					{
						path: "/profile/edit-profile",
						element: <EditProfile />
					},
					{
						path: "/profile/chat",
						element: <Chat />
					},
					{
						path: "/profile/settings",
						element: <Settings />
					},
					{
						path: "/profile/repports",
						element: <Repports />
					},
					{
						path: "/profile/status",
						element: <Status />
					},
				],
			},

			{
				path: "/about-us",
				element: <AboutUs />
			},
			{
				path: "/support",
				element: <Support />
			},
			{
				path: "/explore",
				element: <Explore />
			},
			{
				path: "/contact",
				element: <Contact />
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<ToastContainer />
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>,
)
