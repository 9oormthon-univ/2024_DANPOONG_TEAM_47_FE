import styled from "styled-components";
import HeaderWithBack from "../components/main_component/HeaderWithBack";

const AddParkContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;

  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  flex: 1;
  padding: clamp(22px, 6vw, 30px) 8%;

  display: flex;
  flex-direction: column;
  gap: clamp(22px, 6vw, 30px);
`;

const AddPark = () => {
  return (
    <AddParkContainer>
      <HeaderWithBack title="공유주차장등록" />
      <MainContainer></MainContainer>
    </AddParkContainer>
  );
};

export default AddPark;
