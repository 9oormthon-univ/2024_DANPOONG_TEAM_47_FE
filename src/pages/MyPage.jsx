import styled from "styled-components";
import Header from "../components/main_component/Header";

const MyPageContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const MyPage = () => {
  return (
    <MyPageContainer>
      <Header title="마이페이지" />
    </MyPageContainer>
  );
};

export default MyPage;
