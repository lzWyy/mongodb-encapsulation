const DBurl = 'mongodb://127.0.0.1:27017'
const dbName = 'myAdmin'

const MongoClient = require('mongodb').MongoClient

class DB {
  static isInstance () { // 单例模式
    if (!DB.instance) {
      DB.instance = new DB()
    } 
    return DB.instance
  }
  constructor () {
    this.dbClient = ''
    this.connect()
  }

  connect () {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) {
        MongoClient.connect(DBurl, function (err, client) {
          if (err) {
            reject(err)
          } else {
            console.log('mongodb connect success!')
            resolve(client.db(dbName))
          }
        })
      } else {
        resolve(this.dbClient)
      }
    })
  }
  // 查找
  find (collectionName, ...args) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).find(...args).toArray((err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
  }
  // 插入
  insert (collectionName, ...args) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
          db.collection(collectionName).insert(...args, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
      })
    })
  }
  // 删除
  remove (collectionName, ...args) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
          db.collection(collectionName).remove(...args, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
      })
    })
  }
  // 修改
  updata (collectionName, params, data) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
          db.collection(collectionName).update(params, {$set: data}, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
      })
    })
  }
}

module.exports = DB.isInstance()
