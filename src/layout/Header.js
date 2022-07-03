import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchInput from '../components/ComparisonWidgets/SearchInput';
import { logout, loginOrRegister, checkAuth } from '../store/slices/authSlice';

function Header() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
        <i className="bi-check2-square me-1" />
        Chooser
      </Link>

      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <SearchInput />
      {loading
        ? (
          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <div className="nav-link px-3">
                <div className="spinner-border spinner-border-sm text-light me-1" role="status" />
                Yükleniyor..
              </div>
            </div>
          </div>
        )
        : isLogin
          ? (
            <>
              <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                  <Link to="/yeni-ekle" className="nav-link">
                    <i className="bi bi-plus-lg me-1" />
                    Yeni Ekle
                  </Link>
                </div>
              </div>
              <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                  <Link to={`/uye/${user.id}`} className="nav-link">
                    <img src={user.image} width={15} height={15} className="me-1" alt="profil" />
                    <span>{user.name}</span>
                  </Link>
                </div>
              </div>
              <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                  <a className="nav-link " href="#" onClick={() => dispatch(logout())}>
                    <i className="bi bi-x-lg me-1" />
                    Çıkış Yap
                  </a>
                </div>
              </div>
            </>
          )
          : (
            <>
              <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                  <a className="nav-link px-3" href="#" onClick={() => dispatch(loginOrRegister('twitter'))}>
                    <i className="bi bi-twitter me-1" />
                    Twitter ile Katıl
                  </a>
                </div>
              </div>
              <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                  <a className="nav-link px-3" href="#" onClick={() => dispatch(loginOrRegister('google'))}>
                    <i className="bi bi-google me-1" />
                    Google ile Katıl
                  </a>
                </div>
              </div>

            </>
          ) }
    </header>
  );
}

export default Header;
