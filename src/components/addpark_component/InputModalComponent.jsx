import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isInputModalOpenState } from "../../recoil/inputState";
import LongButton from "../common/LongButton";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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
  z-index: 7;
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DayButton = styled.button`
  width: clamp(30px, 9vw, 40px);
  height: clamp(30px, 9vw, 40px);
  border-radius: 50%;
  border: 1px solid ${(props) => (props.isSelected ? "#5874e9" : "#ccc")};
  background-color: ${(props) => (props.isSelected ? "#5874e9" : "white")};
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
  gap: 8px;

  input {
    width: 100px;
    height: 40px;
    border: 0.5px solid #5874e9;
    padding: 0 clamp(6px, 2vw, 12px);
    font-size: clamp(13px, 4vw, 16px);
    flex: 1;
  }

  span {
    font-size: 18px;
    font-weight: bold;
  }
`;

const Label = styled.p`
  font-size: clamp(13px, 4vw, 16px);
  font-weight: 600;
`;

const DayList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputModalComponent = ({ onSave }) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isInputModalOpenState);
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // 요일 버튼 선택 처리
  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  // 외부 클릭 시 모달 닫기
  const handleOverlayClick = () => {
    setIsModalOpen(false);
  };

  // 저장 버튼 클릭 처리
  const handleSave = () => {
    if (selectedDay && startTime && endTime) {
      onSave({ day: selectedDay, start_time: startTime, end_time: endTime });
      setIsModalOpen(false);
    } else {
      alert("모든 값을 입력해주세요!");
    }
  };

  return (
    <>
      <Overlay isVisible={isModalOpen} onClick={handleOverlayClick} />
      <ModalContainer isVisible={isModalOpen}>
        <ModalContent>
          <InputContent>
            <Section>
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
            </Section>
            <Section>
              <Label>시간대</Label>
              <TimeInputContainer>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <span>~</span>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </TimeInputContainer>
            </Section>
          </InputContent>

          <LongButton text="추가하기" onClick={handleSave} />
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default InputModalComponent;
