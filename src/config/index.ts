const ENV: string = import.meta.env.MODE
const ENVconfig: interConfig = {
    dev: {
        baseApi: '/api',
        mockApi: '/examples'
    },
    test: {
        baseApi: '/testapi',
        mockApi: 'http://127.0.0.1:4523/m1/8272944-8035426-default'
    },
    pro: {
        baseApi: '/proapi'
    },
}
export default {
    ENV,
    mock: true,
    ...ENVconfig[ENV]
}
