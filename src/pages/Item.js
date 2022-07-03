import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ComparisonList from '../components/ComparisonWidgets/ComparisonList';
import TitleAndOrder from '../components/TitleAndOrder';
import { setSearchItem, getComparisons, resetSearchData } from '../store/slices/comparisonSlice';

function Item() {
  const { slug } = useParams();

  const itemName = useSelector((state) => state.comparison.itemName);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSearchData(true));
    dispatch(setSearchItem(slug));
    dispatch(getComparisons());
  }, [slug]);

  return (
    <div className="row">
      <TitleAndOrder title={itemName} />
      <ComparisonList />
    </div>
  );
}

export default Item;
