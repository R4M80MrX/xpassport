const config = require('./config');
const debug = require('debug')('login-sdk[init]');
const { ERRORS } = require('./lib/constants');

/**
 * 初始化 login sdk

 * SDK 所有支持的配置项
 * @param {object} [必须] configs                    配置信息

 * @param {object} [必须] configs.rootPathname       程序运行对应的根路径

 * @param {object} [必须] configs.mysql              MySQL 配置信息
 * @param {string} [必须] configs.mysql.host         MySQL 主机名
 * @param {string} [可选] configs.mysql.port         MySQL 端口（默认3306）
 * @param {string} [必须] configs.mysql.user         MySQL 用户名
 * @param {string} [必须] configs.mysql.db           MySQL 数据库
 * @param {string} [必须] configs.mysql.pass         MySQL 密码
 * @param {string} [可选] configs.mysql.char         MySQL 编码

 * @param {number} [可选] configs.loginExpires     微信登录态有效期（单位：秒）
 */

module.exports = function init(options) {
  // 检查配置项
  const { rootPathName } = options;
  console.log(options);
  if ([rootPathName].some(v => v === undefined))
    throw new Error(ERRORS.ERR_INIT_SDK_LOST_CONFIG);

  if (options.mysql) {
    const { host, port, user, db, pass } = options.mysql;
    if ([host, port, user, db, pass].some(v => v === undefined))
      throw new Error(ERRORS.ERR_INIT_SDK_LOST_CONFIG);
  }

  // 初始化配置
  const configs = config.set(options);

  debug('using config: %o', configs);

  return {
    config,
    mysql: require('./lib/mysql'),
    auth: require('./lib/auth')
  };
};
