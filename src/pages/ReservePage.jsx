import styled from "styled-components";
import HeaderWithBack from "../components/main_component/HeaderWithBack";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import LongButton from "../components/common/LongButton";
import FetchVehicle from "../components/reserve_component/FetchVehicle";

const ReserveContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  flex: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
`;

const ParkInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 5px 0;

  > strong {
    font-size: clamp(15px, 4vw, 20px);
    font-weight: 600;
  }

  p {
    font-size: clamp(10px, 3vw, 12px);
    color: #5874e9;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.p`
  font-size: clamp(13px, 3.5vw, 16px);
  font-weight: 600;
`;

const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FetchButton = styled.div`
  cursor: pointer;
  font-size: clamp(10px, 3vw, 12px);
  font-weight: 600;
  color: #5874e9;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
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
    font-size: clamp(10px, 3vw, 12px);
  }
`;

const InputText = styled.input`
  width: 50%;
  height: clamp(24px, 10vw, 30px);
  border: 0.5px solid #5874e9;
  border-radius: 3px;
  font-size: clamp(8px, 2vw, 12px);
  padding-left: clamp(8px, 2vw, 12px);

  &::placeholder {
    font-size: clamp(8px, 2vw, 12px);
    color: #a8a8a8;
  }
`;

const Divider = styled.hr`
  width: 100%;
  height: 0.5px;
  background-color: #a8a8a8;
  margin: 0;
`;

const DayList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DayButton = styled.button`
  width: clamp(30px, 9vw, 40px);
  height: clamp(30px, 9vw, 40px);
  border-radius: 50%;
  border: 1px solid ${(props) => (props.isSelected ? "#5874e9" : "#ccc")};
  background: ${(props) =>
    props.isSelected
      ? "linear-gradient(90deg, #5D70EB 0%, #6A5DEB 100%)"
      : "white"};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  cursor: pointer;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(10px, 3vw, 12px);
`;

const TimeInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  input {
    width: 100px;
    height: 40px;
    border: 0.5px solid #5874e9;
    padding: 0 clamp(6px, 2vw, 12px);
    font-size: clamp(10px, 3vw, 12px);
    flex: 1;
  }

  span {
    font-size: 18px;
    font-weight: bold;
  }
`;

const BetweenDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(22px, 6vw, 30px) 8%;
`;

const ReservePage = () => {
  const location = useLocation();
  const { marker } = location.state || {};
  const [selected, setSelected] = useState("");
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("");
  console.log(marker);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const [selectedVehicle, setSelectedVehicle] = useState({
    type: "", // "CAR" or "PM"
    number: "", // vehicle number
  });
  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(false); // 모달 닫기
  };

  const handleButton = () => {
    alert("예약이 완료되었습니다.");
    navigate(-1);
  };

  return (
    <ReserveContainer>
      <HeaderWithBack title="공유주차장예약" />
      {marker && (
        <BetweenDiv>
          <MainContainer>
            <ParkInfo>
              <strong>{marker.name}</strong>
              <p>{marker.address}</p>
            </ParkInfo>
            <InputContainer>
              <Flexbox>
                <Label>이동수단</Label>
                <FetchButton onClick={handleModalOpen}>불러오기</FetchButton>
              </Flexbox>
              <RadioGroup>
                <RadioButton>
                  <input
                    type="radio"
                    id="car"
                    name="vehicle"
                    value="CAR"
                    checked={selectedVehicle.type === "CAR"}
                    onChange={(e) =>
                      setSelectedVehicle((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                  />
                  <span>자동차</span>
                </RadioButton>
                <RadioButton>
                  <input
                    type="radio"
                    id="pm"
                    name="vehicle"
                    value="PM"
                    checked={selectedVehicle.type === "PM"}
                    onChange={(e) =>
                      setSelectedVehicle((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                  />
                  <span>개인형 이동수단</span>
                </RadioButton>
              </RadioGroup>
              <InputText
                type="text"
                placeholder="등록번호를 입력해주세요."
                value={selectedVehicle.number}
                onChange={(e) =>
                  setSelectedVehicle((prev) => ({
                    ...prev,
                    number: e.target.value,
                  }))
                }
              />
            </InputContainer>
            <Divider />
            <InputContainer>
              <Label>요일</Label>
              <DayList>
                {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                  <DayButton
                    key={day}
                    isSelected={selectedDay === day}
                    onClick={() => handleDaySelect(day)}
                  >
                    {day}
                  </DayButton>
                ))}
              </DayList>
            </InputContainer>
            <Divider />
            <InputContainer>
              <Label>시간대</Label>
              <TimeInputContainer>
                <input type="time" />
                <span>~</span>
                <input type="time" />
              </TimeInputContainer>
            </InputContainer>
          </MainContainer>
          <LongButton text="예약하기" onClick={handleButton} />
        </BetweenDiv>
      )}
      {isModalOpen && (
        <FetchVehicle
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSelectVehicle}
        />
      )}
    </ReserveContainer>
  );
};

export default ReservePage;
