import styled from "styled-components";
import Header from "../components/main_component/Header";
import { useLocation, useNavigate } from "react-router-dom";
import Icons from "../asset/Icons";

const MyPageContainer = styled.div`
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
  gap: clamp(40px, 13vw, 50px);
`;

const UserContainer = styled.div`
  width: 100;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserProfil = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  > p {
    font-size: clamp(15px, 4vw, 20px);
    font-weight: 900;
  }
`;

const ProfilImage = styled.div`
  width: clamp(45px, 13vw, 55px);
  height: clamp(45px, 13vw, 55px);

  background-color: #d9d9d9;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    width: 50%;
    height: 50%;
  }
`;

const Logout = styled.a`
  font-size: clamp(8px, 2vw, 12px);
  color: #a0a0a0;
  text-decoration: underline;
  text-underline-offset: clamp(1.5px, 0.5vw, 3px);
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 5vw, 24px);
`;

const NavSection = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(6px, 3vw, 16px);

  > svg {
    width: clamp(18px, 5vw, 24px);
    height: clamp(18px, 5vw, 24px);
  }
`;

const NavName = styled.div`
  font-size: clamp(15px, 4vw, 20px);
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > svg {
    height: 100%;
    width: clamp(5px, 1.9vw, 9px);
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const handleNav = (address) => {
    navigate(address);
  };
  return (
    <MyPageContainer>
      <Header title="마이페이지" />
      <MainContainer>
        <UserContainer>
          <UserProfil>
            <ProfilImage>
              <Icons.User fill="black" />
            </ProfilImage>
            <p>김민지</p>
          </UserProfil>
          <Logout>로그아웃</Logout>
        </UserContainer>
        <NavContainer>
          <NavSection>
            <Icons.Car />
            <NavName>
              <p>내 이동수단</p>
              <Icons.Arrow />
            </NavName>
          </NavSection>
          <NavSection
            onClick={() => {
              handleNav("/parks");
            }}
          >
            <Icons.Park />
            <NavName>
              <p>내 공유주차장</p>
              <Icons.Arrow />
            </NavName>
          </NavSection>
          <NavSection>
            <Icons.Review />
            <NavName>
              <p>내가 작성한 리뷰</p>
              <Icons.Arrow />
            </NavName>
          </NavSection>
          <NavSection>
            <Icons.Check />
            <NavName>
              <p>예약확인</p>
              <Icons.Arrow />
            </NavName>
          </NavSection>
        </NavContainer>
      </MainContainer>
    </MyPageContainer>
  );
};

export default MyPage;
