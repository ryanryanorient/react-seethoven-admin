import Icon from '@/components/Icon/src/Icon'
import SDropdown, { DropMenu } from '@/components/SDropdown';
import { localeList } from '@/settings/localeSetting';
import { Menu } from 'antd'
import { omit } from 'lodash-es';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function AppLocalePicker(props: React.HTMLAttributes<HTMLDivElement> & { showText?: boolean, reload?: boolean }) {

    const { i18n } = useTranslation()

    const { showText } = props

    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    const getLocaleText = () => {
        const key = selectedKeys[0];
        if (!key) {
            return '';
        }
        return localeList.find((item) => item.event === key)?.text;
    };

    const menus = () => ({
        items: localeList.map(e => {
            return {
                title: e.text,
                icon: e.icon, key: e.text
            }
        })
    })

    const handleMenuEvent = (menu?: DropMenu) => {
        if (i18n.language === menu?.event) {
            return;
        }
        if (!menu?.event) {
            return
        }

        if (typeof menu.event === 'string')
            i18n.changeLanguage(menu.event)
    }

    return (
        <div {...omit(props, 'showText')}>
            <SDropdown
                placement='bottom'
                trigger={['click']}
                menu={menus()}
                overlayClassName="app-locale-picker-overlay" onMenuEvent={handleMenuEvent}>
                <span className="cursor-pointer flex items-center">
                    <Icon icon="ion:language" />
                    {
                        showText ? <span className="ml-1">{getLocaleText()}</span> : null
                    }
                </span>
            </SDropdown>
        </div>
    )
}
