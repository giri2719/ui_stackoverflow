import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const [loginMail, setLoginMail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const handle1 = () => {
    localStorage.setItem("Name", loginMail);
    localStorage.setItem("Password", loginPassword);
    let checkEmail = localStorage.getItem("Name");
    let checkPassword = localStorage.getItem("Password");
    let email = localStorage.getItem("signUp_Email");
    let password = localStorage.getItem("SignUp_Password");
    // console.log(c, e, d, f);
    checkEmail !== "" &&
    checkEmail === email &&
    checkPassword !== "" &&
    checkPassword === password
      ? window.open("/")
      : alert("login failed enter correct password and email");
  };

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const route = () => {
    this.props.history.push("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              // name="email"
              // onChange={handleChange}
              // value={data.email}
              // required
              name={loginMail}
              onChange={(e) => setLoginMail(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              // name="password"
              // onChange={handleChange}
              // value={data.password}
              // required="true"
              name={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {/* <Link to="/"> */}
            <button
              type="button"
              onClick={handle1}
              className={styles.green_btn}
            >
              Sign In
            </button>
            {/* </Link> */}
          </form>
        </div>
        <div className={styles.right}>
          <h1>New User ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
