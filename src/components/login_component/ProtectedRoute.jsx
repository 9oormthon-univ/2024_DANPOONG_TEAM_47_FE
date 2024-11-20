// ProtectedRoute.jsx
import React from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/authState";
import styled from "styled-components";
import Header from "../main_component/Header";
import Icons from "../../asset/Icons";

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
  const auth = useRecoilValue(authState);

  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const handleLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

    window.location.href = kakaoAuthURL;
  };

  // 인증 안된 경우 로그인 폼 보여주기.
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

  // 인증된 경우 이전 페이지 렌더링
  return element;
};

export default ProtectedRoute;
