import axios from "axios";

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY; // 카카오 REST API Key

/**
 * 주소로 위도와 경도를 가져오는 함수
 * @param {string} address - 주소 입력
 * @returns {Promise<Object>} - 위도(lat)와 경도(lng)
 */
export const getLatLngFromAddress = async (address) => {
  try {
    const response = await axios.get(
      "https://dapi.kakao.com/v2/local/search/address.json",
      {
        params: {
          query: address,
        },
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    if (response.data.documents.length > 0) {
      const { x: lng, y: lat } = response.data.documents[0];
      return { lat, lng };
    } else {
      throw new Error("주소를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("주소 검색 오류:", error);
    throw error;
  }
};
