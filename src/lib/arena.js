import CONFIG from './config';
import _ from 'lodash';

export default class Arena {
  constructor (token) {
    this._sessionToken =
      _.isUndefined(token) ? null : token.token

    this.API_BASE_URL = CONFIG.ARENA.production;
  }

  async login (data) {
    return await this._fetch({
      method: 'POST',
      url: '/tokens',
      body: data
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  async getUser () {
    return await this._fetch({
      url: '/accounts',
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  async logout () {
    return await this._fetch({
      method: 'POST',
      url: '/accounts/logout',
      body: {}
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201) ||
            (res.status === 400 && res.code === 209)) {
          return {}
        } else {
          throw res
        }
      })
      .catch((error) => {
        console.log('error logging out')
        throw (error)
      })
  }

  async _fetch (opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts)

    var reqOpts = {
      method: opts.method,
      headers: {}
    }

    if (this._sessionToken) {
      reqOpts.headers['X-AUTH-TOKEN'] = this._sessionToken
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json'
      reqOpts.headers['Content-Type'] = 'application/json'
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body)
    }

    let url = this.API_BASE_URL + opts.url
    let res = {}

    let response = await fetch(url, reqOpts)
    res.status = response.status
    res.code = response.code

    return response.json()
      .then((json) => {
        res.json = json
        return res
      })
  }
};

