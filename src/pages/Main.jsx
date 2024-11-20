import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/main_component/BottomNav";
import styled from "styled-components";
import Header from "../components/main_component/Header";

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
  return (
    <MainContainer>
      {headerTitle && <Header title={headerTitle} />}
      <Outlet />
      <BottomNav />
    </MainContainer>
  );
};

export default Main;
