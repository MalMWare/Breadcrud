const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
  Bread.find() 
    .then(foundBreads => {
      console.log(foundBreads)
      res.render('index', {
        breads: foundBreads,
        title: 'Index Page'
      })
    })
    // res.render('index', {
    //     breads: Bread,
    //     title: 'Index Page'
    //   })
  // res.send(Bread)
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:id/edit', (req, res) => {
 Bread.findById(req.params.id)
 .then(foundBread => {
  res.render('edit', {
    bread: foundBread
  })
 })
})


// SHOW
breads.get('/:id', async (req, res) => {
  try{
    const bread = await Bread.findById(req.params.id)
    res.render('show', {
      bread: bread,
    });
  }
  catch(err) {
    console.log(err)
    res.status(404).render("error404")
  }
});

// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
  .then(deletedBread => {
    res.status(303).redirect('/breads')
  })
})

// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
     req.body.image =  undefined //'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(updatedBread => {
    console.log(updatedBread)
    res.redirect(`/breads/${req.params.id}`)
  })
  
})



module.exports = breads
