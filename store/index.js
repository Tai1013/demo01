let load = true;

// state
export const state = () => ({
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
            To: '/poker',
            Type: 'games'
        },
        {
            Title: '捕魚',
            To: '/fishing',
            Type: 'games'
        }
    ]
})
// actions
export const actions = {
    getDeviceType({commit}) {
        if (load) {
            load = !load
            setTimeout(() => {
                load = !load
                if (window.innerWidth <= 768 && this.state.DEVICE_TYPE === 'desktop') return commit('setDeviceType', 'mobile')
                if (window.innerWidth > 768 && this.state.DEVICE_TYPE !== 'desktop') return commit('setDeviceType', 'desktop')    
            }, 1000)
        }
    }
}

// mutation
export const mutations = {
    setDeviceType(state, device) {
        state.DEVICE_TYPE = device
    }
}

// getters
export const getters = {
    DEVICE_TYPE: state => {
        return state.DEVICE_TYPE
    }
}