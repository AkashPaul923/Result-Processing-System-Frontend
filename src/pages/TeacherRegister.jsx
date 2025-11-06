import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const TeacherRegister = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/teacher/register",
                formData
            );

            if (res.data?.message) {
                setSuccess(res.data.message);
                // ✅ Redirect to login page after short delay
                setTimeout(() => navigate("/teacher-login"), 1500);
            } else {
                setError("Unexpected server response.");
            }
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
            <div className="w-full max-w-md bg-base-100 shadow-xl p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-center mb-4">
                    🧑‍🏫 Teacher Registration
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
                    {success && (
                        <p className="text-success text-center font-medium">
                            ✅ {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p>
                        Already have an account?{" "}
                        <Link
                            to="/teacher-login"
                            className="text-blue-600 font-semibold"
                        >
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeacherRegister;
