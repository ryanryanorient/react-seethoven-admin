import { Input } from 'antd'
import { omit } from 'lodash-es';
import React from 'react'
import styled from "styled-components";
import CountButton from '../CountButton'
type SizeType = 'small' | 'middle' | 'large' | undefined;
type CountdownInputProps = {
    value?: string;
    size?: SizeType,
    count?: number,
    sendCodeApi?: () => Promise<boolean>
}

const Layout = styled.div`
    .ant-input-group-addon {
      padding-right: 0;
      background-color: transparent;
      border: none;

      button {
        font-size: 14px;
      }
    }
`

export default function CountdownInput(props: CountdownInputProps) {

    const { value, size, count = 60, sendCodeApi } = props

    const addonAfter = <CountButton size={size} count={count} beforeStart={sendCodeApi} />
    return (
        <Layout>
            <Input addonAfter={addonAfter} {...omit(props, "addonAfter")}></Input>
        </Layout>
    )
}
