export function sortByKey(array, key, desc) {
    const returnValue = desc ? -1 : 1
    return array.slice().sort((firstItem, secondItem) => {
        if (firstItem[key] < secondItem[key]) return -1 * returnValue;
        if (firstItem[key] > secondItem[key]) return 1 * returnValue;
        return 0;
    })
}