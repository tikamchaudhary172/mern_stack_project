import React, { useEffect, useState } from 'react';

const Contact = () => {

  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

  const userContact = async () => {
    try {
      const res = await fetch('/getData', {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

      // console.log(`data:${data}`);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    userContact();
  }, []);


  //storing data in states
  const handleInputs = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [name]: value });
  }
  // send the data to backend
  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch('/contact', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });
    const data = await res.json();
    if (!data) {
      console.log('Message not send...');
    } else {
      alert('Message sent successfully ...');
      setUserData({ ...userData, message: "" })
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-between">
          <div className="col-sm-3 border">
            <label>Phone</label>
            <p>8077662051</p>
          </div>
          <div className="col-sm-3 border">
            <label>Email</label>
            <p>tikamchaudhary172@gmail</p>
          </div>
          <div className="col-sm-3 border">
            <label>Address</label>
            <p>Noida Sec-15</p>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-6  m-auto" style={{ border: '1px solid rgba(0,0,0,0.3)', borderRadius: '5px', boxShadow: ' 2px 2px 8px', padding: '10px ' }}>
            <h2>Get in Tuch</h2>

            <form method='post' className="row justify-content-between">
              <div className="col-sm-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" autoComplete='off'
                  value={userData.name}
                  onChange={handleInputs}
                  required />
              </div>
              <div className="col-sm-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" autoComplete='off'
                  value={userData.email}
                  onChange={handleInputs}
                  required />
              </div>
              <div className="col-sm-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="number" className="form-control" id="phone" name="phone" autoComplete='off'
                  value={userData.phone}
                  onChange={handleInputs}
                  required />
              </div>
              <div className="col-12 my-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea rows='5' className="form-control" id="message" name="message"
                  value={userData.message}
                  onChange={handleInputs}
                  autoComplete='off' required />
              </div>
              <span><button type="submit"
                onClick={contactForm}
                className="btn btn-primary">Send Message</button></span>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact;