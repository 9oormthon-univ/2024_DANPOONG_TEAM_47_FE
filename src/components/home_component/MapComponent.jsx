import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import Icons from "../../asset/Icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ModalComponent from "./ModalComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedMarkerState, isModalOpenState } from "../../recoil/mapState";

// 오버레이 콘텐츠 스타일
const OverlayContent = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${(props) =>
    props.isSelected
      ? "translate(-50%, -70%) scale(1.5)"
      : "translate(-50%, -50%) scale(1)"};
  transition: transform 0.2s;

  svg {
    width: 22px;
    height: 30px;
  }
`;

const MapComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] =
    useRecoilState(selectedMarkerState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  // 더미 데이터
  const dummyMarkers = [
    {
      id: 1,
      lat: 33.55635,
      lng: 126.795841,
      name: "월정리 주차장",
      address: "성남시 분당구 동판교로31 123-2",
      rating: 4.5,
      price: 2000,
      car_capacity: 5,
      pm_capacity: 2,
      description: "월정리 주차장에 대한 설명",
      reviews: [
        {
          rating: 5,
          content: "주차장이 넓고 이용하기 편리해요.",
          nickname: "이진성",
          image: null,
        },
        {
          rating: 4,
          content: "가격이 저렴해서 좋아요!",
          nickname: "김민지",
          image: "https://img.hankyung.com/photo/202411/01.38670566.1.jpg",
        },
      ],
    },
    {
      id: 2,
      lat: 33.555,
      lng: 126.79585,
      name: "개인 주차장",
      address: "성남시 분당구 서판교로 123-2",
      rating: 3.8,
      price: 1500,
      car_capacity: 3,
      pm_capacity: 6,
      description: "개인 주차장에 대한 설명",
      reviews: [
        {
          rating: 3,
          content: "공간이 조금 좁아요.",
          nickname: "이진성",
          image: "https://img.hankyung.com/photo/202411/01.38670566.1.jpg",
        },
      ],
    },
    {
      id: 3,
      lat: 33.55645,
      lng: 126.795,
      name: "노인회관 주차장",
      address: "성남시 분당구 성심교로 123-2",
      rating: 4.9,
      price: 2500,
      car_capacity: 10,
      pm_capacity: 8,
      description: "노인회관 주차장에 대한 설명",
      reviews: [
        {
          rating: 5,
          content: "항상 깨끗하고 관리가 잘 되어 있어요.",
          nickname: "김민지",
          image: "https://img.hankyung.com/photo/202411/01.38670566.1.jpg",
        },
        {
          rating: 4,
          content: "혼잡할 때는 자리 찾기가 어려울 때가 있어요.",
          nickname: "이진성",
          image: "https://img.hankyung.com/photo/202411/01.38670566.1.jpg",
        },
      ],
    },
  ];

  useEffect(() => {
    setMarkers(dummyMarkers);
  }, []);

  // 마커 클릭 핸들러
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setIsModalOpen(true);
    if (location.pathname === "/" || location.pathname === "/search") {
      navigate(`${marker.id}/reserve`);
    } else {
      navigate(`${marker.id}/reserve`, { replace: true });
    }
  };

  const handleMapClick = () => {
    setIsModalOpen(false);
    setSelectedMarker(null);
    if (location.pathname !== "/" && location.pathname !== "/search") {
      navigate(-1);
    }
  };

  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}
      disableClickZoom={true} // 클릭 시 줌 방지
      onClick={handleMapClick}
    >
      {markers.map((marker) => (
        <CustomOverlayMap
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          clickable={true} // 클릭 가능하도록 설정
        >
          <OverlayContent
            onClick={() => handleMarkerClick(marker)}
            isSelected={selectedMarker?.id === marker.id}
          >
            <Icons.Mark />
          </OverlayContent>
        </CustomOverlayMap>
      ))}

      {/* 모달 표시 */}
      {isModalOpen && selectedMarker && (
        <ModalComponent
          isOpen={isModalOpen}
          marker={selectedMarker}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Map>
  );
};

export default MapComponent;
