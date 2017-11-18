function OhMyValidator(config) {
    if (config) {
        if (config.validate) {
            this.validate = config.validate
        }
    }
}

OhMyValidator.prototype.proxy = function(target, rules) {
    const self = this
    this.rules = rules
    this.target = target
    this.result = {}
    let proxyTarget = new Proxy(target, {
        set(target, key, value, proxy) {
            if (typeof rules[key] === 'function') {
                self.result[key] = rules[key](value, target)
            }
            return Reflect.set(target, key, value, proxy)
        }
    })
    Reflect.ownKeys(target).forEach(key => {
        proxyTarget[key] = target[key]
    })
    return proxyTarget
}

OhMyValidator.prototype.validate = function() {
    return this.result
}

module.exports = OhMyValidator