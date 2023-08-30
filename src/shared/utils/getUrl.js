const getUrl = (slug, navigationLevel) => {
    if (navigationLevel === "category_level") {
        return `/category/${slug}`;
    } else if (navigationLevel === "sub_category_level") {
        return `/sub-category/${slug}`;
    } else {
        return `/${slug}`;
    }
};

export default getUrl;
