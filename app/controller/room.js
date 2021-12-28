'use strict';

const Controller = require('egg').Controller;

class BuildController extends Controller {

  // 房间

  // 添加房间
  async add() {
    const { ctx } = this;
    const uid = 1; // todo 以后的uid 通过token解密获取

    const {
      name, buildId, roomNum,
      floor, hasAc, hasBx,
       hasXyj,hasWifi,hasTv,mj,ting,rooms,monthFee,promiseFee,
       hasRsq,imgs,desc } = ctx.request.body; // 得到post请求的body参数

    // 数据过滤
    if (!name) return ctx.body = { success: false, info: 'name不能为空' };
    if (!buildId) return ctx.body = { success: false, info: 'buildId不能为空' };
    if (!roomNum) return ctx.body = { success: false, info: 'roomNum能为空' };

    try {

    // 确保同一个buildId下 roomNum 唯一
      const one  = await ctx.model.Rooms.findOne({
        where:{
          buildId,
          roomNum,
          mj,ting,rooms,monthFee,promiseFee,
        }
      })
      if(one) return ctx.body = { success: false, info: '当前物业下已经有相同的房间编号' };


      await ctx.model.Rooms.create({
        name, buildId, roomNum,
        floor, hasAc, hasBx,
        hasXyj,hasWifi,hasTv,
        hasRsq,imgs,desc,uid
      });

      ctx.body = { success: true, info: '创建成功' };

    } catch (e) {
      console.log('eee',e)
      ctx.body = { success: false, info: '添加失败' };
    }

  }

  // 删

  async remove() {
    const { ctx } = this;
    const { roomId } = ctx.request.body;

    if (!roomId) return ctx.body = { success: false, info: 'roomId不能为空' };

    try {
      await ctx.model.Rooms.destory({
        where: {
          roomId,
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

    const { roomId, ...updateData } = ctx.request.body; // 得到post请求的body参数

    // 数据过滤
    if (!roomId) return ctx.body = { success: false, info: 'roomId不能为空' };


    try {
      await ctx.model.Rooms.update(updateData, {
        where: {
          roomId,
        },
      });

      ctx.body = { success: true, info: '修改成功' };

    } catch (e) {
      ctx.body = { success: false, info: '修改失败' };
    }

  }

  // 查询一个
  async roomInfo() {
    const { ctx } = this;
    const { roomId } = ctx.request.body;
    if (!roomId) return ctx.body = { success: false, info: 'roomId不能为空' };
    try {
      const one = await ctx.model.Rooms.findByPk(roomId);
      ctx.body = { success: true, data: one, info: '查询成功' };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
    }
  }

  // 查询多个 指定条件
  async queryBuild() {
    const { ctx, app } = this;
    let { page, limit,buildId, name, roomNum } = ctx.request.body;
    const { Op } = app.Sequelize;

    page = page || 1;
    limit = limit || 20;
    const offset = (page - 1) * limit;

    const queryData = {};
    if (name) queryData.name = { [Op.like]: `${name}%` };
    if (buildId) queryData.buildId = buildId;
    if (roomNum) queryData.roomNum = { [ Op.like]: `${roomNum}%` };


    try {
      await ctx.model.Rooms.hasMany(ctx.model.Live,{ foreignKey:'roomId',targetKey:'roomId' })
      const all = await ctx.model.Rooms.findAndCountAll({
        where: queryData,
        offset, // 查询偏移量(起点)
        limit, // 查询的返回的记录
        include: [
          {
            model: ctx.model.Live,
            // required: false,
            // where: {
            //   status:1
            // }
          }
        ]
      });
      ctx.body = { success: true, data: all, info: '查询成功' };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
    }


  }


}

module.exports = BuildController;
