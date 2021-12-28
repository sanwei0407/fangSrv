'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const version = '/api/v1';
  router.get('/', controller.home.index);

  // 楼栋的添加
  router.post(version + '/build/add', controller.build.add); // 添加建筑物
  router.post(version + '/build/remove', controller.build.remove); // 删除建筑物
  router.post(version + '/build/update', controller.build.update); // 修改建筑物
  router.post(version + '/build/buildInfo', controller.build.buildInfo); // 获取单个建筑物信息
  router.post(version + '/build/queryBuild', controller.build.queryBuild); // 获取多个建筑物信息

  // 房间
  router.post(version + '/room/add', controller.room.add); // 添加房间
  router.post(version + '/room/remove', controller.room.remove); // 删除房间
  router.post(version + '/room/update', controller.room.update); // 修改房间
  router.post(version + '/room/roomInfo', controller.room.roomInfo); // 获取单个房间信息
  router.post(version + '/room/queryBuild', controller.room.queryBuild); // 获取多个房间信息

  // 账单
  router.post(version + '/bill/add', controller.bill.add); // 添加账单
  router.post(version + '/bill/remove', controller.bill.remove); // 删除账单
  router.post(version + '/bill/update', controller.bill.update); // 修改账单
  router.post(version + '/bill/billInfo', controller.bill.billInfo); // 获取单个账单
  router.post(version + '/bill/queryBuild', controller.bill.queryBuild); // 获取多个账单信息

  // 入住

  router.post(version + '/live/add', controller.live.add); // 添加账单
  router.post(version + '/live/remove', controller.live.remove); // 删除账单
  router.post(version + '/live/update', controller.live.update); // 修改账单
  router.post(version + '/live/liveInfo', controller.live.liveInfo); // 获取单个账单
  router.post(version + '/live/queryBuild', controller.live.queryBuild); // 获取多个账单信息

  // 用户

  router.post(version + '/user/login', controller.user.login); // 添加账单
  router.post(version + '/user/updatePhone', controller.user.updatePhone); // 修改手机号码
  router.post(version + '/user/updatePwd', controller.user.updatePwd); // 修改密码
  router.post(version + '/user/updateUserInfo', controller.user.updateUserInfo); // 更新用户信息
  router.post(version + '/user/userInfo', controller.user.userInfo); // 获取多个账单信息
  router.post(version + '/user/queryBuild', controller.user.queryBuild); // 获取多个账单信息


  // 工具模块
  router.post(version + '/common/bdSearch',controller.common.bdSearch) // 关键字检索地址



};
