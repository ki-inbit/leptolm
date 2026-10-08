let cacheHistory = [];
let cursor = 0;

export function getCache() {
    if (cursor < cacheHistory.length) {
        return cacheHistory[cursor++]; 
    }
    return ""; 
}

export function pushCache(val) { cacheHistory.push(val); }
export function resetCursor() { cursor = 0; }
export function clearCache() { cacheHistory = []; cursor = 0; }
