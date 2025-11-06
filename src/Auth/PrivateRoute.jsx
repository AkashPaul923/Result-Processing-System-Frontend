import { Navigate } from "react-router";
import { useTeacher } from "./TeacherContext";

const PrivateRoute = ({ children }) => {
    const { teacher, loading } = useTeacher();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!teacher) {
        return <Navigate to="/teacher-login" replace />;
    }

    return children;
};

export default PrivateRoute;
