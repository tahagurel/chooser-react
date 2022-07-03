import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ComparisonList from '../components/ComparisonWidgets/ComparisonList';
import TitleAndOrder from '../components/TitleAndOrder';
import { setSearchUser, getComparisons, resetSearchData } from '../store/slices/comparisonSlice';
import { getUser } from '../store/slices/userSlice';

function Category() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getUser(id)).then(({ payload }) => {
      dispatch(resetSearchData(true));
      dispatch(setSearchUser(payload.id));
      dispatch(getComparisons());
    });
  }, [id]);

  return (
    <div className="row">
      <TitleAndOrder title={user.name} />
      <ComparisonList />
    </div>
  );
}

export default Category;
