import Moment from 'react-moment';
import 'moment/locale/tr';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AppButton from '../AppButton';
import { deleteComment } from '../../store/slices/comparisonSlice';

function Comment({ commentData }) {
  const dispatch = useDispatch();

  function deleteCommentFn() {
    const formData = {
      id: commentData.id,
      comparison_id: commentData.comparison_id,
    };

    dispatch(deleteComment(formData));
  }

  return (
    <div key={commentData.id} className="border-bottom">
      <div className="mb-0 text-muted pt-3">
        <img
          src={commentData.user.image}
          alt="user"
          width={40}
          height={40}
          className="bd-placeholder-img float-start flex-shrink-0 me-2 rounded"
        />

        <div className="pb-3 mb-0 small lh-sm">
          <div className="d-flex  justify-content-between">
            <Link to={`/uye/${commentData.user.id}`} className="link-dark text-decoration-none">
              <strong className="d-block text-gray-dark">{commentData.user.name}</strong>
            </Link>
            <strong className="d-block text-gray-dark">
              {!commentData.is_comment_mine_count
              || (
              <AppButton
                icon="bi-trash"
                btnClass="btn-xs btn-outline-dark"
                label="Sil"
                divClass="d-inline me-2"
                onClick={() => deleteCommentFn()}
              />
              )}
              <Moment
                locale="tr"
                fromNow
              >
                {commentData.created_at}
              </Moment>
            </strong>
          </div>
          {commentData.content}
        </div>
      </div>
    </div>
  );
}

export default Comment;
