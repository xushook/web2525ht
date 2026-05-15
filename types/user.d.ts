//1.创建src同级目录types，
// 2.types下创建.d.ts文件，
// 3.然后再tsconfig.app.json的include里导入 供全局使用
//存放定义的接口、类型、泛型等
interface interA {
    [props: string]: string | number
}
interface interConfig {
    [key: string]: interDev
}

interface interDev {
    baseApi: string,
    mockApi?: string
}

interface interLoginRuleForm {
    userName: string
    userPwd: string
}