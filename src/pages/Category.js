import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ComparisonList from '../components/ComparisonWidgets/ComparisonList';
import TitleAndOrder from '../components/TitleAndOrder';
import { getCategory } from '../store/slices/categorySlice';
import { setSearchCategory, getComparisons, resetSearchData } from '../store/slices/comparisonSlice';

function Category() {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const category = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getCategory(slug)).then(({ payload }) => {
      dispatch(resetSearchData(true));
      dispatch(setSearchCategory(payload.id));
      dispatch(getComparisons());
    });
  }, [slug]);

  return (
    <div className="row">
      <TitleAndOrder title={category.name} />
      <ComparisonList />
    </div>
  );
}

export default Category;
