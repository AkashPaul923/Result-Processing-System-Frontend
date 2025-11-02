import React, { useState } from "react";
import axios from "axios";

const AddResult = () => {
    const [regNo, setRegNo] = useState("");
    const [dept, setDept] = useState("CSE");
    const [semester, setSemester] = useState("First");
    const [student, setStudent] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [marks, setMarks] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const [finalResult, setFinalResult] = useState(null);

    // Fetch student and course data
    const handleFetchData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const studentRes = await axios.get(
                `http://localhost:5000/api/student?regNo=${regNo}`
            );
            const courseRes = await axios.get(
                `http://localhost:5000/api/teacher/course?dept=${dept}&semester=${semester}`
            );

            // Check department mismatch
            if (studentRes.data.student.dept !== dept) {
                setError(
                    `Department mismatch! Student belongs to ${studentRes.data.student.dept} department.`
                );
                setStudent(null);
                setSubjects([]);
                return;
            }

            setStudent(studentRes.data.student);
            setSubjects(courseRes.data.subjects);

            const initialMarks = {};
            courseRes.data.subjects.forEach((sub) => {
                initialMarks[sub.code] = {
                    assignment: "",
                    classtest: "",
                    midterm: "",
                    final: "",
                };
            });
            setMarks(initialMarks);
        } catch (err) {
            console.error(err);
            setError("Student or Course data not found!");
        } finally {
            setLoading(false);
        }
    };

    // Handle marks input
    const handleMarkChange = (code, field, value) => {
        const numValue = Number(value);
        const limits = {
            assignment: 10,
            classtest: 10,
            midterm: 20,
            final: 60,
        };

        if (numValue > limits[field]) {
            alert(
                `${field.toUpperCase()} cannot be more than ${limits[field]}!`
            );
            return;
        }

        setMarks((prev) => ({
            ...prev,
            [code]: { ...prev[code], [field]: value },
        }));
    };

    // Grade calculator
    const getGrade = (total) => {
        if (total >= 80) return { letter: "A+", point: 4.0 };
        if (total >= 75) return { letter: "A", point: 3.75 };
        if (total >= 70) return { letter: "A-", point: 3.5 };
        if (total >= 65) return { letter: "B+", point: 3.25 };
        if (total >= 60) return { letter: "B", point: 3.0 };
        if (total >= 55) return { letter: "B-", point: 2.75 };
        if (total >= 50) return { letter: "C+", point: 2.5 };
        if (total >= 45) return { letter: "C", point: 2.25 };
        if (total >= 40) return { letter: "D", point: 2.0 };
        return { letter: "F", point: 0.0 };
    };

    // gpa to letter grade
    const gpaToLetterGrade = (gpa) => {
        if (gpa >= 4.0) return "A+";
        if (gpa >= 3.75) return "A";
        if (gpa >= 3.5) return "A-";
        if (gpa >= 3.25) return "B+";
        if (gpa >= 3.0) return "B";
        if (gpa >= 2.75) return "B-";
        if (gpa >= 2.5) return "C+";
        if (gpa >= 2.25) return "C";
        if (gpa >= 2.0) return "D";
        return "F";
    };

    // passed check function
    const allSubjectsPassed = (results) => {
        return results.every((sub) => sub.gradePoint >= 2.0);
    };

    // Handle final submit
    const handleSubmitResult = async (e) => {
        e.preventDefault();

        // Validate marks completeness
        for (const sub of subjects) {
            const m = marks[sub.code];
            if (!m.assignment || !m.classtest || !m.midterm || !m.final) {
                alert(`Please fill all marks for ${sub.title}`);
                return;
            }
        }

        const resultArray = subjects.map((sub) => {
            const subMarks = marks[sub.code];
            const assignment = Number(subMarks.assignment) || 0;
            const classtest = Number(subMarks.classtest) || 0;
            const midterm = Number(subMarks.midterm) || 0;
            const final = Number(subMarks.final) || 0;
            const total = assignment + classtest + midterm + final;
            const { letter, point } = getGrade(total);

            return {
                code: sub.code,
                title: sub.title,
                credit: sub.credit,
                assignment,
                classtest,
                midterm,
                final,
                total,
                letterGrade: letter,
                gradePoint: point,
            };
        });

        const totalNumber = resultArray.reduce((sum, r) => sum + r.total, 0);
        const totalCredits = resultArray.reduce((sum, r) => sum + r.credit, 0);
        const totalGradePoints = resultArray.reduce(
            (sum, r) => sum + r.gradePoint * r.credit,
            0
        );
        let gpa = 0;
        let avgLetter = "F";
        if (allSubjectsPassed(resultArray)) {
            gpa = totalCredits ? totalGradePoints / totalCredits : 0;
            avgLetter = gpaToLetterGrade(gpa);
        }

        const finalData = {
            regNo: student.regNo,
            studentName: student.studentName,
            fatherName: student.fatherName,
            motherName: student.motherName,
            session: student.session,
            dept: dept,
            semester: semester,
            result: resultArray,
            totalNumber: totalNumber,
            GradePointAverage: parseFloat(gpa.toFixed(2)),
            letterGradeAverage: avgLetter,
        };

        try {
            const res = await axios.post("http://localhost:5000/api/student/result", finalData);
            alert("Result saved successfully!");
            console.log("Saved:", res.data);
            setStudent(null)
        } catch (err) {
            console.error(err);
            alert(err.response.data.message);
            setStudent(null)
        }

        // setFinalResult(finalData);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
            <div className="w-full max-w-4xl bg-base-100 shadow-xl p-6 rounded-xl">
                {!student ? (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-4">
                            Add Result
                        </h2>
                        <form onSubmit={handleFetchData} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter Registration No"
                                className="input input-bordered w-full"
                                value={regNo}
                                onChange={(e) => setRegNo(e.target.value)}
                                required
                            />
                            <select
                                className="select select-bordered w-full"
                                value={dept}
                                onChange={(e) => setDept(e.target.value)}
                            >
                                <option value="CSE">CSE</option>
                                <option value="ECE">ECE</option>
                                <option value="BBA">BBA</option>
                            </select>
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
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Fetch Data"}
                            </button>
                            {error && (
                                <p className="text-error text-center">
                                    {error}
                                </p>
                            )}
                        </form>
                    </>
                ) :  (
                    <>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2">
                                Student Information
                            </h3>
                            <p>
                                <b>Name:</b> {student.studentName}
                            </p>
                            <p>
                                <b>Reg No:</b> {student.regNo}
                            </p>
                            <p>
                                <b>Father:</b> {student.fatherName}
                            </p>
                            <p>
                                <b>Mother:</b> {student.motherName}
                            </p>
                            <p>
                                <b>Session:</b> {student.session}
                            </p>
                            <p>
                                <b>Dept:</b> {dept}
                            </p>
                            <p>
                                <b>Semester:</b> {semester}
                            </p>
                        </div>

                        <form onSubmit={handleSubmitResult}>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full text-center">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Title</th>
                                            <th>Assignment (10)</th>
                                            <th>Class Test (10)</th>
                                            <th>Midterm (20)</th>
                                            <th>Final (60)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjects.map((sub) => (
                                            <tr key={sub.code}>
                                                <td>{sub.code}</td>
                                                <td>{sub.title}</td>
                                                {[
                                                    "assignment",
                                                    "classtest",
                                                    "midterm",
                                                    "final",
                                                ].map((f) => (
                                                    <td key={f}>
                                                        <input
                                                            type="number"
                                                            className="input input-bordered w-20"
                                                            value={
                                                                marks[
                                                                    sub.code
                                                                ]?.[f] || ""
                                                            }
                                                            onChange={(e) =>
                                                                handleMarkChange(
                                                                    sub.code,
                                                                    f,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            required
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-success mt-4 w-full"
                            >
                                Generate & Save Result
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddResult;
