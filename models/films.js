var db = require('../db');

exports.insert = function InsertHandler(title, description, release_year, length, rating, category_id, done){
    var values = [title, description, release_year, length, rating, category_id];
    db.get().query(
        'INSERT INTO films (title, description, release_year, length, rating, category_id) ' +
        'VALUES (?,?,?,?,?,?)', values, function InsertQueryHandler(err, result){
            if (err)
                return done(err);
            done(null, result);
        });
}

exports.getAll = function GetAllHandler(done){
    db.get().query(
        'SELECT * FROM films LIMIT 100', function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}

exports.findById = function FindByIdHandler(id, done){
    db.get().query(
        'SELECT * FROM films WHERE film_id = ?', id,
        function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
}

exports.update = function UpdateHandler(title, description, release_year, length, rating, category_id, film_id, done){
    var values = [title, description, release_year, length, rating, category_id, film_id];
    db.get().query(
        'UPDATE films SET title = ?, description = ?, release_year = ?, length = ?, rating = ?, category_id = ? ' +
        'WHERE film_id =?', values, function InsertQueryHandler(err, result){
            if (err)
                return done(err);
            done(null, result.affectedRows);
        });
}

exports.delete = function DeleteHandler(filmId, done){
    db.get().query(
        'DELETE FROM film WHERE film_id = ?', filmId,
        function DeleteQueryHandler(err, result){
            if (err)
                return done(err);
            console.log(result);
            done(null, result.affectedRows);
        }
    );
}
