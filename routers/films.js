var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes

var categoriesModel = require('../models/categories');
var filmsModel = require('../models/films');

router.get('/api', function HomePageHandler(request, response) {
	response.sendFile("/" + "index.html");
	//response.sendFile(__dirname + "/" + "index.html");
});

router.get('/films', function FilmsGetHandler(request, response){
	filmsModel.getAll(function DoneGettingAll(err, results, fields){
		if (err) {
            console.log("Some error selecting all");
            console.log(err);
            response.write("Error Getting All");
        } else {
            console.log("Successfully retrieve all records (100)");
            response.json(result);
        }
	});
});

router.get('/films/:id', function FilmsGetByIDHandler(request, response){
	filmsModel.findById(request.params.id, function DoneGettingById(err, result, fields){
	        if (err){
	            console.log("Some error finding by id");
	            console.log(err);
	            response.write("Error finding by id");
	        }else {
	            response.json(result);
	        }
	    });
});

router.post('/films', function FilmsPostHandler(request, response){
	        filmsModel.insert(
	            request.body.title,
	            request.body.description,
	            request.body.release_year,
	            request.body.rating,
	            request.body.category_id,
	            function DoneInserting(err, resultId){
	                if (err){
	                    console.log("Some error inserting");
	                    console.log(err);
	                    response.write("Error Inserting");
	                }else{
	                    response.json({ insertedId: resultId });
	                }
	            } );
});

router.put('/films', function FilmsPutHandler(request, response){
	        filmsModel.update(
	            request.body.title,
	            request.body.description,
	            request.body.release_year,
							request.body.length,
	            request.body.rating,
	            request.body.category_id,
							request.body.film_id,
	            function DoneInserting(err, affectedRows){
	                if (err){
	                    console.log("Some error updating");
	                    console.log(err);
	                    response.write("Error updating");
	                }else{
	                    response.json({ rows: affectedRows });
	                }
	            } );
});

router.delete('/films', function FilmsDeleteHandler(request, response){
	filmsModel.delete(
		request.body.film_id,
		function DoneDeleting(err, affectedRows){
			if (err){
					console.log("Some error deleting");
					console.log(err);
					response.write("Error deleting");
			}else{
					response.json({ rows: affectedRows });
			}
		});
});

//router.get('/films-categories', function FilmsCategoriesGetHandler(request, response){});

module.exports = router;
