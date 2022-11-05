import React from 'react'
import logo from '@/assets/logo.png'

import './index.less'
import { t } from 'i18next';
export default function AppLogo(props: React.HTMLAttributes<HTMLDivElement> & { theme?: string, alwaysShowTitle?: boolean, showTitle?: boolean }) {

    const { theme, showTitle } = props

    const prefixCls = 'vben-app-logo'

    const getAppLogoClass = () => [
        prefixCls,
        theme,
        { 'collapsed-show-title': '' },
    ].join(' ');

    const getTitleClass = () => [
        'vben-app-logo__title xs:opacity-0'
    ];

    const goHome = () => {

        //window.location.href = "/"
    }
    return (
        <>
            <div className={['vben-app-logo', '-enter-x', getAppLogoClass()].join(' ')} onClick={goHome} style={{ alignItems: 'center' }}>
                <img src={logo} />
                <div className={['ml-2 truncate md:opacity-100', getTitleClass()].join(' ')}
                    style={{
                        visibility: showTitle === false ? 'hidden' : 'visible',
                        fontWeight: '700',
                        lineHeight: 'normal'
                    }}>
                    {`${t('sys.login.appName')}`}
                </div>
            </div >
        </>
    )
}
