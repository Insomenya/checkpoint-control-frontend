import { useVerifyTokenMutation } from "@api/auth/authApi";
import { selectToken } from "@store/auth/auth.selectors";
import { useAppSelector } from "@store/store";
import { useEffect } from "react";


export const Verify = () => {
    const token = useAppSelector(selectToken);
    const [verifyToken] = useVerifyTokenMutation();

    useEffect(() => {
        if (token) {
            verifyToken({ token });
        }
    }, []);

    return null;
};
