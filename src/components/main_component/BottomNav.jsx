import styled from "styled-components";
import Icons from "../../asset/Icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavContainer = styled.div`
  width: 100%;
  padding: 6px 0;
  box-sizing: border-box;
  background-color: white;

  /* position: absolute;
  bottom: 0; */

  z-index: 5;

  box-shadow: 0px -3px 4px rgba(0, 0, 0, 0.25);
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 44px;
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    min-height: 19px;
    min-width: 19px;
    max-width: 24px;
    max-height: 24px;
    width: 5vw;
    height: 5vw;
  }
`;

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navIconColor = (path) =>
    location.pathname === path ? "#5874E9" : "black";
  return (
    <NavContainer>
      <Navigation>
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <IconContainer>
            <Icons.Home fill={navIconColor("/")} />
          </IconContainer>
        </Link>
        <Link
          to="/chats"
          onClick={(e) => {
            e.preventDefault();
            navigate("/chats");
          }}
        >
          <IconContainer>
            <Icons.Chat fill={navIconColor("/chats")} />
          </IconContainer>
        </Link>
        <Link
          to="/alarm"
          onClick={(e) => {
            e.preventDefault();
            navigate("/alarm");
          }}
        >
          <IconContainer>
            <Icons.Alarm fill={navIconColor("/alarm")} />
          </IconContainer>
        </Link>
        <Link
          to="/mypage"
          onClick={(e) => {
            e.preventDefault();
            navigate("/mypage");
          }}
        >
          <IconContainer>
            <Icons.User fill={navIconColor("/mypage")} />
          </IconContainer>
        </Link>
      </Navigation>
    </NavContainer>
  );
};

export default BottomNav;
