/* eslint-disable @typescript-eslint/explicit-function-return-type */

export class Settings {
  constructor () {
    this.current = {}
    this.api = undefined
    return this
  }

  async init ({ api }) {
    this.api = api
    if (!this.api) {
      throw new Error('api.notDefined')
    }

    return this.api.settingsCurrent()
      .then(settings => {
        this.current = settings || {}
        return settings
      })
  }

  /**
   * Provides the setting for the given key
   * @param {String} k Setting key
   * @param {*} d Default value
   * @returns {*}
   */
  get (k, d) {
    k = k.split(/\./g)
    let s = this.current

    for (let i = 0; i < k.length - 1; i++) {
      const p = k[i]
      s = s[p] || {}
    }

    const v = s[k[k.length - 1]]
    return v !== undefined ? v : d
  }
}

export default {
  install (Vue) {
    // Should be used to initialize settings
    Vue.prototype.$Settings = new Settings()

    // Should be used to access settings
    Vue.prototype.$s = Vue.prototype.$Settings.get.bind(Vue.prototype.$Settings)
  },
}
