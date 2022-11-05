import { createContext, SetStateAction } from "react";

export enum LoginStateEnum {
    LOGIN,
    REGISTER,
    RESET_PASSWORD,
    MOBILE,
    QR_CODE,
}

type LoginState = {
    loginState: LoginStateEnum, setLoginState: (value: SetStateAction<LoginStateEnum>) => void
}
const defaultLoginStateContext: LoginState = { loginState: LoginStateEnum.LOGIN, setLoginState: () => { } }
export const LoginStateContext = createContext<LoginState>(defaultLoginStateContext);
