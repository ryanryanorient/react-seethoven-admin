import React, { useContext, useMemo } from 'react'
import { useTranslation } from "react-i18next";
import { LoginStateEnum,LoginStateContext } from '../useLogin';

export default function LoginFormTitle() {
    const { t } = useTranslation()



    const { loginState,setLoginState } = useContext(LoginStateContext);
    const getFormTitle = useMemo(() => {
        const titleObj = {
            [LoginStateEnum.RESET_PASSWORD]: t('sys.login.forgetFormTitle'),
            [LoginStateEnum.LOGIN]: t('sys.login.signInFormTitle'),
            [LoginStateEnum.REGISTER]: t('sys.login.signUpFormTitle'),
            [LoginStateEnum.MOBILE]: t('sys.login.mobileSignInFormTitle'),
            [LoginStateEnum.QR_CODE]: t('sys.login.qrSignInFormTitle'),
        };
        return titleObj[loginState];
    }, [loginState]);

    return (
        <h2 className="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
            {getFormTitle}
        </h2>
    )
}
