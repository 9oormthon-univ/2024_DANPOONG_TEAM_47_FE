import styled from "styled-components";
import Header from "../components/main_component/Header";
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
      <Header title={location.state?.parkName} />
    </ChatPageContainer>
  );
};

export default ChatPage;
