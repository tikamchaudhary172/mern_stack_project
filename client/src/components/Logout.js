import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {

  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  // promises
  useEffect(() => {
    fetch('/logout', {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((res) => {
      dispatch({ type: "USER", payload: false });

      navigate('/signin')
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    }).catch((error) => {
      console.log(error);
    })
  })

  return (
    <>
      <h1>Logout Page</h1>
    </>
  )
}

export default Logout;