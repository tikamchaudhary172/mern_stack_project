import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '', work: '', password: '', conformPassword: '' });

  let name, value;
  const handleInputs = (e) => {
    // console.log(e)
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    // console.log(user)
  }


  const postData = async (event) => {
    event.preventDefault();
    const { name, email, phone, work, password, conformPassword } = user;
    const res = await fetch('/register', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, work, password, conformPassword })
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert('Invalid Registration ...');
      console.log('Invalid Registration ...');
    } else {
      window.alert('Registration Successfully ...');
      console.log('Registration Successfully ...');

      navigate('/signin')
    }
  }


  return (
    <>
      <div className='container mt-2'>
        <div className='row'>
          <div className="col-sm-5 m-auto" style={{ border: '1px solid rgba(0,0,0,0.3)', borderRadius: '10px', boxShadow: ' 2px 2px 8px', padding: '10px ' }}>
            <h1>Sign up</h1>

            <form method="post">
              <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" autoComplete='off' value={user.name} onChange={handleInputs} required />
              </div>
              <div>
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" autoComplete='off' value={user.email} onChange={handleInputs} required />
              </div>
              <div>
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="number" className="form-control" id="phone" name="phone" autoComplete='off' value={user.phone} onChange={handleInputs} required />
              </div>
              <div>
                <label htmlFor="work" className="form-label">Work</label>
                <input type="text" className="form-control" id="work" name="work" autoComplete='off' value={user.work} onChange={handleInputs} required />
              </div>
              <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" autoComplete='off' value={user.password} onChange={handleInputs} required />
              </div>
              <div className="mb-2">
                <label htmlFor="conformPassword" className="form-label">Conform Password</label>
                <input type="password" className="form-control" id="conformPassword" name="conformPassword" autoComplete='off' value={user.conformPassword} onChange={handleInputs} required />
              </div>

              <span><button type="submit" className="btn btn-primary" onClick={postData}>Register</button></span>
              <span style={{ marginLeft: '50px' }}><Link to='/signin'>I am already register</Link></span>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;