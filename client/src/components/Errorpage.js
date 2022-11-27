import React from 'react';
import { Link } from 'react-router-dom';

const Errorpage = () => {
  return (
    <>
      <div className='container' style={{ marginTop: '200px' }}>
        <div className="row">
          <div className="col-6 m-auto">
            <h2 style={{ color: 'blue', textAlign: 'center' }}>404 Error</h2>
            <h4 style={{ textAlign: 'center' }}>Sorry ! Page not found ...</h4>
            <p style={{ textAlign: 'center' }}><Link className='btn btn-primary' to='/'>Back to home</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Errorpage;