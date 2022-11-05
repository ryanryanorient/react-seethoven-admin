import CountdownInput from '@/components/CountDown/CountdownInput'
import QRCode from '@/components/QRCode'
import { Button, Divider, Form, Input, message, Spin } from 'antd'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LoginFormTitle from '../LoginFormTitle'
import { LoginStateContext, LoginStateEnum } from '../useLogin'

export default function QRCodeForm(props: HTMLElementProps) {

  const { className, style } = props

  const qrCodeUrl = 'https://vvbin.cn/next/login';

  const { loginState, setLoginState } = useContext(LoginStateContext)
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)

  const handleBackLogin = () => {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return <>
    {
      loginState === LoginStateEnum.QR_CODE ?
        <div className={className} style={style}>
          <Spin spinning={loading}>
            <LoginFormTitle className="enter-x" />
            <div className="enter-x min-w-64 min-h-64">
              <QRCode
                value={qrCodeUrl}
                className="enter-x flex justify-center xl:justify-start"
                width={280}
              />
              <Divider className="enter-x">{t('sys.login.scanSign')}</Divider>
              <Button size="large" block className="mt-4 enter-x" onClick={handleBackLogin}>
                {t('sys.login.backSignIn')}
              </Button>
            </div>
          </Spin>
        </div>
        : null
    }
  </>

}
