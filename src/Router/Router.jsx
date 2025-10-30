import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ResultView from "../pages/ResultView";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/result" element={<ResultView/>} />
            </Route>
        </Routes>
    );
};

export default Router;