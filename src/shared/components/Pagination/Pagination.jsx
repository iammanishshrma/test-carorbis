import React, { useEffect, useRef, useState } from "react";

import { Paginator } from "primereact/paginator";

import "./Pagination.scss";
import { useSelector } from "react-redux";
const Pagination = (props) => {
    const filters = useSelector((state) => state.filterSlice);
    const paginationRef = useRef();
    const [customFirst3, setCustomFirst3] = useState(0);
    const [customRows3, setCustomRows3] = useState(props.limit);

    const [GetLastItems, setLastItems] = useState(0);
    const [page, setPage] = useState(0);

    const onCustomPageChange3 = (event) => {
        setCustomFirst3(event.first);
        setCustomRows3(event.rows);
        setPage(event.page);
    };
    props.OnPageChange({
        customFirst3,
        GetLastItems,
        page,
    });

    useEffect(() => {
        setPage(0);
        setCustomFirst3(0);
    }, [filters]);
    const template3 = {
        layout: "PrevPageLink PageLinks NextPageLink CurrentPageReport",
        PrevPageLink: (options) => {
            return (
                <button
                    type="button"
                    className={options.className}
                    onClick={options.onClick}
                    disabled={options.disabled}
                    aria-label="Prev"
                    role="button"
                >
                    <span className="p-3">Prev</span>
                </button>
            );
        },
        NextPageLink: (options) => {
            return (
                <button
                    type="button"
                    className={options.className}
                    onClick={options.onClick}
                    disabled={options.disabled}
                    aria-label="Next"
                    role="button"
                >
                    <span className="p-3">Next</span>
                </button>
            );
        },
        CurrentPageReport: (options) => {
            useEffect(() => {
                setLastItems(options.last);
            }, [options]);
            return (
                <span className="pagination-wrap">
                    <div className="page-count">
                        Page {options.currentPage} of {options.totalPages}
                    </div>
                </span>
            );
        },
    };
    return (
        <div className="pagination-main-wrap">
            <Paginator
                ref={paginationRef}
                template={template3}
                first={customFirst3}
                rows={customRows3}
                totalRecords={props.totalRecords}
                onPageChange={onCustomPageChange3}
                className="justify-content-start my-3"
            ></Paginator>
        </div>
    );
};

export default Pagination;
