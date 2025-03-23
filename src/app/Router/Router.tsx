import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Harness } from "../Harness/Harness";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Harness />} path="/">
                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
};