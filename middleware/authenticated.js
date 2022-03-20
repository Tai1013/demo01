// import axios from 'axios'
const Cookieparser = process.server ? require('cookieparser') : undefined;

export default function (context) {
    // store.dispatch('getUserToken')
    try {
        if (context.req.headers.cookie) {
            const allCookies = Cookieparser.parse(context.req.headers.cookie);
            if (allCookies['auth-token']) return context.store.commit("setUserToken", allCookies['auth-token']);
        }
    } catch (e) { }
}