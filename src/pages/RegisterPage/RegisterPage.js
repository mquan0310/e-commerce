import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTolocalStorage, saveToLocalStorage } from "../../data/localstorage";
import "./RegisterPage.css";

const RegisterPage = () => {
  let navigate = useNavigate();
  //State lưu trữ thông tin khai báo
  const [isName, setIsName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [isPhone, setIsPhone] = useState("");

  //Lấy dữ liệu từ localStorage
  const userArr = getTolocalStorage("users") === null ? [] : getTolocalStorage("users");

  //Xác thực thông tin
  const validateForm = () => {
    //Check email trùng lặp
    const checkEmail = () => {
      if (userArr.length === 0) {
        return false;
      } else {
        const duplicate = userArr.filter((arr) => arr.email === isEmail);
        if (duplicate.length === 0) {
          return false;
        } else {
          return true;
        }
      }
    };
    //Kiểm tra thông tin điền vào
    if (isName === "" || isEmail === "" || isPassword === "" || isPhone === "") {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return false;
    }
    //Kiểm tra password
    if (isPassword.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự trở lên.");
      return false;
    }
    if (checkEmail()) {
      alert("Email đã đăng ký tài khoản!!");
      return false;
    }
    return true;
  };

  //Xử lý các giá trị nhập vào Input
  const inputChangeHandler = (e) => {
    if (e.target.id === "name") {
      setIsName(e.target.value);
    } else if (e.target.id === "email") {
      setIsEmail(e.target.value);
    } else if (e.target.id === "password") {
      setIsPassword(e.target.value);
    } else if (e.target.id === "phone") {
      setIsPhone(e.target.value);
    }
  };

  //submit
  const submitHandler = (e) => {
    //  console.log(e);
    e.preventDefault();
    if (validateForm()) {
      const dataUser = {
        name: isName,
        email: isEmail,
        password: isPassword,
        phone: isPhone,
      };
      console.log("dataUser:", dataUser);
      userArr.push(dataUser);
      saveToLocalStorage("users", userArr);
      setIsName("");
      setIsEmail("");
      setIsPassword("");
      setIsPhone("");
      navigate("/login");
    }
  };

  return (
    <div className="wapperRegister">
      <form onSubmit={submitHandler}>
        <div className="formRegister">
          <h4>Sign Up</h4>
          <div>
            <input
              id="name"
              type="text"
              value={isName}
              onChange={inputChangeHandler}
              placeholder="Full Name"
            />
            <input
              style={{ borderTop: "none" }}
              id="email"
              type="text"
              value={isEmail}
              onChange={inputChangeHandler}
              placeholder="Email"
            />
            <input
              style={{ borderTop: "none" }}
              id="password"
              type="password"
              value={isPassword}
              onChange={inputChangeHandler}
              placeholder="Password"
            />
            <input
              style={{ borderTop: "none" }}
              id="phone"
              type="text"
              value={isPhone}
              onChange={inputChangeHandler}
              placeholder="Phone"
            />
          </div>
          <button type="submit">SIGN UP</button>
          <div className="formRegisterClick">
            <span>Login? </span>
            <Link className="formRegisterLink" to={"/login"}>
              Click
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
