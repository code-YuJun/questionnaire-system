import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import ManageLayout from "@/layout/ManageLayout";
import QuestionLayout from "@/layout/QuestionLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import List from "@/pages/manage/List";
import Star from "@/pages/manage/Star";
import Trash from "@/pages/manage/Trash";
import Edit from "@/pages/question/Edit";
import Stat from "@/pages/question/Stat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />, // 首页
      },
      {
        path: "login",
        element: <Login />, // 登录
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            index: true,
            element: <List />,
          },
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
]);

export default router;