import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const TeacherLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:5000/api/teacher/login",
                formData
            );

            if (res.data && res.data.teacher) {
                // ✅ Save teacher data in localStorage
                localStorage.setItem(
                    "teacher",
                    JSON.stringify(res.data.teacher)
                );
                console.log(res.data.teacher);
                // ✅ Navigate to Home Page
                navigate("/");
            } else {
                setError("Invalid response from server");
            }
        } catch (err) {
            if (err.response && err.response.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
            <div className="w-full max-w-md bg-base-100 shadow-xl p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-center mb-4">
                    👨‍🏫 Teacher Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered w-full"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="input input-bordered w-full"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-error text-center font-medium">
                            ⚠️ {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p>
                        Don't have an account?{" "}
                        <Link
                            to="/teacher/register"
                            className="text-blue-600 font-semibold"
                        >
                            Register Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeacherLogin;
