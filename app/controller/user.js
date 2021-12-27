'use strict';

const Controller = require('egg').Controller;

const util = require('utility')
class UserController extends Controller {

  // 用户流程
  // 登录流程如果用户未注册 自动注册一个新用户
  async login(){
    const { ctx } = this;
    const { phone,code ,type } = ctx.request.body;
    const _code = '123456' //  todo 后面需要修改成从redis当中去检验
    if(!/^1[3-9]\d{9}$/.test(phone))  return ctx.body = {success:false,info:'请填写一个正确的手机号码'};
    if(code !== _code) return ctx.body = {success:false,info:'请填写正确的手机验证码'};
    try{
        // 判断当前手机号码是否占用  找不到 返回null
        const one = await ctx.model.User.findOne({
          where:{
            phone
          }
        })

        let user = one;  
        // 如果不存在 先注册
        if(!one){
          user =  await ctx.model.User.create({
              phone,
              type
            })
        }  
        ctx.body = { success:true,info:'登录成功',data:user}

    } catch(e) {
        ctx.body = { success:true,info:'登录失败'}

    }

  }

  // 修改手机号码
  async updatePhone(){
        const { ctx } = this;
        const { newPhone,oldPhone,code   } = ctx.request.body;
        const uid = 1;  
        const _code = '123456'

        if(newPhone===oldPhone)  return ctx.body = {success:false,info:'你确定你没搞错？'}; 
        if(!/^1[3-9]\d{9}$/.test(newPhone))  return ctx.body = {success:false,info:'请填写一个正确的手机号码'};
        if(!/^1[3-9]\d{9}$/.test(oldPhone))  return ctx.body = {success:false,info:'请填写一个正确的手机号码'};
        if(_code !==code) return ctx.body = {success:false,info:'请填写正确的手机验证码'};
        try{
            // 判断当前新的号码号码是否被占压
            const u = await ctx.model.User.findOne({
              where:{
                phone:newPhone
              }
            })
            if(u) return ctx.body = {success:false,info:'该手机号码已被使用'};

            await u.update({
              phone:newPhone
            })

             ctx.body = {success:true,info:'修改成功'}
        }catch(e){
               ctx.body = {success:false,info:'修改失败'}
        }
     
  }

   // 修改密码
  async updatePwd(){
    const { ctx } = this;
    const { newpwd,oldpwd   } = ctx.request.body;
    const uid = 1;  

    try{

        // 约定密码的加密流程为 md5(密码+注册时间)
        const u = await ctx.model.User.findByPk(uid)
        const { pwd } = u;

        // 如果原来已经有密码 就是修改密码流程需要检验旧密码
        if(pwd){
          const md5oldpwd = util.md5(`${oldpwd}${u.createdAt}`);
          if(md5oldpwd !== u.pwd) return { success:false,info:'旧密码匹配不正确' }
        
        }  

          await u.update({
            pwd: util.md5(`${newpwd}${u.createdAt}`)
          })
  
          ctx.body = {success:true,info:'修改成功'}

    }catch(e){
           ctx.body = {success:false,info:'修改失败'}
    }
 
}

// 修改用户信息
  async updateUserInfo(){
    const { ctx  } = this;
    const { realName,idNum } = ctx.request.body;

    const uid = 1;
    const updateData = {}

    if(realName) updateData.realName = realName;
    if(idNum) updateData.idNum = idNum;
    
    try{
        await ctx.model.User.update(updateData,{
          where:{
            uid
          }
        })
        
        ctx.body = {success:true,info:'修改成功'}

      }catch(e){
         ctx.body = {success:false,info:'修改失败'}
      }

  

  }

    // 查询一个
    async userInfo() {
      const { ctx } = this;
      const { uid } = ctx.request.body;
      if (!roomId) return ctx.body = { success: false, info: 'uid不能为空' };
      try {
        const one = await ctx.model.User.findByPk(uid,{
          attributes:{
            exclude:['pwd']
          }
        });

        ctx.body = { success: true, data: one, info: '查询成功' };
      } catch (e) {
        ctx.body = { success: false, info: '查询失败' };
      }
    }
  
    // 查询多个 指定条件
    async queryBuild() {
      const { ctx, app } = this;
      let { page, limit,realName,phone} = ctx.request.body;
      const { Op } = app.Sequelzie;
  
      page = page || 1;
      limit = limit || 20;
      const offset = (page - 1) * limit;
  
      const queryData = {};
      if (phone) queryData.name = { [Op.like]: `${phone}%` };
      if (realName) queryData.roomNum = { [ Op.like]: `${realName}%` };
  
      try {
        const all = await ctx.model.User.findAndCountAll({
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

module.exports = UserController;
