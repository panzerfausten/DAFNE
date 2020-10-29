const Users            = require('../schemas/Users.js');
const users = [
        {
            "name": "Dafne",
            "last_name": "Nsl1",
            "email": "dane-nsl1@dafne-nsl.eu",
            "password": "Dafne123!!"
        },
        {
            "name": "Dafne",
            "last_name": "Nsl2",
            "email": "dane-nsl2@dafne-nsl.eu",
            "password": "Dafne123!!"
        },
        {
            "name": "Dafne",
            "last_name": "Nsl3",
            "email": "dane-nsl3@dafne-nsl.eu",
            "password": "Dafne123!!"
        },
        {
            "name": "Dafne",
            "last_name": "Nsl4",
            "email": "dane-nsl4@dafne-nsl.eu",
            "password": "Dafne123!!"
        },        
        {
            "name": "Dafne",
            "last_name": "Nsl5",
            "email": "dane-nsl5@dafne-nsl.eu",
            "password": "Dafne123!!"
        },        
]
setTimeout(async function(){
    for (const u in users){
        const user = users[u];
        console.log("->",user)
        let dbUser = new Users(
            {
                name: user.name.trim(),
                password:user.password.trim(),
                email:user.email.toLowerCase().trim(),
                last_name:user.last_name.trim()
        });
        await dbUser.save(function(err,res){
            if(err){
                console.log('ERROR : ' + user.email)
                console.log(err)
            }else{
                console.log('SUCCESS : '+ user.email)
            }
        });
    }

},3000)
