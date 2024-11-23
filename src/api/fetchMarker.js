import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { mapCenterState } from "../recoil/mapState";
import { authState } from "../recoil/authState";

const useParkingData = () => {
  const mapCenter = useRecoilValue(mapCenterState); // 중심 좌표 상태
  const userId = useRecoilValue(authState)?.user?.id;
  const [markers, setMarkers] = useState([]);
  const [debouncedCenter, setDebouncedCenter] = useState(mapCenter); // 딜레이된 중심 좌표

  // 중심 좌표 변경 시 딜레이 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCenter(mapCenter); // 딜레이 후 중심 좌표 업데이트
    }, 500); // 500ms 딜레이

    return () => clearTimeout(timer); // 이전 타이머 클리어
  }, [mapCenter]);

  // API 데이터를 가공하는 함수
  const processParkingData = (apiData) => {
    return apiData.map((item) => ({
      id: item.parking.id,
      lat: item.parking.latitude,
      lng: item.parking.longitude,
      name: item.parking.name,
      address: item.parking.address,
      rating: 4.5,
      price: item.parking.rate,
      car_capacity: item.parking.carCapacity,
      pm_capacity: item.parking.pmCapacity,
      description: item.parking.description,
      reviews: [],
      image: item.images[0]?.imageUrl || null,
    }));
  };

  // API 호출
  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/kongju/parking/nearby?memberId=${userId}`,
          {
            params: {
              latitude: debouncedCenter.lat,
              longitude: debouncedCenter.lng,
              radius: 0.5, // 반경 500m
            },
          }
        );
        const processedData = processParkingData(response.data);
        setMarkers(processedData);
      } catch (error) {
        console.error("주차장 데이터를 가져오는데 실패했습니다:", error);
      }
    };

    fetchParkingData();
  }, [debouncedCenter]); // 딜레이된 중심 좌표 변경 시 호출

  return markers;
};

export default useParkingData;
