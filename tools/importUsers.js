const Users            = require('../schemas/Users.js');
const users = [
        {
            "name": "Fikre",
            "last_name": "Kidane",
            "email": "kidanefikre08@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Endashaw",
            "last_name": "Mogessie",
            "email": "endumog78@yahoo.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Desta",
            "last_name": "Lorenso",
            "email": "destalorenso@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Shiferaw",
            "last_name": "Negash",
            "email": "shifeabbageda@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Mezmur",
            "last_name": "Hawaz",
            "email": "mezmurhdw@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Shigut",
            "last_name": "Bifessa",
            "email": "sbifesa@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Solomon",
            "last_name": "Cherie",
            "email": "Solomoncherie12@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Afework",
            "last_name": "Mekeberiaw",
            "email": "afotesfaye@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Biruk",
            "last_name": "H/Mariam",
            "email": "Birukhabte554@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Nykuma",
            "last_name": "Asrat",
            "email": "asratgnekuma@yahoo.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Abreham",
            "last_name": "Gizaw",
            "email": "abarslet@yahoo.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Teshome",
            "last_name": "Atnafe",
            "email": "teshomeatnafie@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Tafesse",
            "last_name": "Mesfin",
            "email": "Tafmes@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Negash",
            "last_name": "Teklu",
            "email": "negashteklu@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Blaise",
            "last_name": "Okinyi",
            "email": "okinyi_akite@yahoo.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Tom",
            "last_name": "Ouna",
            "email": "tomouna2012@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Gibson",
            "last_name": "Kiragu",
            "email": "gibson.kiragu@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Eugene",
            "last_name": "Mwandoe",
            "email": "mwandoemnyamwezi@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "John",
            "last_name": "Kinyanjui",
            "email": "jnwkinyanjui@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "George",
            "last_name": "Krhoda",
            "email": "George.krhoda@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Gladys",
            "last_name": "Wekesa",
            "email": "gnwekesa@gmail.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Dr. Amare",
            "last_name": "Bantider",
            "email": "amare.b@wlrc-eth.org",
            "password": "Dafne123!!"
        },
        {
            "name": "Dr. Yilikal",
            "last_name": "Anteneh",
            "email": "yilikal.a@wlrc-eth.org",
            "password": "Dafne123!!"
        },
        {
            "name": "Prof.",
            "last_name": "Eric Odada",
            "email": "eodada@uonbi.ac.ke",
            "password": "Dafne123!!"
        },
        {
            "name": "Prof. Alfred",
            "last_name": "Opere",
            "email": "aopere@uonbi.ac.ke",
            "password": "Dafne123!!"
        },
        {
            "name": "Dr. Samuel",
            "last_name": "Ochola",
            "email": "s.ochola@yahoo.com",
            "password": "Dafne123!!"
        },
        {
            "name": "Prof. Paolo",
            "last_name": "Burlando",
            "email": "burlando@ifu.baug.ethz.ch",
            "password": "Dafne123!!"
        },
        {
            "name": "Dr. Scott",
            "last_name": "Sinclair",
            "email": "sinclair@ifu.baug.ethz.ch",
            "password": "Dafne123!!"
        },
        {
            "name": "Dr. Fritz",
            "last_name": "Kleinschroth",
            "email": "fritz.kleinschroth@usys.ethz.ch",
            "password": "Dafne123!!"
        },
        {
            "name": "Prof. Andrea",
            "last_name": "Castelletti",
            "email": "andrea.castelletti@polimi.it",
            "password": "Dafne123!!"
        },
        {
            "name": "Dr. Matteo",
            "last_name": "Giuliani",
            "email": "matteo.giuliani@polimi.it",
            "password": "Dafne123!!"
        },
        {
            "name": "Dr. Jazmin",
            "last_name": "Zatarain Salazar",
            "email": "jazmin.zatarain@polimi.it",
            "password": "Dafne123!!"
        },
        {
            "name": "Mr. Marco",
            "last_name": "Micotti",
            "email": "marco.micotti@polimi.it",
            "password": "Dafne123!!"
        },
        {
            "name": "Dr. Marta",
            "last_name": "Zaniolo",
            "email": "marta.zaniolo@polimi.it",
            "password": "Dafne123!!"
        },
        {
            "name": "Caroline",
            "last_name": "Van Bers",
            "email": "cvanbers@uni-osnabrueck.de",
            "password": "Dafne123!!"
        },
        {
            "name": "Caroline",
            "last_name": "Lumosi",
            "email": "caroline.lumosi@uni-osnabrueck.de",
            "password": "Dafne123!!"
        },
        {
            "name": "Dr. Jonathan",
            "last_name": "Lautze",
            "email": "J.Lautze@cgiar.org",
            "password": "Dafne123!!"
        },
        {
            "name": "Ms. Patience",
            "last_name": "Mukuyu",
            "email": "P.Mukuyu@cgiar.org",
            "password": "Dafne123!!"
        },
        {
            "name": "Ms. Julie",
            "last_name": "Gibson",
            "email": "julie.gibson@abdn.ac.uk",
            "password": "Dafne123!!"
        }
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
