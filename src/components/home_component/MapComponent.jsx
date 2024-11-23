import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import Icons from "../../asset/Icons";
import styled from "styled-components";
import { redirect, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  selectedMarkerState,
  isModalOpenState,
  mapCenterState,
} from "../../recoil/mapState";
import useParkingData from "../../api/fetchMarker";
import ModalComponent from "./ModalComponent";
import useUserLocation from "../../hooks/useUserLocation";
import { useEffect } from "react";

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
  const [mapCenter, setMapCenter] = useRecoilState(mapCenterState); // 지도 중심 좌표 상태
  const [selectedMarker, setSelectedMarker] =
    useRecoilState(selectedMarkerState); // 선택된 마커 상태
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState); // 모달 상태
  const markers = useParkingData(); // 딜레이 적용된 마커 데이터
  const { userLocation, error } = useUserLocation(); // 사용자 위치 가져오기

  // 초기 지도 중심 좌표 설정
  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation); // 사용자 위치로 지도 중심 설정
    } else if (error) {
      console.warn(
        "사용자 위치를 가져오지 못했습니다. 기본 좌표를 사용합니다."
      );
      setMapCenter({ lat: 37.5665, lng: 126.978 }); // 기본값: 서울
    }
  }, [userLocation]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker); // 선택된 마커 설정
    setIsModalOpen(true); // 모달 열기
    navigate(`${marker.id}/reserve`, { replace: true });
  };

  const handleMapClick = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedMarker(null); // 선택된 마커 초기화
  };

  const handleCenterChanged = (map) => {
    const newCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };
    setMapCenter(newCenter); // 중심 좌표 업데이트
  };

  return (
    <Map
      center={mapCenter}
      style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}
      disableClickZoom={true} // 클릭 시 줌 방지
      onClick={handleMapClick} // 맵 클릭 핸들러
      onCenterChanged={handleCenterChanged} // 중심 좌표 변경 핸들러
    >
      {markers.map((marker) => (
        <CustomOverlayMap
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          clickable={true}
        >
          <OverlayContent
            onClick={() => handleMarkerClick(marker)}
            isSelected={selectedMarker?.id === marker.id}
          >
            <Icons.Mark />
          </OverlayContent>
        </CustomOverlayMap>
      ))}

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
