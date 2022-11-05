import CountdownInput from '@/components/CountDown/CountdownInput'
import StrengthMeter from '@/components/StrengthMeter'
import { Button, Checkbox, Form, Input, message, Spin } from 'antd'
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

    const handleRegister = () => {

    }

    return <>
        {
            loginState === LoginStateEnum.REGISTER ?
                <div className={className} style={style}>
                    <LoginFormTitle className="enter-x" />
                    <Form className="p-4 enter-x">
                        <Form.Item name="account" className="enter-x">
                            <Input
                                className="fix-auto-fill"
                                size="large"
                                placeholder={t('sys.login.userName')}
                            />
                        </Form.Item>
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
                        <Form.Item name="password" className="enter-x">
                            <StrengthMeter
                                size="large"
                                placeholder={t('sys.login.password')}
                            />
                        </Form.Item>
                        <Form.Item name="confirmPassword" className="enter-x">
                            <Input.Password
                                size="large"
                                visibilityToggle
                                placeholder={t('sys.login.confirmPassword')}
                            />
                        </Form.Item>

                        <Form.Item className="enter-x" name="policy" valuePropName='checked'>
                            <Checkbox size="small">
                                {t('sys.login.policy')}
                            </Checkbox>
                        </Form.Item>

                        <Button
                            type="primary"
                            className="enter-x"
                            size="large"
                            block
                            onClick={handleRegister}
                            loading={loading}
                        >
                            {t('sys.login.registerButton')}
                        </Button>
                        <Button size="large" block className="mt-4 enter-x" onClick={handleBackLogin}>
                            {t('sys.login.backSignIn')}
                        </Button>
                    </Form >
                </div>
                : null

        }
    </>

}
