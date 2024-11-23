import styled from "styled-components";
import HeaderWithBack from "../components/main_component/HeaderWithBack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/authState";

const MyParkContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;

  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  flex: 1;
  padding: clamp(22px, 6vw, 30px) 8%;

  display: flex;
  flex-direction: column;
  gap: clamp(22px, 6vw, 30px);
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const AddParkButton = styled.div`
  padding: clamp(6px, 2vw, 10px);
  color: white;
  border-radius: 8px;
  font-size: clamp(8px, 2vw, 12px);
  background-color: #5874e9;
  cursor: pointer;
`;

const ParkList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const ParkContainer = styled.li`
  background-color: #ffffff;
  padding: 11px 13px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  > strong {
    font-size: clamp(10px, 3vw, 14px);
    font-weight: 600;
  }

  > p {
    font-size: clamp(7px, 2vw, 10px);
    color: #a8a8a8;
  }
`;

const ParkImage = styled.div`
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: clamp(60px, 18vw, 80px);
  border-radius: 8px;
  margin-bottom: clamp(10px, 3vw, 14px);
`;

const MyPark = () => {
  const auth = useRecoilValue(authState);
  const userId = auth?.user?.id;
  const [parkData, setParkData] = useState([]);
  const navigate = useNavigate();
  const handleNav = (address) => {
    navigate(address);
  };

  useEffect(() => {
    const fetchParkData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/kongju/parking/my?memberId=${userId}`
        );

        const extractedData = response.data.map((park) => ({
          id: park.parking.id,
          name: park.parking.name,
          address: park.parking.address,
          image: park.images[0].imageUrl,
        }));

        console.log(extractedData);

        setParkData(extractedData);
      } catch (error) {
        console.log("데이터를 가져오는데 실패했습니다.", error);
      }
    };

    fetchParkData();
  }, []);

  return (
    <MyParkContainer>
      <HeaderWithBack title="내 공유주차장" />
      <MainContainer>
        <ButtonContainer>
          <AddParkButton onClick={() => handleNav("new")}>
            주차장 등록하기
          </AddParkButton>
        </ButtonContainer>
        <ParkList>
          {parkData.map((park, index) => (
            <ParkContainer key={index}>
              <ParkImage image={park.image}></ParkImage>
              <strong>{park.name}</strong>
              <p>{park.address}</p>
            </ParkContainer>
          ))}
        </ParkList>
      </MainContainer>
    </MyParkContainer>
  );
};

export default MyPark;
