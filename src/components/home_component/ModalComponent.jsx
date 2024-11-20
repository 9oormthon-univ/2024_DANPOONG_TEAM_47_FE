import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RatingStar from "./RatingStar";
import Icons from "../../asset/Icons";
import { Link, Outlet, useNavigate } from "react-router-dom";

const ModalContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 55%;
  background-color: white;
  border-radius: 23px 23px 0 0;
  padding: 8% 8% 0 8%;
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

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h2 {
    font-size: clamp(0.9rem, 4vw, 1.1rem);
  }

  p {
    font-size: clamp(0.6rem, 3vw, 0.8rem);
    color: #a8a8a8;
  }
`;

const ChatIcon = styled.div`
  cursor: pointer;
  padding-top: 2px;
  > svg {
    fill: black;
    width: clamp(19px, 5vw, 22px);
    height: clamp(19px, 5vw, 22px);
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  border: 0.5px solid #5874e9;
  height: clamp(30px, 10vw, 40px);
  border-radius: clamp(20px, 8vw, 30px);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 8% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ButtonFlex = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const Highlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 33.33%;
  height: 100%;
  background: linear-gradient(90deg, #5874e9 0%, #6e54e9 100%);
  border-radius: clamp(20px, 8vw, 30px);
  z-index: 8;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  transform: ${(props) =>
    props.selected === "reserve"
      ? "translateX(0%)"
      : props.selected === "review"
      ? "translateX(100%)"
      : "translateX(200%)"};
`;

const ButtonWrap = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: clamp(12px, 3.5vw, 14px);
  color: ${(props) => (props.isSelected ? "white" : "black")};
  z-index: 9;
`;

const BottomSheet = ({ isOpen, marker }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState("reserve");
  const navigate = useNavigate();

  // isOpen 상태가 변경될 때 애니메이션 적용
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // 버튼 클릭 핸들러
  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
    navigate(`${marker.id}/${buttonType}`, { replace: true });
  };

  const handleChatClick = () => {
    navigate(`/chat/${marker.id}`, {
      state: {
        parkName: marker.name,
      },
    });
  };

  return (
    <ModalContainer isVisible={isVisible}>
      <ModalContent>
        <ModalHeader>
          <HeaderLeft>
            <h2>{marker.name}</h2>
            <p>{marker.address}</p>
            <RatingStar rating={marker.rating} />
          </HeaderLeft>
          <ChatIcon onClick={handleChatClick}>
            <Icons.Chat />
          </ChatIcon>
        </ModalHeader>
        <ButtonContainer>
          <ButtonFlex>
            <Highlight selected={selectedButton} />
            <ButtonWrap
              isSelected={selectedButton === "reserve"}
              onClick={() => handleButtonClick("reserve")}
            >
              <p>예약</p>
            </ButtonWrap>
            <ButtonWrap
              isSelected={selectedButton === "review"}
              onClick={() => handleButtonClick("review")}
            >
              <p>리뷰</p>
            </ButtonWrap>
            <ButtonWrap
              isSelected={selectedButton === "info"}
              onClick={() => handleButtonClick("info")}
            >
              <p>정보</p>
            </ButtonWrap>
          </ButtonFlex>
        </ButtonContainer>
        <Outlet context={{ marker }} />
      </ModalContent>
    </ModalContainer>
  );
};

export default BottomSheet;
