import styled from "styled-components";
import Header from "../components/main_component/Header";

const ChatListContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ChatList = () => {
  return (
    <ChatListContainer>
      <Header title="채팅" />
    </ChatListContainer>
  );
};

export default ChatList;
