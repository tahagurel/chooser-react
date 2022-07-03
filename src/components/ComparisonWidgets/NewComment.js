import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import AppButton from '../AppButton';
import { newComment } from '../../store/slices/comparisonSlice';

function NewComment({ comparisonId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const loading = useSelector((state) => state.comparison.commentLoading);
  function sendComment() {
    const formData = {
      comparisonId,
      comment,
    };
    dispatch(newComment(formData));
    setComment('');
  }

  return (
    <div className="card d-flex p-3 mt-2  shadow">
      <h6 className="border-bottom pb-2 mb-2 mb-0">
        Yorum Yap
      </h6>
      <div className="pb-3">
        <textarea
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Yazdıklarımıza dikkat edelim 💕"
        />
        <AppButton
          label="Paylaş"
          btnClass="btn-success btn-sm mt-2"
          divClass="d-grid"
          loadingLabel="Yükleniyor"
          loading={loading}
          disabled={comment.length < 10}
          onClick={() => sendComment()}
        />
      </div>
    </div>
  );
}

export default NewComment;
