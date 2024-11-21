import styled from "styled-components";
import HeaderWithBack from "../components/main_component/HeaderWithBack";
import { useLocation } from "react-router-dom";

const ChatPageContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ChatPage = () => {
  const location = useLocation();
  return (
    <ChatPageContainer>
      <HeaderWithBack title={location.state?.parkName} />
    </ChatPageContainer>
  );
};

export default ChatPage;
