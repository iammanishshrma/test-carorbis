import React, { useEffect, useRef, useState } from "react";
import "./SearchHeaderPopup.scss";
import { AutoComplete } from "primereact/autocomplete";
import useOutsideClick from "@/shared/hooks/outsideClickHandler";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

const listItems = [1, 2, 3, 4, 5];

const SearchHeaderPopup = ({ setInputPopup }) => {
    const [listItemInFocus, setListItemInFocus] = useState(null);
    const [inputVal, setInputVal] = useState("");
    const [isListShowing, setIsListShowing] = useState(false);
    const buttonRef = useRef();
    const listRef = useRef();

    useOutsideClick(listRef, () => {
        setIsListShowing(false);
    });

    const keyDownHandler = (event) => {
        // change focus on escape key
        if (event.keyCode === 27) {
            setIsListShowing(false);
            buttonRef.current.focus();
        }

        // to prevent cursor movement inside input on up/down arrow
        if (event.keyCode === 38) {
            event.preventDefault();
        } else if (event.keyCode === 40) {
            event.preventDefault();
        }

        if (event.keyCode === 38 && listItemInFocus > 0) {
            //for up key
            setListItemInFocus((prev) => prev - 1);
            setInputVal(listItems[listItemInFocus - 1]);
        } else if (event.keyCode === 38 && listItemInFocus === null) {
            setInputVal(listItems[listItems.length - 1]);
            setListItemInFocus(listItems.length - 1);
        } else if (event.keyCode === 38 && listItemInFocus === null) {
            setInputVal(listItems[listItems.length - 1]);
        } else if (
            event.keyCode === 40 &&
            listItemInFocus < listItems.length - 1
        ) {
            //for key down
            if (listItemInFocus === null) {
                setListItemInFocus(0);
                setInputVal(listItems[0]);
            } else if (listItemInFocus === 0) {
                setListItemInFocus(1);
                setInputVal(listItems[1]);
            } else {
                setInputVal(listItems[listItemInFocus + 1]);
                setListItemInFocus((prev) => prev + 1);
            }
        } else if (event.keyCode === 13 && isListShowing) {
            // to handle enter key down
            setInputVal(listItems[listItemInFocus]);
        } else if (event.keyCode === 38 && listItemInFocus === 0) {
            // to move the focus to the bottom element whenever the focus is on first element and user pressed up key
            setListItemInFocus(null);
        }

        // to move the focus to the top element whenever the focus is on last element and user pressed down key
        if (
            listItemInFocus + 2 === listItems.length + 1 &&
            event.keyCode === 40
        ) {
            setListItemInFocus(null);
        }
    };

    const inputValChangeHanlder = (event) => {
        setInputVal(event.target.value);
        setSelectedCountry1(event.value);
        if (event.target.value.length > 0) {
            setIsListShowing(false);
            setListItemInFocus(0);
        } else {
            setIsListShowing(true);
        }
    };

    const listItemClickHandler = (event) => {
        setInputVal(event.target.value);
        setListItemInFocus(listItems.indexOf(event.target.value));
    };

    const inputElementFocusHandler = () => {
        if (inputVal.length === 0) {
            setIsListShowing(true);
        }
    };

    const setCountries1 = [
        {
            name: "C",
            year: 1972,
        },
        {
            name: "Elm",
            year: 2012,
        },
        {
            name: "Elm2",
            year: 2012,
        },
    ];
    const [selectedCountry1, setSelectedCountry1] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState(null);
    const [selectedDrop, setSelectedDrop] = useState();
    const DropdownValue = [
        { name: "All" },
        { name: "New York" },
        { name: "Rome" },
        { name: "London" },
        { name: "Istanbul" },
        { name: "Paris" },
    ];
    const onDropChange = (e) => {
        setSelectedDrop(e.value);
    };
    const searchCountry = (event) => {
        setTimeout(() => {
            let _filteredCountries;
            if (!event.query.trim().length) {
                _filteredCountries = [...setCountries1];
            } else {
                _filteredCountries = setCountries1.filter((country) => {
                    return country.name
                        .toLowerCase()
                        .startsWith(event.query.toLowerCase());
                });
            }

            setFilteredCountries(_filteredCountries);
        }, 250);
    };

    return (
        <div className="new-search-header">
            <div className="popup-search-header">
                <button
                    onClick={() => setInputPopup(false)}
                    className="search-back"
                    aria-label="Go back"
                    role="button"
                >
                    <i className="icon-back"></i>
                </button>
                <div className="search-header" ref={listRef}>
                    {/* <div className="select-box">
                        <Dropdown value={selectedDrop} options={DropdownValue} onChange={onDropChange} optionLabel="name" placeholder="All" />
                    </div> */}
                    <div className="search-input">
                        <AutoComplete
                            // value={selectedCountry1}
                            suggestions={filteredCountries}
                            completeMethod={searchCountry}
                            value={inputVal}
                            onKeyDown={keyDownHandler}
                            onChange={inputValChangeHanlder}
                            onFocus={inputElementFocusHandler}
                            field="name"
                            aria-label="Countries"
                            id="open-input"
                            placeholder="Search by part name, part number, vehicle, brands"
                        />
                    </div>
                    <div className="search-icon">
                        <input ref={buttonRef} type="submit" value="Submit" />
                    </div>
                </div>
            </div>
            <ul className={"list"}>
                <h3>Recently Searched</h3>
                <div className="recent-search-wrpper">
                    <ul className="recent-search-list">
                        <li>Hyundai</li>
                        <li>Maruti</li>
                        <li>Mahindra</li>
                        <li>Hyundai search</li>
                        <li>Maruti testing</li>
                        <li>Mahindra</li>
                    </ul>
                </div>
                <h3>Frequently Searched Items</h3>
                {/* {listItems.map((item, index) => (
                    <li
                        className={`listItem ${listItemInFocus === index ? 'listItemActive' : ''}`}
                        key={index}
                        value={item}
                        onClick={listItemClickHandler}
                    >
                        {item}
                        <button type="button" className="cross-btn">
                            <i className="icon-cross"></i>
                        </button>
                    </li>
                ))} */}
                <div className="recent-search-wrpper">
                    <ul className="recent-search-list">
                        <li>Hyundai</li>
                        <li>Maruti</li>
                        <li>Mahindra</li>
                        <li>Hyundai</li>
                        <li>Maruti</li>
                        <li>Mahindra</li>
                    </ul>
                </div>
            </ul>
        </div>
    );
};
export default SearchHeaderPopup;
