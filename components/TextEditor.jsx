import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

const TextEditor = ({ data, setDataEditor }) => {
    const CKTextEditor = useMemo(() => dynamic(() => import("./CKTextEditor"), { ssr: false }), [])

    return (
        <>
            <CKTextEditor data={data} setDataEditor={setDataEditor} />
        </>
    )
}

export default TextEditor

