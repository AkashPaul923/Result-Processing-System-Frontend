import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";



const ResultView = () => {
    const [regNo, setRegNo] = useState("");
    const [semester, setSemester] = useState("First");
    const [resultData, setResultData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(
                `http://localhost:5000/api/student/result?regNo=${regNo}&semester=${semester}`
            );
            setResultData(res.data.result);
        } catch (err) {
            console.log(err);
            setError("Result not found. Please check your Reg No or Semester.");
            // setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // const downloadPDF = () => {
    //     const doc = new jsPDF();
    //     doc.text("Student Result", 14, 15);
    //     doc.text(`Name: ${resultData.studentName}`, 14, 25);
    //     doc.text(`Reg No: ${resultData.regNo}`, 14, 32);
    //     doc.text(`Department: ${resultData.dept}`, 14, 39);
    //     doc.text(`Semester: ${resultData.semester}`, 14, 46);

    //     const tableData = resultData.result.map((sub) => [
    //         sub.code,
    //         sub.title,
    //         sub.credit,
    //         sub.assignment,
    //         sub.classtest,
    //         sub.midterm,
    //         sub.final,
    //         sub.total,
    //         sub.letterGrade,
    //         sub.gradePoint,
    //     ]);

    //     doc.autoTable({
    //         startY: 55,
    //         head: [
    //             [
    //                 "Code",
    //                 "Title",
    //                 "Credit",
    //                 "Assignment",
    //                 "Class Test",
    //                 "Midterm",
    //                 "Final",
    //                 "Total",
    //                 "Letter Grade",
    //                 "GP",
    //             ],
    //         ],
    //         body: tableData,
    //     });

    //     doc.text(
    //         `GPA: ${resultData.GradePointAverage} (${resultData.letterGradeAverage})`,
    //         14,
    //         doc.lastAutoTable.finalY + 10
    //     );
    //     doc.save(`${resultData.regNo}_${resultData.semester}_Result.pdf`);
    // };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header
        doc.setFontSize(18);
        doc.text("Student Result", pageWidth / 2, 15, { align: "center" });

        // Student Info
        doc.setFontSize(12);
        doc.text(`Name: ${resultData.studentName}`, 14, 30);
        doc.text(`Reg No: ${resultData.regNo}`, 14, 37);
        doc.text(`Father: ${resultData.fatherName}`, 14, 44);
        doc.text(`Mother: ${resultData.motherName}`, 14, 51);
        doc.text(`Department: ${resultData.dept}`, 14, 58);
        doc.text(`Semester: ${resultData.semester}`, 14, 65);

        // Table
        const tableColumn = [
            "Code",
            "Title",
            "Credit",
            "Assignment",
            "Class Test",
            "Midterm",
            "Final",
            "Total",
            "Letter Grade",
            "GP",
        ];

        const tableRows = resultData.result.map((sub) => [
            sub.code,
            sub.title,
            sub.credit,
            sub.assignment,
            sub.classtest,
            sub.midterm,
            sub.final,
            sub.total,
            sub.letterGrade,
            sub.gradePoint,
        ]);

        // ✅ Correct jsPDF-autotable syntax
        doc.autoTable({
            startY: 75,
            head: [tableColumn],
            body: tableRows,
            theme: "grid",
            styles: { fontSize: 10 },
            headStyles: { fillColor: [22, 160, 133] },
        });

        // Footer (GPA Summary)
        const finalY = doc.lastAutoTable?.finalY || 80;
        doc.setFontSize(13);
        doc.text(
            `GPA: ${resultData.GradePointAverage} (${resultData.letterGradeAverage})`,
            14,
            finalY + 10
        );

        // Save PDF
        doc.save(`${resultData.regNo}_${resultData.semester}_Result.pdf`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="w-full max-w-4xl bg-base-100 shadow-xl rounded-xl p-6">
                {!resultData ? (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-6">
                            View Your Result
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter Registration No"
                                value={regNo}
                                onChange={(e) => setRegNo(e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                            <select
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                className="select select-bordered w-full"
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
                                {loading ? "Loading..." : "Submit"}
                            </button>
                            {error && (
                                <p className="text-error text-center">
                                    {error}
                                </p>
                            )}
                        </form>
                    </>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-center mb-4">
                            Result Summary
                        </h2>
                        <div className="mb-4 text-base">
                            <p>
                                <strong>Name:</strong> {resultData.studentName}
                            </p>
                            <p>
                                <strong>Reg No:</strong> {resultData.regNo}
                            </p>
                            <p>
                                <strong>Father’s Name:</strong>{" "}
                                {resultData.fatherName}
                            </p>
                            <p>
                                <strong>Mother’s Name:</strong>{" "}
                                {resultData.motherName}
                            </p>
                            <p>
                                <strong>Department:</strong> {resultData.dept}
                            </p>
                            <p>
                                <strong>Semester:</strong> {resultData.semester}
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Title</th>
                                        <th>Credit</th>
                                        <th>Assignment</th>
                                        <th>Class Test</th>
                                        <th>Midterm</th>
                                        <th>Final</th>
                                        <th>Total</th>
                                        <th>Grade</th>
                                        <th>GP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultData.result.map((sub, i) => (
                                        <tr key={i}>
                                            <td>{sub.code}</td>
                                            <td>{sub.title}</td>
                                            <td>{sub.credit}</td>
                                            <td>{sub.assignment}</td>
                                            <td>{sub.classtest}</td>
                                            <td>{sub.midterm}</td>
                                            <td>{sub.final}</td>
                                            <td>{sub.total}</td>
                                            <td>{sub.letterGrade}</td>
                                            <td>{sub.gradePoint}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="font-bold text-lg">
                                GPA: {resultData.GradePointAverage} (
                                {resultData.letterGradeAverage})
                            </p>
                            <button
                                className="btn btn-accent mt-4"
                                onClick={downloadPDF}
                            >
                                Download Result PDF
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultView;