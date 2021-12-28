'use strict';

const Controller = require('egg').Controller;

class commonController extends Controller {

  async bdSearch(){
    const { ctx } = this;
    const { keyword } = ctx.request.body;
    const bmapak = '1RO8EvPHSDzApYU0pORqyXKEWAmGs3we';
    const res = await ctx.curl(`https://api.map.baidu.com/place/v2/suggestion?query=${keyword}&region=广州&city_limit=true&output=json&ak=${bmapak}`,{
      dataType: 'json',
    });

    ctx.body = { success: true, data: res.data };
  }

}

module.exports = commonController;
