import styled from "styled-components";
import LongButton from "../common/LongButton";
import { useNavigate, useOutletContext } from "react-router-dom";

const ReserveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  height: 100%;
  padding-bottom: 10%;
`;

const ReserveContent = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 0 3%;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: clamp(12px, 3vw, 14px);
`;

const ReserveModal = () => {
  const { marker } = useOutletContext();
  const navigate = useNavigate();

  const handleReserveButton = () => {
    navigate(`/parks/reserve/${marker.id}`, { state: { marker } });
  };
  return (
    <ReserveContainer>
      <ReserveContent>
        <Content>
          <strong>주차 가능 대수</strong>
          <p>
            {marker &&
              `${String(marker.pm_capacity).padStart(2, "0")} / ${String(
                marker.car_capacity
              ).padStart(2, "0")}`}
          </p>
        </Content>
        <Content>
          <strong>이용 요금(30분)</strong>
          <p>{marker && marker.price}원</p>
        </Content>
      </ReserveContent>
      <LongButton text="예약하기" onClick={handleReserveButton} />
    </ReserveContainer>
  );
};

export default ReserveModal;
