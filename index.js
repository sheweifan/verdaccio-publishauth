const commonsApi = require('@verdaccio/commons-api')

class DynamicGroupPlugin {
  constructor(config, stuff) {
    this.config = config;
  }

  allow_publish(user, pkg, callback) {
    const userName = user.name
    const pkgVersion = pkg.version
    const { users } = this.config

    // console.log(`pkg`, pkg)
    // console.log(`users`, users)
    // console.log(`users.split(' ').indexOf(userName) > -1`, users.split(' ').indexOf(userName) > -1)
    // console.log(`pkgVersion.indexOf('beta') > -1`, pkgVersion.indexOf('beta') > -1)

    if (pkgVersion.indexOf('beta') > -1 ||  users.split(' ').indexOf(userName) > -1) {
      return callback(null, true)
    } else {
      return callback(commonsApi.getUnauthorized('You do not have permission to publish this version. Please contact the administrator.'))
    }
  }
}

module.exports = (cfg, stuff) => new DynamicGroupPlugin(cfg, stuff);
