import React, { useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,
                phone,
                address,
            });
            if (res && res.data.success) {
                console.log("Registered username:", name);
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <Layout title="Register - Ecommer App">
                <div style={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <h4 style={styles.title}>Sign up</h4>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={styles.input}
                                placeholder="Enter Your Name"
                                required
                                autoFocus
                            />
                        </div>
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
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={styles.input}
                                placeholder="Enter Your Phone"
                                required
                            />
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                style={styles.input}
                                placeholder="Enter Your Address"
                                required
                            />
                        </div>
                        <button type="submit" style={styles.button}>
                            Sign up
                        </button>
                    </form>
                    <p style={styles.centerText}>
                        Already have an account? <a href="/login">Login here</a>.
                    </p>
                </div>
            </Layout>
        </div>
    );
};

const styles = {
    formContainer: {
        maxWidth: "400px",
        margin: "0 auto",
        paddingTop: "0px",
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
        backgroundColor: "Purple",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    centerText: {
        textAlign: "center",
        fontWidth: "bold",
    },
};

export default Register;
