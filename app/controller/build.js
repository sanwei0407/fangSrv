'use strict';

const Controller = require('egg').Controller;

class BuildController extends Controller {

  // 建筑物

  // 添加建筑物
  async add() {
    const { ctx } = this;
    const uid = 1; // todo 以后的uid 通过token解密获取

    const { name, address, lat, lng, streetNum, imgs, desc, dianFee, waterFee } = ctx.request.body; // 得到post请求的body参数

    // 数据过滤
    if (!name) return ctx.body = { success: false, info: 'name不能为空' };
    if (!address) return ctx.body = { success: false, info: 'address不能为空' };
    if (!streetNum) return ctx.body = { success: false, info: 'streeNum不能为空' };

    try {
      await ctx.model.Build.create({
        name, address, lat, lng, streetNum, imgs, desc, uid, dianFee, waterFee,
      });

      ctx.body = { success: true, info: '创建成功' };

    } catch (e) {
      console.log('错误xcxi', e);
      ctx.body = { success: false, info: '添加失败' };
    }

  }

  // 删

  async remove() {
    const { ctx } = this;
    const { buildId } = ctx.request.body;

    if (!buildId) return ctx.body = { success: false, info: 'buidId不能为空' };

    try {
      await ctx.model.Build.destroy({
        where: {
          buildId,
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

    const { buildId, ...updateData } = ctx.request.body; // 得到post请求的body参数

    // 数据过滤
    if (!buildId) return ctx.body = { success: false, info: 'streeNum不能为空' };


    try {
      await ctx.model.Build.update(updateData, {
        where: {
          buildId,
        },
      });

      ctx.body = { success: true, info: '修改成功' };

    } catch (e) {
      ctx.body = { success: false, info: '修改失败' };
    }

  }

  // 查询一个
  async buildInfo() {
    const { ctx } = this;
    const { buildId } = ctx.request.body;
    if (!buildId) return ctx.body = { success: false, info: 'streeNum不能为空' };
    try {
      const one = await ctx.model.Build.findByPk(buildId);
      ctx.body = { success: true, data: one, info: '查询成功' };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
    }
  }

  // 查询多个 指定条件
  async queryBuild() {
    const { ctx, app } = this;
    let { page, limit, name, address, streetNum } = ctx.request.body;
    const { Op } = app.Sequelize;

    page = page || 1;
    limit = parseInt(limit) || 20;
    const offset = (page - 1) * limit;

    const queryData = {};
    if (name) queryData.name = { [Op.like]: `${name}%` };
    if (address) queryData.address = { [Op.like]: `${address}%` };
    if (streetNum) queryData.streetNum = { [ Op.like]: `${streetNum}%` };

    try {
      const all = await ctx.model.Build.findAndCountAll({
        where: queryData,
        offset, // 查询偏移量(起点)
        limit, // 查询的返回的记录
        order:[ ['buildId','DESC'] ] // 排序
      });
      ctx.body = { success: true, data: all, info: '查询成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '查询失败' };
    }


  }


}

module.exports = BuildController;
