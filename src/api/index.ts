import request from "../utils/axios";
export default {
    getMenuList: (params?: any) => request({
        url: '/menu/list',
        method: 'GET',
        data: params,
        mock: false
    })
}