import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginImg } from "../../assets";
import { login } from "../../redux/asyncThunk/authThunk";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoading, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loginData, setloginData] = useState({
    username: "",
    password: ""
  });
  const { username, password } = loginData;
  const [passwordType, setPasswordType] = useState("password");
  const guestUserHandler = (e) => {
    e.preventDefault();
    dispatch(login({username: "shivani",password: "shivani@12"}))
  };
  const checkInputs = () => {
    if (username && password) {
      return true;
    }
    toast.warn("kindly fill fields");
    return false;
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    if (checkInputs()) {
      const res = dispatch(login(loginData));
      if (res?.payload?.status === 200) {
        localStorage.getItem("user", JSON.stringify(res.payload.foundUser));
        localStorage.setItem("user", JSON.stringify(res.payload.foundUser));
        toast.success("successfully login ");
      }
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [navigate, token]);
  return (
    <div className="flex-row flex-wrap width-md">
      <img src={loginImg} alt="login-img" className="login-img " />
      <div className="login">
        <div className="form">
          <form className="login-form" onSubmit={loginHandler}>
            <span>
              <i className="fa fa-lock fa-3x"></i>
            </span>
            <div className="flex-col gap">
              <input
                className="border-none login-input"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  setloginData({ ...loginData, username: e.target.value })
                }
              />
              <div className="flex-row gap password-container">
                <input
                  className="border-none login-password"
                  type={passwordType}
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setloginData({ ...loginData, password: e.target.value })
                  }
                />
                {passwordType === "password" ? (
                  <i
                    className="fa fa-eye-slash eye-icon"
                    onClick={() => setPasswordType("text")}
                  ></i>
                ) : (
                  <i
                    className="fa fa-eye eye-icon"
                    onClick={() => setPasswordType("password")}
                  ></i>
                )}
              </div>
              <button className="border-none primary-btn" type="submit">
                login {isLoading ? <i className="fa fa-spinner"></i> : ""}
              </button>
              <button className="secondary-btn" onClick={guestUserHandler}>
                login as guest
              </button>
            </div>
            <p className="padding-sm decoration-none">
              Join us today ?{" "}
              <Link to="/signup">
                <span className="cursor-pointer">SignUp</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export { LoginPage };
