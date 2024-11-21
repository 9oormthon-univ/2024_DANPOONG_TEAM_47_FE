import styled from "styled-components";
import HeaderWithBack from "../components/main_component/HeaderWithBack";
import { useNavigate } from "react-router-dom";

const MyParkContainer = styled.div`
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const AddParkButton = styled.div`
  padding: clamp(6px, 2vw, 10px);
  color: white;
  border-radius: 8px;
  font-size: clamp(8px, 2vw, 12px);
  background-color: #5874e9;
`;

const ParkList = styled.div``;

const MyPark = () => {
  const navigate = useNavigate();
  const handleNav = (address) => {
    navigate(address);
  };
  return (
    <MyParkContainer>
      <HeaderWithBack title="내 공유주차장" />
      <MainContainer>
        <ButtonContainer>
          <AddParkButton onClick={() => handleNav("new")}>
            주차장 등록하기
          </AddParkButton>
        </ButtonContainer>
        <ParkList></ParkList>
      </MainContainer>
    </MyParkContainer>
  );
};

export default MyPark;
