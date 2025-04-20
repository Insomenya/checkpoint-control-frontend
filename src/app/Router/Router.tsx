import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Harness } from "../Harness/Harness";
import { About, AddUser, Checkpoints, Confirmation, Dashboard, ExpeditionList, ExpeditionStatus, FilteredReport, Login, RegisterExpedition, RegisterGoods, RegisterOrganizations, SetPassword, Users } from "@/pages";
import { ROUTER_PATHS } from "@shared/common/constants";
import ProtectedRoute from "./ProtectedRoute";
import { Verify } from "../Verify/Verify";
import { useAppSelector } from "@store/store";
import { selectVerifyKey } from "@store/common/common.selectors";

export const Router = () => {
    const verifyKey = useAppSelector(selectVerifyKey);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTER_PATHS.LOGIN} element={<Login />} />
                <Route path={`${ROUTER_PATHS.SET_PASSWORD}/:token`} element={<SetPassword />} />
                <Route element={<ProtectedRoute />}>
                    <Route element={<Verify key={verifyKey} />} >
                        <Route element={<Harness />} path={ROUTER_PATHS.ROOT}>
                            <Route
                                path={ROUTER_PATHS.DASHBOARD}
                                element={<ProtectedRoute />}
                            >
                                <Route index element={<Dashboard />} />
                            </Route>
                            <Route
                                path={ROUTER_PATHS.REGISTER_EXPEDITION}
                                element={<ProtectedRoute roles={['logistician']} />}
                            >
                                <Route index element={<RegisterExpedition />} />
                            </Route>
                            <Route
                                path={ROUTER_PATHS.EXPEDITION_LIST}
                                element={<ProtectedRoute roles={['logistician']} />}
                            >
                                <Route index element={<ExpeditionList />} />
                            </Route>
                            <Route
                                path={ROUTER_PATHS.REGISTER_GOODS}
                                element={<ProtectedRoute roles={['logistician']} />}
                            >
                                <Route index element={<RegisterGoods />} />
                            </Route>
                            <Route
                                path={ROUTER_PATHS.REGISTER_ORGANIZATION}
                                element={<ProtectedRoute roles={['logistician']} />}
                            >
                                <Route index element={<RegisterOrganizations />} />
                            </Route>
                            <Route
                                path={ROUTER_PATHS.CONFIRMATION}
                                element={<ProtectedRoute roles={['operator']} />}
                            >
                                <Route index element={<Confirmation />} />
                            </Route>
                            <Route
                                path={ROUTER_PATHS.REPORTS.ROOT + ROUTER_PATHS.REPORTS.SINGLE}
                                element={<ProtectedRoute roles={['operator', 'logistician']} />}
                            >
                                <Route index element={<ExpeditionStatus />} />
                            </Route>
                            <Route
                                path={ROUTER_PATHS.REPORTS.ROOT + ROUTER_PATHS.REPORTS.FILTER}
                                element={<ProtectedRoute roles={['operator', 'logistician']} />}
                            >
                                <Route index element={<FilteredReport />} />
                            </Route>
                            <Route
                                path={ROUTER_PATHS.ADD_USER}
                                element={<ProtectedRoute roles={['admin']} />}
                            >
                                <Route index element={<AddUser />} />
                            </Route>
                            <Route
                                path={ROUTER_PATHS.USERS}
                                element={<ProtectedRoute roles={['admin']} />}
                            >
                                <Route index element={<Users />} />
                            </Route>
                            <Route
                                path={ROUTER_PATHS.CHECKPOINTS}
                                element={<ProtectedRoute roles={['admin']} />}
                            >
                                <Route index element={<Checkpoints />} />
                            </Route>
                            <Route index element={<About />} />
                            <Route path="/*" element={<About />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};