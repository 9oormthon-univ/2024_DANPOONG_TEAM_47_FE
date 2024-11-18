import { Outlet } from "react-router-dom";
import BottomNav from "../components/main_component/BottomNav";
import styled from "styled-components";

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const Main = () => {
  return (
    <MainContainer>
      <Outlet />
      <BottomNav />
    </MainContainer>
  );
};

export default Main;
