import React, { useState } from "react";
import axios from "axios";

const AddTeacher = () => {
    const [teacher, setTeacher] = useState({
        name: "",
        email: "",
        phone: "",
        dept: "",
        designation: "",
    });
    const [response, setResponse] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher((prev) => ({ ...prev, [name]: value }));
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);
        // console.log(teacher);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/teacher/add",
                teacher
            );
            setIsSuccess(true);
            setResponse(res.data);
        } catch (err) {
            setIsSuccess(false);
            setResponse(
                err.response?.data || { message: "Something went wrong!" }
            );
        } finally {
            setLoading(false);
        }
    };

    // Reset form
    const handleCreateNew = () => {
        setTeacher({
            name: "",
            email: "",
            phone: "",
            dept: "",
            designation: "",
        });
        setResponse(null);
        setIsSuccess(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 p-6">
            <div className="w-full max-w-3xl bg-base-100 shadow-xl p-6 rounded-xl">
                {!response ? (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-4">
                            Add Teacher
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="input input-bordered w-full"
                                        value={teacher.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input input-bordered w-full"
                                        value={teacher.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="input input-bordered w-full"
                                        value={teacher.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Department
                                    </label>
                                    <select
                                        name="dept"
                                        className="select select-bordered w-full"
                                        value={teacher.dept}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Select Department
                                        </option>
                                        <option value="CSE">CSE</option>
                                        <option value="BBA">BBA</option>
                                        <option value="ECE">ECE</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold">
                                        Designation
                                    </label>
                                    <select
                                        name="designation"
                                        className="select select-bordered w-full"
                                        value={teacher.designation}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Select Designation
                                        </option>
                                        <option value="Faculty Member">
                                            Faculty Member
                                        </option>
                                        <option value="Lecturer">
                                            Lecturer
                                        </option>
                                        <option value="Assistant Professor">
                                            Assistant Professor
                                        </option>
                                        <option value="Associate Professor">
                                            Associate Professor
                                        </option>
                                        <option value="Professor">
                                            Professor
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Add Teacher"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        {isSuccess ? (
                            <>
                                <h2 className="text-2xl font-bold text-green-700 mb-4">
                                    ✅{" "}
                                    {response.message ||
                                        "Teacher added successfully"}
                                </h2>
                                <div className="bg-green-50 border border-green-300 p-4 rounded-lg text-left">
                                    <p>
                                        <b>Name:</b>{" "}
                                        {response.teacher?.name || teacher.name}
                                    </p>
                                    <p>
                                        <b>Email:</b>{" "}
                                        {response.teacher?.email ||
                                            teacher.email}
                                    </p>
                                    <p>
                                        <b>Phone:</b>{" "}
                                        {response.teacher?.phone ||
                                            teacher.phone}
                                    </p>
                                    <p>
                                        <b>Department:</b>{" "}
                                        {response.teacher?.dept || teacher.dept}
                                    </p>
                                    <p>
                                        <b>Designation:</b>{" "}
                                        {response.teacher?.designation ||
                                            teacher.designation}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-red-600 mb-4">
                                    ⚠️{" "}
                                    {response.message || "Error adding teacher"}
                                </h2>
                            </>
                        )}

                        <button
                            className="btn btn-secondary mt-4"
                            onClick={handleCreateNew}
                        >
                            ➕ Create Another Teacher
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddTeacher;
