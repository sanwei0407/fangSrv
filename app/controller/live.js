'use strict';

const Controller = require('egg').Controller;

class BuildController extends Controller {

  // 添加入住信息

  // 添加入住
  async add() {
    const { ctx } = this;
    const uid = 1; // todo 以后的uid 通过token解密获取

    const {
      roomId, checkInDate, promiseFee,
      monthFee, dianFee, waterFee, mangeFee,
      otherFee, payDay, howlong, idNum, phone, realName,
    } = ctx.request.body; // 得到post请求的body参数


    const status = 1; // 已入住

    // 数据过滤
    if (!howlong) return ctx.body = { success: false, info: '入住月份数不能为空' };
    if (!promiseFee) return ctx.body = { success: false, info: '押金不能为空' };
    if (!monthFee) return ctx.body = { success: false, info: '月租不能为空' };
    if (!payDay) return ctx.body = { success: false, info: '每个月的缴费时间不能为空' };
    if (!checkInDate) return ctx.body = { success: false, info: '入住时间不能为空' };


    try {
      await ctx.model.Live.create({
        roomId, checkInDate, promiseFee, monthFee, dianFee, waterFee, mangeFee, otherFee, payDay, howlong, uid, idNum, phone, realName,
      });

      ctx.body = { success: true, info: '创建成功' };

    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '添加失败' };
    }

  }

  // 删

  async remove() {
    const { ctx } = this;
    const { id } = ctx.request.body;

    if (!buildId) return ctx.body = { success: false, info: 'buidId不能为空' };

    try {
      await ctx.model.Live.destory({
        where: {
          id,
        },
      });

      ctx.body = { success: true, info: '删除成功' };

    } catch (e) {
      ctx.body = { success: false, info: '删除失败' };
    }
  }

  // 修改
  async update() {
    const { ctx } = this;
    const uid = 1; // todo 以后的uid 通过token解密获取
    const { id, ...updateData } = ctx.request.body; // 得到post请求的body参数
    // 数据过滤
    if (!id) return ctx.body = { success: false, info: 'streeNum不能为空' };

    try {
      await ctx.model.Live.update(updateData, {
        where: {
          id,
        },
      });

      ctx.body = { success: true, info: '修改成功' };

    } catch (e) {
      ctx.body = { success: false, info: '修改失败' };
    }

  }

  // 查询一个
  async liveInfo() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: 'id不能为空' };
    try {
      const one = await ctx.model.Live.findByPk(id);
      ctx.body = { success: true, data: one, info: '查询成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '查询失败' };
    }
  }

  // 查询多个 指定条件
  async queryBuild() {
    const { ctx, app } = this;
    let { page, limit, uid, checkInDate, status, roomId } = ctx.request.body;
    const { Op } = app.Sequelize;

    page = page || 1;
    limit = limit || 20;
    const offset = (page - 1) * limit;

    const queryData = {};
    if (uid) queryData.uid = uid;
    if (checkInDate) queryData.checkInDate = { [Op.gte]: checkInDate };
    if (status) queryData.status = status;
    if (roomId) queryData.roomId = roomId;

    try {
      const all = await ctx.model.Live.findAndCountAll({
        where: queryData,
        offset, // 查询偏移量(起点)
        limit, // 查询的返回的记录
      });
      ctx.body = { success: true, data: all, info: '查询成功' };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
    }


  }


}

module.exports = BuildController;
