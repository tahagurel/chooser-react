import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useVote } from '../../store/slices/comparisonSlice';
import AppButton from '../AppButton';

function ComparisonSingle({ data, hideTitle }) {
  function percentage(vote) {
    const totalVote = data.first_item_votes_count + data.second_item_votes_count;
    return !totalVote ? 50 : Math.round((100 * vote) / totalVote);
  }

  const dispatch = useDispatch();
  const voteLoading = useSelector((state) => state.comparison.voteLoading);

  async function useVoteFunction(comparisonId, itemId) {
    const formData = { comparison_id: comparisonId, item_id: itemId };
    dispatch(useVote(formData));
  }

  return (
    <div className="card shadow-sm">
      <div className="">
        {hideTitle
        || (
          <div>
            <h6 className="card-title mt-2 text-center">
              <Link className="link-dark text-decoration-none" to={`/karsilasma/${data?.slug}`}>
                {data?.title}
              </Link>
            </h6>
            <hr className="mb-1 mt-2" />
          </div>
        )}

        <div className="row p-2">
          <div className="col-6">
            <img
              src={data?.first_item?.image}
              className="w-100 h-100 rounded"
              width={500}
              height={500}
              alt="elma"
            />

          </div>
          <div className="col-6">
            <img
              src={data?.second_item?.image}
              className="w-100 h-100 rounded"
              width={500}
              height={500}
              alt="elma"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="card-title fw-bold text-center ms-1 mb-1">
              <Link className="link-dark text-decoration-none" to={`/${data?.first_item?.slug}`}>{data?.first_item?.name}</Link>
            </div>
            <div className="text-center">
              <AppButton
                icon={`me-1 ${data?.am_i_use_vote?.item_id === data?.first_item?.id ? 'bi-heart-fill text-danger' : 'bi-heart'}`}
                btnClass="btn-xs btn-outline-dark"
                label={data.first_item_votes_count}
                disabled={voteLoading}
                onClick={() => useVoteFunction(data?.id, data?.first_item?.id)}
              />
            </div>
          </div>

          <div className="col-6">
            <div className="card-title fw-bold text-center  ms-1 mb-1">
              <Link className="link-dark text-decoration-none" to={`/${data?.second_item?.slug}`}>{data?.second_item?.name}</Link>
            </div>
            <div className="text-center">
              <AppButton
                icon={`me-1 ${data?.am_i_use_vote?.item_id === data?.second_item?.id ? 'bi-heart-fill text-danger' : 'bi-heart'}`}
                btnClass="btn-xs btn-outline-dark"
                label={data.second_item_votes_count}
                disabled={voteLoading}
                onClick={() => useVoteFunction(data?.id, data?.second_item?.id)}
              />
            </div>
          </div>
        </div>
        <div className="p-1 mt-2">
          <div className="progress">
            <div
              className="progress-bar text-shadow fw-bold progress-bar-striped progress-bar-animated"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${percentage(data.first_item_votes_count)}%` }}
            >

              %
              {percentage(data.first_item_votes_count)}

            </div>
            <div
              className="progress-bar text-shadow bg-danger fw-bold progress-bar-striped progress-bar-animated"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${percentage(data.second_item_votes_count)}%` }}
            >
              %
              {percentage(data.second_item_votes_count)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparisonSingle;
