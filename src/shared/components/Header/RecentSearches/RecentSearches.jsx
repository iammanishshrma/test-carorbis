import React, { useRef, useState } from 'react';
import classes from './Dropdown.module.css';
import useOutsideClick from '../hooks/outsideClickHandler';

const listItems = [1, 2, 3, 4, 5];

const RecentSearches = () => {
    const [listItemInFocus, setListItemInFocus] = useState(null);
    const [inputVal, setInputVal] = useState('');
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
        } else if (event.keyCode === 40 && listItemInFocus < listItems.length - 1) {
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
        if (listItemInFocus + 2 === listItems.length + 1 && event.keyCode === 40) {
            setListItemInFocus(null);
        }
    };

    const inputValChangeHanlder = (event) => {
        setInputVal(event.target.value);
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

    // const inputElementBlurHandler = () => {
    //   setIsListShowing(false);
    // };
    return (
        <div ref={listRef} style={{ background: '#abc9ab' }}>
            <input
                type="text"
                value={inputVal}
                onKeyDown={keyDownHandler}
                onChange={inputValChangeHanlder}
                onFocus={inputElementFocusHandler}
            // onBlur={inputElementBlurHandler}
            />
            {isListShowing && (
                <ul className={classes.list}>
                    {listItems.map((item, index) => (
                        <li
                            className={`${classes.listItem} ${listItemInFocus === index ? classes.listItemActive : ''}`}
                            key={index}
                            value={item}
                            onClick={listItemClickHandler}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
            <button ref={buttonRef} aria-label="Link" role="button">link</button>
        </div>
    );
};

export default RecentSearches;
