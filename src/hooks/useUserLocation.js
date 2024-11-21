import { useState, useEffect } from "react";

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState({
    lat: 37.5665, // 기본값: 서울 위도
    lng: 126.978, // 기본값: 서울 경도
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.warn("위치를 가져올 수 없습니다:", err.message);
          setError(err);
        }
      );
    } else {
      setError("브라우저가 위치 서비스를 지원하지 않습니다.");
    }
  }, []);

  return { userLocation, error };
};

export default useUserLocation;
