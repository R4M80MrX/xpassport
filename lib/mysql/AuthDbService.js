const debug = require('debug')('qcloud-sdk[AuthDbService]');
const uuidGenerator = require('uuid/v4');
const moment = require('moment');
const ERRORS = require('../constants').ERRORS;
const mysql = require('./index');

async function checkUser(username, pwd_hash) {
  const result = await mysql('sso_users')
    .where({ username })
    .first()
    .select('pwd_hash');
  const resultStr = JSON.stringify(result);
  const loginResult = JSON.parse(resultStr)['pwd_hash'] === pwd_hash;
  return loginResult;
}

module.exports = {
  checkUser
};
