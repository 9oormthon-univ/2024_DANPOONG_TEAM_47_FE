import styled from "styled-components";
import Header from "../components/main_component/Header";

const AlarmContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Alarms = () => {
  return (
    <AlarmContainer>
      <Header title="알림" />
    </AlarmContainer>
  );
};

export default Alarms;
