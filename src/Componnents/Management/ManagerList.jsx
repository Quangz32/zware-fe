import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ManagerList.css';


function App() {
    // State để lưu trữ thông tin người dùng
    const [users, setUsers] = useState([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: '********',
        role: 'admin',
        dob: '1990-01-01',
        phone: '1234567890',
        gender: 'male',
        warehouse: 3
      },
      // Thêm các người dùng khác nếu cần
    ]);
  
    // State để lưu trữ thông tin người dùng đang được chọn để chỉnh sửa
    const [selectedUser, setSelectedUser] = useState(null);
  
    // Hàm để xử lý tìm kiếm người dùng
    const searchUser = (keyword) => {
      // Tìm kiếm người dùng theo tên, email hoặc số điện thoại
      const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.email.toLowerCase().includes(keyword.toLowerCase()) ||
        user.phone.includes(keyword)
      );
      // Cập nhật danh sách người dùng được hiển thị
      setUsers(filteredUsers);
    };
  
    // Hàm để cập nhật thông tin người dùng
    const updateUser = (updatedUserInfo) => {
      const updatedUsers = users.map(user =>
        user.id === updatedUserInfo.id ? updatedUserInfo : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null); // Đóng form chỉnh sửa sau khi cập nhật thành công
    };
  
    return (
      <div className="App">
        <h1>User Management</h1>
        {/* Form tìm kiếm */}
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          onChange={(e) => searchUser(e.target.value)}
        />
        {/* Danh sách người dùng */}
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {/* Hiển thị thông tin người dùng */}
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
              <div>Password: {user.password}</div>
              <div>Role: {user.role}</div>
              <div>Date of Birth: {user.dob}</div>
              <div>Phone: {user.phone}</div>
              <div>Gender: {user.gender}</div>
              <div>Number Warehouse: {user.warehouse}</div>
              {/* Button để chỉnh sửa thông tin người dùng */}
              <button onClick={() => setSelectedUser(user)}>Update</button>
            </li>
          ))}
        </ul>
        {/* Hiển thị form chỉnh sửa nếu có người dùng được chọn */}
        {selectedUser && (
          <div className="update-form">
            <h2>Update User</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              // Lấy thông tin từ form và cập nhật người dùng
              const updatedUserInfo = {
                ...selectedUser,
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value,
                role: e.target.role.value,
                dob: e.target.dob.value,
                phone: e.target.phone.value,
                gender: e.target.gender.value,
                warehouse: parseInt(e.target.warehouse.value)
              };
              updateUser(updatedUserInfo);
            }}>
              {/* Các trường thông tin để chỉnh sửa */}
              <input type="text" name="name" defaultValue={selectedUser.name} />
              <input type="text" name="email" defaultValue={selectedUser.email} />
              <input type="password" name="password" defaultValue={selectedUser.password} />
              <select name="role" defaultValue={selectedUser.role}>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
              <input type="date" name="dob" defaultValue={selectedUser.dob} />
              <input type="text" name="phone" defaultValue={selectedUser.phone} />
              <select name="gender" defaultValue={selectedUser.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input type="number" name="warehouse" defaultValue={selectedUser.warehouse} />
              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </div>
    );
  }
  
  export default App;