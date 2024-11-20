import styled from "styled-components";
import Header from "../components/main_component/Header";
import { useLocation } from "react-router-dom";

const MyPageContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const MyPage = () => {
  const location = useLocation();
  return (
    <MyPageContainer>
      <Header title={location.state?.parkName} />
    </MyPageContainer>
  );
};

export default MyPage;
