import styled from "styled-components";
import HeaderWithBack from "../components/main_component/HeaderWithBack";
import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";

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
  const [parkInfo, setParkInfo] = useState({
    name: "", // 주차장 이름
    address: "", // 주차장 주소
    latitude: "", // 위도
    longitude: "", // 경도
    description: "", // 설명
    rate: "", // 요금
    availabilities: [
      {
        day: "", // 요일
        start_time: "", // 시작 시간
        end_time: "", // 종료 시간
      },
    ],
    car_capacity: "", // 차량 주차 가능 대수
    pm_capacity: "", // 개인 이용자 주차 가능 대수
  });

  const [images, setImages] = useState([]);

  // 특정 필드를 업데이트하는 handleChange
  const handleChange = (field, value) => {
    setParkInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <AddParkContainer>
      <HeaderWithBack title="공유주차장등록" />
      <MainContainer>
        <InputItem>
          <Label>주차장 사진 및 토지대장 등록</Label>
          <Input type="file" accept="images/"></Input>
        </InputItem>
      </MainContainer>
    </AddParkContainer>
  );
};

export default AddPark;
