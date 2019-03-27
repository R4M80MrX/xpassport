const debug = require('debug')('login-sdk[auth]');
const config = require('../../config');
const AuthDbService = require('../mysql/AuthDbService');
const { ERRORS, LOGIN_STATE } = require('../constants');

/**
 * 授权模块
 * @param {koa request} req
 * @return {async}
 * @example 基于 koa
 */

async function authorization(req) {
  const header = req.headers;
  debug(header);
  const { username, pwdhash } = header;

  if ([username, pwdhash].some(v => !v))
    throw new Error(ERRORS.ERR_HEADER_MISSED);

  debug(`Auth: username: ${username}`);

  const loginResult = await AuthDbService.checkUser(username, pwdhash);
  if (loginResult) {
    return true;
  }
}

async function authorizationMiddleware(ctx, next) {
  ctx.state.$loginState = await authorization(ctx.req);
  return next();
}

module.exports = { authorizationMiddleware };
