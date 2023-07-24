import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fab } from '@mui/material';
import { PropTypes } from 'prop-types';
import createLike, { editLike, deleteLike } from '../../redux/likes/LikesReducer';

export default function ShowLikes(props) {
  const { likes: allLikes, reviewId, contractorId } = props;
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeColor, setLikeColor] = useState('default');
  const [dislikeColor, setDislikeColor] = useState('default');
  const [userLikeId, setUserLikeId] = useState(0);
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
    setLikeColor('default');
    setDislikeColor('default');
    allLikes.forEach((opinion) => {
      if (opinion.user_id === userId) {
        setUserLikeId(opinion.id);
        if (opinion.like) {
          setLikeColor('info');
        } else {
          setDislikeColor('info');
        }
      }
    });
  }, [userId, allLikes]);

  const handleLike = () => {
    if (likeColor === 'info') {
      deleteLike(userLikeId, dispatch, contractorId);
    } else if (dislikeColor === 'info') {
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
    if (dislikeColor === 'info') {
      deleteLike(userLikeId, dispatch, contractorId);
    } else if (likeColor === 'info') {
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
        <Fab
          color={likeColor}
          onClick={handleLike}
        >
          Like
        </Fab>
        <span>{likes}</span>
      </span>
      <span>
        <Fab
          color={dislikeColor}
          onClick={handleDislike}
        >
          Dislike
        </Fab>
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
