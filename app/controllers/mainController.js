import dataMapper from "../dataMapper.js";
import { verifyRecaptcha } from "../middleware/recaptcha-verification.js";


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
  },

  async verifyCaptcha(req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).json({ success: false, error: "Token manquant" });

    const isValid = await verifyRecaptcha(token);
    if (!isValid) return res.status(403).json({ success: false, error: "reCAPTCHA non validé" });

    res.json({ success: true });
  }

}

export default mainController;

