import styled from "styled-components";
import HeaderWithBack from "../components/main_component/HeaderWithBack";
import { type } from "@testing-library/user-event/dist/type";

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

const InputItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input``;

const AddPark = () => {
  return (
    <AddParkContainer>
      <HeaderWithBack title="공유주차장등록" />
      <MainContainer>
        <InputItem>
          <Label>주차장 사진 및 토지대장 등록</Label>
          <Input type="file"></Input>
        </InputItem>
      </MainContainer>
    </AddParkContainer>
  );
};

export default AddPark;
