import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ResultView from "../pages/ResultView";
import AddResult from "../pages/AddResult";
import AddStudent from "../pages/AddStudent";
import AddCourse from "../pages/AddCourse";
import AddTeacher from "../pages/AddTeacher";
import TeacherLogin from "../pages/TeacherLogin";
import TeacherRegister from "../pages/TeacherRegister";
import PrivateRoute from "../Auth/PrivateRoute";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<ResultView />} />
                <Route path="/teacher-login" element={<TeacherLogin />} />
                <Route path="/teacher-register" element={<TeacherRegister />} />
                <Route
                    path="/add-result"
                    element={
                        <PrivateRoute>
                            <AddResult />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add-student"
                    element={
                        <PrivateRoute>
                            <AddStudent />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add-course"
                    element={
                        <PrivateRoute>
                            <AddCourse />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add-teacher"
                    element={
                        <PrivateRoute>
                            <AddTeacher />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default Router;
