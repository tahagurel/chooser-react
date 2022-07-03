import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ComparisonSingle from '../components/ComparisonWidgets/ComparisonSingle';
import Loading from '../components/Loading';
import { getComparison } from '../store/slices/comparisonSlice';
import Creator from '../components/ComparisonWidgets/Creator';
import Comment from '../components/ComparisonWidgets/Comment';
import NewComment from '../components/ComparisonWidgets/NewComment';

function Comparison() {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const comparison = useSelector((state) => state.comparison.comparison);
  const loadingComparison = useSelector((state) => state.comparison.loading);

  useEffect(() => {
    dispatch(getComparison(slug));
  }, [slug]);

  return (
    <div>
      {loadingComparison
        ? <Loading />
        : (
          <div className="row">
            <h1 className="display-6">{comparison.title}</h1>
            <div className="col-md-4 mb-3">
              <ComparisonSingle hideTitle data={comparison} />
              <Creator data={comparison.creator} />
              <NewComment comparisonId={comparison.id} />
            </div>
            <div className="col-md-8">
              <div className="card mb-0 p-3 bg-body  shadow">
                <h6 className="border-bottom pb-2 mb-0">
                  Yorumlar (
                  {comparison?.comments?.length}
                  )
                </h6>
                {!comparison?.comments?.length
                  ? (
                    <div className="alert alert-warning mt-3">
                      Hiç yorum yapılmamış. İlk yorumu sen yap!
                    </div>
                  )
                  : comparison?.comments?.map((comment) => (
                    <Comment key={comment.id} commentData={comment} />
                  )) }

              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Comparison;
