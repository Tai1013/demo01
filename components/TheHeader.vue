<template>
    <header>
        <div class="top">
            <p><span>GMT+8</span></p>
            <div>
                <nuxt-link to="/login">
                    <button>登入</button>
                </nuxt-link>
                <nuxt-link to="/register">
                    <button>註冊</button>
                </nuxt-link>
            </div>
        </div>
        <div class="menu">
            <nuxt-link
                v-for="(item, index) in $store.state.Menu"
                :key="index"
                :to="item.To"
                exact
                >{{ item.Title }}
            </nuxt-link>
        </div>
    </header>
</template>