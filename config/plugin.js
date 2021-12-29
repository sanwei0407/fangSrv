'use strict';

/** @type Egg.EggPlugin */
module.exports = {

  //  npm i  egg-sequelize
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // npm i egg-cors
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  sms: { // 短信发送
    enable: true,
    package: 'egg-sms',
  },
  oss: { // aliyun oss上传
    enable: true,
    package: 'egg-oss',
  },
};
