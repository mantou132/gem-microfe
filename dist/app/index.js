/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/gem-microfe/dist/app/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@mantou/gem/lib/utils.js
var utils_a, utils_b;
const updaterSet = new Set();
function addMicrotask(func) {
    if (!updaterSet.size) {
        // delayed execution callback after updating store
        window.queueMicrotask(() => {
            updaterSet.forEach(func => func());
            updaterSet.clear();
        });
    }
    updaterSet.delete(func);
    updaterSet.add(func);
}
/**
 * `EventTarget` safari not support
 * https://bugs.webkit.org/show_bug.cgi?id=174313
 */
class Pool extends Image {
    constructor() {
        super();
        this.currentId = 0;
        this.count = 0;
        this.pool = new Map();
        // https://bugs.webkit.org/show_bug.cgi?id=198674
        Object.setPrototypeOf(this, Pool.prototype);
    }
    add(item) {
        if (!this.pool.size)
            this.dispatchEvent(new CustomEvent('start'));
        this.pool.set(this.count, item);
        this.count += 1;
    }
    get() {
        const item = this.pool.get(this.currentId);
        if (item) {
            this.pool.delete(this.currentId);
            this.currentId += 1;
            if (!this.pool.size)
                this.dispatchEvent(new CustomEvent('end'));
        }
        return item;
    }
}
var StorageType;
(function (StorageType) {
    StorageType["LOCALSTORAGE"] = "localStorage";
    StorageType["SESSIONSTORAGE"] = "sessionStorage";
})(StorageType || (StorageType = {}));
class StorageCache {
    constructor() {
        this[utils_a] = {};
        this[utils_b] = {};
    }
}
utils_a = StorageType.LOCALSTORAGE, utils_b = StorageType.SESSIONSTORAGE;
class Storage {
    constructor() {
        this.cache = new StorageCache();
    }
    get(key, type) {
        if (key in this.cache[type])
            return this.cache[type][key];
        const value = window[type].getItem(key);
        if (!value)
            return undefined;
        try {
            const result = JSON.parse(value);
            this.cache[type][key] = result;
            return result;
        }
        catch (e) {
            window[type].removeItem(key);
        }
    }
    getLocal(key) {
        return this.get(key, StorageType.LOCALSTORAGE);
    }
    getSession(key) {
        return this.get(key, StorageType.SESSIONSTORAGE);
    }
    set(key, value, type) {
        this.cache[type][key] = value;
        return window[type].setItem(key, JSON.stringify(value));
    }
    setLocal(key, value) {
        return this.set(key, value, StorageType.LOCALSTORAGE);
    }
    setSession(key, value) {
        return this.set(key, value, StorageType.SESSIONSTORAGE);
    }
}
class QueryString extends URLSearchParams {
    constructor(param) {
        if (param instanceof QueryString) {
            return param;
        }
        super(param);
        /**
         * can't extend `URLSearchParams`
         * https://bugs.webkit.org/show_bug.cgi?id=198674
         */
        Object.setPrototypeOf(this, QueryString.prototype);
    }
    concat(param) {
        let query;
        if (typeof param === 'string') {
            query = Object.fromEntries(new URLSearchParams(param).entries());
        }
        else {
            query = param;
        }
        Object.keys(query).forEach(key => {
            this.append(key, query[key]);
        });
    }
    toString() {
        const string = super.toString();
        return string ? `?${string}` : '';
    }
    toJSON() {
        return this.toString();
    }
}
// 写 html 文本
function raw(arr, ...args) {
    return arr.reduce((prev, current, index) => prev + (args[index - 1] || '') + current);
}
// 写 css 文本，在 CSSStyleSheet 中使用
function css(arr, ...args) {
    return raw(arr, ...args);
}
const rulesWeakMap = new WeakMap();
/**
 * !!! 目前只有 Chrome 支持
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1520690
 *
 * 创建 style sheet 用于 `adoptedStyleSheets`
 * @param rules string 不能动态更新的 css
 * @param mediaQuery string 媒体查询
 */
function createCSSSheet(rules, mediaQuery = '') {
    let cssSheet = rulesWeakMap.get(rules);
    if (!cssSheet) {
        const sheet = new CSSStyleSheet();
        sheet.media.mediaText = mediaQuery;
        let style = '';
        if (typeof rules === 'string') {
            style = rules;
        }
        else {
            Object.keys(rules).forEach(key => {
                sheet[key] = rules[key].type === 'tag' ? key : `${key}-${rules[key].key}`;
                style += rules[key].str.replace(/&/g, sheet[key]);
            });
            rulesWeakMap.set(rules, sheet);
        }
        sheet.replaceSync(style);
        cssSheet = sheet;
    }
    return cssSheet;
}
function randomStr(number = 5, origin = '0123456789abcdefghijklmnopqrstuvwxyz') {
    const len = origin.length;
    let str = '';
    for (let i = 0; i < number; i++) {
        str += origin[Math.floor(Math.random() * len)];
    }
    return str;
}
// 只支持一层嵌套
// https://drafts.csswg.org/css-nesting-1/
function flatStyled(style, type) {
    const subStyle = [];
    let str = `& {${style.replace(new RegExp('&.*{(.*)}', 'gs'), function (substr) {
        subStyle.push(substr);
        return '';
    })}}` + subStyle.join('');
    if (type !== 'tag')
        str = str.replace(/&/g, type === 'class' ? '.&' : '#&');
    return { str, key: randomStr(), type };
}
// 写 css 文本，在 CSSStyleSheet 中使用，使用 styed-components 高亮
//
// createCSSSheet({
//   red: styled.class`
//     background: red;
//     &:hover {
//       background: blue;
//     }
//   `,
// });
const styled = {
    class: (arr, ...args) => {
        const style = raw(arr, ...args);
        return flatStyled(style, 'class');
    },
    id: (arr, ...args) => {
        const style = raw(arr, ...args);
        return flatStyled(style, 'id');
    },
    tag: (arr, ...args) => {
        const style = raw(arr, ...args);
        return flatStyled(style, 'tag');
    },
};
function camelToKebabCase(str) {
    return str.replace(/[A-Z]/g, ($1) => '-' + $1.toLowerCase());
}
function kebabToCamelCase(str) {
    return str.replace(/-(.)/g, (_substr, $1) => $1.toUpperCase());
}
function emptyFunction() {
    // 用于占位的空函数
}
//# sourceMappingURL=utils.js.map
// CONCATENATED MODULE: ./node_modules/@mantou/gem/lib/store.js

