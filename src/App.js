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
import ProtectedRoute from "./components/login_component/ProtectedRoute";
import ReservePage from "./pages/ReservePage";

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
        element: (
          <ProtectedRoute
            element={<ChatList />}
            pageName="채팅"
            service="채팅"
          />
        ),
      },
      // "/chat/채팅방id" 채팅방 페이지.
      {
        path: "chat/:chatId",
        element: <ChatPage />,
      },
      // "/alarm" 알람 페이지
      {
        path: "alarm",
        element: (
          <ProtectedRoute
            element={<AlarmList />}
            pageName="알림"
            service="알림"
          />
        ),
      },
      // "/mypage" 마이 페이지
      {
        path: "mypage",
        element: (
          <ProtectedRoute
            element={<MyPage />}
            pageName="마이페이지"
            service="마이페이지"
          />
        ),
      },
      // "/parks/reserve/:id" 주차장 예약 페이지
      {
        path: "parks/reserve/:id",
        element: (
          <ProtectedRoute
            element={<ReservePage />}
            pageName="공유주차장예약"
            service="예약"
          />
        ),
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
