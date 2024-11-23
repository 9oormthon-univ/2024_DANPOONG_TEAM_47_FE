import React, { useState } from "react";
import styled from "styled-components";
import HeaderWithBack from "../components/main_component/HeaderWithBack";
import Icons from "../asset/Icons";
import LongButton from "../components/common/LongButton";
import { useRecoilState } from "recoil";
import { isInputModalOpenState } from "../recoil/inputState";
import InputModalComponent from "../components/addpark_component/InputModalComponent";
import { getLatLngFromAddress } from "../api/addressAPI";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddParkContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;

  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  flex: 1;
  padding: clamp(22px, 6vw, 30px) 8%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: clamp(28px, 6vw, 36px);
  min-height: 0;
`;

const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 2vw, 8px);
`;

const Label = styled.p``;

const FileInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  width: 100%;
  height: clamp(90px, 28vw, 140px);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #eaeaea;
  background-size: cover;
  background-position: center;
  background-image: ${(props) =>
    props.image ? `url(${props.image})` : "none"};
  > svg {
    width: clamp(16px, 5vw, 24px);
    height: clamp(14px, 4vw, 20px);
  }
`;

const InputText = styled.input`
  width: 100%;
  height: clamp(34px, 10vw, 45px);
  border-radius: 8px;
  padding-left: clamp(10px, 3vw, 15px);
  background-color: #eaeaea;
  font-size: clamp(10px, 3vw, 14px);

  &::placeholder {
    color: #a8a8a8;
  }
`;

const InputTextArea = styled.textarea`
  border-radius: 8px;
  padding: clamp(10px, 3vw, 15px);
  background-color: #eaeaea;
  font-size: clamp(10px, 3vw, 14px);
  resize: none;
  width: 100%;
  min-height: 80px;
  max-height: 200px;
  overflow-y: auto;
`;

const AddPark = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useRecoilState(isInputModalOpenState);

  const [parkInfo, setParkInfo] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    description: "",
    rate: "",
    car_capacity: "",
    pm_capacity: "",
  });

  const [image, setImage] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);

  const handleChange = (field, value) => {
    setParkInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddAvailability = (newAvailability) => {
    setAvailabilities((prev) => [...prev, newAvailability]);
    setIsModalOpen(false);
  };

  const handleAddressBlur = async () => {
    try {
      const { lat, lng } = await getLatLngFromAddress(parkInfo.address);
      setParkInfo((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
      }));
    } catch (error) {
      console.error("위도/경도 가져오기 실패:", error);
    }
  };

  const handleInputImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // FileReader를 사용해 Base64로 변환
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Base64 데이터 추출
        setImage({
          file: file,
          preview: URL.createObjectURL(file), // 미리보기용 URL
          base64: base64String, // Base64 데이터
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddButton = async () => {
    const requestData = {
      request: {
        name: parkInfo.name || "",
        address: parkInfo.address || "",
        latitude: parseFloat(parkInfo.latitude) || 0,
        longitude: parseFloat(parkInfo.longitude) || 0,
        description: parkInfo.description || "",
        rate: parseFloat(parkInfo.rate) || 0,
        availabilities: availabilities.map((item) => ({
          day: item.day || "",
          start_time: item.start_time || "",
          end_time: item.end_time || "",
        })),
        car_capacity: parseInt(parkInfo.car_capacity, 10) || 0,
        pm_capacity: parseInt(parkInfo.pm_capacity, 10) || 0,
      },
      images: image ? [image.base64] : [],
    };

    console.log("주차장 등록 데이터:", JSON.stringify(requestData, null, 2)); // 확인용 로그

    try {
      const response = await axiosInstance.post(
        "/api/kongju/parking/register",
        requestData
      ); // POST 요청
      console.log("등록 성공:", response.data); // 성공 시 응답 데이터
      navigate(-1);
    } catch (error) {
      console.error("등록 실패:", error.response || error.message); // 실패 시 에러 처리
      alert("주차장 등록 중 문제가 발생했습니다. 다시 시도해주세요."); // 실패 메시지
    }
  };

  return (
    <AddParkContainer>
      <HeaderWithBack title="공유주차장등록" />
      <MainContainer>
        {/* 이미지 업로드 */}
        <InputItem>
          <Label>주차장 사진 및 토지대장 등록</Label>
          <FileInput
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleInputImage}
          />
          <UploadLabel
            htmlFor="file-upload"
            image={image ? image.preview : null}
          >
            {!image && <Icons.Image />}
          </UploadLabel>
        </InputItem>

        {/* 주차장 이름 */}
        <InputItem>
          <Label>주차공간 이름</Label>
          <InputText
            type="text"
            placeholder="주차장의 이름을 입력해주세요."
            value={parkInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </InputItem>

        {/* 주차장 주소 */}
        <InputItem>
          <Label>주차장 주소</Label>
          <InputText
            type="text"
            placeholder="주차장의 주소를 입력해주세요."
            value={parkInfo.address}
            onChange={(e) => handleChange("address", e.target.value)}
            onBlur={handleAddressBlur}
          />
        </InputItem>

        {/* 주차장 설명 */}
        <InputItem>
          <Label>주차공간 설명</Label>
          <InputTextArea
            rows={7}
            placeholder="주차장의 설명을 작성해주세요."
            value={parkInfo.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </InputItem>

        {/* 주차 가능한 요일/시간 */}
        <InputItem>
          <Label>주차 가능한 요일/시간</Label>
          <InputTextArea
            readOnly
            placeholder="주차 가능한 요일 및 시간을 추가해주세요."
            onClick={() => setIsModalOpen(true)}
            value={availabilities
              .map((a) => `${a.day} / ${a.start_time}~${a.end_time}`)
              .join("\n")}
          />
        </InputItem>

        {/* 주차 가능 대수 */}
        <InputItem>
          <Label>주차장 주소 가능 대 수</Label>
          <InputText
            type="number"
            placeholder="정보를 입력해주세요."
            value={parkInfo.car_capacity}
            onChange={(e) => handleChange("car_capacity", e.target.value)}
          />
        </InputItem>

        {/* 개인형 이동장치 가능 대수 */}
        <InputItem>
          <Label>개인형 이동장치 주차 가능 대 수</Label>
          <InputText
            type="number"
            placeholder="정보를 입력해주세요."
            value={parkInfo.pm_capacity}
            onChange={(e) => handleChange("pm_capacity", e.target.value)}
          />
        </InputItem>

        {/* 요금 */}
        <InputItem>
          <Label>30분당 요금</Label>
          <InputText
            type="number"
            placeholder="정보를 입력해주세요."
            value={parkInfo.rate}
            onChange={(e) => handleChange("rate", e.target.value)}
          />
        </InputItem>

        {/* 등록 버튼 */}
        <div style={{ marginTop: "24px" }}>
          <LongButton text="주차장 등록하기" onClick={handleAddButton} />
        </div>

        {/* 모달 */}
        {isModalOpen && (
          <InputModalComponent
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddAvailability}
          />
        )}
      </MainContainer>
    </AddParkContainer>
  );
};

export default AddPark;
