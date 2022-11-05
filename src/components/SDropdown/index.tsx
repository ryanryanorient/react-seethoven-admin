import React, { ReactNode } from 'react'
import { omit } from 'lodash-es';
import { isFunction } from '@/utils/is';
import { Dropdown, DropdownProps, Menu, MenuProps, Popconfirm } from 'antd';
import Icon from '../Icon/src/Icon';

declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
}
declare type Recordable<T = any> = Record<string, T>;
export interface DropMenu {
    onClick?: Fn;
    to?: string;
    icon?: string;
    event: string | number;
    text: string;
    disabled?: boolean;
    divider?: boolean;
}

type SDropdownProps = {
    popconfirm?: boolean
    trigger?: ('click' | 'hover' | 'contextMenu')[],
    dropMenuList?: (DropMenu & Recordable)[],
    selectedKeys?: string[],
    onMenuEvent?: (menu?: DropMenu) => void,
    children?: ReactNode
}

export default function SDropdown(props: SDropdownProps & DropdownProps) {

    const { dropMenuList = [], selectedKeys = [], onMenuEvent, popconfirm = false } = props

    const handleClickMenu = (item: DropMenu) => {
        const { event } = item;
        const menu = dropMenuList.find((item) => `${item.event}` === `${event}`);
        onMenuEvent?.(menu);
        item.onClick?.();
    }

    const getPopConfirmAttrs = (attrs: any) => {
        const originAttrs = omit(attrs, ['confirm', 'cancel', 'icon']);
        if (!attrs.onConfirm && attrs.confirm && isFunction(attrs.confirm))
            originAttrs['onConfirm'] = attrs.confirm;
        if (!attrs.onCancel && attrs.cancel && isFunction(attrs.cancel))
            originAttrs['onCancel'] = attrs.cancel;
        return originAttrs;
    };

    const getAttr = (key: string | number) => ({ key });



    const menuItems = () => {

        const arr: any[] = []

        for (let index = 0; index < dropMenuList.length; index++) {
            const item = dropMenuList[index];
            const menuItem =
                <Menu.Item  {...getAttr(item.event)} onClick={() => handleClickMenu(item)} disabled={item.disabled} key={`d-${item.event}`} >

                    {
                        popconfirm && item.popConfirm ?
                            <Popconfirm
                                title={item.popConfirm.title}
                                {...getPopConfirmAttrs(item.popConfirm)}
                                icon={
                                    item.popConfirm.icon ? <Icon icon={item.popConfirm.icon} /> : undefined

                                }>

                                <div>
                                    {item.icon ? <Icon icon={item.icon} /> : null}
                                    <span className="ml-1">{item.text}</span>
                                </div>
                            </Popconfirm>
                            :
                            <>
                                {item.icon ? <Icon icon={item.icon} /> : null}
                                <span className="ml-1">{item.text}</span>
                            </>
                    }

                </Menu.Item>

            arr.push(menuItem)
            if (item.divider) {
                arr.push(<Menu.Divider key={`d-${item.event}`}></Menu.Divider>)
            }
        }

        return arr;
    }
    const menu: MenuProps = { items: menuItems() }

    return (
        <Dropdown  {...props} menu={menu}>

        </Dropdown>
    )
}
