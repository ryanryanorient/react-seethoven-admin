import { MutableRefObject, useRef } from "react";

function pagination<T = any>(list: T[], pageNo: number, pageSize: number): T[] {
    const offset = (pageNo - 1) * Number(pageSize);
    const ret =
        offset + Number(pageSize) >= list.length
            ? list.slice(offset, list.length)
            : list.slice(offset, offset + Number(pageSize));
    return ret;
}

export function usePagination<T = any>(list: MutableRefObject<T[]>, pageSize: number) {
    const currentPage = useRef(1);
    const pageSizeRef = useRef(pageSize);

    const getPaginationList = () => {
        return pagination(list.current, currentPage.current, pageSizeRef.current);
    };

    const getTotal = () => {
        return list.current.length;
    };

    function setCurrentPage(page: number) {
        currentPage.current = page;
    }

    function setPageSize(pageSize: number) {
        pageSizeRef.current = pageSize;
    }

    return { setCurrentPage, getTotal, setPageSize, getPaginationList };
}
