import { isString } from '@/utils/is';
import React, { CSSProperties } from 'react'
import SvgIcon from '../SvgIcon'

const SVG_END_WITH_FLAG = '|svg';
export default function Icon(props: { icon: string, color?: string, size?: string | number, spin?: boolean, prefix?: string, className?: string }) {

    const { size, icon, color, spin, className } = props

    const isSvgIcon = icon?.endsWith(SVG_END_WITH_FLAG);
    const getSvgIcon = icon.replace(SVG_END_WITH_FLAG, '');

    const getWrapStyle = (): CSSProperties => {
        const { size, color } = props;
        let fs = size;
        if (isString(size)) {
            fs = parseInt(size, 10);
        }

        return {
            fontSize: `${fs}px`,
            color: color,
            display: 'inline-flex',
        };
    };
    return (
        <>
            <SvgIcon
                size={size}
                name={getSvgIcon}
                v-if={isSvgIcon}
                className={[className, 'anticon'].join(' ')}
                spin={spin}
            />
            <span
                className={[className, 'app-iconify anticon', spin && 'app-iconify-spin'].join(' ')}
                style={getWrapStyle()}
            ></span>
        </>
    )
}
