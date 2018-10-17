// var funkicija1 = (ime, prezime, cb) => {
//     console.log(ime, prezime);
//     var ip = ime + prezime;
//     cb(ip);
// };

// var i = 'Pero';
// var p = 'Perovski';

// var cb1 = (imePrezime) => {
//     console.log('CB1: ', imePrezime);
// };

// funkicija1(i, p, function(impr){
//     console.log(impr);
// });





var getUsers = (cb) => {
    // povik do baza
    // prezemanje na korisnicite vo niza
    var users = [
        'janko',
        'petko',
        'stanko',
        'stojanko'
    ];
    cb(users);
};

var render = (u) => {
    console.log(u);
}

var calculate = (u) => {
    var total = 0;
    for(let i = 0; i < u.length; i++){
        total += u[i].length;
    }
    console.log(total);
}

getUsers(render);
getUsers(calculate);



















var fn2 = (i) => {
    console.log(i)
};

fn2('pero');











var condition = true;

var getAllUsers = () => {
    return new Promise((resolve, reject) => {
        var users = [
            'janko',
            'petko',
            'stanko',
            'stojanko'
        ];
        if(condition == true){
            return resolve(users); 
        } else {
            return reject('no users found');
        }
    });
};

var calculateUsers = (users) => {
    return new Promise((resolve, reject) => {
        if(users.length == 0){
            return reject("can't have 0 users");
        } else {
            var total = 0;
            for(let i = 0; i < users.length; i++){
                total += users[i].length;
            }
            return resolve(total);
        }
    });
}

// console.log(getAllUsers());

getAllUsers()
.then((users) => {
    return calculateUsers(users);
})
.then((total) => {
    console.log(total);
})
.catch((err) => {
    console.error(err);
});



// real worl example with fetch

fetch('https://jsonplaceholder.typicode.com/posts')
.then((data) => {
    return data.json();
})
.then((p) => {
    console.log(p);
})
.catch((err) => {
    console.error(err);
})
