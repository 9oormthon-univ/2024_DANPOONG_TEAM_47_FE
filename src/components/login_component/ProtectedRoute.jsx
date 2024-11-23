import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../recoil/authState";
import styled from "styled-components";
import Header from "../main_component/Header";
import Icons from "../../asset/Icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;

  display: flex;
  flex-direction: column;
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 0 8%;
  justify-content: center;
  align-items: center;
`;

const LoginMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  > p {
    color: #a8a8a8;
    font-size: clamp(10px, 2.5vw, 12px);
  }
`;

const LoginButton = styled.div`
  width: 100%;
  background-color: #fee404;
  padding: clamp(10px, 2.5vw, 12px) 0;
  font-size: clamp(13px, 3vw, 15px);
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  > svg {
    width: clamp(15px, 4vw, 18px);
    height: clamp(15px, 4vw, 18px);
  }
`;

const ProtectedRoute = ({ element, pageName, service }) => {
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  const handleLogin = () => {
    const loginUrl = "http://15.165.207.232:8080/api/kongju/login"; // 백엔드가 제공한 URL
    window.location.href = loginUrl; // 브라우저에서 URL로 이동
  };

  // 인증되지 않은 경우 로그인 화면 표시
  if (!auth.isAuthenticated) {
    return (
      <ProtectedContainer>
        <Header title={pageName} />
        <LoginContainer>
          <LoginMain>
            <LoginButton onClick={handleLogin}>
              <Icons.Kakao />
              <p>카카오로 시작하기</p>
            </LoginButton>
            <p>로그인을 시작하고 {service} 기능을 사용해보세요</p>
          </LoginMain>
        </LoginContainer>
      </ProtectedContainer>
    );
  }

  // 인증된 경우 리턴할 요소 표시
  return element;
};

export default ProtectedRoute;
