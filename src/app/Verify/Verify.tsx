import { useGetUserDataQuery } from "@api/auth/authApi";
import { FullscreenLoader } from "@shared/common/molecules";
import { logout, userDataSet } from "@store/auth/auth.slice";
import { useAppDispatch } from "@store/store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "@shared/common/constants";

export const Verify = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {data: userData, isUninitialized, isLoading, isError} = useGetUserDataQuery(null);

    useEffect(() => {
        if (!isLoading && !isError && !isUninitialized && userData) {
            dispatch(userDataSet(userData));
        }
    }, [isLoading, userData]);

    useEffect(() => {
        if (isError) {
            dispatch(logout());
            navigate(ROUTER_PATHS.ROOT + ROUTER_PATHS.LOGIN);
        }
    }, [isError]);

    if (isLoading || isUninitialized) {
        return <FullscreenLoader />;
    } else if (isError) {

        return <FullscreenLoader />;
    } else {
        return <Outlet />;
    }
};
