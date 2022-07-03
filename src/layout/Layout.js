import Header from './Header';
import LeftMenu from './LeftMenu';

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <LeftMenu />
          <main className="col-md-9 ms-sm-auto col-lg-10 mt-2 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
