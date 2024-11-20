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
      <p>채팅목록 페이지</p>
    </ChatListContainer>
  );
};

export default ChatList;
