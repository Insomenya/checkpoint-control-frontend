import { useGetUserDataQuery } from "@api/auth/authApi";
import { FullscreenLoader } from "@shared/common/molecules";
import { logout, userDataSet } from "@store/auth/auth.slice";
import { useAppDispatch } from "@store/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const Verify = () => {
    const dispatch = useAppDispatch();
    const {data: userData, isUninitialized, isLoading, isError} = useGetUserDataQuery(null);

    useEffect(() => {
        if (!isLoading && !isError && !isUninitialized) {
            dispatch(userDataSet(userData));
        }
    }, [isLoading]);

    useEffect(() => {
        if (isError) {
            dispatch(logout());
        }
    }, [isError]);

    if (isLoading || isUninitialized || isError) {
        return <FullscreenLoader />;
    } else {
        return <Outlet />;
    }
};
