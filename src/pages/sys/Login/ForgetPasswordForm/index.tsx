import CountdownInput from '@/components/CountDown/CountdownInput';
import { Button, Form, Input } from 'antd'
import React, { useContext, useState } from 'react'
import { useTranslation } from "react-i18next";
import LoginFormTitle from '../LoginFormTitle';
import { LoginStateContext, LoginStateEnum } from '../useLogin';
const { Item: FormItem } = Form


export default function ForgetPasswordForm(props: HTMLElementProps) {

    const { className, style } = props
    const { loginState, setLoginState } = useContext(LoginStateContext)

    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm()

    const handleReset = () => {
        form.resetFields()
    }

    return (
        <>
            {
                loginState === LoginStateEnum.RESET_PASSWORD ?
                    <>
                        <LoginFormTitle className="enter-x" />
                        <Form className="p-4 enter-x"  >
                            <FormItem name="account" className="enter-x">
                                <Input
                                    size="large"
                                    placeholder={t('sys.login.userName')}
                                />
                            </FormItem>

                            <FormItem name="mobile" className="enter-x">
                                <Input size="large" placeholder={t('sys.login.mobile')} />
                            </FormItem>
                            <FormItem name="sms" className="enter-x">
                                <CountdownInput
                                    size="large"
                                    placeholder={t('sys.login.smsCode')}
                                />
                            </FormItem>

                            <FormItem className="enter-x">
                                <Button type="primary" size="large" block onClick={handleReset} loading={loading}>
                                    {t('common.resetText')}
                                </Button>
                                <Button size="large" block className="mt-4" onClick={() => setLoginState(LoginStateEnum.LOGIN)}>
                                    {t('sys.login.backSignIn')}
                                </Button>
                            </FormItem >
                        </Form >
                    </>
                    : null
            }
        </>
    )
}
