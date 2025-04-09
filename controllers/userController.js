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

