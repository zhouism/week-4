const settings = require("./settings"); // settings.json
const knex = require('knex')({
    client: 'pg',
    connection: settings
});
const query = process.argv[2];

knex.select('*')
    .from('famous_people')
    .where('first_name', query)
    .orWhere('last_name', query)
    .asCallback(function(err, result) {
        if (err) return console.error(err);
        console.log(result)
    });



    