import React, { Component, useEffect, useRef } from 'react'
import { toDataURL } from 'qrcode';
import { LogoType, QRCodeRenderersOptions, toCanvas } from './qrcodePlus'
import { downloadByUrl } from '@/utils/file/download';

type QRCodeProps = {
    value?: string | Array<any>
    options?: QRCodeRenderersOptions,
    width?: number,
    logo?: Partial<LogoType> | string,
    tag?: 'canvas' | 'img',
    onDone?: (event: { url: string, ctx: CanvasRenderingContext2D | null }) => void,
    onError?: (error: unknown) => void
}

export default function QRCode(props: QRCodeProps) {
    const { value, options = {}, width = 200, logo = '', tag = 'canvas', onDone, onError } = props

    const wrapRef = useRef<HTMLCanvasElement | HTMLImageElement | null>(null)

    const createQrcode = async () => {

        try {
            const renderValue = String(value);
            const wrapEl = wrapRef.current;
            if (!wrapEl) return

            if (tag === 'canvas') {
                const url: string = await toCanvas({
                    canvas: wrapEl,
                    width,
                    logo: logo as any,
                    content: renderValue,
                    options: options || {},
                });
                onDone?.({ url, ctx: (wrapEl as HTMLCanvasElement).getContext('2d') })
                return;
            } else if (tag === 'img') {
                const url = await toDataURL(renderValue, {
                    errorCorrectionLevel: 'H',
                    width,
                    ...options,
                });

                (wrapRef.current as HTMLImageElement).src = url
                onDone?.({ url, ctx: null })
            }
        } catch (error) {
            onError?.(error)
        }



    }

    const TagEle = React.createElement(tag, { ref: wrapRef })

    const download = (fileName?: string) => {
        let url = '';
        const wrapEl = wrapRef.current;
        if (wrapEl instanceof HTMLCanvasElement) {
            url = wrapEl.toDataURL();
        } else if (wrapEl instanceof HTMLImageElement) {
            url = wrapEl.src;
        }
        if (!url) return;
        downloadByUrl({
            url,
            fileName,
        });
    }

    useEffect(() => {
        createQrcode()
    }, [props])
    return (
        <div>
            {
                TagEle
            }
        </div>
    )
}
