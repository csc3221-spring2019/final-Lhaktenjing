var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes

var categoriesModel = require('../models/categories');

router.get('/categories', function CategoriesGetHandler(request, response){
  categoriesModel.getAll(function DoneGettingAll(err, result, fields){
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

router.get('/categories/:id', function CategoriesGetByIDHandler(request, response){
  categoriesModel.findById(request.params.id, function DoneGettingById(err, result, fields){
          if (err){
              console.log("Some error finding by id");
              console.log(err);
              response.write("Error finding by id");
          }else {
              response.json(result);
          }
      });
});

router.post('/categories', function CategoriesPostHandler(request, response){
  filmsModel.insert(
      request.body.name,
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

module.exports = router;
