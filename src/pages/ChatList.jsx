import styled from "styled-components";
import Header from "../components/main_component/Header";
import LatePage from "../components/common/LatePage";

const ChatListContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;

  display: flex;
  flex-direction: column;
`;

const ChatList = () => {
  return (
    <ChatListContainer>
      <Header title="채팅" />
      <LatePage />
    </ChatListContainer>
  );
};

export default ChatList;
