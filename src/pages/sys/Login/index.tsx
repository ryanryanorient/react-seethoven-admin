import AppDarkModeToggle from "@/components/Application/AppDarkModeToggle"
import AppLocalePicker from "@/components/Application/AppLocalePicker"
import AppLogo from "@/components/Application/AppLogo"
import { Spin } from "antd";
import { CSSProperties, useState } from "react"
import { useTranslation } from "react-i18next";
import boxBg from '@/assets/login/login-box-bg.svg'
import LoginForm from "./LoginForm";
import ForgetPasswordForm from "./ForgetPasswordForm";
import { LoginStateContext, LoginStateEnum } from "./useLogin";
import MobileForm from "./MobileForm";
import QRCodeForm from "./QRCodeForm";
import RegisterForm from "./RegisterForm";



export default function Login(props: { className?: string, style?: CSSProperties, loading?: boolean }) {

    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)

    const [state, setState] = useState(LoginStateEnum.LOGIN)

    const navigateHomePage = () => {

    }

    return (
        <div {...props} style={{ height: '100vh', width: '100vw' }}>
            <div className="vben-login relative w-full h-full px-4">
                <div className="flex items-center absolute right-4 top-4">
                    <AppDarkModeToggle className="enter-x mr-2" />
                    <AppLocalePicker
                        className="text-white enter-x xl:text-gray-600"
                        v-if="!sessionTimeout && showLocale"
                        showText={true}
                    />
                </div>

                <span className="-enter-x xl:hidden">
                    <AppLogo alwaysShowTitle={true} showTitle />
                </span>

                <div className="container relative h-full py-2 mx-auto sm:px-10">
                    <div className="flex h-full">
                        <div className="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
                            <AppLogo />
                            <div className="my-auto">
                                <img
                                    alt="title"
                                    src={boxBg}
                                    className="w-1/2 -mt-16 -enter-x"
                                />
                                <div className="mt-10 font-medium text-white -enter-x">
                                    <span className="inline-block mt-4 text-3xl">
                                        {`${t('sys.login.signInTitle')}`}
                                    </span>
                                </div>
                                <div className="mt-5 font-normal text-white dark:text-gray-500 -enter-x">
                                    {t('sys.login.signInDesc')}
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
                            <div
                                className="vben-login-form relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
                            >
                                <Spin size='large' spinning={loading}>
                                    <LoginStateContext.Provider value={{ loginState: state, setLoginState: setState }}>
                                        <LoginForm onSuccessLogin={navigateHomePage} />
                                        <ForgetPasswordForm />
                                        <MobileForm />
                                        <QRCodeForm /> 
                                        <RegisterForm />
                                    </LoginStateContext.Provider>
                                </Spin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

