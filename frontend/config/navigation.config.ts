/* 
    ------------------------------------------------------------------------------------
     NOTE: If any protected route names change, make sure to update `proxy.ts` as well.
    ------------------------------------------------------------------------------------
*/

export const appUrls = {
    HOME: '/',

    // auth - (protected)
    LOGIN: '/auth/sign-in',
    REGISTER: '/auth/sign-up',
    COMPLETE_SIGNUP: '/auth/complete-signup',

    // simple page (initial plan - programiz like code editor)
    LANG: '/lang',
    PYTHON: '/lang/python',

    // pages
    PROFILE: '/profile', // - (protected)
    ABOUT: '/about',

    // pages for files and folders - (protected)
    ALL: '/all',
    FILE: '/folders-and-files',
    // for code files, that is being created by user
    CODE: '/code',
    // those are shared files from another user
    SHARE: {
        BY_ME: '/shared-by-me',
        WITH_ME: '/shared-with-me'
    },
    TRASH: '/trash',

    // legal
    TERMS_AND_CONDOTIONS: '/legal/terms-and-conditions',
    PRIVACY_POLICY: '/legal/privacy-policy',

    // just for denoting no valid pages
    UNDEFINED: undefined,
    NULL: null,
};