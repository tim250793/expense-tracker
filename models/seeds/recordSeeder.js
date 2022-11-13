const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const db = require('../../config/mongoose')
const categoriesJson = require('../../categroies.json')


const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

const SEED_RECORD = [
  {
    name: '早餐',
    date: '2022-01-01',
    amount: 100,
    categoryId: 4
  },
  {
    name: '午餐',
    date: '2022-01-01',
    amount: 100,
    categoryId: 4
  },
  {
    name: '公車',
    date: '2022-01-02',
    amount: 120,
    categoryId: 2
  },
  {
    name: '房租',
    date: '2022-01-02',
    amount: 25000,
    categoryId: 1
  },
  {
    name: '手搖飲料',
    date: '2022-01-03',
    amount: 60,
    categoryId: 3
  }]


db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(SEED_RECORD.map(record => {
        console.log(`${record.name} has been created.`)
        return Record.create({ ...record, userId })
      }))
    })
    .then(() => {
      console.log('recordSeeder is done.')
      process.exit()
    })
})