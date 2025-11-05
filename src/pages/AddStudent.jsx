import React, { useState, useMemo } from "react";
import axios from "axios";

const AddStudent = () => {
    const [formData, setFormData] = useState({
        studentName: "",
        fatherName: "",
        motherName: "",
        session: new Date().getFullYear().toString(),
        dept: "CSE",
    });
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null); // holds server response (success or error)
    const [error, setError] = useState("");

    // generate session options from 2000 to (current year + 1)
    const sessionOptions = useMemo(() => {
        const start = 2000;
        const end = new Date().getFullYear() + 1;
        const arr = [];
        for (let y = start; y <= end; y++) arr.push(String(y));
        return arr.reverse(); // newest first
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            studentName: "",
            fatherName: "",
            motherName: "",
            session: new Date().getFullYear().toString(),
            dept: "CSE",
        });
        setResponseData(null);
        setError("");
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResponseData(null);
        try {
            const res = await axios.post(
                "http://localhost:5000/api/student/register",
                {
                    studentName: formData.studentName,
                    fatherName: formData.fatherName,
                    motherName: formData.motherName,
                    session: formData.session,
                    dept: formData.dept,
                }
            );
            setResponseData(res.data); // success response (contains student)
        } catch (err) {
            // if backend returns structured error, capture it; otherwise generic
            if (err.response?.data) {
                setResponseData(err.response.data);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // If there's a response (success or known error), show response panel only
    if (responseData) {
        const isSuccess = !!responseData.student;
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
                <div className="w-full max-w-md bg-base-100 shadow-lg rounded-xl p-6">
                    {isSuccess ? (
                        <>
                            <h2 className="text-2xl font-bold text-center mb-4 text-green-700">
                                ✅{" "}
                                {responseData.message ||
                                    "Student registered successfully"}
                            </h2>

                            <div className="bg-green-50 p-4 rounded-lg border border-green-300">
                                <h3 className="font-semibold text-lg mb-2 text-green-700">
                                    Student Details
                                </h3>
                                <p>
                                    <b>Name:</b>{" "}
                                    {responseData.student.studentName}
                                </p>
                                <p>
                                    <b>Father's Name:</b>{" "}
                                    {responseData.student.fatherName}
                                </p>
                                <p>
                                    <b>Mother's Name:</b>{" "}
                                    {responseData.student.motherName}
                                </p>
                                <p>
                                    <b>Session:</b>{" "}
                                    {responseData.student.session}
                                </p>
                                <p>
                                    <b>Department:</b>{" "}
                                    {responseData.student.dept}
                                </p>
                                <p>
                                    <b>Registration No:</b>{" "}
                                    {responseData.student.regNo}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
                                ⚠️ {responseData.message || "Error"}
                            </h2>

                            <div className="bg-red-50 p-4 rounded-lg border border-red-300">
                                <h3 className="font-semibold text-lg mb-2 text-red-700">
                                    Error Details
                                </h3>
                                <p>{responseData.message}</p>
                                {responseData.existingRegNo && (
                                    <p>
                                        <b>Existing Reg No:</b>{" "}
                                        {responseData.existingRegNo}
                                    </p>
                                )}
                            </div>
                        </>
                    )}

                    <div className="mt-4 flex gap-3">
                        <button
                            className="btn btn-outline w-full"
                            onClick={resetForm}
                            disabled={loading}
                        >
                            Add New student
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Default: show form (no response present)
    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
            <div className="w-full max-w-md bg-base-100 shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Add Student
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="studentName"
                        placeholder="Student Name"
                        className="input input-bordered w-full"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="fatherName"
                        placeholder="Father's Name"
                        className="input input-bordered w-full"
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="motherName"
                        placeholder="Mother's Name"
                        className="input input-bordered w-full"
                        value={formData.motherName}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="session"
                        className="select select-bordered w-full"
                        value={formData.session}
                        onChange={handleChange}
                        required
                    >
                        {sessionOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>

                    <select
                        name="dept"
                        className="select select-bordered w-full"
                        value={formData.dept}
                        onChange={handleChange}
                        required
                    >
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="BBA">BBA</option>
                    </select>

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register Student"}
                    </button>
                </form>

                {error && (
                    <p className="text-red-600 mt-3 text-center">{error}</p>
                )}
            </div>
        </div>
    );
};

export default AddStudent;
