let currentCache = "";
export function getCache() {
    const val = currentCache;
    currentCache = "";
    return val;
}
export function setCache(val) {
    currentCache = val;
}
