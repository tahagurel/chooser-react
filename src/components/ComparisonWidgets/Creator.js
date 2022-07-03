import { Link } from 'react-router-dom';

function Creator({ data }) {
  return (
    <div className="card d-flex p-3 mt-2  shadow">
      <h6 className="border-bottom pb-2 mb-2 mb-0">
        Karşılaştıran
      </h6>
      <div className=" mb-0 small lh-sm">
        <img
          src={data?.image}
          alt="creator"
          className="bd-placeholder-img float-start flex-shrink-0 me-2 rounded"
          width={40}
          height={40}
        />
        <div>
          <Link to={`/uye/${data?.id}`} className="link-dark text-decoration-none">
            <strong className="d-block text-gray-dark">{data?.name}</strong>
          </Link>
          <div className="mt-2">
            {data?.comparisons_count}
            {' '}
            Karşılaştırma |
            {' '}
            {data?.comments_count}
            {' '}
            Yorum
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creator;
