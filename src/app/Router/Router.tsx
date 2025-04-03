import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Harness } from "../Harness/Harness";
import { About, AddUser, CheckpointZoneLink, Confirmation, ExpeditionStatus, FilteredReport, Login, RegisterExpedition, RegisterGoods, RegisterOrganizations, Users } from "@/pages";
import { ROUTER_PATHS } from "@shared/constants";
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
                <Route element={<ProtectedRoute />}>
                    <Route element={<Verify key={verifyKey} />} >
                        <Route element={<Harness />} path={ROUTER_PATHS.ROOT}>
                            <Route
                                path={ROUTER_PATHS.REGISTER_EXPEDITION}
                                element={<ProtectedRoute roles={['logistician']} />}
                            >
                                <Route index element={<RegisterExpedition />} />
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
                                element={<ProtectedRoute roles={['operator']} />}
                            >
                                <Route index element={<ExpeditionStatus />} />
                            </Route>
                            <Route
                                path={ROUTER_PATHS.REPORTS.ROOT + ROUTER_PATHS.REPORTS.FILTER}
                                element={<ProtectedRoute roles={['operator']} />}
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
                                path={ROUTER_PATHS.CHECKPOINT_ZONE_LINK}
                                element={<ProtectedRoute roles={['admin']} />}
                            >
                                <Route index element={<CheckpointZoneLink />} />
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