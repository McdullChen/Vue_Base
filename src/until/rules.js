// 身份证号码验证
export function checkIdNum(rule, value, callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!value) {
        return callback(new Error('证件号码不能为空'))
    } else if (!reg.test(value)) {
        return callback(new Error('证件号码格式不正确'))
    } else {
        callback()
    }
}


// 手机号验证
export function checkPhone(rule, value, callback) {
    const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
    // const phoneReg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
    if (!value) {
        return callback(new Error('电话号码不能为空'))
    }
    setTimeout(() => {

        if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'))
        } else {
            if (phoneReg.test(value)) {
                callback()
            } else {
                callback(new Error('电话号码格式不正确'))
            }
        }
    }, 100)
}


// 整数验证
export function checkInterNum(rule, value, callback) {
    const reg = /^[0-9]*[1-9][0-9]*$/
    if (!value) {
        return callback(new Error('请填写整数'))
    } else if (!reg.test(value)) {
        return callback(new Error('请输入整数'))
    } else {
        callback()
    }
}


//---------以下由于字段命名不统一，暂时用不上-----------

// export default {
//     phone: [{required: true, validator: checkPhone, trigger: 'blur' }],
//     idCard: [{ required: true, validator: checkIdNum, trigger: 'blur' }]
// }
