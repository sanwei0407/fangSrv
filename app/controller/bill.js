'use strict';

const Controller = require('egg').Controller;

class BuildController extends Controller {

  // 账单

  // 添加账单
  async add() {
    const { ctx } = this;
    const uid = 1; // todo 以后的uid 通过token解密获取

    const { roomId, monthFee, waterCount, dianCount, otherFee, dianCost, waterCost, sDate, eDate } = ctx.request.body; // 得到post请求的body参数

    // 数据过滤
    if (!roomId) return ctx.body = { success: false, info: 'roomid不能为空' };
    if (typeof monthFee !== 'number') return ctx.body = { success: false, info: '月租不能为空' };
    if (typeof waterCount !== 'number') return ctx.body = { success: false, info: 'waterCount不能为空' };
    if (typeof dianCount !== 'number') return ctx.body = { success: false, info: 'dianCount不能为空' };
    if (typeof dianCost !== 'number') return ctx.body = { success: false, info: 'dianCost不能为空' };
    if (typeof waterCost !== 'number') return ctx.body = { success: false, info: 'waterCost不能为空' };
    if (!sDate) return ctx.body = { success: false, info: 'sDate不能为空' };
    if (!eDate) return ctx.body = { success: false, info: 'eDate不能为空' };


    try {
      await ctx.model.Bill.create({
        roomId, monthFee, waterCount, dianCount,  dianCost, waterCost, sDate, eDate, uid,otherFee:0
      });

      ctx.body = { success: true, info: '创建成功' };

    } catch (e) {
      console.log('bill add ', e);
      ctx.body = { success: false, info: '添加失败' };
    }

  }

  // 删

  async remove() {
    const { ctx } = this;
    const { id } = ctx.request.body;

    if (!id) return ctx.body = { success: false, info: 'id不能为空' };

    try {
      await ctx.model.Bill.destory({
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
    if (!id) return ctx.body = { success: false, info: 'id不能为空' };


    try {
      await ctx.model.Bill.update(updateData, {
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
  async billInfo() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: 'streeNum不能为空' };
    try {
      const one = await ctx.model.Bill.findByPk(id);
      ctx.body = { success: true, data: one, info: '查询成功' };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
    }
  }

  // 查询多个 指定条件
  async queryBuild() {
    const { ctx, app } = this;
    let { page, limit, uid, roomId, payStatus, sDate, eDate, realName } = ctx.request.body;
    const { Op } = app.Sequelize;

    page = page || 1;
    limit = limit || 20;
    const offset = (page - 1) * limit;

    const queryData = {};
    if (uid) queryData.uid = uid;
    if (roomId) queryData.roomId = roomId;
    if (payStatus) queryData.payStatus = payStatus;

    if (sDate && !eDate) queryData.createdAt = { [Op.gte]: sDate };
    if (eDate && !sDate) queryData.createdAt = { [Op.lte]: eData };
    if (sDate && eDate) queryData.createdAt = { [Op.between]: [ sDate, eDate ] };

    // 如果 传入有用户名
    const users = await ctx.model.User.findAll({
      where: {
        realName: { [Op.like]: `${realName}%` },
      },
      attributes: [ 'uid' ],
    });
    if (users.length) queryData.uid = { [Op.in]: users.map(item => item.uid) };


    try {
      const all = await ctx.model.Bill.findAndCountAll({
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
