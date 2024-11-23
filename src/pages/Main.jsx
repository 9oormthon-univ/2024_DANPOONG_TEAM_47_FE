import { Outlet, useLocation, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authState);

  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    if (id) {
      // 상태 업데이트
      setAuthState((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          id, // id 값 저장
        },
        isAuthenticated: true,
      }));

      // 쿼리 파라미터 제거 (리다이렉트)
      navigate("/", { replace: true });
    }
  }, [location, navigate, setAuthState]);

  return (
    <MainContainer>
      {headerTitle && <Header title={headerTitle} />}
      <Outlet />
      <BottomNav />
    </MainContainer>
  );
};

export default Main;
