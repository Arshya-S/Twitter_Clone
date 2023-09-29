const Navbar: React.FC<{ user: string }> = ({ user }) => {

  return (
    <nav className="navbar bg-dark" data-bs-theme="dark">
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex">
          <a className="navbar-brand" href="/">
            Twitter_Clone
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Tweets</a>
            </li>
          </ul>
        </div>
        <div>
        <ul className="navbar-nav">
            {/* {user && <li className="nav-item text-light d-flex flex-row"> Hello {user}</li>} */}
            <li className="nav-item">
              {user ? (
                <div className="d-flex align-items-center">
                  <p className="text-light me-4">Hello {user}</p>
                  <a className="nav-link active" aria-current="page" href="#">Logout</a> 
                </div>
                
              ):(
                <a className="nav-link active" aria-current="page" href="/login">Login</a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
