'use strict';

const Controller = require('egg').Controller;

const util = require('utility');
class commonController extends Controller {

  async bdSearch() {
    const { ctx } = this;
    const { keyword } = ctx.request.body;
    const bmapak = '1RO8EvPHSDzApYU0pORqyXKEWAmGs3we'; // 服务端的key
    // 使用到的接口文档地址 https://lbsyun.baidu.com/index.php?title=webapi/place-suggestion-api
    const res = await ctx.curl(`https://api.map.baidu.com/place/v2/suggestion?query=${keyword}&region=广州&city_limit=true&output=json&ak=${bmapak}`, {
      dataType: 'json',
    });

    ctx.body = { success: true, data: res.data };
  }

  async getCode() {

    const { ctx, app } = this;
    const { phone } = ctx.request.body;

    const _code = await app.redis.get(`code_${phone}`);
    if (_code) return ctx.body = { success: true, info: '验证码已发送，请不要频繁操作' };

    // 生成4个随机数字
    const randomTxt = util.randomString(4, '1234567890');
    // 真正的去发送短信给指定的手机号码

    await ctx.sms.sendSMS({
      PhoneNumbers: phone,
      SignName: '三微智能',
      TemplateCode: 'SMS_193786026',
      TemplateParam: `{ "code" : "${randomTxt}"}`,
    });

    await app.redis.set(`code_${phone}`, randomTxt, 'EX', 300);

    ctx.body = { success: true, info: '验证码已发送', code: randomTxt };

  }

  async test() {
    const { ctx, app } = this;

    await app.redis.set('name1', 888888, 'EX', 20);

    const res = await app.redis.get('name1');

    ctx.body = res;
  }


  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0]; // 得到上传的图片
    const ext = file.filename.split('.').pop(); // 得到文件后缀

    const _date = util.YYYYMMDD(''); // 20211219
    const type = 'common';
    const normalPath = `${type}/${_date}`; // 路径 common/20211229
    const newFileName = Date.now() + '.' + ext;
    try {
      // 处理文件，比如上传到云端
      console.log('do upload to the oss');
      //  ctx.oss.put(新的文件路径,要上传的文件);
      const res = await ctx.oss.put(normalPath + '/' + newFileName, file.filepath);

      console.log(res);
      console.log('end');
      ctx.body = { success: true, data: 'http://fang.1775.net.cn/' + normalPath + '/' + newFileName };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, msg: e };
    } finally {
      // await fs.unlinkSync(file.filepath);
    }

  }
}

module.exports = commonController;