// 不使用符号，方便跨 Realms
const HANDLES_KEY = 'gem@storeHandlesKey';
function createStore(originStore) {
    const store = originStore;
    // 序列化时忽略
    Object.defineProperty(store, HANDLES_KEY, { enumerable: false, value: new Set(), writable: true });
    return store;
}
function createStoreSet(originStoreSet) {
    const keys = Object.keys(originStoreSet);
    keys.forEach(key => {
        const store = originStoreSet[key];
        createStore(store);
    });
    return originStoreSet;
}
function updateStore(store, value) {
    Object.assign(store, value);
    const listeners = store[HANDLES_KEY];
    listeners.forEach(func => {
        addMicrotask(func);
    });
}
function connect(store, func) {
    const listeners = store[HANDLES_KEY];
    listeners.add(func);
}
function disconnect(store, func) {
    const listeners = store[HANDLES_KEY];
    listeners.delete(func);
}
//# sourceMappingURL=store.js.map
// CONCATENATED MODULE: ./node_modules/@mantou/gem/lib/history.js


const historyState = createStore({
    list: [{}],
    currentIndex: 0,
});
const openHandleMap = new WeakMap();
const colseHandleMap = new WeakMap();
const shouldCloseHandleMap = new WeakMap();
function generateState(data, open, close, shouldClose) {
    if (data.$key)
        throw new Error('`$key` is not allowed');
    if (data.$open)
        throw new Error('`$open` is not allowed');
    if (data.$close)
        throw new Error('`$close` is not allowed');
    if (data.$shouldClose)
        throw new Error('`$shouldClose` is not allowed');
    const state = Object.assign(Object.assign({}, data), { $key: Date.now() + performance.now(), $open: !!open, $close: !!close, $shouldClose: !!shouldClose });
    openHandleMap.set(state, open);
    colseHandleMap.set(state, close);
    shouldCloseHandleMap.set(state, shouldClose);
    return state;
}
let basePath = '';
let history_history = {
    historyState,
    get basePath() {
        return basePath;
    },
    set basePath(v) {
        const { list, currentIndex } = historyState;
        // 应用初始化的时候设置
        const location = list[currentIndex];
        location.path = window.location.pathname.replace(new RegExp(`^${v}`), '');
        updateStore(historyState, {});
        basePath = v;
    },
    get location() {
        const { list, currentIndex } = historyState;
        const location = list[currentIndex];
        return {
            get query() {
                return new QueryString(location.query);
            },
            hash: location.hash,
            path: location.path,
            state: location.state,
            title: location.title,
        };
    },
    forward() {
        window.history.forward();
    },
    back() {
        window.history.back();
    },
    push(options) {
        const { path = '', open, close, shouldClose } = options;
        const query = options.query || '';
        const hash = options.hash || '';
        const title = options.title || '';
        const data = options.data || {};
        const state = generateState(data, open, close, shouldClose);
        window.history.pushState(state, title, history_history.basePath + path + new QueryString(query) + hash);
        const { list, currentIndex } = historyState;
        if (hash !== list[currentIndex].hash)
            window.dispatchEvent(new CustomEvent('hashchange'));
        const newList = list.slice(0, currentIndex + 1).concat({
            state,
            title,
            path,
            query,
            hash,
        });
        updateStore(historyState, {
            list: newList,
            currentIndex: newList.length - 1,
        });
    },
    // push 一条历史记录
    // 有 close 处理函数时先执行 closeHandle 在 replace
    // 比如在 modal 打开时跳转页面
    // 不完美：只支持在 1 级 modal 中切换页面
    pushWithoutCloseHandle(options) {
        const { list, currentIndex } = historyState;
        const { state } = list[currentIndex];
        if (state.$close) {
            const closeHandle = colseHandleMap.get(state);
            if (closeHandle)
                closeHandle();
            history_history.replace(options);
        }
        else {
            history_history.push(options);
        }
    },
    // 修改 url 意外的状态
    pushState(options) {
        const { list, currentIndex } = historyState;
        const { path, query, hash } = list[currentIndex];
        history_history.push(Object.assign({ path,
            query,
            hash }, options));
    },
    replace(options) {
        const { path = '', open, close, shouldClose } = options;
        const query = options.query || '';
        const hash = options.hash || '';
        const data = options.data || {};
        const title = options.title || '';
        const state = generateState(data, open, close, shouldClose);
        window.history.replaceState(state, title, history_history.basePath + path + new QueryString(query) + hash);
        const { list, currentIndex } = historyState;
        if (hash !== list[currentIndex].hash)
            window.dispatchEvent(new CustomEvent('hashchange'));
        list.splice(currentIndex, 1, {
            state,
            title,
            path,
            query,
            hash,
        });
        updateStore(historyState, {
            list,
        });
    },
    // 修改 url 意外的状态
    replaceState(options) {
        const { list, currentIndex } = historyState;
        const { path, query, hash } = list[currentIndex];
        history_history.replace(Object.assign({ path,
            query,
            hash }, options));
    },
};
const hasOtherHistory = !!window.__gemHistory;
if (hasOtherHistory) {
    history_history = window.__gemHistory;
    const basePath = history_history.basePath;
    Object.defineProperty(history_history, 'basePath', {
        get() {
            return basePath;
        },
        set() {
            throw new Error('已经有其他环境使用 gem , 会共享 history 对象，禁止再修改 history 对象');
        },
    });
}
else {
    window.__gemHistory = history_history;
    if (!window.history.state) {
        // 初始化 historyItem[]
        const { pathname, search, hash } = window.location;
        history_history.replace({ path: pathname, query: search, hash });
    }
    else if (window.history.state.$close) {
        // 有 handle 返回键的页面刷新
        history_history.back();
    }
    const storage = new Storage();
    const sessionStorageKey = 'gem@historyStateList';
    updateStore(historyState, storage.getSession(sessionStorageKey));
    window.addEventListener('unload', () => {
        storage.setSession(sessionStorageKey, historyState);
    });
    /**
     * 表示 popstate handler 中正在进行导航
     */
    let navigating = false;
    window.addEventListener('popstate', event => {
        if (!event.state || !event.state.$key) {
            // 比如作为其他 app 的宿主 app
            return;
        }
        if (navigating) {
            navigating = false;
            return;
        }
        // forward or back
        // replace 不会触发
        // url 变化前 historyItem
        const { list, currentIndex } = historyState;
        const { state: prevState } = list[currentIndex];
        const newStateIndex = list.findIndex(({ state }) => state.$key === event.state.$key);
        // gem app 嵌套 gem app，且不是同一个 history 对象时
        if (newStateIndex === -1)
            return;
        const { state: newState } = list[newStateIndex];
        if (newStateIndex > currentIndex && newState.$open) {
            // 返回键关闭的 modal 能前进键重新打开
            // 刷新后不能工作：刷新后 historyItem 中只有 url
            const openHandle = openHandleMap.get(newState);
            if (openHandle)
                openHandle();
        }
        else if (prevState.$close) {
            const closeHandle = colseHandleMap.get(prevState);
            const shouldCloseHandle = shouldCloseHandleMap.get(prevState);
            const notAllowClose = shouldCloseHandle && !shouldCloseHandle();
            if (notAllowClose) {
                navigating = true;
                history_history.forward(); // 将重新触发 popstate
                return; // 历史记录栈位置没有变化，不需要后面的 updateStore
            }
            else {
                // handle 返回键
                if (closeHandle) {
                    closeHandle();
                }
                else {
                    // 有 modal 的页面刷新会执行 back 触发 popstate
                    // 如果是耳机 modal 页面刷新
                    // 则还需要进行一次 back
                    // 不完美：三级 modal 页面刷新不支持返回到初始页面
                    navigating = true;
                    history_history.back();
                }
            }
        }
        updateStore(historyState, {
            currentIndex: newStateIndex,
        });
    });
}

