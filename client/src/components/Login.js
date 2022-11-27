import React, { useState ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Signin = () => {

const{state,dispatch}=useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/signin', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert('Invalid Credentials ...');
    } else {
      dispatch({type:"USER",payload:true});
      
      window.alert('Login Successfully ...');
      navigate('/');
    }
  }

  return (
    <>
      <div className='container mt-4'>
        <div className='row'>
          <div className="col-sm-5 m-auto" style={{ border: '1px solid rgba(0,0,0,0.3)', borderRadius: '10px', boxShadow: ' 2px 2px 8px', padding: '10px ' }}>
            <h1>Sign in</h1>

            <form method="post">
              <div className="mb-2">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" autoComplete='off'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" autoComplete='off'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>

              <span><button type="submit" className="btn btn-primary"
                onClick={loginUser}
              >Log in</button></span>
              <span style={{ marginLeft: '50px' }}><Link to='/signup'>Create an account</Link></span>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin;