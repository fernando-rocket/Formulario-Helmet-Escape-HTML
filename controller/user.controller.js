const User = require('../model/user.model.js')

const createUser = async req => {
    console.log(req)
    info = {
        name: req[0],
        password: req[1],
        birthday: req[2]
    }
    try {
        const search = await User.findOne({name:req[0]})
        if(search){
           console.log("User's name has been already used")
        }
        const user = await User.create(info)
        console.log(user)
    } catch (error) {
        console.log("Algo deu errado :(" + error)
    }
}

module.exports = {
    createUser
}