//# sourceMappingURL=history.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/directive.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive_directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};
//# sourceMappingURL=directive.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/dom.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = window.customElements !== undefined &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.insertBefore(start, before);
        start = n;
    }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};
//# sourceMappingURL=dom.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/part.js
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};
//# sourceMappingURL=part.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/template.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updateable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
//# sourceMappingURL=template.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/template-instance.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class template_instance_TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari dooes not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
//# sourceMappingURL=template-instance.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/template-result.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class template_result_TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment poisition.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceeding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceeding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                    marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class template_result_SVGTemplateResult extends template_result_TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        reparentNodes(content, svgElement.firstChild);
        return template;
    }
}
//# sourceMappingURL=template-result.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/parts.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */






const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // tslint:disable-next-line:no-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attibute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new parts_AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = this.parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class parts_AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class parts_NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof template_result_TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === nothing) {
            this.value = nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof template_instance_TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new template_instance_TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new parts_NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class parts_BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // tslint:disable-next-line:no-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends parts_AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
try {
    const options = {
        get capture() {
            eventOptionsSupported = true;
            return false;
        }
    };
    // tslint:disable-next-line:no-any
    window.addEventListener('test', options, options);
    // tslint:disable-next-line:no-any
    window.removeEventListener('test', options, options);
}
catch (_e) {
}
class parts_EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);
//# sourceMappingURL=parts.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/default-template-processor.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class default_template_processor_DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new parts_EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new parts_BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new parts_NodePart(options);
    }
}
const defaultTemplateProcessor = new default_template_processor_DefaultTemplateProcessor();
//# sourceMappingURL=default-template-processor.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/template-factory.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();
//# sourceMappingURL=template-factory.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/render.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */



const render_parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = render_parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        render_parts.set(container, part = new parts_NodePart(Object.assign({ templateFactory: templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};
//# sourceMappingURL=render.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lit-html.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @module lit-html
 * @preferred
 */
/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */




// TODO(justinfagnani): remove line when we get NodePart moving methods








// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.1.2');
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const lit_html_html = (strings, ...values) => new template_result_TemplateResult(strings, values, 'html', defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new template_result_SVGTemplateResult(strings, values, 'svg', defaultTemplateProcessor);
//# sourceMappingURL=lit-html.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/directives/repeat.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

// Helper functions for manipulating parts
// TODO(kschaaf): Refactor into Part API?
const createAndInsertPart = (containerPart, beforePart) => {
    const container = containerPart.startNode.parentNode;
    const beforeNode = beforePart === undefined ? containerPart.endNode :
        beforePart.startNode;
    const startNode = container.insertBefore(createMarker(), beforeNode);
    container.insertBefore(createMarker(), beforeNode);
    const newPart = new parts_NodePart(containerPart.options);
    newPart.insertAfterNode(startNode);
    return newPart;
};
const updatePart = (part, value) => {
    part.setValue(value);
    part.commit();
    return part;
};
const insertPartBefore = (containerPart, part, ref) => {
    const container = containerPart.startNode.parentNode;
    const beforeNode = ref ? ref.startNode : containerPart.endNode;
    const endNode = part.endNode.nextSibling;
    if (endNode !== beforeNode) {
        reparentNodes(container, part.startNode, endNode, beforeNode);
    }
};
const removePart = (part) => {
    removeNodes(part.startNode.parentNode, part.startNode, part.endNode.nextSibling);
};
// Helper for generating a map of array item to its index over a subset
// of an array (used to lazily generate `newKeyToIndexMap` and
// `oldKeyToIndexMap`)
const generateMap = (list, start, end) => {
    const map = new Map();
    for (let i = start; i <= end; i++) {
        map.set(list[i], i);
    }
    return map;
};
// Stores previous ordered list of parts and map of key to index
const partListCache = new WeakMap();
const keyListCache = new WeakMap();
/**
 * A directive that repeats a series of values (usually `TemplateResults`)
 * generated from an iterable, and updates those items efficiently when the
 * iterable changes based on user-provided `keys` associated with each item.
 *
 * Note that if a `keyFn` is provided, strict key-to-DOM mapping is maintained,
 * meaning previous DOM for a given key is moved into the new position if
 * needed, and DOM will never be reused with values for different keys (new DOM
 * will always be created for new keys). This is generally the most efficient
 * way to use `repeat` since it performs minimum unnecessary work for insertions
 * amd removals.
 *
 * IMPORTANT: If providing a `keyFn`, keys *must* be unique for all items in a
 * given call to `repeat`. The behavior when two or more items have the same key
 * is undefined.
 *
 * If no `keyFn` is provided, this directive will perform similar to mapping
 * items to values, and DOM will be reused against potentially different items.
 */
const repeat = directive_directive((items, keyFnOrTemplate, template) => {
    let keyFn;
    if (template === undefined) {
        template = keyFnOrTemplate;
    }
    else if (keyFnOrTemplate !== undefined) {
        keyFn = keyFnOrTemplate;
    }
    return (containerPart) => {
        if (!(containerPart instanceof parts_NodePart)) {
            throw new Error('repeat can only be used in text bindings');
        }
        // Old part & key lists are retrieved from the last update
        // (associated with the part for this instance of the directive)
        const oldParts = partListCache.get(containerPart) || [];
        const oldKeys = keyListCache.get(containerPart) || [];
        // New part list will be built up as we go (either reused from
        // old parts or created for new keys in this update). This is
        // saved in the above cache at the end of the update.
        const newParts = [];
        // New value list is eagerly generated from items along with a
        // parallel array indicating its key.
        const newValues = [];
        const newKeys = [];
        let index = 0;
        for (const item of items) {
            newKeys[index] = keyFn ? keyFn(item, index) : index;
            newValues[index] = template(item, index);
            index++;
        }
        // Maps from key to index for current and previous update; these
        // are generated lazily only when needed as a performance
        // optimization, since they are only required for multiple
        // non-contiguous changes in the list, which are less common.
        let newKeyToIndexMap;
        let oldKeyToIndexMap;
        // Head and tail pointers to old parts and new values
        let oldHead = 0;
        let oldTail = oldParts.length - 1;
        let newHead = 0;
        let newTail = newValues.length - 1;
        // Overview of O(n) reconciliation algorithm (general approach
        // based on ideas found in ivi, vue, snabbdom, etc.):
        //
        // * We start with the list of old parts and new values (and
        //   arrays of their respective keys), head/tail pointers into
        //   each, and we build up the new list of parts by updating
        //   (and when needed, moving) old parts or creating new ones.
        //   The initial scenario might look like this (for brevity of
        //   the diagrams, the numbers in the array reflect keys
        //   associated with the old parts or new values, although keys
        //   and parts/values are actually stored in parallel arrays
        //   indexed using the same head/tail pointers):
        //
        //      oldHead v                 v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [ ,  ,  ,  ,  ,  ,  ]
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6] <- reflects the user's new
        //                                      item order
        //      newHead ^                 ^ newTail
        //
        // * Iterate old & new lists from both sides, updating,
        //   swapping, or removing parts at the head/tail locations
        //   until neither head nor tail can move.
        //
        // * Example below: keys at head pointers match, so update old
        //   part 0 in-place (no need to move it) and record part 0 in
        //   the `newParts` list. The last thing we do is advance the
        //   `oldHead` and `newHead` pointers (will be reflected in the
        //   next diagram).
        //
        //      oldHead v                 v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [0,  ,  ,  ,  ,  ,  ] <- heads matched: update 0
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldHead
        //                                      & newHead
        //      newHead ^                 ^ newTail
        //
        // * Example below: head pointers don't match, but tail
        //   pointers do, so update part 6 in place (no need to move
        //   it), and record part 6 in the `newParts` list. Last,
        //   advance the `oldTail` and `oldHead` pointers.
        //
        //         oldHead v              v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [0,  ,  ,  ,  ,  , 6] <- tails matched: update 6
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldTail
        //                                      & newTail
        //         newHead ^              ^ newTail
        //
        // * If neither head nor tail match; next check if one of the
        //   old head/tail items was removed. We first need to generate
        //   the reverse map of new keys to index (`newKeyToIndexMap`),
        //   which is done once lazily as a performance optimization,
        //   since we only hit this case if multiple non-contiguous
        //   changes were made. Note that for contiguous removal
        //   anywhere in the list, the head and tails would advance
        //   from either end and pass each other before we get to this
        //   case and removals would be handled in the final while loop
        //   without needing to generate the map.
        //
        // * Example below: The key at `oldTail` was removed (no longer
        //   in the `newKeyToIndexMap`), so remove that part from the
        //   DOM and advance just the `oldTail` pointer.
        //
        //         oldHead v           v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [0,  ,  ,  ,  ,  , 6] <- 5 not in new map: remove
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    5 and advance oldTail
        //         newHead ^           ^ newTail
        //
        // * Once head and tail cannot move, any mismatches are due to
        //   either new or moved items; if a new key is in the previous
        //   "old key to old index" map, move the old part to the new
        //   location, otherwise create and insert a new part. Note
        //   that when moving an old part we null its position in the
        //   oldParts array if it lies between the head and tail so we
        //   know to skip it when the pointers get there.
        //
        // * Example below: neither head nor tail match, and neither
        //   were removed; so find the `newHead` key in the
        //   `oldKeyToIndexMap`, and move that old part's DOM into the
        //   next head position (before `oldParts[oldHead]`). Last,
        //   null the part in the `oldPart` array since it was
        //   somewhere in the remaining oldParts still to be scanned
        //   (between the head and tail pointers) so that we know to
        //   skip that old part on future iterations.
        //
        //         oldHead v        v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2,  ,  ,  ,  , 6] <- stuck: update & move 2
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    into place and advance
        //                                      newHead
        //         newHead ^           ^ newTail
        //
        // * Note that for moves/insertions like the one above, a part
        //   inserted at the head pointer is inserted before the
        //   current `oldParts[oldHead]`, and a part inserted at the
        //   tail pointer is inserted before `newParts[newTail+1]`. The
        //   seeming asymmetry lies in the fact that new parts are
        //   moved into place outside in, so to the right of the head
        //   pointer are old parts, and to the right of the tail
        //   pointer are new parts.
        //
        // * We always restart back from the top of the algorithm,
        //   allowing matching and simple updates in place to
        //   continue...
        //
        // * Example below: the head pointers once again match, so
        //   simply update part 1 and record it in the `newParts`
        //   array.  Last, advance both head pointers.
        //
        //         oldHead v        v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1,  ,  ,  , 6] <- heads matched: update 1
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldHead
        //                                      & newHead
        //            newHead ^        ^ newTail
        //
        // * As mentioned above, items that were moved as a result of
        //   being stuck (the final else clause in the code below) are
        //   marked with null, so we always advance old pointers over
        //   these so we're comparing the next actual old value on
        //   either end.
        //
        // * Example below: `oldHead` is null (already placed in
        //   newParts), so advance `oldHead`.
        //
        //            oldHead v     v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6] <- old head already used:
        //   newParts: [0, 2, 1,  ,  ,  , 6]    advance oldHead
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]
        //               newHead ^     ^ newTail
        //
        // * Note it's not critical to mark old parts as null when they
        //   are moved from head to tail or tail to head, since they
        //   will be outside the pointer range and never visited again.
        //
        // * Example below: Here the old tail key matches the new head
        //   key, so the part at the `oldTail` position and move its
        //   DOM to the new head position (before `oldParts[oldHead]`).
        //   Last, advance `oldTail` and `newHead` pointers.
        //
        //               oldHead v  v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1, 4,  ,  , 6] <- old tail matches new
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]   head: update & move 4,
        //                                     advance oldTail & newHead
        //               newHead ^     ^ newTail
        //
        // * Example below: Old and new head keys match, so update the
        //   old head part in place, and advance the `oldHead` and
        //   `newHead` pointers.
        //
        //               oldHead v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1, 4, 3,   ,6] <- heads match: update 3
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance oldHead &
        //                                      newHead
        //                  newHead ^  ^ newTail
        //
        // * Once the new or old pointers move past each other then all
        //   we have left is additions (if old list exhausted) or
        //   removals (if new list exhausted). Those are handled in the
        //   final while loops at the end.
        //
        // * Example below: `oldHead` exceeded `oldTail`, so we're done
        //   with the main loop.  Create the remaining part and insert
        //   it at the new head position, and the update is complete.
        //
        //                   (oldHead > oldTail)
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1, 4, 3, 7 ,6] <- create and insert 7
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]
        //                     newHead ^ newTail
        //
        // * Note that the order of the if/else clauses is not
        //   important to the algorithm, as long as the null checks
        //   come first (to ensure we're always working on valid old
        //   parts) and that the final else clause comes last (since
        //   that's where the expensive moves occur). The order of
        //   remaining clauses is is just a simple guess at which cases
        //   will be most common.
        //
        // * TODO(kschaaf) Note, we could calculate the longest
        //   increasing subsequence (LIS) of old items in new position,
        //   and only move those not in the LIS set. However that costs
        //   O(nlogn) time and adds a bit more code, and only helps
        //   make rare types of mutations require fewer moves. The
        //   above handles removes, adds, reversal, swaps, and single
        //   moves of contiguous items in linear time, in the minimum
        //   number of moves. As the number of multiple moves where LIS
        //   might help approaches a random shuffle, the LIS
        //   optimization becomes less helpful, so it seems not worth
        //   the code at this point. Could reconsider if a compelling
        //   case arises.
        while (oldHead <= oldTail && newHead <= newTail) {
            if (oldParts[oldHead] === null) {
                // `null` means old part at head has already been used
                // below; skip
                oldHead++;
            }
            else if (oldParts[oldTail] === null) {
                // `null` means old part at tail has already been used
                // below; skip
                oldTail--;
            }
            else if (oldKeys[oldHead] === newKeys[newHead]) {
                // Old head matches new head; update in place
                newParts[newHead] =
                    updatePart(oldParts[oldHead], newValues[newHead]);
                oldHead++;
                newHead++;
            }
            else if (oldKeys[oldTail] === newKeys[newTail]) {
                // Old tail matches new tail; update in place
                newParts[newTail] =
                    updatePart(oldParts[oldTail], newValues[newTail]);
                oldTail--;
                newTail--;
            }
            else if (oldKeys[oldHead] === newKeys[newTail]) {
                // Old head matches new tail; update and move to new tail
                newParts[newTail] =
                    updatePart(oldParts[oldHead], newValues[newTail]);
                insertPartBefore(containerPart, oldParts[oldHead], newParts[newTail + 1]);
                oldHead++;
                newTail--;
            }
            else if (oldKeys[oldTail] === newKeys[newHead]) {
                // Old tail matches new head; update and move to new head
                newParts[newHead] =
                    updatePart(oldParts[oldTail], newValues[newHead]);
                insertPartBefore(containerPart, oldParts[oldTail], oldParts[oldHead]);
                oldTail--;
                newHead++;
            }
            else {
                if (newKeyToIndexMap === undefined) {
                    // Lazily generate key-to-index maps, used for removals &
                    // moves below
                    newKeyToIndexMap = generateMap(newKeys, newHead, newTail);
                    oldKeyToIndexMap = generateMap(oldKeys, oldHead, oldTail);
                }
                if (!newKeyToIndexMap.has(oldKeys[oldHead])) {
                    // Old head is no longer in new list; remove
                    removePart(oldParts[oldHead]);
                    oldHead++;
                }
                else if (!newKeyToIndexMap.has(oldKeys[oldTail])) {
                    // Old tail is no longer in new list; remove
                    removePart(oldParts[oldTail]);
                    oldTail--;
                }
                else {
                    // Any mismatches at this point are due to additions or
                    // moves; see if we have an old part we can reuse and move
                    // into place
                    const oldIndex = oldKeyToIndexMap.get(newKeys[newHead]);
                    const oldPart = oldIndex !== undefined ? oldParts[oldIndex] : null;
                    if (oldPart === null) {
                        // No old part for this value; create a new one and
                        // insert it
                        const newPart = createAndInsertPart(containerPart, oldParts[oldHead]);
                        updatePart(newPart, newValues[newHead]);
                        newParts[newHead] = newPart;
                    }
                    else {
                        // Reuse old part
                        newParts[newHead] =
                            updatePart(oldPart, newValues[newHead]);
                        insertPartBefore(containerPart, oldPart, oldParts[oldHead]);
                        // This marks the old part as having been used, so that
                        // it will be skipped in the first two checks above
                        oldParts[oldIndex] = null;
                    }
                    newHead++;
                }
            }
        }
        // Add parts for any remaining new values
        while (newHead <= newTail) {
            // For all remaining additions, we insert before last new
            // tail, since old pointers are no longer valid
            const newPart = createAndInsertPart(containerPart, newParts[newTail + 1]);
            updatePart(newPart, newValues[newHead]);
            newParts[newHead++] = newPart;
        }
        // Remove any remaining unused old parts
        while (oldHead <= oldTail) {
            const oldPart = oldParts[oldHead++];
            if (oldPart !== null) {
                removePart(oldPart);
            }
        }
        // Save order of new parts for next round
        partListCache.set(containerPart, newParts);
        keyListCache.set(containerPart, newKeys);
    };
});
//# sourceMappingURL=repeat.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/directives/guard.js
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const previousValues = new WeakMap();
/**
 * Prevents re-render of a template function until a single value or an array of
 * values changes.
 *
 * Example:
 *
 * ```js
 * html`
 *   <div>
 *     ${guard([user.id, company.id], () => html`...`)}
 *   </div>
 * ```
 *
 * In this case, the template only renders if either `user.id` or `company.id`
 * changes.
 *
 * guard() is useful with immutable data patterns, by preventing expensive work
 * until data updates.
 *
 * Example:
 *
 * ```js
 * html`
 *   <div>
 *     ${guard([immutableItems], () => immutableItems.map(i => html`${i}`))}
 *   </div>
 * ```
 *
 * In this case, items are mapped over only when the array reference changes.
 *
 * @param value the value to check before re-rendering
 * @param f the template function
 */
const guard = directive_directive((value, f) => (part) => {
    const previousValue = previousValues.get(part);
    if (Array.isArray(value)) {
        // Dirty-check arrays by item
        if (Array.isArray(previousValue) &&
            previousValue.length === value.length &&
            value.every((v, i) => v === previousValue[i])) {
            return;
        }
    }
    else if (previousValue === value &&
        (value !== undefined || previousValues.has(part))) {
        // Dirty-check non-arrays by identity
        return;
    }
    part.setValue(f());
    // Copy the value if it's an array so that if it's mutated we don't forget
    // what the previous values were.
    previousValues.set(part, Array.isArray(value) ? Array.from(value) : value);
});
//# sourceMappingURL=guard.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/directives/if-defined.js
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * For AttributeParts, sets the attribute if the value is defined and removes
 * the attribute if the value is undefined.
 *
 * For other part types, this directive is a no-op.
 */
const ifDefined = directive_directive((value) => (part) => {
    if (value === undefined && part instanceof parts_AttributePart) {
        if (value !== part.value) {
            const name = part.committer.name;
            part.committer.element.removeAttribute(name);
        }
    }
    else {
        part.setValue(value);
    }
});
//# sourceMappingURL=if-defined.js.map
// CONCATENATED MODULE: ./node_modules/@mantou/gem/lib/element.js
/* eslint-disable @typescript-eslint/no-empty-function */







let litHtml = {
    html: lit_html_html,
    svg: svg,
    render: render,
    directive: directive_directive,
    repeat: repeat,
    guard: guard,
    ifDefined: ifDefined,
};
if (window.__litHtml) {
    // 自定义元素不能重复定义
    // 所以嵌套 gem app 中导出的自定义元素类可能是之前定义的类
    // 可能造成使用的 html 对象不是同一个
    // map, 缓存之类的会变得不同
    // 所以需要把他们放在全局对象中
    litHtml = window.__litHtml;
}
else {
    window.__litHtml = litHtml;
}
const { html: element_html, svg: element_svg, render: element_render, directive: element_directive, repeat: element_repeat, guard: element_guard, ifDefined: element_ifDefined } = litHtml;

// final 字段如果使用 symbol 或者 private 将导致 modal-base 生成匿名子类 declaration 失败
class element_BaseElement extends HTMLElement {
    constructor(shadow = true) {
        super();
        this.setState = this.setState.bind(this);
        this.willMount = this.willMount.bind(this);
        this.render = this.render.bind(this);
        this.mounted = this.mounted.bind(this);
        this.shouldUpdate = this.shouldUpdate.bind(this);
        this.__update = this.__update.bind(this);
        this.updated = this.updated.bind(this);
        this.attributeChanged = this.attributeChanged.bind(this);
        this.propertyChanged = this.propertyChanged.bind(this);
        this.unmounted = this.unmounted.bind(this);
        this.__renderRoot = shadow ? this.attachShadow({ mode: 'open' }) : this;
        const { observedAttributes, observedPropertys, defineEvents, observedStores, adoptedStyleSheets } = new.target;
        if (observedAttributes) {
            observedAttributes.forEach(attr => {
                const prop = kebabToCamelCase(attr);
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                if (typeof this[prop] === 'function') {
                    throw `Don't use attribute with the same name as native methods`;
                }
                // Native attribute，no need difine property
                // e.g: `id`, `title`, `hidden`, `alt`, `lang`
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                if (this[prop] !== undefined)
                    return;
                // !!! Custom property shortcut access only supports `string` type
                Object.defineProperty(this, prop, {
                    configurable: true,
                    get() {
                        // Return empty string if attribute does not exist
                        return this.getAttribute(attr) || '';
                    },
                    set(v) {
                        if (v === null) {
                            this.removeAttribute(attr);
                        }
                        else {
                            this.setAttribute(attr, v);
                        }
                    },
                });
            });
        }
        if (observedPropertys) {
            observedPropertys.forEach(prop => {
                this.__connectProperty(prop, false);
            });
        }
        if (defineEvents) {
            defineEvents.forEach(event => {
                this.__connectProperty(event, true);
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this[event] = emptyFunction;
            });
        }
        if (observedStores) {
            observedStores.forEach(store => {
                if (!store[HANDLES_KEY]) {
                    throw new Error('`observedStores` only support store module');
                }
                connect(store, this.__update);
            });
        }
        if (adoptedStyleSheets) {
            if (this.shadowRoot) {
                this.shadowRoot.adoptedStyleSheets = adoptedStyleSheets;
            }
            else {
                document.adoptedStyleSheets = document.adoptedStyleSheets.concat(adoptedStyleSheets);
            }
        }
    }
    /**
     * @final
     * 和 `attr` 不一样，只有等 `lit-html` 在已经初始化的元素上设置 `prop` 后才能访问
     * 所以能在类字段中直接访问 `attr` 而不能访问 `prop`
     * @example
     * class TempGem extends GemElement {
     *   static observedPropertys = ['prop'];
     *   test = expect(this.prop).to.equal(undefined);
     * }
     * // <temp-gem .prop=${{a: 1}}></temp-gem>
     * */
    __connectProperty(prop, isEventHandle = false) {
        if (prop in this)
            return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        let propValue = this[prop];
        Object.defineProperty(this, prop, {
            configurable: true,
            get() {
                return propValue;
            },
            set(v) {
                if (v !== propValue) {
                    if (isEventHandle) {
                        if (v.isEventHandle)
                            throw `Don't assign a wrapped event handler`;
                        propValue = (detail) => {
                            const evt = new CustomEvent(prop.toLowerCase(), { detail });
                            this.dispatchEvent(evt);
                            v(evt);
                        };
                        propValue.isEventHandle = true;
                    }
                    else {
                        propValue = v;
                    }
                    if (this.__isMounted) {
                        this.propertyChanged(prop, propValue, v);
                        addMicrotask(this.__update);
                    }
                }
            },
        });
    }
    /**@final */
    setState(payload) {
        if (!this.state)
            throw new Error('`state` not initialized');
        Object.assign(this.state, payload);
        addMicrotask(this.__update);
    }
    /**@lifecycle */
    willMount() { }
    /**@lifecycle */
    render() {
        return element_html `
      <slot></slot>
    `;
    }
    /**@lifecycle */
    mounted() { }
    /**@lifecycle */
    shouldUpdate() {
        return true;
    }
    /**@final */
    __update() {
        if (this.__isMounted && this.shouldUpdate()) {
            element_render(this.render(), this.__renderRoot);
            this.updated();
        }
    }
    /**@helper */
    update() {
        this.__update();
    }
    /**@lifecycle */
    updated() { }
    // 同步触发
    /**@lifecycle */
    propertyChanged(_name, _oldValue, _newValue) { }
    // 异步触发
    /**@lifecycle */
    attributeChanged(_name, _oldValue, _newValue) { }
    /**@lifecycle */
    unmounted() { }
    /**@private */
    /**@final */
    attributeChangedCallback(name, oldValue, newValue) {
        if (this.__isMounted) {
            this.attributeChanged(name, oldValue, newValue);
            addMicrotask(this.__update);
        }
    }
    /**@final */
    __connectedCallback() {
        element_render(this.render(), this.__renderRoot);
        const callback = this.mounted();
        if (callback)
            this.__unmountCallback = callback;
        this.__isMounted = true;
    }
    /**@private */
    /**@final */
    // adoptedCallback() {}
    /**@private */
    /**@final */
    disconnectedCallback() {
        var _a, _b;
        const constructor = this.constructor;
        if (constructor.observedStores) {
            constructor.observedStores.forEach(store => {
                disconnect(store, this.__update);
            });
        }
        (_b = (_a = this).__unmountCallback) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.unmounted();
        this.__isMounted = false;
    }
}
class GemElement extends element_BaseElement {
    /**@private */
    /**@final */
    connectedCallback() {
        this.willMount();
        this.__connectedCallback();
    }
}
// global render task pool
const renderTaskPool = new Pool();
let loop = false;
const tick = () => {
    window.requestAnimationFrame(function callback(timestamp) {
        const task = renderTaskPool.get();
        if (task) {
            task();
            if (performance.now() - timestamp < 16) {
                callback(timestamp);
                return;
            }
        }
        // `renderTaskPool` not empty
        if (loop) {
            tick();
        }
    });
};
renderTaskPool.addEventListener('start', () => {
    loop = true;
    tick();
});
renderTaskPool.addEventListener('end', () => (loop = false));
class AsyncGemElement extends element_BaseElement {
    /**@final */
    __update() {
        renderTaskPool.add(() => {
            if (this.shouldUpdate()) {
                element_render(this.render(), this.__renderRoot);
                this.updated();
            }
        });
    }
    /**@private */
    /**@final */
    connectedCallback() {
        this.willMount();
        renderTaskPool.add(() => {
            this.__connectedCallback();
        });
    }
}
// 重写了全局 customElements
// 原因是方便多个独立 app 同时使用 gem
// 用户使用和 gem 同名的元素不会生效也不会报错
const define = customElements.define.bind(customElements);
customElements.define = function (tagName, Class, options) {
    if (!customElements.get(tagName)) {
        define(tagName, Class, options);
    }
};
//# sourceMappingURL=element.js.map
// CONCATENATED MODULE: ./node_modules/@mantou/gem/lib/decorators.js

function attribute(target, prop) {
    const con = target.constructor;
    if (!con.observedAttributes)
        con.observedAttributes = [];
    con.observedAttributes.push(camelToKebabCase(prop));
}
function property(target, prop) {
    const con = target.constructor;
    if (!con.observedPropertys)
        con.observedPropertys = [];
    con.observedPropertys.push(prop);
}
function emitter(target, event) {
    const con = target.constructor;
    if (!con.defineEvents)
        con.defineEvents = [];
    con.defineEvents.push(event);
}
function adoptedStyle(style) {
    return function (cls) {
        const c = cls;
        if (!c.adoptedStyleSheets)
            c.adoptedStyleSheets = [];
        c.adoptedStyleSheets.push(style);
    };
}
function connectStore(store) {
    // 这里的签名该怎么写？
    return function (cls) {
        const c = cls;
        if (!c.observedStores)
            c.observedStores = [];
        c.observedStores.push(store);
    };
}
function customElement(name) {
    return function (cls) {
        customElements.define(name, cls);
    };
}
//# sourceMappingURL=decorators.js.map
// CONCATENATED MODULE: ./node_modules/@mantou/gem/index.js





//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/@mantou/gem/elements/route.js

class ParamsRegExp extends RegExp {
    constructor(pattern) {
        const namePosition = {};
        let i = 0;
        super(`^${pattern
            .replace(/:([^/$]+)/g, (_m, name) => {
            namePosition[name] = i++;
            return `([^/]+)`;
        })
            .replace('*', '.*')}$`);
        this.namePosition = namePosition;
    }
}
function getReg(pattern) {
    return new ParamsRegExp(pattern);
}
// `/a/b/:c/:d` `/a/b/1/2`
function getParams(pattern, path) {
    const reg = getReg(pattern);
    const matchResult = path.match(reg);
    if (matchResult) {
        const params = {};
        Object.keys(reg.namePosition).forEach(name => {
            params[name] = matchResult[reg.namePosition[name] + 1];
        });
        return params;
    }
}
function isMatch(pattern, path) {
    return !!path.match(getReg(pattern));
}
function createPath(route, options) {
    let path = route.pattern;
    if (options && options.params) {
        Object.keys(options.params).forEach(param => {
            path = path.replace(new RegExp(`:${param}`, 'g'), options.params[param]);
        });
    }
    return path;
}
function createLocation(route, options) {
    const path = createPath(route, options);
    return Object.assign({ path }, options);
}
class route_Route extends GemElement {
    constructor() {
        super();
        const { path, query } = history_history.location;
        const href = path + query;
        this.href = href;
    }
    // 获取当前匹配的路由的 params
    static getParams() {
        if (route_Route.currentRoute) {
            return getParams(route_Route.currentRoute.pattern, history_history.location.path);
        }
    }
    initPage() {
        const { list, currentIndex } = history_history.historyState;
        if (route_Route.currentRoute && route_Route.currentRoute.title && route_Route.currentRoute.title !== list[currentIndex].title) {
            list.splice(currentIndex, 1, Object.assign(Object.assign({}, list[currentIndex]), { title: route_Route.currentRoute.title }));
            updateStore(history_history.historyState, {
                list,
            });
        }
    }
    shouldUpdate() {
        const { path, query } = history_history.location;
        const href = path + query;
        if (path + query !== this.href) {
            this.href = href;
            return true;
        }
        return false;
    }
    mounted() {
        this.initPage();
    }
    updated() {
        this.initPage();
        this.dispatchEvent(new CustomEvent('change'));
    }
    render() {
        if (!this.routes)
            return this.callback();
        route_Route.currentRoute = null;
        let defaultRoute = null;
        let routes;
        if (this.routes instanceof Array) {
            routes = this.routes;
        }
        else {
            routes = Object.values(this.routes);
        }
        for (const item of routes) {
            const { pattern } = item;
            if ('*' === pattern) {
                defaultRoute = item;
            }
            else if (isMatch(pattern, history_history.location.path)) {
                route_Route.currentRoute = item;
                break;
            }
        }
        if (!route_Route.currentRoute) {
            route_Route.currentRoute = defaultRoute;
        }
        if (!route_Route.currentRoute)
            return this.callback();
        if (route_Route.currentRoute.redirect) {
            history_history.replace({ path: route_Route.currentRoute.redirect });
            return this.callback();
        }
        return element_html `
      <style>
        :host {
          display: contents;
        }
      </style>
      ${route_Route.currentRoute.content}
    `;
    }
    callback() {
        route_Route.currentRoute = null;
        return element_html ``;
    }
}
route_Route.observedPropertys = ['routes'];
route_Route.observedStores = [history_history.historyState];
customElements.define('gem-route', route_Route);
//# sourceMappingURL=route.js.map
// CONCATENATED MODULE: ./node_modules/@mantou/gem/elements/title.js

class title_Title extends GemElement {
    constructor(isHidden) {
        super();
        const { title } = history_history.location;
        this.documentTitle = title;
        this.hidden = isHidden;
    }
    static setTitle(documentTitle) {
        const { list, currentIndex } = history_history.historyState;
        list.splice(currentIndex, 1, Object.assign(Object.assign({}, list[currentIndex]), { title: documentTitle }));
        updateStore(history_history.historyState, {
            list,
        });
    }
    shouldUpdate() {
        const { title } = history_history.location;
        if (title !== this.documentTitle) {
            this.documentTitle = title;
            return true;
        }
        return false;
    }
    render() {
        const { list, currentIndex } = history_history.historyState;
        const { title } = list[currentIndex];
        document.title = title;
        if (this.hidden) {
            return element_html ``;
        }
        if (!title) {
            return element_html `
        <slot></slot>
      `;
        }
        return element_html `
      ${title}
    `;
    }
}
title_Title.observedStores = [history_history.historyState];
customElements.define('gem-title', title_Title);
if (!document.head.querySelector('gem-title')) {
    document.head.append(new title_Title(true));
}
//# sourceMappingURL=title.js.map
// CONCATENATED MODULE: ./src/app/routes.ts


/* harmony default export */ var app_routes = ([
    {
        title: '页面 AA',
        pattern: '/a/a',
        content: element_html `
      <p>这是页面 AA</p>
      <p>这是个独立应用，独立打包，独立部署</p>
      <p>上面的标签可以在当前 app 里面导航</p>
    `,
    },
    {
        title: '页面 AB',
        pattern: '/a/b',
        content: element_html `
      这是页面 AB
    `,
    },
    {
        title: '页面 AC',
        pattern: '/a/c',
        content: element_html `
      这是页面 AC
    `,
    },
    {
        title: '页面 AD',
        pattern: '/a/d',
        content: element_html `
      这是页面 AD
    `,
    },
]);

// CONCATENATED MODULE: ./node_modules/@mantou/gem/elements/link.js
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * @attr href
 * @attr path
 * @attr query
 * @attr hash
 * @attr pattern
 * @state active
 */
let link_Link = class Link extends GemElement {
    constructor() {
        super();
        this.clickHandle = (e) => {
            const href = this.getHref();
            if (!href.startsWith('/')) {
                window.open(href);
                return;
            }
            const { path, query, hash } = history_history.location;
            if (path + query + hash === href) {
                return;
            }
            e.stopPropagation();
            if (this.route) {
                history_history.pushWithoutCloseHandle(createLocation(this.route, this.options));
            }
            else {
                history_history.pushWithoutCloseHandle({ path: this.path, query: this.query, hash: this.hash });
            }
        };
        this.preventDefault = (e) => {
            e.preventDefault();
        };
        this.onclick = this.clickHandle;
    }
    getHref() {
        if (this.route) {
            const queryProp = this.options ? this.options.query || '' : '';
            const hashProp = this.options ? this.options.hash || '' : '';
            return createPath(this.route, this.options) + queryProp + hashProp;
        }
        else {
            return this.href || this.path + this.query + this.hash;
        }
    }
    render() {
        const { path, query, hash } = history_history.location;
        const isMatchPattern = this.pattern && isMatch(this.pattern, path);
        const href = this.getHref();
        if (isMatchPattern || path + query + hash === href) {
            this.setAttribute('active', '');
        }
        else {
            this.removeAttribute('active');
        }
        return element_html `
      <style>
        :host {
          /* link default style */
          cursor: pointer;
          color: blue;
          text-decoration: underline;
        }
        a {
          all: unset;
        }
      </style>
      <a @click=${this.preventDefault} href=${new URL(href, location.origin).toString()}>
        <slot></slot>
      </a>
    `;
    }
};
__decorate([
    attribute
], link_Link.prototype, "href", void 0);
__decorate([
    attribute
], link_Link.prototype, "path", void 0);
__decorate([
    attribute
], link_Link.prototype, "query", void 0);
__decorate([
    attribute
], link_Link.prototype, "hash", void 0);
__decorate([
    attribute
], link_Link.prototype, "pattern", void 0);
__decorate([
    property
], link_Link.prototype, "route", void 0);
__decorate([
    property
], link_Link.prototype, "options", void 0);
link_Link = __decorate([
    customElement('gem-link'),
    connectStore(history_history.historyState)
], link_Link);

//# sourceMappingURL=link.js.map
// CONCATENATED MODULE: ./src/app/app-a-tabs.ts



const tabs = app_routes.filter(e => !e.tabIgnore);
class app_a_tabs_Tabs extends GemElement {
    render() {
        return element_html `
      <style>
        :host {
          display: flex;
          line-height: 2;
        }
        gem-link {
          margin: 0 1em;
          padding: 0 0.5em;
          border-bottom: 4px solid transparent;
          text-decoration: none;
          color: black;
        }
        gem-link[active] {
          border-bottom-color: blue;
        }
      </style>
      ${tabs.map(route => element_html `
            <gem-link path=${route.pattern}>${route.title}</gem-link>
          `)}
    `;
    }
}
customElements.define('app-a-tabs', app_a_tabs_Tabs);

// CONCATENATED MODULE: ./src/app/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return app_App; });




class app_App extends GemElement {
    render() {
        return element_html `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 100vh;
        }
      </style>
      <app-a-tabs></app-a-tabs>
      <gem-route .routes=${app_routes}></gem-route>
    `;
    }
}
customElements.define('app-a-root', app_App);
element_render(element_html `
    <style>
      body {
        margin: 0;
      }
    </style>
    <app-a-root></app-a-root>
  `, document.body);


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map?v=b1ffa679c734014a65e9