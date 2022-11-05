import { off } from '@/utils/domUtils'
import React, { Component, createRef } from 'react'
import { BAR_MAP } from './util';



export default class Bar extends Component<{
    vertical: Boolean,
    size: String,
    move: Number,
}> {

    state = { cursorDown: false, barStore: {} as Recordable, thumb: undefined }

    thumbRef = createRef<HTMLDivElement>()

    bar = () => {
        const { vertical } = this.props
        return BAR_MAP[vertical ? 'vertical' : 'horizontal'];
    };

    mouseMoveDocumentHandler = (e: any) => {
        // const { cursorDown, barStore, thumb } = this.state
        // const _bar = this.bar()
        // if (cursorDown === false) return;
        // const prevPage = barStore.value[_bar.axis];

        // if (!prevPage) return;

        // this.
        // const offset =
        //     (instance?.vnode.el?.getBoundingClientRect()[_bar.direction] - e[_bar.client]) *
        //     -1;
        // const thumbClickPosition = this.thumbRef.current?.nodeValue[_bar.offset] - prevPage;
        // const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / instance?.vnode.el?.[bar.value.offset];
        // wrap.value[_bar.scroll] = (thumbPositionPercentage * wrap.value[_bar.scrollSize]) / 100;
    };

    mouseUpDocumentHandler = () => {
        const _bar = this.bar()
        const barStore = {} as Recordable
        barStore[_bar.axis] = 0;
        off(document, 'mousemove', this.mouseMoveDocumentHandler);
        document.onselectstart = null;
        this.setState({ cursorDown: false, barStore: barStore })
    }

    componentWillUnmount(): void {

        off(document, 'mouseup', this.mouseUpDocumentHandler);

    }
    render() {
        return (
            <div>Bar</div>
        )
    }
}

