// state
export const state = () => ({
    TOKEN: '',
    DEVICE_TYPE: '',
    Menu: [
        {
            Title: '首頁',
            To: '/'
        },
        {
            Title: '真人',
            To: '/live',
            Type: 'games'
        },
        {
            Title: '體育',
            To: '/sport',
            Type: 'games'
        },
        {
            Title: '電子',
            To: '/slot',
            Type: 'games'
        },
        {
            Title: '彩票',
            To: '/lottery',
            Type: 'games'
        },
        {
            Title: '棋牌',
            To: '/poker',
            Type: 'games'
        },
        {
            Title: '電競',
            To: '/esport',
            Type: 'games'
        },
        {
            Title: '捕魚',
            To: '/fishing',
            Type: 'games'
        },
        {
            Title: '優惠',
            To: '/promotion',
        },
        {
            Title: '公告',
            To: '/bulletin',
        }
    ]
})
// actions
export const actions = {
    getDeviceType({commit}) {
        if (window.innerWidth <= 768 && this.state.DEVICE_TYPE === 'desktop') return commit('setDeviceType', 'mobile')
        if (window.innerWidth > 768 && this.state.DEVICE_TYPE !== 'desktop') return commit('setDeviceType', 'desktop')    
    },
}

// mutation
export const mutations = {
    setDeviceType(state, device) {
        state.DEVICE_TYPE = device
    },
    setUserToken(state, token) {
        state.TOKEN = token
    }
}

// getters
export const getters = {
    TOKEN: state => {
        return state.TOKEN
    },
    DEVICE_TYPE: state => {
        return state.DEVICE_TYPE
    }
}