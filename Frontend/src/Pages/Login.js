import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  const printTokenFromCookies = () => {
    const token = cookies.get("token");
    if (token) {
      console.log("Token from cookies:", token);
    } else {
      console.log("Token not found in cookies");
    }
  };

  // useEffect hook to print token from cookies when component mounts
  useEffect(() => {
    printTokenFromCookies();
  }, []);


  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        const auth = { token: res.data.token, user: res.data.user };
        const username = res.data.user.name;
        console.log("Logged in username:", res.data.user.name);
        console.log("Token:", res.data.token);
        navigate("/", { state: { username, auth } });
        toast.success(res.data && res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - Ecommerce App">
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h4 style={styles.title}>LOGIN FORM</h4>

          <div style={styles.inputContainer}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            LOGIN
          </button>
        </form>
        <p style={styles.registerLink}>
          Don't have an account? <a href="/register">Signup here</a>.
        </p>
      </div>
    </Layout>
  );
};

const styles = {
  formContainer: {
    maxWidth: "400px",
    margin: "0 auto",
    paddingTop: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "40px",
  },
  inputContainer: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "purple",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  registerLink: {
    textAlign: "center",
    marginTop: "20px",
    fontWidth: "bold",
  },
};

export default Login;
