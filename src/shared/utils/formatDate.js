const formatDate = (enteredDate) => {
    const date = new Date(enteredDate);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const formatedDate = date.toLocaleDateString('en-US', options);

    return formatedDate;
};

export default formatDate;
