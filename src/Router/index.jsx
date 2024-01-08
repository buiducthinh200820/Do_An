import { createBrowserRouter } from "react-router-dom";
import { React } from "react";

import { Navigate } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const Header = await import("../components/Header/Header");
      return {
        Component: Header.default,
      };
    },
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        lazy: async () => {
          const Home = await import("../components/Home/Home");
          return {
            Component: Home.default,
          };
        },
      },
      {
        path: "articles/:slug",
        lazy: async () => {
          const ArticleDetail = await import(
            "../components/ArticleDetail/ArticleDetail"
          );
          return {
            Component: ArticleDetail.default,
          };
        },
      },

      {
        path: "login",
        lazy: async () => {
          const Login = await import("../components/Login/Login");
          return {
            Component: Login.default,
          };
        },
      },

      {
        path: "register",
        lazy: async () => {
          const Register = await import("../components/Register/Register");
          return {
            Component: Register.default,
          };
        },
      },

      {
        path: "tag",
        lazy: async () => {
          const TagDetail = await import("../components/Tag/TagDetail");
          return {
            Component: TagDetail.default,
          };
        },
      },

      {
        path: "new-article",
        lazy: async () => {
          const CreateArticle = await import(
            "../components/CreateArticle/CreateArticle"
          );
          return {
            Component: CreateArticle.default,
          };
        },
      },

      {
        path: "settings",
        lazy: async () => {
          const Settings = await import("../components/Settings/Settings");
          return {
            Component: Settings.default,
          };
        },
      },

      {
        path: "profile/:userName",
        lazy: async () => {
          const Profile = await import("../components/Profile/Profile");
          return {
            Component: Profile.default,
          };
        },
      },

      {
        path: "new-article/:slug",
        lazy: async () => {
          const CreateArticle = await import(
            "../components/CreateArticle/CreateArticle"
          );
          return {
            Component: CreateArticle.default,
          };
        },
      },
    ],
  },
]);

export default router;