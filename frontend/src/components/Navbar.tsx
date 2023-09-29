import { useNavigate } from 'react-router-dom';
const Navbar: React.FC<{ user: string | null, setReRender: (value: number) => void, reRender: number}> = ({ user, setReRender, reRender }) => {

  const navigate = useNavigate()  
  
  return (
    <nav className="navbar bg-dark" data-bs-theme="dark">
      <div className="container-fluid d-flex justify-content-between">
        <div className="d-flex">
          <a className="navbar-brand" href="/">
            Twitter_Clone
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/tweets">Tweets</a>
            </li>
          </ul>
        </div>
        <div>
        <ul className="navbar-nav">
            <li className="nav-item">
              {user ? (
                <div className="d-flex align-items-center">
                  <p className="text-light me-4">Hello {user}</p>
                  <button className="nav-link active" onClick={() => {
                    {localStorage.removeItem('username')}
                    {localStorage.removeItem('authTokens')}
                    {navigate('/login')}

                  }}>Logout</button> 
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
