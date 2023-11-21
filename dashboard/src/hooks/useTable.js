"use client";

import { useState, useEffect, useCallback } from 'react';

const calculateTotalPages = (data, rowsPerPage) => {
    const count = Math.ceil(data?.length / rowsPerPage);
    return count || 0;
};

const listPages = (data, rowsPerPage) => {
    const count = Math.ceil(data?.length / rowsPerPage);
    let arr = [];

    for (let i = 1; i <= count; i++) {
        arr.push(i);
    }
    return arr || [];
};

const sliceData = (
    data,
    page,
    rowsPerPage
) => {
    if (data) return data?.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    else return undefined;
};


export const useTable = (data, page, rowsPerPage) => {
    const [tablePages, setTablePages] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [slice, setSlice] = useState([]);

    const calculateTotalPagesAddListOfPagesCallback = useCallback(() => {
        const pages = listPages(data, rowsPerPage);
        setTablePages(pages);

        const count = calculateTotalPages(data, rowsPerPage);
        setPagesCount(count);
    }, [data, rowsPerPage]);

    const sliceDataCallback = useCallback(() => {
        const slice = sliceData(data, page, rowsPerPage);
        slice && setSlice([...slice]);
    }, [data, page, rowsPerPage]);

    useEffect(() => {
        calculateTotalPagesAddListOfPagesCallback();
        sliceDataCallback();
    }, [calculateTotalPagesAddListOfPagesCallback, sliceDataCallback]);

    return { slice, pages: tablePages, count: pagesCount };
}