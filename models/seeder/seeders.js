const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const db = require('../../config/mongoose')
const categoriesJson = require('../../categroies.json')

const CATEGORY = {
    家居物業: "fa-solid fa-house",
    交通出行: "fa-solid fa-van-shuttle",
    休閒娛樂: "fa-solid fa-face-grin-beam",
    餐飲食品: "fa-solid fa-utensils",
    其他: "fa-solid fa-pen"
}

const SEED_USER = {
    name: 'root',
    email: 'root@example.com',
    password: '12345678',
    creatAt: Date.now()
}

db.once('open', () => {
    const promiseArray = [];

    promiseArray.push(
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
                for (let i = 0; i < 10; i++) {
                    Record.create({ name: `name-${i}`, userId })
                }
            })
            .then(() => {
                console.log('record done!')
            })
    )

    promiseArray.concat(
            categoriesJson.results
                .map(category => {
                    category.icon = CATEGORY[category.name]
                    return Category.create(category)
                })
        );

    Promise.all(promiseArray).then(() => process.exit());
})
