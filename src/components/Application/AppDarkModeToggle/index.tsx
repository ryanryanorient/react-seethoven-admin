import { SvgIcon } from '@/components/Icon';
import React, { CSSProperties } from 'react'

export default function AppDarkModeToggle(props: { className?: string, isDark?: boolean, style?: CSSProperties }) {
    const { className, isDark, style } = props
    const prefixCls = 'vben-dark-switch'
    const clsName = isDark === true ? `${prefixCls}--dark` : '';
    return (
        <div className={clsName} style={style}>
            <div className={[`${prefixCls}-inner`, className].join(' ')}></div>
            <SvgIcon size="14" name="sun" />
            <SvgIcon size="14" name="moon" />
        </div>
    )
}