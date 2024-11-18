import styled from "styled-components";
import MapComponent from "../components/home_component/MapComponent";
import Icons from "../asset/Icons";
import { useNavigate } from "react-router-dom";

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 4;
  width: 100%;

  padding: 58px 5% 16px 5%;

  input {
    height: 5.5vh;
    min-height: 2rem;
    width: 100%;
    border-radius: 5px;
    padding: 0 12% 0 10px;

    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.25);
  }

  svg {
    height: 5.5vh;
    min-height: 2rem;
    width: 3.5vw;
    min-width: 16px;
    max-width: 20px;

    position: absolute;
    top: 58px;
    right: 10%;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <MapContainer>
      <SearchContainer>
        <input
          type="text"
          onFocus={(e) => {
            e.target.blur();
          }}
          onClick={handleSearchClick}
        />
        <Icons.Search />
      </SearchContainer>
      <MapComponent />
    </MapContainer>
  );
};

export default Home;
