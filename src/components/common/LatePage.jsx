import styled from "styled-components";
import Icons from "../../asset/Icons";

const LatePageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(8px, 2vw, 10px);

  > svg {
    width: clamp(26px, 15vw, 32px);
    height: clamp(26px, 15vw, 32px);
  }

  > strong {
    font-size: clamp(13px, 3vw, 16px);
    font-weight: 600;
    color: #5874e9;
  }

  > p {
    font-size: clamp(10px, 2vw, 13px);
    color: #a8a8a8;
  }
`;

const LatePage = () => {
  return (
    <LatePageContainer>
      <MainContainer>
        <Icons.Alert />
        <strong>서비스 준비중 입니다</strong>
        <p>더 나은 기능을 제공하기 위해 준비중 입니다</p>
      </MainContainer>
    </LatePageContainer>
  );
};

export default LatePage;
