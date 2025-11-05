import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ResultView from "../pages/ResultView";
import AddResult from "../pages/AddResult";
import AddStudent from "../pages/AddStudent";
import AddCourse from "../pages/AddCourse";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/result" element={<ResultView/>} />
                <Route path="/add-result" element={<AddResult/>} />
                <Route path="/add-student" element={<AddStudent/>} />
                <Route path="/add-course" element={<AddCourse/>} />
            </Route>
        </Routes>
    );
};

export default Router;