import styled from "styled-components";
import MapComponent from "../components/home_component/MapComponent";
import Icons from "../asset/Icons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import { selectedMarkerState, isModalOpenState } from "../recoil/mapState";
import { mapCenterState } from "../recoil/mapState"; // 지도 중심 상태 추가

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
  position: relative;
`;

const SearchHeader = styled.div`
  position: absolute;
  width: 100%;
  padding: 58px 5% 16px 5%;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  z-index: 5;

  input {
    height: 5.5vh;
    min-height: 2rem;
    width: 100%;
    border-radius: 5px;
    padding: 0 12% 0 10px;
    background-color: #e7e7e7;
    padding-left: 15%;
    font-size: clamp(12px, 1.8vh, 16px);
    line-height: 100%;
    -webkit-appearance: none;
  }

  input::placeholder {
    color: #a0a0a0;
    font-size: clamp(12px, 1.8vh, 16px);
    line-height: 20px;
    -webkit-transform: translateY(1px);
  }
`;

const Back = styled.div`
  position: absolute;
  width: 18px;
  height: 5.5vh;
  min-height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  cursor: pointer;

  svg {
    height: 100%;
    width: 2vw;
    min-width: 7px;
    max-width: 9px;
  }
`;

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const [selectedMarker, setSelectedMarker] =
    useRecoilState(selectedMarkerState);
  const [mapCenter, setMapCenter] = useRecoilState(mapCenterState); // 지도 중심 상태
  const inputRef = useRef(null);

  // 페이지 진입 시 Recoil 상태 초기화 및 Input Focus
  useEffect(() => {
    setIsModalOpen(false);
    setSelectedMarker(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleBack = () => {
    setIsModalOpen(false);
    setSelectedMarker(null);
    navigate(-1);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // Kakao API를 통해 주소 검색
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(searchQuery, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const newCenter = {
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        };

        // 지도 중심을 새 좌표로 이동
        setMapCenter(newCenter);
      } else {
      }
    });
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <Back onClick={handleBack}>
          <Icons.Back />
        </Back>
        <input
          ref={inputRef}
          type="text"
          placeholder="주소 혹은 장소를 입력해주세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Enter 키로 검색
        />
      </SearchHeader>
      <MapComponent />
    </SearchContainer>
  );
};

export default Search;
