function _defineProperty(e, _, r) {
    return _ in e ? Object.defineProperty(e, _, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[_] = r, e;
}

export default (_defineProperty({
    DISABLED: 0,
    ENABLED: 1,
}))