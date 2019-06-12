var db = require('../db');

exports.insert = function InsertHandler(name, done){
    var values = [name];
    db.get().query(
        'INSERT INTO films (name) ' +
        'VALUES (?)', values, function InsertQueryHandler(err, result){
            if (err)
                return done(err);
            done(null, result);
        });
}

exports.getAll = function GetAllHandler(done){
    db.get().query(
        'SELECT * FROM categories LIMIT 100', function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}

exports.findById = function FindByIdHandler(id, done){
    db.get().query(
        'SELECT * FROM categories WHERE categories_id = ?', id,
        function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}
