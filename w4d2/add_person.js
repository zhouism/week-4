
const settings = require("./settings"); // settings.json
const knex = require('knex')({
    client: 'pg',
    connection: settings
});
const newFirstName = process.argv[2];
const newLastName = process.argv[3];
const newBirthdate = process.argv[4];

knex('famous_people')
    .returning('*')
    .insert([{first_name: newFirstName, last_name: newLastName, birthdate: newBirthdate}])
    .asCallback(function(err, result) {
        if (err) return console.error(err);
        console.log(result)
    })
