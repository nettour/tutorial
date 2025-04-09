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


//new user form & validation
const {body, validationResult} = require('express-validator')

const alphaErr = 'must only contain letters'
const lengthErr = 'must be between 1 and 10 charachters'

const validateUser = [
    body('firstName').trim()
        .isAlpha().withMessage(`First Name ${alphaErr}`)
        .isLength({min:1, max:10}).withMessage(`First Name ${lengthErr}`),

    body('lastName').trim()
        .isAlpha().withMessage(`Last Name ${alphaErr}`)
        .isLength({min:1, max:10}).withMessage(`Last Name ${lengthErr}`)
]

exports.userCreatePost = [
    validateUser,
    (req, res) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).render('createUser', {
                title: "Create User",
                errors: errors.array()
            })
        }

        const {firstName, lastName} = req.body
        userStorage.addUser({firstName, lastName})
        res.redirect('/')   
    }
]

//user update

exports.userUpdateGet = (req, res)=>{
    const user = userStorage.getUser(req.params.id)
    res.render('updateUser', {
        title: "Update User",
        user: user
    })
}

exports.userUpdatePost = [
validateUser,
(req, res)=> {
    const user = userStorage.getUser(req.params.id)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).render('updateUser', {
            title: "Update User",
            errors: errors.array()
        })
    }

    const {firstName, lastName} = req.body
    userStorage.updateUser(user.id, {firstName, lastName})
    res.redirect('/')
}
]

exports.userDeletePost = (req, res)=>{
    const userId = req.params.id
    userStorage.deleteUser(userId)
    res.redirect('/')
}