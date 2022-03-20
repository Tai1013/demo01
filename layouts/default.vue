<template>
    <div class="app">
        <header>
            <div id="headerTop">
                <div class="container row justify-between align-center">
                    <div class="row align-center">
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <div id="getTime" v-html="DATE_TIME"></div>
                    </div>
                    <div class="row align-center">
                        <form
                            v-if="!isLogin"
                            id="loginForm"
                            class="row align-center"
                            @submit.prevent="login()"
                        >
                            <label for="account">帳號</label>
                            <input
                                id="account"
                                v-model="loginForm.account"
                                name="account"
                                type="text"
                                placeholder="帳號"
                            />
                            <label for="password">密碼</label>
                            <input
                                id="password"
                                v-model="loginForm.password"
                                name="password"
                                type="password"
                                placeholder="密碼"
                            />
                            <label for="captcha">驗證碼</label>
                            <input
                                id="captcha"
                                v-model="loginForm.captcha"
                                name="captcha"
                                type="tel"
                                placeholder="驗證碼"
                                maxlength="4"
                            />
                            <img
                                v-if="CAPTCHA_CODE.Code"
                                class="captcha"
                                :src="CAPTCHA_CODE.Image"
                                alt="驗證碼"
                                @click="getCaptcha()"
                            />
                            <button type="submit">登入</button>
                            <nuxt-link to="/register"
                                ><button>註冊</button></nuxt-link
                            >
                        </form>
                        <div v-if="isLogin">
                            <nuxt-link to="/member"
                                ><button>會員</button></nuxt-link
                            >
                            <button @click="logout()">登出</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="headerMenu">
                <div class="container row justify-between align-center">
                    <div class="row align-center">
                        <nuxt-link to="/">
                            <div id="logo" class="row align-center">
                                <img
                                    src="~/assets/images/logo.png"
                                    alt="LOGO"
                                />
                                <p>LOGO</p>
                            </div>
                        </nuxt-link>
                    </div>
                    <div class="row align-center">
                        <nav>
                            <nuxt-link
                                v-for="(item, index) in $store.state.Menu"
                                :key="index"
                                :to="item.To"
                                exact
                                >{{ item.Title }}
                            </nuxt-link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
        <Nuxt />
    </div>
</template>
<script>
const Cookies = process.client ? require('js-cookie') : undefined

