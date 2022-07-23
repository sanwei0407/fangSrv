/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640573958535_6320';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  // 开启 cors跨越
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE,PATCH',
  };
  // 关闭 csrf跨域
  config.security = {
    csrf: {
      enable: false,
    },
  };


  
  // 短信验证码;
  config.sms = {
    client: {
      accessKeyId: 'LTAI5tJpYFw8vXAF1wfpt1GW', // 阿里云的AccessKey 管理
      secretAccessKey: 'ps3dn1Ye4p1YCM3QBZ2pwhTK33l1iJv', // 阿里云的AccessKey 管理z中查看secret
    },
  };


  //  oss
  config.oss = {
    client: { // 图片上传
      accessKeyId: 'LTAI4FkGw1t2Y12u37S6VKZbQ', // 阿里云账号
      accessKeySecret: 'BGLewysNia33dBzaxyHmAuEFyu0oUmw7',
      bucket: 'qffang',
      endpoint: 'oss-cn-shenzhen.aliyuncs.com',
      timeout: '80s',
    },
  };



  // sequelize 配置

  // 配置数据库
  config.sequelize = {
    dialect: 'mysql', // 数据库类型
    database: 'fang', // 数据库名
    host: '39.108.225.220',
    // host: '127.0.0.1',
    port: 3306,
    username: 'fang',
    password: 'GktBShWfeTXwXCwy',
    define: {
      underscored: false, // 禁止把下划线做间隔的表明转变成驼峰
      freezeTableName: true, // 冻结表名 意思是 sequelize会自动把表名添加负数，所以需要冻结避免被修改
      timestamps: true, // 自动的帮我们维护 createdAt updatedAt
    },
  };

  // 使用redis
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  };


  // 启用Flie文件模式
  config.multipart = {
    mode: 'file',
    fileExtensions: [ 'pdf', 'doc', 'docx', 'pptx', 'xls', 'xlsx', 'epub', 'apk' ], // 增加对 apk 扩展名的文件支持
    fileSize: '200mb',
    fields: 300,
  };


  return {
    ...config,
    ...userConfig,
  };
};
