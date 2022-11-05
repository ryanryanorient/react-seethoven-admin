import { useDesign } from '@/hooks/web/useDesign';
import { Input } from 'antd'
import { InputRef, PasswordProps } from 'antd/lib/input';
import { omit } from 'lodash-es';
import { type } from 'os'
import React, { useState } from 'react'

import "./index.less";
type StrengthMeterProps = {
    showInput?: boolean,
    onScoreChange?: (score: number) => void
}

const calcScore = (value: string) => {
    if (value)
        return { score: -1 }

    return { score: 1 }
}

export default function StrengthMeter(props: PasswordProps & React.RefAttributes<InputRef> & StrengthMeterProps & HTMLElementProps) {

    const { prefixCls } = useDesign('strength-meter');

    const { disabled, showInput = true, onScoreChange, className, style } = props

    omit(props,)

    const [innerValue, setInnerValue] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInnerValue(event.target.value || '')
    }

    const getPasswordStrength = () => {
        if (disabled) return -1;
        const score = innerValue ? calcScore(innerValue).score : -1;
        onScoreChange?.(score);
        return score;
    };

    return (
        <div className={prefixCls + ' relative'}>
            {
                showInput === true ?
                    <Input.Password
                        {...props}
                        style={style}
                        allowClear
                        defaultValue={innerValue}
                        onChange={handleChange}
                        disabled={disabled}
                    >
                    </Input.Password >
                    : null
            }
            <div className={`${prefixCls}-bar`}>
                <div className={`${prefixCls}-bar--fill`} data-score={getPasswordStrength()}></div>
            </div >
        </div >
    )
}
