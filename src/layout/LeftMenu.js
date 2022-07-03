import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../store/slices/categorySlice';

function LeftMenu() {
  const categories = useSelector((state) => state.category.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    function elma() {
      dispatch(getCategories());
    }
    elma();
  }, [dispatch]);

  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky h-100 overflow-auto pt-3">
        <ul className="nav flex-column">
          <h6 className="sidebar-heading align-items-center px-3  mb-1 text-muted">
            <span>Kategoriler</span>
          </h6>
          {' '}
          {categories.map((item) => (
            <li key={item.id} className="nav-item">
              <Link to={`/kategori/${item.slug}`} className="nav-link d-flex justify-content-between" aria-current="page">
                <div>
                  <i className="bi-dot me-2" />
                  {item.name}
                </div>
                <div className="badge align-self-center bg-primary">{item.comparisons_count}</div>
              </Link>
            </li>
          ))}
        </ul>

        {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <a className="link-secondary" href="d" aria-label="Add a new report">
            <span data-feather="plus-circle" />
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="d">
              <span data-feather="file-text" />
              Current month
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="d">
              <span data-feather="file-text" />
              Last quarter
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="d">
              <span data-feather="file-text" />
              Social engagement
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="d">
              <span data-feather="file-text" />
              Year-end sale
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}

export default LeftMenu;
