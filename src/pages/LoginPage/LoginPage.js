import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTolocalStorage, saveToLocalStorage } from "../../data/localstorage";
import { ON_LOGIN } from "../../redux/action";
import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Lưu trữ thông tin khai báo
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [usersData, setUsersData] = useState("");
  //Lấy dữ liệu từ localStorage
  useEffect(() => {
    const userArr = getTolocalStorage("users");
    // === null ? [] : getTolocalStorage("users");
    userArr === null ? setUsersData([]) : setUsersData(userArr);
  }, []);
  // console.log(usersData);
  //Xác thực thông tin
  const validateForm = () => {
    //Kiểm tra các thông tin điền vào
    if (isEmail === "" || isPassword === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return false;
    }
    //Kiểm tra password
    if (isPassword.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự trở lên.");
      return false;
    }
    return true;
  };

  //Hàm xử lý lấy các giá trị nhập vào input
  const inputChangeHandler = (e) => {
    if (e.target.id === "email") {
      setIsEmail(e.target.value);
    } else if (e.target.id === "password") {
      setIsPassword(e.target.value);
    }
  };
  //submit
  const submitHandler = (e) => {
    // console.log(e);
    e.preventDefault();
    if (validateForm()) {
      //tìm kiếm thông tin đăng nhập CurrentUser trong UserAray
      const currentUser = usersData.find(
        (user) => user.email === isEmail && user.password === isPassword
      );

      if (currentUser) {
        alert("Login Success!");
        //console.log(currentUser);
        //Lưu LocalStorage
        saveToLocalStorage("currentUserActive", currentUser);
        //Truyền action
        dispatch(ON_LOGIN({ email: isEmail, password: isPassword }));
        navigate("/");
      } else {
        alert("User doesn't exist or wrong information ");
        setIsPassword("");
      }
    }
  };

  return (
    <div className="wapperLogin">
      <form onSubmit={submitHandler}>
        <div className="formLogin">
          <h4>Sign In</h4>
          <div>
            <input
              id="email"
              type="text"
              value={isEmail}
              onChange={inputChangeHandler}
              placeholder="Email"
            />
            <input
              style={{ borderTop: "none" }}
              id="password"
              type="text"
              value={isPassword}
              onChange={inputChangeHandler}
              placeholder="Password"
            />
          </div>
          <button type="submit">SIGN IN</button>
          <div className="formLoginClick">
            <span>Create an acount? </span>

            {/* Chuyển sang trang đăng ký */}
            <Link className="formLoginLink" to={"/register"}>
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
