import dataMapper from "../dataMapper.js";
import { createAssessment } from "../middleware/recaptcha-verification.js";
import propertiesReader from 'properties-reader';

const PROPERTIES = propertiesReader('config.properties');
// Sample threshold score for classification of bad / not bad action. The threshold score
// can be used to trigger secondary actions like MFA.
const SAMPLE_THRESHOLD_SCORE = 0.5;

const context = {
  project_id: process.env.RECAPTCHA_PROJECT_ID,
  site_key: process.env.RECAPTCHA_SITE_KEY,
};


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

  async onContactForm (req, res) {
    try {
      // <!-- ATTENTION: reCAPTCHA Example (Server Part 1/2) Starts -->
      const recaptchaAction = PROPERTIES.get('recaptcha_action.contact');
      const assessmentResponse = await createAssessment(
        context.project_id,
        context.site_key,
        req.body.token,
        recaptchaAction
      );
  
      // Check if the token is valid, score is above threshold score and the action equals expected.
      // Take action based on the result (BAD / NOT_BAD).
      //
      // If result.label is NOT_BAD:
      // Write new username and password to users database.
      // let username = req.body.username
      // let password = req.body.password
      // Business logic.
      //
      // If result.label is BAD:
      // Trigger email/ phone verification flow.
      const result = checkForBadAction(assessmentResponse, recaptchaAction);
      // <!-- ATTENTION: reCAPTCHA Example (Server Part 1/2) Ends -->
  
      // Below code is only used to send response to the client for demo purposes.
      // DO NOT send scores or other assessment response to the client.
      // Return the response.
      result.score =
        assessmentResponse.riskAnalysis && assessmentResponse.riskAnalysis.score
          ? assessmentResponse.riskAnalysis.score.toFixed(1)
          : (0.0).toFixed(1);

      if (result.score && result.score >= SAMPLE_THRESHOLD_SCORE) {
        res.json({
          success: true,
        });
      } else {
        res.json({
          success: false
        });
      }
      
    } catch (e) {
      res.json({
        data: {
          error_msg: e,
        },
      });
    }
  },
}

export default mainController;

