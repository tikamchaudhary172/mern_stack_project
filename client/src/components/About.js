import React, { useEffect, useState } from 'react';
import myPhoto from '../images/tikam.jpg';
import aboutPick from '../images/aboutPick.jpg';
import { useNavigate } from 'react-router-dom';

const About = () => {

  const [userData, setUserData] = useState('');  // useState({})

  const navigate = useNavigate();

  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: "get",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setUserData(data);

      // console.log(`data:${data}`);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      console.log(error);
      navigate('/signin');
    }
  }

  useEffect(() => {
    callAboutPage()
  }, []);

  return (
    <>
      <div className="container mt-5" style={{ border: '1px solid rgba(0,0,0,0.3)', boxShadow: ' 2px 2px 8px', padding: '20px 50px' }}>
        <form method="get">
          <div className="row">
            <div className="col-4">
              <img src={userData.name==="Tikam Chaudhary" ? myPhoto : aboutPick} alt='img' style={{ height: '200px', width: '150px' }} />
            </div>
            <div className="col-4">
              <h5 className='text-primary'>{userData.name}</h5>
              <h6>{userData.work}</h6>
              <p>Ranking:1/10</p>

              <ul className="nav nav-pills mt-5" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">About</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Timeline</button>
                </li>
              </ul>

            </div>
            <div className="col-2">
              <span className='btn btn-secondary'>Edit Profile</span>
            </div>
            <div className="row">
              <div className="col-4">
                <p className='mt-3 mb-1'>WORK LINK</p>
                <a href='https://www.google.com' target='_blank' rel="noreferrer">Google</a><br />
                <a href='https://www.youtube.com' target='_blank' rel="noreferrer">youtube</a><br />
                <a href='https://www.flipkart.com' target='_blank' rel="noreferrer">flipkart</a><br />
                <a href='https://www.amazon.com' target='_blank' rel="noreferrer">amazon</a><br />
              </div>
              <div className="col-8 tab-content" id="pills-tabContent">

                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">

                  <div className="row ">
                    <div className="col"><label>User ID</label></div>
                    <div className="col"><p>{userData._id}</p></div>
                  </div>
                  <div className="row ">
                    <div className="col"><label>Name</label></div>
                    <div className="col"><p>{userData.name}</p></div>
                  </div>
                  <div className="row ">
                    <div className="col"><label>Email</label></div>
                    <div className="col"><p>{userData.email}</p></div>
                  </div>
                  <div className="row ">
                    <div className="col"><label>Phone</label></div>
                    <div className="col"><p>{userData.phone}</p></div>
                  </div>
                  <div className="row ">
                    <div className="col"><label>work</label></div>
                    <div className="col"><p>{userData.work}</p></div>
                  </div>
                </div>



                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                  <div className="row ">
                    <div className="col"><label>Experience</label></div>
                    <div className="col"><p>Expert</p></div>
                  </div>
                  <div className="row ">
                    <div className="col"><label>Hourly Rate</label></div>
                    <div className="col"><p>10s/hr</p></div>
                  </div>
                  <div className="row ">
                    <div className="col"><label>Total Projects</label></div>
                    <div className="col"><p>50</p></div>
                  </div>
                  <div className="row ">
                    <div className="col"><label>English Label</label></div>
                    <div className="col"><p>Expert</p></div>
                  </div>
                  <div className="row ">
                    <div className="col"><label>Availability</label></div>
                    <div className="col"><p>6 Months</p></div>
                  </div>
                </div>


              </div>

            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default About;