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
    avatar: 'avatar-1.avif',
    warehouse_id: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/validate-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Profile saved successfully!');
        setErrors({});
      } else {
        setErrors(data.errors || {});
        setMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container centered-container">
      <div className="w-100">
        <div className="">
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
                <form onSubmit={handleSubmit}>
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
                        {errors.name && <span className="text-danger">{errors.name}</span>}
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
                        {errors.email && <span className="text-danger">{errors.email}</span>}
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
                        {errors.password && <span className="text-danger">{errors.password}</span>}
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
                        {errors.role && <span className="text-danger">{errors.role}</span>}
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
                        {errors.date_of_birth && <span className="text-danger">{errors.date_of_birth}</span>}
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
                        {errors.phone && <span className="text-danger">{errors.phone}</span>}
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
                        {errors.gender && <span className="text-danger">{errors.gender}</span>}
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
                        {errors.warehouse_id && <span className="text-danger">{errors.warehouse_id}</span>}
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
                    </div>
                    {message && <div className="mt-3 text-center text-info">{message}</div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
