// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Record model
const Record = require('../../models/record')
const Categories = require('../../models/category')

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id   // 變數設定

  Record.find({ userId }) // 加入查詢條件, 取出 Record model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' }) // 升冪排列
    .then(records => {
      let totalAmount = 0

      Categories
        .find()
        .lean()
        .sort({ _id: 'asc' }) // 
        .then(categories => {
          Promise.all([
            records.map(record => {
              categories.map(category => {
                if (record.categoryId === category.id) {
                  record.icon = category.icon
                }
              })

              totalAmount += record.amount
            })
          ])
            .then(() => {
              res.render('index', { records, categories, totalAmount })
            })
        })
    }) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 設置搜尋路由
router.get('/sort', (req, res) => {
  const sort = req.query.sort.trim().toLowerCase()
  const userId = req.user._id

  if (sort === '類別') {
    return res.redirect('/')
  }

  Record.find({ userId, categoryId: sort })
    .lean()
    .then(records => {
      let totalAmount = 0

      Categories
        .find()
        .lean()
        .sort({ _id: 'asc' }) // desc
        .then(categories => {
          Promise.all([
            records.map(record => {
              categories.map(category => {
                if (record.categoryId === category.id) {
                  category.selected = 'selected'
                  record.icon = category.icon
                }
              })
              totalAmount += record.amount
            })
          ])
            .then(() => {
              res.render('index', { records, categories, totalAmount })
            })
        })
    })
})

module.exports = router