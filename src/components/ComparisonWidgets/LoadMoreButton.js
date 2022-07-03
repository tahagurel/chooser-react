import { useSelector, useDispatch } from 'react-redux';
import AppButton from '../AppButton';
import { loadMore, noMoreData } from '../../store/slices/comparisonSlice';

function LoadMoreButton() {
  const dispatch = useDispatch();
  const loadMoreLoading = useSelector((state) => state.comparison.searchLoading);
  const isLoadMoreData = useSelector(noMoreData);
  return (
    <div>
      {isLoadMoreData
      || (
      <AppButton
        label="Daha Fazla"
        btnClass="btn-outline-dark mb-5"
        divClass="d-grid"
        loadingClass="text-dark"
        loadingLabel="Yükleniyor"
        loading={loadMoreLoading}
        onClick={() => dispatch(loadMore())}
      />
      )}
    </div>
  );
}

export default LoadMoreButton;
