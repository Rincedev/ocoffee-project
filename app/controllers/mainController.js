import dataMapper from "../dataMapper.js";

const mainController = {

  async renderHomePage(req, res) {
    try {      
      const newProducts = await dataMapper.getThreeLastsProducts();      
      res.render("home", { title: "", newProducts })
    } catch (error) {
      console.log(error);
      res.status(500).send("Serveur en PLS :(");
    }
    
  },
  
  renderAboutPage(req, res) {
    res.render("about", { title: " - A propos" })
  },

  renderContactPage(req, res) {
    res.render("contact", { title: " - Nous contacter" })
  }

}

export default mainController;

