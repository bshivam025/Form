// const http = require('http');

const Form = require("../models/form");

// const server = http.createServer((req,res) => {
//     console.log('request made');
// });

// server.listen(1337,'localhost', ()=> {
//     console.log('listening');
// });

module.exports = {
    formpage: async function (req, res) {
        // if (req.method == 'GET') {
            // let selectSql = `SELECT * FROM student`;
            // let answer = (await sails.getDatastore().sendNativeQuery(selectSql, []));
        // }
        res.view('form/formpage');
    },
    about: async function (req, res) {

        // if (req.method == 'GET') {
            let selectSql = `SELECT * FROM student ORDER BY roll_no`;
            let answer = (await sails.getDatastore().sendNativeQuery(selectSql, []));
            console.log(answer.rows[0].First_name)
            res.view({
                data: answer.rows,
            });
        },
    create: async function(req,res){

        var fname = req.body.fname;
        var lname = req.body.lname;
        var age = req.body.age;
        var rollno = req.body.rollno;
        console.log("here");
        let query = `INSERT INTO student values ($1,$2,$3,$4);`;
        (await sails.getDatastore().sendNativeQuery(query, [fname,lname,age,rollno]));
        res.redirect('/form/about');
    },

    delete: async function(req,res){

        var rollno = req.body.rollno;

        let query = `DELETE FROM student WHERE roll_no = ($1)`;
        (await sails.getDatastore().sendNativeQuery(query, [rollno]));
        res.redirect('/form/about');
    },

    update: async function(req,res){

        var fname = req.body.fname;
        var lname = req.body.lname;
        var age = req.body.age;
        var rollno = req.body.rollno;

        let query = `UPDATE student SET First_name = ($1), Last_name = ($2) , age = ($3) WHERE roll_no = ($4)`;

        (await sails.getDatastore().sendNativeQuery(query, [fname,lname,age,rollno]));
        res.redirect('/form/about');

    }
}




 // await Form.find({}).exec(function(err,form){

        //     if( err ){
        //         res.send(500, {error : 'Database Error'});
        //     }

        //     res.view('form/formpage',{form : form});
        // });