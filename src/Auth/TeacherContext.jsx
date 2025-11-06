import React, { createContext, useState, useEffect, useContext } from "react";

// Create Context
const TeacherContext = createContext();

// Provider Component
export const TeacherProvider = ({ children }) => {
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Load teacher data from localStorage when app loads
    useEffect(() => {
        const storedTeacher = localStorage.getItem("teacher");
        if (storedTeacher) {
            try {
                const parsedData = JSON.parse(storedTeacher);
                setTeacher(parsedData);
            } catch (error) {
                console.error(
                    "Error parsing teacher data from localStorage:",
                    error
                );
                localStorage.removeItem("teacher");
            }
        }
        setLoading(false);
    }, []);
    console.log(teacher);

    // 🔹 Save teacher data (e.g., after login)
    const loginTeacher = (teacherData) => {
        setTeacher(teacherData);
        localStorage.setItem("teacher", JSON.stringify(teacherData));
    };

    // 🔹 Logout teacher and clear storage
    const logoutTeacher = () => {
        setTeacher(null);
        localStorage.removeItem("teacher");
    };

    return (
        <TeacherContext.Provider
            value={{ teacher, loading, loginTeacher, logoutTeacher }}
        >
            {children}
        </TeacherContext.Provider>
    );
};

// Custom Hook for easy access
// eslint-disable-next-line react-refresh/only-export-components
export const useTeacher = () => useContext(TeacherContext);
