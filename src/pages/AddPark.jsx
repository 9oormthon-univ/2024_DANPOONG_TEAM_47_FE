import styled from "styled-components";
import Header from "../components/main_component/Header";

const AddParkContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const AddPark = () => {
  return (
    <AddParkContainer>
      <Header title="공유주차장등록" />
    </AddParkContainer>
  );
};

export default AddPark;
