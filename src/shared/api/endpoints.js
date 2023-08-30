const userEndpoints = {
    SignUp: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/signup`,
    LoginMob: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/login_mobile`,
    VerifyOtp: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/verify_registration`,
    SignIn: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/login_pass`,
    getUser: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/profile`,
    getOtp: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/send_otp`,
    resendOtp: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/resend_otp`,
    forgetpwdOtp: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/forget-password`,
    getMobileOtp: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/mobile-otp`,
    verifyMobileOtp: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/verify-mobile`,
    getEmailOtp: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user//email-otp`,
    verifyEmailOtp: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/verify-email`,
    updateProfile: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/profile`,
    resetPasswordMobile: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/reset-mobile`,
    verityResetPasswordMobile: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/verify-resetMobile`,
    mobileChangePasswordReset: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/reset-password`,
    resetPasswordEmail: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/reset-email`,
    verityResetPasswordEmail: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/verify-resetEmail`,
    emailChangePasswordReset: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/reset-password`,
    userChangePassword: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/change-password`,
    addAddress: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/address`,
    editAddress: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/address`,
    getAddress: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/address`,
    deleteAddressById: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/address`,
    makeDefaultAddress: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/default-address`,
    getAddressById: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/get-address`,
    socialSignin: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/auth_social_signin`,
    socialSignUp: `${process.env.NEXT_PUBLIC_USER_SERVICE}${process.env.NEXT_PUBLIC_API_PREFIX}front/user/auth_social_signup`,
};

const adminEndPoints = {
    languageList: `${process.env.NEXT_PUBLIC_API_PREFIX}front/languageList/list`,
    seoTagList: `${process.env.NEXT_PUBLIC_API_PREFIX}front/settings/seo`,
    addNewsLetter: `${process.env.NEXT_PUBLIC_API_PREFIX}newsLetter/add`,
    getOfferHeader: `${process.env.NEXT_PUBLIC_API_PREFIX}headerBannerService/getData`,
};

const cmsEndPoints = {
    faqList: `${
        process.env.NEXT_PUBLIC_CMS_SERVICE + process.env.NEXT_PUBLIC_API_PREFIX
    }front/faq/list`,
    testimonialList: `${
        process.env.NEXT_PUBLIC_CMS_SERVICE + process.env.NEXT_PUBLIC_API_PREFIX
    }front/testimonial/list`,
    bannerList: `${
        process.env.NEXT_PUBLIC_CMS_SERVICE + process.env.NEXT_PUBLIC_API_PREFIX
    }front/banner/list`,
    homeProductList: `${
        process.env.NEXT_PUBLIC_CMS_SERVICE + process.env.NEXT_PUBLIC_API_PREFIX
    }front/homeProduct/list`,
    getBottomText: `${
        process.env.NEXT_PUBLIC_CMS_SERVICE + process.env.NEXT_PUBLIC_API_PREFIX
    }front/homeText/list`,
    getCMSPage: `${
        process.env.NEXT_PUBLIC_CMS_SERVICE + process.env.NEXT_PUBLIC_API_PREFIX
    }front/contentPage/list`,
    getStaticBlocks: `${
        process.env.NEXT_PUBLIC_CMS_SERVICE + process.env.NEXT_PUBLIC_API_PREFIX
    }front/static_blocks/list`,
};
const catalogEndPoints = {
    categoryList: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/category/featuredCategoryList`,
    makeList: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/product_filter/list`,
    modelList: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/model/list`,
    brandList: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/brand/list`,
    topList: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/categoryProduct/top-data`,
    allCategoryList: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/category/category_list`,
    categoryProductList: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }/front/categoryProduct/category_product_list`,
    filtersListing: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/categoryProduct/category_product_filter_listing`,
    getProductsWithFilter: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/categoryProduct/category_product_filter`,
    getSubcategoriesById: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/category/categoryDetails?id=`,
    getFiltersAndProducts: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/categoryProduct/all_category_product_list`,
    getProductDetails: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/categoryProduct/product_details`,
    addToWishList: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/wishlist/add`,
    removeFromWishList: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/wishlist/removeData`,
    getWishList: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/wishlist/getData`,
    getRecommendedProducts: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/categoryProduct/recommended_product_list`,
    getRelatedProducts: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/categoryProduct/related_product_list`,
    getRecentProducts: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/product/recently_view_product`,
    getReviews: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/manage_reviews/list`,
    getOtherSellers: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/categoryProduct/more_sellers`,
    productSeo: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/categoryProduct/seo`,
    likeDislike: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/counter`,
    checkCompatibility: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/product/product_compatibility`,
    addItemToGarage: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/garage/add_to_garage`,
    deleteGarage: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/garage/delete_garage_data`,
    getGarage: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/garage/get_garage_data`,
    checkVehicleCompatibility: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/garage/check_compatibility`,
    getSubcategories: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/categoryProduct/sub-categories`,
    addToCart: `${
        process.env.NEXT_PUBLIC_CATALOG_SERVICE +
        process.env.NEXT_PUBLIC_API_PREFIX
    }front/categoryProduct/add_to_cart`,
};

export { userEndpoints, adminEndPoints, cmsEndPoints, catalogEndPoints };
