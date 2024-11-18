import { useOutletContext } from "react-router-dom";
import RatingStar from "./RatingStar";
import styled from "styled-components";

const ReviewContainer = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const ReviewItem = styled.div`
  padding: 3%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-bottom: 1px solid #e7e7e7;

  > p {
    font-size: clamp(10px, 3vw, 12px);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  > p {
    font-size: clamp(12px, 3vw, 14px);
  }
`;

const ReviewInModal = () => {
  const { marker } = useOutletContext();
  return (
    <ReviewContainer>
      {marker?.reviews?.length > 0 ? (
        marker.reviews.map((review) => (
          <ReviewItem key={review.review_id}>
            <ReviewHeader>
              <p>{review.nickname}</p>
              <RatingStar rating={marker.rating} />
            </ReviewHeader>
            <p>{review.content}</p>
          </ReviewItem>
        ))
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
    </ReviewContainer>
  );
};

export default ReviewInModal;
