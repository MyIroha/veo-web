
// 校验密码规则
export const verifyPassword = (value: any) => {
    const regs = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z]).{6,20}$/;
    if (!regs.test(value)) {
        return true;
    }
    return false;
};

export const validatePassword = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback()
    }
    if (verifyPassword(value)) {
        return callback('密码必须包含大小写字母、数字或特殊字符，长度为6-20位')
    }
    return callback();
}

// 验证手机号
export const validatorPhone = (_: any, value: string) => {
    const regPhone: RegExp = /^1[3-9]\d{9}$/;
    // 验证座机号码
    const regLandline: RegExp = /^\d{7,8}$/;

    if (!value || regPhone.test(value) || regLandline.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('请填写正确的联系号码'))
}
// 验证生日
export const validatorBirth = (_: any, value: any) => {
    const regBirth = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/
    if (!value || regBirth.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('请填写正确的出生日期'))
}

