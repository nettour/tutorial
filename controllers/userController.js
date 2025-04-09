const userStorage = require('../storages/userStorage')

exports.userListGet = (req, res)=>{
    res.render('index', {
        title: "Home",
        users : userStorage.getUsers()
    })
}

exports.userCreateGet = (req, res)=>{
    res.render('createUser', {title: 'Create User'})
}

exports.userCreatePost = (req, res)=>{
    const {firstName, lastName} = req.body
    userStorage.addUser({firstName, lastName})
    res.redirect('/')   
}

//validation
const {body, validationResult} = require('express-validator')

const alphaErr = 'must only contain letter'
const lengthErr = 'must be between 0 and 10 charachters'

const validateUser = [
    body('firstName').trim()
        .isAlpha().withMessage(`First Name ${alphaErr}`)
        .isLength({min:1, max:10}).withMessage(`First Name ${lengthErr}`),

    body('lastName').trim()
        .isAlpha().withMessage(`Last Name ${alphaErr}`)
        .isLength({min:1, max:10}).withMessage(`Last Name ${lengthErr}`)
]