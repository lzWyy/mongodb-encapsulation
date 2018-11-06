### mongodb 在 node 中操作数据库的基础封装
该文件是原生 `mongodb` 在 `node` 环境中操作数据库的一些基本方法封装

- 使用
1. 修改数据库地址和数据库名，最好单独配置一个 `config` 文件，然后引入 `db` 文件
  ```javascript
  const DBurl = 'mongodb://127.0.0.1:27017'  // 数据库地址
  const dbName = 'myAdmin'  // 数据库名
  ```
2. 在文件夹中引入 db
  ```javascript
  const db = require('./db')
  ```


**eg:** 查找 `user` 集合中的 `age` 大于 `20` 的所有文档
```JAVASCRIPT
const db = require('./db')

db.find('user', {age: {$lt: 20}}).then((docs) => {
  console.log(docs)
})

或者： 

let docs = await db.find('user', {age: {$lt: 20}})
console.log(docs)
```
