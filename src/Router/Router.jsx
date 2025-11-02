import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ResultView from "../pages/ResultView";
import AddResult from "../pages/AddResult";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/result" element={<ResultView/>} />
                <Route path="/add-result" element={<AddResult/>} />
            </Route>
        </Routes>
    );
};

export default Router;