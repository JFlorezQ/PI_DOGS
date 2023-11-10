

// Importar todos los routers
const { Router } = require('express');
const router = Router();
const { getDogs } = require('../controllers/getDogs');
const { getDogById } = require('../controllers/getDogsbyid');
const { getDogByName } = require("../controllers/getDogsbyname");
const { gettemperaments} = require('../controllers/getTemperaments');
const {postDogs} = require('../controllers/postDogs')



// Estos son handlers

// GET | /Dogs

router.get("/dogs", (req,res) =>{getDogs(req, res)})

// GET | /Dogs/:id

router.get("/dogs/:id", (req,res) =>{getDogById(req, res)})

//GET | /Dogs/name?="..."

router.get("/dogs/search/name", (req,res) =>{getDogByName(req, res)})

//GET | /Temperaments

router.get("/temperaments", (req,res) =>{gettemperaments(req, res)})

//POST | /Dogs

router.post("/dogs", (req,res) =>{postDogs(req, res)})

module.exports = router;


