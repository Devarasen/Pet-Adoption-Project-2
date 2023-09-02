const router = require("express").Router();
const { Pet, Category } = require("../models");

router.get("/", async (req, res) => {
  console.log("Accessed home route");
  console.log(req.session);
  return res.render("home", { logged_in: req.session.logged_in });
});

router.get("/login", async (req, res) => {
  return res.render("login", { logged_in: req.session.logged_in });
});

router.get("/post-adoption", async (req, res) => {
  return res.render("postAdoption", { logged_in: req.session.logged_in });
});

router.get("/contact", async (req, res) => {
  return res.render("contact", { logged_in: req.session.logged_in });
});

router.get("/about", async (req, res) => {
  return res.render("about", { logged_in: req.session.logged_in });
});

router.get("/petRoutes", async (req, res) => {
  try {
    const petData = await Pet.findAll({
      include: [Category],
    });
    const formattedPetData = petData.map((pet) => pet.get({ plain: true }));
    res.render("pets", {
      petData: formattedPetData,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/petRoutes/:id", async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id, {
      include: [Category],
    });
    const formattedPetData = petData.get({ plain: true });
    console.log("check", formattedPetData);
    res.render("pet", {
      petData: formattedPetData,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
