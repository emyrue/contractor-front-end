import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ThumbUpAlt, ThumbUpOffAlt, ThumbDownAlt, ThumbDownOffAlt,
} from '@mui/icons-material';
import { PropTypes } from 'prop-types';
import createLike, { editLike, deleteLike } from '../../redux/likes/LikesReducer';
import '../../styles/likeButtons.css';

export default function ShowLikes(props) {
  const { likes: allLikes, reviewId, contractorId } = props;
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userLikeId, setUserLikeId] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const userId = useSelector((state) => state.user.user.id);

  useEffect(() => {
    setLikes(0);
    setDislikes(0);
    allLikes.forEach((opinion) => {
      if (opinion.like) {
        setLikes((likes) => likes + 1);
      } else {
        setDislikes((dislikes) => dislikes + 1);
      }
    });
  }, [allLikes]);

  useEffect(() => {
    setLiked(false);
    setDisliked(false);
    allLikes.forEach((opinion) => {
      if (opinion.user_id === userId) {
        setUserLikeId(opinion.id);
        if (opinion.like) {
          setLiked(true);
        } else {
          setDisliked(true);
        }
      }
    });
  }, [userId, allLikes]);

  const handleLike = () => {
    if (liked) {
      deleteLike(userLikeId, dispatch, contractorId);
    } else if (disliked) {
      editLike({
        id: userLikeId,
        like: {
          like: true,
        },
      }, dispatch, contractorId);
    } else {
      createLike({
        like: {
          user_id: userId,
          review_id: reviewId,
          like: true,
        },
      }, dispatch, contractorId);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      deleteLike(userLikeId, dispatch, contractorId);
    } else if (liked) {
      editLike({
        id: userLikeId,
        like: {
          like: false,
        },
      }, dispatch, contractorId);
    } else {
      createLike({
        like: {
          user_id: userId,
          review_id: reviewId,
          like: false,
        },
      }, dispatch, contractorId);
    }
  };

  return (
    <footer>
      <span>
        <button
          className="like-dislike-button"
          type="button"
          onClick={handleLike}
        >
          { liked && <ThumbUpAlt /> }
          { !liked && <ThumbUpOffAlt /> }
        </button>
        <span>{likes}</span>
      </span>
      <span>
        <button
          className="like-dislike-button"
          type="button"
          onClick={handleDislike}
        >
          { disliked && <ThumbDownAlt /> }
          { !disliked && <ThumbDownOffAlt /> }
        </button>
        <span>{dislikes}</span>
      </span>
    </footer>
  );
}

ShowLikes.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.shape({
    like: PropTypes.bool.isRequired,
    user_id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  reviewId: PropTypes.number.isRequired,
  contractorId: PropTypes.number.isRequired,
};
