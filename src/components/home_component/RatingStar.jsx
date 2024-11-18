import React from "react";
import Icons from "../../asset/Icons";
import styled from "styled-components";

const RatingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1px;

  svg {
    width: clamp(12px, 3vw, 16px);
    height: clamp(12px, 3vw, 16px);
  }
`;

const Rate = styled.div`
  margin-left: 5px;
  font-size: clamp(13px, 4vw, 1rem);
  color: #5874e9;
`;

const RatingStar = ({ rating }) => {
  return (
    <RatingContainer>
      {Array.from({ length: 5 }, (_, i) => {
        // i번째 별이 채워져야 하는 경우
        if (i + 1 <= rating) {
          // 정수 부분은 파란색으로 채움
          return <Icons.Star key={i} fill="#5874E9" />;
        }
        // 정수 부분 이후의 별은 회색으로 표시
        return <Icons.Star key={i} fill="#E7E7E7" />;
      })}
      <Rate>{rating}</Rate>
    </RatingContainer>
  );
};

export default RatingStar;
