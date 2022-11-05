import CountdownInput from '@/components/CountDown/CountdownInput'
import { Button, Form, Input, message, Spin } from 'antd'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LoginFormTitle from '../LoginFormTitle'
import { LoginStateContext, LoginStateEnum } from '../useLogin'

export default function MobileForm(props: HTMLElementProps) {

    const { className, style } = props

    const { loginState, setLoginState } = useContext(LoginStateContext)
    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)

    const handleLogin = () => {

        setLoading(true)
        try {

        } catch (error) {
            message.error('ERROR:' + error)
        } finally {
            setLoading(false)
        }

    }

    const handleBackLogin = () => {
        setLoginState(LoginStateEnum.LOGIN)
    }

    return <>
        {
            loginState === LoginStateEnum.MOBILE ?
                <div className={className} style={style}>
                    <Spin spinning={loading}>
                        <LoginFormTitle className="enter-x" />
                        <Form className="p-4 enter-x" model="formData" rules="getFormRules">
                            <Form.Item name="mobile" className="enter-x">
                                <Input
                                    size="large"
                                    placeholder={t('sys.login.mobile')}
                                    className="fix-auto-fill"
                                />
                            </Form.Item>
                            <Form.Item name="sms" className="enter-x">
                                <CountdownInput
                                    size="large"
                                    className="fix-auto-fill"
                                    placeholder={t('sys.login.smsCode')}
                                />
                            </Form.Item>

                            <Form.Item className="enter-x">
                                <Button type="primary" size="large" block onClick={handleLogin} loading={loading}>
                                    {t('sys.login.loginButton')}
                                </Button>
                                <Button size="large" block className="mt-4" onClick={handleBackLogin}>
                                    {t('sys.login.backSignIn')}
                                </Button>
                            </Form.Item >
                        </Form >
                    </Spin>
                </div>
                : null

        }
    </>

}
