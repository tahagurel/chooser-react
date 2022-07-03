import { useSelector } from 'react-redux';
import ComparisonSingle from './ComparisonSingle';
import LoadMoreButton from './LoadMoreButton';
import Loading from '../Loading';

function ComparisonList() {
  const comparisons = useSelector((state) => state.comparison.comparisons);
  const comparisonsLoading = false;
  // const comparisonsLoading = useSelector((state) => state.comparison.loading);
  return (
    <div className="row">
      {comparisonsLoading
        ? <Loading />
        : (
          <>
            {comparisons.map((item) => (
              <div key={item.id} className="col-md-3 mb-3 mb-4 col-12">
                <ComparisonSingle data={item} />
              </div>
            ))}
            <LoadMoreButton />
          </>
        )}
    </div>

  );
}

export default ComparisonList;
