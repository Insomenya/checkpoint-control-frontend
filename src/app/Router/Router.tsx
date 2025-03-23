import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Harness } from "../Harness/Harness";
import { About } from "@/pages";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Harness />} path="/">
                    <Route path="/" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};