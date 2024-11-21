import styled from "styled-components";
import HeaderWithBack from "../components/main_component/HeaderWithBack";

const MyParkContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const MyPark = () => {
  return (
    <MyParkContainer>
      <HeaderWithBack title="내 공유주차장" />
    </MyParkContainer>
  );
};

export default MyPark;
