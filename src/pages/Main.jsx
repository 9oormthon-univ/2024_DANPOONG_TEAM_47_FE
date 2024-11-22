import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/main_component/BottomNav";
import styled from "styled-components";
import Header from "../components/main_component/Header";
import { useSetRecoilState } from "recoil";
import { authState } from "../recoil/authState";
import { useEffect } from "react";

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const Main = () => {
  const location = useLocation();
  const headerTitle = location.state?.headerTitle;

  const setAuth = useSetRecoilState(authState);

  const checkSessionFromCookie = () => {
    // 브라우저 쿠키에서 JSESSIONID 확인
    const cookies = document.cookie;
    const sessionExists = cookies.includes("JSESSIONID"); // JSESSIONID 쿠키 확인

    if (sessionExists) {
      // 로그인 상태로 변경
      setAuth({
        isAuthenticated: true,
        user: null, // 사용자 정보를 백엔드에서 추가로 요청할 수도 있음
      });
    } else {
      // 로그아웃 상태로 변경
      setAuth({
        isAuthenticated: false,
        user: null,
      });
    }
  };

  useEffect(() => {
    // 홈 화면 진입 시 세션 확인
    checkSessionFromCookie();
  }, []);

  return (
    <MainContainer>
      {headerTitle && <Header title={headerTitle} />}
      <Outlet />
      <BottomNav />
    </MainContainer>
  );
};

export default Main;
