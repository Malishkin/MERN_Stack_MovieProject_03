const express = require('express');
const movieBL = require('../../models/movieBL');

const router = express.Router();

router.route('/')
    .get(function(req, resp)
    {
        movieBL.getMovies().then(data =>
            {
                return resp.json(data);
            })
    })


router.route('/:id')
    .get(function(req, resp)
    {
        let id = req.params.id;

        movieBL.getMovie(id).then(data =>
            {
                return resp.json(data);
            })
    })


router.route('/:id')
    .delete(function(req, resp)
    {
        let id = req.params.id;

        console.log(id)

        movieBL.deleteMovie(id).then(data =>
            {
                return resp.json(data);
            })
    })


router.route('/:id')
    .put(function(req, resp)
    {
        let obj = req.body;
        let id = req.params.id;


        movieBL.updateMovie(id,obj).then(data =>
            {
                return resp.json(data);
            })
    })


router.route('/')
    .post(function(req, resp)
    {
        let obj = req.body;
        console.log(obj);

        movieBL.addMovie(obj).then(data =>
            {
                return resp.json(data);
            })
    })


module.exports = router;