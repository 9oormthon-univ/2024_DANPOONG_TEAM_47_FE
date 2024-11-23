import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { isInputModalOpenState } from "../../recoil/inputState";
import LongButton from "../common/LongButton";
import { authState } from "../../recoil/authState";
import axiosInstance from "../../api/axiosInstance";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(63, 63, 63, 0.58); /* 어두운 배경 */
  z-index: 6;
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;

const ModalContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 55%;
  background-color: white;
  border-radius: 23px 23px 0 0;
  padding: 8% 8% 8% 8%;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);
  z-index: 12;
  transform: translateY(${(props) => (props.isVisible ? "0%" : "100%")});
  transition: transform 0.5s ease-in-out;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
`;

const Label = styled.div`
  font-size: clamp(13px, 3.5vw, 16px);
  font-weight: 600;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioButton = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  input[type="radio"] {
    appearance: none; /* 기본 라디오 버튼 숨기기 */
    border: 0.5px solid #5874e9;
    width: clamp(8px, 2vw, 12px);
    height: clamp(8px, 2vw, 12px);
    border-radius: 50%;
    outline: none;

    &:checked {
      border-color: #5874e9; /* 선택된 경우의 색상 */
      background: linear-gradient(90deg, #5d70eb 0%, #6a5deb 100%);
    }
  }

  span {
    font-size: clamp(13px, 3vw, 15px);
  }
`;

const FetchVehicle = ({ isVisible, onClose, onSelect }) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isInputModalOpenState);
  const [vehicles, setVehicles] = useState([]); // 차량 데이터
  const [selectedVehicleId, setSelectedVehicleId] = useState(null); // 선택된 차량 ID
  const userId = useRecoilValue(authState)?.user?.id;

  useEffect(() => {
    // 데이터 가져오기
    const fetchVehicles = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/kongju/vehicle/list?memberId=${userId}`
        ); // API 호출
        setVehicles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("이동수단 데이터를 가져오는데 실패했습니다:", error);
      }
    };

    fetchVehicles();
  }, []);

  // 외부 클릭 시 모달 닫기
  const handleOverlayClick = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setSelectedVehicleId(e.target.value); // 선택된 차량 ID 업데이트
  };

  const handleSave = () => {
    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.id === Number(selectedVehicleId)
    );

    if (selectedVehicle) {
      onSelect({
        type: selectedVehicle.vehicle_type,
        number: selectedVehicle.vehicle_number,
      }); // 선택된 차량 정보를 부모로 전달
    }

    onClose(); // 모달 닫기
  };

  const translateVehicleType = (type) => {
    // vehicle_type 값을 한글로 변환
    const types = {
      CAR: "자동차",
      PM: "개인형 이동수단",
    };
    return types[type] || "알 수 없음"; // 기본값 처리
  };

  return (
    <>
      <Overlay isVisible={isVisible} onClick={onClose} />
      <ModalContainer isVisible={isVisible}>
        <ModalContent>
          <InputContent>
            <Label>내 이동수단</Label>
            <RadioGroup>
              {vehicles.map((vehicle) => (
                <RadioButton key={vehicle.id}>
                  <input
                    type="radio"
                    name="vehicle"
                    value={vehicle.id}
                    checked={selectedVehicleId === String(vehicle.id)}
                    onChange={handleChange}
                  />
                  <span>
                    {translateVehicleType(vehicle.vehicle_type)} /{" "}
                    {vehicle.vehicle_number}
                  </span>
                </RadioButton>
              ))}
            </RadioGroup>
          </InputContent>

          <LongButton text="선택하기" onClick={handleSave} />
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default FetchVehicle;
