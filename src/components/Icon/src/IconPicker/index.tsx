import { useDesign } from '@/hooks/web/useDesign';
import { Empty, Input, Popover } from 'antd'
import React, { useRef, useState } from 'react'
import { useTranslation } from "react-i18next";

import iconsData from './icons.data';
// import svgIcons from 'virtual:svg-icons-names';
import { usePagination } from '@/hooks/web/usePagination';
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard';
import { useMessage } from '@/hooks/web/useMessage';
import { useDebounceFn } from '@/hooks/web/useDebounceFn';
import SvgIcon from '../SvgIcon';
import Icon from '../Icon';

type IconPickerProps = {
    value?: string,
    width?: string,
    pageSize?: number,
    copy?: boolean,
    mode?: 'svg' | 'iconify',
}

const getIcons = () => {
    const data = iconsData as any;
    const prefix: string = data?.prefix ?? '';
    let result: string[] = [];
    if (prefix) {
        result = (data?.icons ?? []).map((item: string) => `${prefix}:${item}`);
    } else if (Array.isArray(iconsData)) {
        result = iconsData as string[];
    }
    return result;
}

const getSvgIcons = () => {
    return new Array<string>()
    //return svgIcons.map((icon: string) => icon.replace('icon-', ''));
}

export default function IconPicker(props: IconPickerProps) {

    const { value, width = '100%', pageSize = 140, copy = false, mode = 'iconify' } = props

    const isSvgMode = mode === 'svg';
    const icons = isSvgMode ? getSvgIcons() : getIcons();

    const { t } = useTranslation();
    const { prefixCls } = useDesign('icon-picker');

    const [visible, setVisible] = useState(false)
    const currentList = useRef(icons)
    const [currentSelect, setCurrentSelect] = useState('')

    const { clipboardRef, isSuccessRef } = useCopyToClipboard(value);
    const { createMessage } = useMessage();



    const { getPaginationList, getTotal, setCurrentPage } = usePagination(
        currentList,
        pageSize,
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleClick = (icon: string) => {
        setCurrentSelect(icon);
        if (props.copy) {
            clipboardRef.current = icon;
            if (isSuccessRef.current) {
                createMessage.success(t('component.icon.copy'));
            }
        }
    }

    const handleSearchChange = (e: ChangeEvent) => {
        const value = e.target.value;
        if (!value) {
            setCurrentPage(1);
            currentList.current = (icons);
            return;
        }
        currentList.current = (icons.filter((item: string) => item.includes(value)));
    }

    const debounceHandleSearchChange = useDebounceFn(handleSearchChange, { wait: 100 });

    const addonAfter = <Popover
        placement='bottomLeft'
        trigger={"click"}
        popupVisible={visible}
        overlayClassName={`${prefixCls}-popover`}
        title={
            <div className='flex justify-between'>
                <Input placeholder={t('component.icon.search')} allowClear onChange={() => debounceHandleSearchChange} />
            </div>}
        content={

            !!getPaginationList.length ? <>
                <div className="border border-solid border-t-0">
                    <ul className="flex flex-wrap px-2">
                        {
                            getPaginationList().map(icon => {
                                return <li
                                    key={icon}
                                    className={[currentSelect === icon ? 'border border-primary' : '', 'p-2 w-1/8 cursor-pointer mr-1 mt-1 flex justify-center items-center border border-solid hover:border-primary'].join(' ')}
                                    onClick={() => handleClick(icon)}
                                    title={icon}
                                >
                                    {
                                        isSvgMode ?
                                            <SvgIcon name={icon} />
                                            :
                                            <Icon icon={icon} />
                                    }
                                </li>
                            })
                        }
                    </ul>
                </div >
                {
                    getTotal() >= pageSize ? <div className="flex py-2 items-center justify-center" v-if="getTotal >= pageSize">
                        <a-pagination
                            showLessItems
                            size="small"
                            pageSize="pageSize"
                            total="getTotal"
                            change="handlePageChange"
                        />
                    </div> : null

                }

            </> : <div className="p-5"><Empty /></div>
        }
    >


    </Popover >

    return (
        <Input disabled style={{ width }} placeholder={t('component.icon.placeholder')} className={prefixCls} value={currentSelect}>
        </Input>
    )
}
