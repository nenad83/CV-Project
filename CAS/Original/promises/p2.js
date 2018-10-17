function zdravo() {
    console.log('Zdravo');
}

zdravo();

var a = 10;

var pozdrav = function() {
    console.log('pozdrav');
};

pozdrav();

var hello = () => {
    console.log('hello');
};


// ***********************************

document.querySelector('#kopce1').addEventListener('click', function() {
    console.log(this);
});

document.querySelector('#kopce2').addEventListener('click', () => {
    console.log(this);
});

// ***********************************

var functionCallback = () => {
    console.log('Callback!');
};






















var functionCallback1 = (cb) => {
    cb();
}

var fn1 = function(){
    console.log('***');
}

functionCallback1(fn1);

functionCallback1(function(){
    console.log('***');
});









var operacija = (a, b, fn) => {
    fn(a, b); // sobiranje(a, b); odzemanje(a, b);
}

var sobiranje = (a, b) => {
    var c = parseInt(a) + parseInt(b);
    console.log(c);
}

var odzemanje = (a, b) => {
    var c = parseInt(a) - parseInt(b);
    console.log(c);
}

operacija(10, 36, sobiranje);
operacija(3, 98, odzemanje);


















// var express = {
//     req: 'request object',
//     res: 'response object',
//     get: function(url, hfn) {
//         console.log(`ROUTE: ${url}`);
//         hfn(this.req, this.res);
//     },
// };

var get = function(url, hfn) {
    console.log(`ROUTE: ${url}`);
    hfn(this.req, this.res);
}


// console.log(express);


get('/cv', (req, res) => {
    console.log(req);
    console.log(res);
});














// var broj = 123;

// var str1 = "String so dupli " + broj + "navodnici";
// var str2 = 'String so edinechni ' + broj + ' navodnici';
// var str3 = `String so nakoseni ${broj} navodnici`;



















// var promise1 = (val) => {
//     return new Promise((resolve, reject) => {
//         if(1 == val) {
//             resolve(val);
//         } else {
//             reject('ERROR!!!!!');
//         }
//     });
// };

// promise1(3)
// .then((a) => {
//     console.log(a);
// }).catch((err) => {
//     console.log(err);
// });


var ubavaHrana = (hrana) => {
    return new Promise((resolve, reject) => {
        if(hrana.length % 2 == 0){
            resolve(hrana);
        }else{
            reject(hrana);
        }
    });
};

ubavaHrana('ajvar')
.then((h) => {
    console.log(`${h} e ubava hrana`);
}).catch((h) => {
    console.log(`${h} ne e ubava hrana`);
});











