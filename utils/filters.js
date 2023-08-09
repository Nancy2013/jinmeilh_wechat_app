/**
   文件描述：过滤工具类
   创建人：段素栋
   创建时间：2021-03-18
 */

/**
    过滤字符前面的0
    @param {String} val 待过滤的字符串
    @return {String} 过滤后的字符串
*/
const filterPre0 = function (val) {
    const valList = val.split('.')
    valList[0] = valList[0].replace(/\b(0+)/gi, "")
    return valList.join('.')
}

/**
    过滤姓名
    @param {String} name 待过滤的字符串
    @return {String} 过滤后的字符串
*/
const filterName = function (name) {
    return name.replace(/[^A-Za-z0-9\u4e00-\u9fa5\·\•]/g, '')
}


/**
   过滤重量
   @param {String} weight 待过滤的字符串
   @return {String} 过滤后的字符串
*/
const filterWeight = function (weight) {
    weight = weight.replace(/[^\d\.]/g, '')   //过滤非数字和.
    weight = weight.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")   //去除多余的.
    let regStr = '^(\\-)*(\\d+)\\.(\\d).*$'
    const decimalReg = new RegExp(regStr)
    weight = weight.replace(decimalReg, '$1$2.$3')
    if (weight.substring(0, 2) == '00') {
        weight = '0'
    } else if (weight.substring(0, 2) != '0.' && weight.substring(0, 2) != '0') {
        weight = filterPre0(weight)//weight.replace(/\b(0+)/gi, "")
    }
    return weight
}


/**
   过滤数字
   @param {String} num 待过滤的数字
   @return {Number} 过滤后的数字
*/
const filterNum = function (num) {
    num = num.replace(/[^\d]/g, '')   //过滤非数字
    return num === '' ? '' : Number(num)
}

/**
   过滤浮点数
   @param {String} num 待过滤的数字
   @param {Number} decimalLen 过滤的小数位
   @return {Number} 过滤后的数字
*/
const filterFloat = function (str, decimalLen = 2) {
    let result = str.toString().replace(/[^\d\.]/g, '')   //过滤非数字和.
    result = result.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")   //去除多余的.
    let regStr = '^(\\-)*(\\d+)\\.('
    for (let i = 0; i < decimalLen; i++) {
        regStr += '\\d'
    }
    regStr += ').*$'
    const decimalReg = new RegExp(regStr)
    return result.replace(decimalReg, '$1$2.$3')  //小数点后最多decimalLen位
}

/**
   过滤字符串数字
   @param {String} str 待过滤的数字
   @return {String} 过滤后的数字
*/
const filterNum_str = function (str) {
    return str.replace(/[^\d]/g, '')
}

/**
   过滤默认字符 空格及emoji表情
   @param {String} str 待过滤的字符串
   @return {String} 过滤后的字符串
*/
const filterDefault = function (str) {
    return str.replace(/ /g, '').replace(/(\ud83c[\udc00-\udfff])|(\ud83d[\udc00-\udfff])|(\ud83e[\udc00-\udfff])|[\u2100-\u32ff]|[\u0030-\u007f][\u20d0-\u20ff]|[\u0080-\u00ff]/g, '')
}

/**
   过滤千位分割数字
   @param {String} param 待过滤的数字
   @return {String} 过滤后的数字
*/
const filterKilobitSplit = function (param) {
    const num = param + '';
    const numGroup = num.includes('.') ? num.split('.') : [num];
    const intFn = numStr =>
        numStr
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + ',') + prev;
            });
    const intNum = intFn(numGroup[0]);
    const floatNum = numGroup[1] ? '.' + numGroup[1] : '';
    return intNum + floatNum;
}

export {
    filterName,
    filterWeight,
    filterNum,
    filterNum_str,
    filterDefault,
    filterFloat,
    filterKilobitSplit
}