import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import ChatList from "./pages/ChatList";
import ChatPage from "./pages/ChatPage";
import MyPage from "./pages/MyPage";
import AddPark from "./pages/AddPark";
import Home from "./pages/Home";
import AlarmList from "./pages/AlarmList";
import ReserveModal from "./components/home_component/ReserveModal";
import ReviewModal from "./components/home_component/ReviewModal";
import InfoModal from "./components/home_component/InfoModal";

const router = createBrowserRouter([
  // Main 페이지에서 공통부분 처리하고, outlet으로 화면 부분 구현.
  {
    path: "/",
    element: <Main />,
    children: [
      // "/" 홈페이지, "/:주차장id/reserve" oulet으로 받아 띄움.
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: ":parkId",
            children: [
              { path: "reserve", element: <ReserveModal /> },
              { path: "review", element: <ReviewModal /> },
              { path: "info", element: <InfoModal /> },
            ],
          },
        ],
      },
      // "/search" 검색, "/search:주차장id/reserve" oulet으로 받아 띄움.
      {
        path: "search",
        element: <Search />,
        children: [
          {
            path: ":parkId",
            children: [
              { path: "reserve", element: <ReserveModal /> },
              { path: "review", element: <ReviewModal /> },
              { path: "info", element: <InfoModal /> },
            ],
          },
        ],
      },
      // "/chats" 채팅 리스트 페이지.
      {
        path: "chats",
        element: <ChatList />,
      },
      // "/chat/채팅방id" 채팅방 페이지.
      {
        path: "chat/:chatId",
        element: <ChatPage />,
      },
      // "/alarm" 알람 페이지
      {
        path: "alarm",
        element: <AlarmList />,
      },
      // "/mypage" 마이 페이지
      {
        path: "mypage",
        element: <MyPage />,
      },
      // "/parks/new" 주차장 등록 페이지.
      {
        path: "parks/new",
        element: <AddPark />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
