import styled from "styled-components";
import HeaderWithBack from "../components/main_component/HeaderWithBack";
import { useLocation } from "react-router-dom";
import LatePage from "../components/common/LatePage";

const ChatPageContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;

  display: flex;
  flex-direction: column;
`;

const ChatPage = () => {
  const location = useLocation();
  return (
    <ChatPageContainer>
      <HeaderWithBack title={location.state?.parkName} />
      <LatePage />
    </ChatPageContainer>
  );
};

export default ChatPage;