export default {
    name: 'DefaultPage',
    data() {
        return {
            DATE_TIME: '',
            CAPTCHA_CODE: {
                Code: '',
                Image: '',
            },
            loginForm: {
                account: '',
                password: '',
                captcha: '',
            },
        }
    },
    computed: {
        isLogin() {
            return this.$store.getters.TOKEN
        },
    },
    watch: {
        'loginForm.account'() {
            this.validate('account')
        },
        'loginForm.password'() {
            this.validate('password')
        },
        'loginForm.captcha'() {
            this.validate('captcha')
        },
    },
    mounted() {
        this.getTime()
        this.getCaptcha()
        setInterval(() => {
            this.getTime()
        }, 1000)
    },
    methods: {
        getTime() {
            const today = new Date()
            const date =
                this.setBinary(today.getFullYear()) +
                '-' +
                this.setBinary(today.getMonth()) +
                '-' +
                this.setBinary(today.getDate())
            const time =
                this.setBinary(today.getHours()) +
                ':' +
                this.setBinary(today.getMinutes()) +
                ':' +
                this.setBinary(today.getSeconds())
            this.DATE_TIME = 'GMT+8&ensp;' + date + '&ensp;' + time
        },
        setBinary(time) {
            if (time < 10) return '0' + time
            return time
        },
        getCaptcha() {
            this.$axios.get('captcha.json').then((res) => {
                let code = ''
                while (this.CAPTCHA_CODE.Code === code || !code) {
                    const random = Math.floor(Math.random() * 10)
                    code = res.data[random]
                }
                this.CAPTCHA_CODE.Code = code
                this.CAPTCHA_CODE.Image = require(`~/assets/images/captcha/${code}.jpg`)
            })
        },
        validate(type) {
            const IS_ENGNUM = /^[a-zA-Z0-9]+$/
            const IS_NUM = /^[0-9]+$/
            if (type === 'account') {
                const account = this.loginForm.account
                if (!IS_ENGNUM.test(account))
                    this.loginForm.account = account.substring(
                        0,
                        account.length - 1
                    )
                if (account.length < 1)
                    document.getElementById('account').classList.add('error')
                else
                    document.getElementById('account').classList.remove('error')
            }
            if (type === 'password') {
                const password = this.loginForm.password
                if (!IS_ENGNUM.test(password))
                    this.loginForm.password = password.substring(
                        0,
                        password.length - 1
                    )
                if (password.length < 1)
                    document.getElementById('password').classList.add('error')
                else
                    document
                        .getElementById('password')
                        .classList.remove('error')
            }
            if (type === 'captcha') {
                const captcha = this.loginForm.captcha
                if (!IS_NUM.test(captcha))
                    this.loginForm.captcha = captcha.substring(
                        0,
                        captcha.length - 1
                    )
                if (captcha.length < 1)
                    document.getElementById('captcha').classList.add('error')
                else
                    document.getElementById('captcha').classList.remove('error')
            }
        },
        login() {
            this.validate('account')
            this.validate('password')
            this.validate('captcha')
            if (this.loginForm.account.length < 1) {
                alert('帳號不能為空')
                document.getElementById('account').focus()
                return
            }
            if (this.loginForm.password.length < 1) {
                alert('密碼不能為空')
                document.getElementById('password').focus()
                return
            }
            if (this.loginForm.captcha.length < 1) {
                alert('驗證碼不能為空')
                document.getElementById('captcha').focus()
                return
            }
            this.$axios.get('login.json').then((res) => {
                let token = ''
                const data = res.data
                const loginForm = document.getElementById('loginForm')
                const account = this.loginForm.account
                const password = this.loginForm.password
                const captcha = this.loginForm.captcha

                for (let i = 0; i < data.length; i++) {
                    if (
                        account === data[i].Account &&
                        password === data[i].Password
                    ) {
                        if (captcha === this.CAPTCHA_CODE.Code)
                            token = data[i].Token
                        else {
                            this.loginForm.captcha = ''
                            alert('驗證碼錯誤')
                            return
                        }
                    }
                }
                Object.assign(
                    this.$data.loginForm,
                    this.$options.data().loginForm
                )
                this.getCaptcha()
                if (token) {
                    Cookies.set('auth-token', token)
                    this.$store.commit('setUserToken', token)
                    this.$nextTick(() => {
                        for (let i = 0; i < loginForm.length; i++) {
                            loginForm[i].classList.remove('error')
                        }
                    })
                    this.$router.push('/')
                    alert('登入成功')
                } else {
                    document.getElementById('account').focus()
                    alert('帳號密碼錯誤')
                }
            })
        },
        logout() {
            Cookies.remove('auth-token')
            this.$store.commit('setUserToken', '')
            this.$router.push('/')
        },
    },
}
</script>

<style lang="scss" scoped>
header {
    button {
        margin: 0 0.5rem;
        width: 6rem;
        height: 2.5rem;
        border-radius: 0.2rem;
    }
}
#headerTop {
    height: 3.5rem;
    color: #ffffff;
    background-color: #3d4145;
}
#headerMenu {
    height: 5.5rem;
    box-shadow: 0 0 5px #3d4145;
    @include system {
        color: system('font');
        background: system('box_color');
    }
    #logo {
        height: 4.5rem;
        img {
            width: auto;
            height: 100%;
        }
        p {
            margin: 0;
            padding-left: 0.5rem;
            font-size: 3.5rem;
            font-weight: bold;
            text-shadow: 0 3px 5px #dddddd;
            @include themeify {
                color: theme('main_color');
            }
        }
    }
    nav {
        a {
            margin-left: 2rem;
            font-size: 1.6rem;
            font-weight: bold;
            &:hover {
                color: theme('main_color');
            }
        }
        .nuxt-link-exact-active,
        .nuxt-link-active {
            @include themeify {
                color: theme('main_color');
            }
        }
    }
}
#getTime {
    font-size: 1.4rem;
    @media screen and (max-width: 992px) {
        display: none;
    }
}
#loginForm {
    label {
        margin: 0 0.5rem;
        font-size: 1.4rem;
    }
    input {
        margin: 0 0.5rem;
        padding: 0 0.5rem;
        border-radius: 0.2rem;
        width: 10rem;
        height: 2.5rem;
        font-size: 1.2rem;
    }
    .captcha {
        margin: 0 0.5rem;
        width: auto;
        height: 2.5rem;
        cursor: pointer;
    }
}
</style>