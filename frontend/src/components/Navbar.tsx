import { useState, useEffect } from "react";


const Navbar = () => {

  const [isAuth, setIsAuth] = useState(false);
   
  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true); 
    }
  }, [isAuth]);

  return (
    <nav className="navbar bg-dark" data-bs-theme="dark">
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex">
          <a className="navbar-brand" href="/">
            Twitter_Clone
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Tweets</a>
            </li>
          </ul>
        </div>
        <div>
        <ul className="navbar-nav">
            <li className="nav-item">
              {isAuth 
              ? 
              <a className="nav-link active" aria-current="page" href="#">Logout</a> 
              : 
              <a className="nav-link active" aria-current="page" href="/login">Login</a>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
