// React libarys and imports
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// All css style
import "./client/theme/index.css";
// All pages imports
import App from "./client/routes/App.tsx";
import Home from "./client/screens/Home.tsx";
import Login from "./client/screens/Login.tsx";
import AboutUs from "./client/screens/AboutUs.tsx";
import Profile from "./client/screens/Profile.tsx";
import Register from "./client/screens/Register.tsx";
import ErrorPage from "./client/screens/ErrorPage.tsx";
// Authentication File
import { AuthProvider } from "./providers/AuthProvider.tsx";
// React-Toastify imports
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Support from "./client/screens/Support.tsx";
import Reports from "./client/screens/Reports.tsx";
import Chat from "./client/screens/Chat.tsx";
import Explore from "./client/screens/Explore.tsx";
import Settings from "./client/screens/Settings.tsx";
import EditProfile from "./client/screens/EditProfile.tsx";
import Status from "./client/screens/Status.tsx";
import { ImgsProvider } from "./providers/ImgsProvider.tsx";

import { PrivateRoutes } from "./client/routes/PrivateRoutes.tsx";
import { ProfileProvider } from "./providers/ProfileProvider.tsx";
import RegisterProfile from "./client/screens/RegisterProfile.tsx";
import Admin from "./client/screens/Admin.tsx";
import { PrivateAdmin } from "./client/routes/PrivateAdmin.tsx";

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
        path: "/register-profile",
        element: <RegisterProfile />
      },
      {
        path: "/signin",
        element: <Login />,

      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes
            element={<Profile />}
            notHaveAccessNavigateTo="/signin"
          />
        ),
        // elementos e caminhos filhos para a rota "/profile"
        children: [
          {
            path: "/profile/edit-profile",
            element: <EditProfile />,
          },
          {
            path: "/profile/chat",
            element: <Chat />,
          },
          {
            path: "/profile/settings",
            element: <Settings />,
          },
          {
            path: "/profile/reports",
            element: <Reports />,
          },
          {
            path: "/profile/status",
            element: <Status />,
          },
          {
            path: "/profile/admin",
            element: (
              <PrivateAdmin 
              element={<Admin/>}
              />
            )
          },
        ],
      },

      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ImgsProvider>
        <ProfileProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </ProfileProvider>
      </ImgsProvider>
    </AuthProvider>
  </React.StrictMode>
);
