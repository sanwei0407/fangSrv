## 项目中使用到的第三方插件

## 绝大多数的都可以直接使用npm i 
- npm i egg-cors   解决跨域
- npm i egg-sequelize  mysql ORM类库
- npm i mysql2 node当中的mysql链接的驱动
- npm i utility 工具包  主要是用来实现md5加密
- npm i egg-sequelize-auto  -g  全局安装  用来根据我们的数据库实际的表来生成model


## 在package.json文件当中声明有一个 scripts 
db: 对应的就是 egg-sequelize-aut 要配置的内容 根据你的实际项目进行配置（主要的就是对应的数据库的 信息)