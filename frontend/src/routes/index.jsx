import { Routes, Route } from "react-router-dom";
import LayoutDefault from "../Layout/LayoutDefault/LayoutDefault.jsx"
import Home from "../pages/Home/Home.jsx";
import MajorSuggestion from "../pages/MajorSuggestion/MajorSuggestion.jsx";
import FindSchool from "../pages/FindSchool/FindSchool.jsx";
import ChatAI from "../pages/ChatAI/ChatAI.jsx";


const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutDefault />}>
                    <Route path="" element={<Home />} />
                    <Route path="/major-suggestion" element={<MajorSuggestion />} />
                    <Route path="/find-school" element={<FindSchool />} />

                </Route>
                    <Route path="/chatAI" element={<ChatAI />} />

            </Routes>
        </>
    )
}
export default AppRoutes;
