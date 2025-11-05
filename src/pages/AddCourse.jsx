import React, { useState } from "react";
import axios from "axios";

const AddCourse = () => {
    const [dept, setDept] = useState("BBA");
    const [semester, setSemester] = useState("First");
    const [subjects, setSubjects] = useState([{ title: "", credit: 3 }]);
    const [response, setResponse] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Map semester name to number
    const semesterMap = {
        First: 1,
        Second: 2,
        Third: 3,
        Fourth: 4,
        Fifth: 5,
        Sixth: 6,
        Seventh: 7,
        Eighth: 8,
    };

    // Generate subject code automatically
    const generateCode = (index) => {
        const semNum = semesterMap[semester] || 1;
        const serial = (index + 1).toString().padStart(2, "0");
        return `${dept}${semNum}${serial}`;
    };

    // Handle subject change
    const handleSubjectChange = (index, field, value) => {
        const updated = [...subjects];
        updated[index][field] = value;
        setSubjects(updated);
    };

    // Add subject
    const handleAddSubject = () => {
        setSubjects([...subjects, { title: "", credit: 3 }]);
    };

    // Remove subject
    const handleRemoveSubject = (index) => {
        const updated = subjects.filter((_, i) => i !== index);
        setSubjects(updated);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        const formattedSubjects = subjects.map((sub, i) => ({
            code: generateCode(i),
            title: sub.title.trim(),
            credit: Number(sub.credit) || 0,
        }));

        const courseData = {
            semester,
            dept,
            subjects: formattedSubjects,
        };
        console.log(courseData);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/teacher/course",
                courseData
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

    const handleCreateNew = () => {
        setSubjects([{ title: "", credit: 3 }]);
        setResponse(null);
        setIsSuccess(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 p-6">
            <div className="w-full max-w-4xl bg-base-100 shadow-xl p-6 rounded-xl">
                {!response ? (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-4">
                            Add Course
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Department */}
                            <select
                                className="select select-bordered w-full"
                                value={dept}
                                onChange={(e) => setDept(e.target.value)}
                            >
                                <option value="CSE">CSE</option>
                                <option value="ECE">ECE</option>
                                <option value="BBA">BBA</option>
                            </select>

                            {/* Semester */}
                            <select
                                className="select select-bordered w-full"
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                            >
                                {[
                                    "First",
                                    "Second",
                                    "Third",
                                    "Fourth",
                                    "Fifth",
                                    "Sixth",
                                    "Seventh",
                                    "Eighth",
                                ].map((s) => (
                                    <option key={s} value={s}>
                                        {s} Semester
                                    </option>
                                ))}
                            </select>

                            {/* Subjects */}
                            <div className="space-y-4">
                                {subjects.map((sub, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 border p-3 rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <label className="block text-sm font-semibold">
                                                Subject Title
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full"
                                                value={sub.title}
                                                onChange={(e) =>
                                                    handleSubjectChange(
                                                        index,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold">
                                                Credit
                                            </label>
                                            <input
                                                type="number"
                                                className="input input-bordered w-24"
                                                min="1"
                                                max="4"
                                                value={sub.credit}
                                                onChange={(e) =>
                                                    handleSubjectChange(
                                                        index,
                                                        "credit",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold">
                                                Code
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-28"
                                                value={generateCode(index)}
                                                readOnly
                                            />
                                        </div>
                                        {subjects.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-error"
                                                onClick={() =>
                                                    handleRemoveSubject(index)
                                                }
                                            >
                                                −
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className="btn btn-outline w-full"
                                    onClick={handleAddSubject}
                                >
                                    ＋ Add Subject
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Course"}
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
                                        "Course added successfully"}
                                </h2>
                                <div className="bg-green-50 border border-green-300 p-4 rounded-lg text-left">
                                    <p>
                                        <b>Department:</b>{" "}
                                        {response.course?.dept || dept}
                                    </p>
                                    <p>
                                        <b>Semester:</b>{" "}
                                        {response.course?.semester || semester}
                                    </p>
                                    <p className="mt-2 font-semibold">
                                        Subjects:
                                    </p>
                                    <ul className="list-disc ml-6">
                                        {(
                                            response.course?.subjects ||
                                            subjects
                                        ).map((sub, i) => (
                                            <li key={i}>
                                                {sub.code} — {sub.title} — (
                                                {sub.credit} credit)
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-red-600 mb-4">
                                    ⚠️{" "}
                                    {response.message || "Error adding course"}
                                </h2>
                            </>
                        )}

                        <button
                            className="btn btn-secondary mt-4"
                            onClick={handleCreateNew}
                        >
                            ➕ Create Another Course
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddCourse;
