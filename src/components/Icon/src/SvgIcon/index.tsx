import React, { CSSProperties } from 'react'

type SvgIconProps = {
    prefix?: string,
    name: string,
    size?: number | string,
    spin?: boolean,
    className?: string
}

export default function SvgIcon(props: SvgIconProps & CSSProperties) {

    const { prefix = 'icon', className, name, size = 16, spin = false } = props

    const getStyle = () => {
        let s = `${size}`;
        s = `${s.replace('px', '')}px`;
        return {
            width: s,
            height: s,
        };
    }

    const symbolId = () => `#${prefix}-${name}`;

    const prefixCls = 'vben-svg-icon'
    return (
        <svg
            className={[prefixCls, className, spin && 'svg-icon-spin'].join(' ')}
            style={getStyle()}
            aria-hidden={true}
        >
            <use xlinkHref={symbolId()} />
        </svg>
    )
}
