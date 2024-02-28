export const capitalize = (str) => {
    let arr = str.split("")
    arr[0] = arr[0].toUpperCase()
    let cap = arr.join("")
    return cap
}