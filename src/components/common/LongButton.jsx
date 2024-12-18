import styled from "styled-components";

const Button = styled.div`
  height: clamp(35px, 11vw, 48px);
  color: white;
  border-radius: clamp(8px, 2vw, 12px);
  background-color: #5874e9;
  font-size: clamp(13px, 4vw, 15px);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LongButton = ({ text, onClick }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default LongButton;
