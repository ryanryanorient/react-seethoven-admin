import { Button, Checkbox, Col, Divider, Form, Input, Modal, notification, Row, Select } from 'antd'
import React, { useContext, useState } from 'react'
import { GithubFilled, WechatFilled, AlipayCircleFilled, GoogleCircleFilled, TwitterCircleFilled } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import md5 from 'md5';
import storage from 'store'

import { login } from "@/api/user";
import { ACCESS_TOKEN } from '@/utils/axios/types';
import { LoginStateContext, LoginStateEnum } from '../useLogin';

import '@/assets/styles/login/antd.css'
import '@/assets/styles/login/form.css'
import '@/assets/styles/login/login.css'
import '@/assets/styles/login/row.css'
import LoginFormTitle from '../LoginFormTitle';



export default function LoginForm(props: { onSuccessLogin: VoidFunction } & HTMLElementProps) {

    const { onSuccessLogin, className, style } = props

    const { loginState, setLoginState } = useContext(LoginStateContext)

    const { t } = useTranslation()

    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm()

    const handleLogin = async (values: any) => {
        //const values = await form.validateFields();
        if (!values) return;

        const { username, password, factId } = values

        if (!username || !password) {
            Modal.info({ title: '提示', content: '请输入用户名和密码' })
            return
        }

        // if (!factId) {
        //     Modal.info({ title: '提示', content: '请选择公司' })
        //     return
        // }

        try {
            setLoading(true)
            const { success, data, message } = await login({
                userId: username, password: md5(password), factId
            });
            if (success && data) {
                storage.set(ACCESS_TOKEN, data.token)
                notification.success({
                    message: "登录成功",
                    description: `${'欢迎回来'}: ${data.userName}`,
                    duration: 3,
                });

                setTimeout(() => {
                    onSuccessLogin()
                    //navigate(from, { replace: true });
                }, 300)

            } else {
                throw message
            }
        } catch (error) {
            Modal.error({ title: '错误提示', content: (error as unknown as Error).message || `${error}` || '网络异常，请检查您的网络连接是否正常' })
        } finally {
            setLoading(false)
        }
    }

    const factories = [
        { label: `${t('sys.login.wj')}`, value: 'wj' },
        { label: `${t('sys.login.wf')}`, value: 'wf' },
        { label: `${t('sys.login.vn')}`, value: 'vn' },
    ]

    return (
        <div className={className} style={style}>
            {
                loginState === LoginStateEnum.LOGIN ?
                    <>
                        <LoginFormTitle className="enter-x" />
                        <Form
                            className="p-4 enter-x"
                            form={form}
                            autoComplete="off"
                            onFinish={handleLogin}
                        >
                            <Form.Item name="username" className="enter-x" required>
                                <Input
                                    size="large"
                                    placeholder={t('sys.login.userName')}
                                    className="fix-auto-fill"
                                />
                            </Form.Item>
                            <Form.Item name="password" className="enter-x" required>
                                <Input.Password
                                    size="large"
                                    visibilityToggle
                                    placeholder={t('sys.login.password')}
                                />
                            </Form.Item>
                            <Row className="enter-x">
                                <Col span="12">
                                    <Form.Item>
                                        <Checkbox defaultChecked={rememberMe} onChange={value => setRememberMe(value.target.value)}>
                                            <span style={{ color: '#000000d9', userSelect: 'none' }}>{t('sys.login.rememberMe')}</span>
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span="12">
                                    <Form.Item style={{ textAlign: 'right' }}>
                                        <Button type="link" size="small" onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}>
                                            {t('sys.login.forgetPassword')}
                                        </Button>
                                    </Form.Item >
                                </Col >
                            </Row >

                            <Form.Item className="enter-x">
                                <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                                    {t('sys.login.loginButton')}
                                </Button>
                            </Form.Item >
                            <Row className="enter-x" style={{ rowGap: 0, visibility: 'visible' }}>
                                <Col md={8} xs={24}>
                                    <Button block onClick={() => setLoginState(LoginStateEnum.MOBILE)}>
                                        {t('sys.login.mobileSignInFormTitle')}
                                    </Button>
                                </Col >
                                <Col md={8} xs={24} className="!my-2 !md:my-0 xs:mx-0 md:mx-2">
                                    <Button block onClick={() => setLoginState(LoginStateEnum.QR_CODE)}>
                                        {t('sys.login.qrSignInFormTitle')}
                                    </Button>
                                </Col >
                                <Col md={6} xs={24}>
                                    <Button block onClick={() => setLoginState(LoginStateEnum.REGISTER)}>
                                        {t('sys.login.registerButton')}
                                    </Button>
                                </Col >
                            </Row >

                            <Divider className="enter-x" style={{ visibility: 'visible' }}>其他登录方式</Divider>

                            <div className="flex justify-evenly enter-x vben-login-sign-in-way " style={{ visibility: 'visible' }} >
                                <GithubFilled />
                                <WechatFilled size={22} />
                                <AlipayCircleFilled size={22} />
                                <GoogleCircleFilled size={22} />
                                <TwitterCircleFilled size={22} />
                            </div>
                        </Form>
                    </> : null
            }


        </div >
    )
}
