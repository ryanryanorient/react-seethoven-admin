import { Button, ButtonProps } from 'antd'
import { omit } from 'lodash-es';
import { type } from 'os';
import React, { useMemo, useState } from 'react'
import { useTranslation } from "react-i18next";
import { useCountdown } from './useCountdown';

type CountButtonProps = {
    value?: Object | number | string | Array<any>,
    count?: number,
    beforeStart?: () => Promise<boolean>
};

export default function CountButton(props: CountButtonProps & ButtonProps & React.RefAttributes<HTMLElement>) {
    const { value, count = 60, beforeStart } = props
    const { t } = useTranslation()

    const [loading, setLoading] = useState(false)

    const { currentCount, isStart, start, reset } = useCountdown(count);

    const handleStart = async () => {
        if (beforeStart) {
            setLoading(true)
            try {
                const canStart = await beforeStart()

                canStart && start()

            } catch (error) {

            } finally {
                setLoading(false)
            }
        }
    }

    const getButtonText = useMemo(() => {
        return !isStart
            ? t('component.countdown.normalText')
            : t('component.countdown.sendText', [currentCount]);
    }, [currentCount]);

    return (
        <Button {...omit(props, "beforeStart")} disabled={isStart} onClick={handleStart} loading={loading}>
            {getButtonText}
        </Button>
    )
}
