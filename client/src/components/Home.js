import React, { useEffect, useState } from 'react';

const Home = () => {

  const [userName, setUserName] = useState('');
  const [show ,setShow]=useState(false);

  const userHome = async () => {
    try {
      const res = await fetch('/getData', {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setUserName(data.name);
      setShow(true);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    userHome();
  }, []);


  return (
    <>
      <div className='container' style={{ marginTop: '200px' }}>
        <h3 style={{ color: 'blue', textAlign: 'center' }}>Welcome</h3>
        <h1 style={{ textAlign: 'center' }}>{userName}</h1>
        <h2 style={{ textAlign: 'center' }}>
          {show ? "Happy to see you back ..." : "We are MERN Developer !"}
        </h2>
      </div>
    </>
  )
}

export default Home;