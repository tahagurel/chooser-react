import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetSearchData, getComparisons } from '../store/slices/comparisonSlice';
import TitleAndOrder from '../components/TitleAndOrder';
import ComparisonList from '../components/ComparisonWidgets/ComparisonList';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSearchData(true));
    dispatch(getComparisons());
  }, [dispatch]);

  return (
    <div>
      <TitleAndOrder />
      <ComparisonList />
    </div>
  );
}
