import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    id: '',
    email: '',
    password: '',
    name: '',
    role: '',
    date_of_birth: '',
    phone: '',
    gender: '',
    avatar: 'https://i.pinimg.com/564x/6f/51/e0/6f51e0742e98e2a4422c280059e9f516.jpg',
    warehouse_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setProfile({
          ...profile,
          avatar: upload.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container centered-container">
      <div className="row w-100">
        <div className="col-lg-8 mx-auto">
          <div className="container rounded bg-white p-4">
            <div className="row">
              <div className="col-md-3 border-right d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src={profile.avatar}
                  alt="Profile"
                />
                <span className="font-weight-bold mt-3">{profile.name || "Name"}</span>
                <div className="mt-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-9 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile</h4>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="labels">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Role</label>
                      <select
                        className="form-control"
                        name="role"
                        value={profile.role}
                        onChange={handleChange}
                      >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="labels">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date_of_birth"
                        value={profile.date_of_birth}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="labels">Gender</label>
                      <select
                        className="form-control"
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Warehouse</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="warehouse"
                        name="warehouse_id"
                        value={profile.warehouse_id}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <button className="btn btn-primary profile-button" type="button">Save Profile</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
