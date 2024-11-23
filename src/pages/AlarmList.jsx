import styled from "styled-components";
import Header from "../components/main_component/Header";
import LatePage from "../components/common/LatePage";

const AlarmContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;

  display: flex;
  flex-direction: column;
`;

const Alarms = () => {
  return (
    <AlarmContainer>
      <Header title="알림" />
      <LatePage />
    </AlarmContainer>
  );
};

export default Alarms;
