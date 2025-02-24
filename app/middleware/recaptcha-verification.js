import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import 'dotenv/config';

const projectID = process.env.RECAPTCHA_PROJECT_ID;
const recaptchaKey = process.env.RECAPTCHA_SITE_KEY;

export async function verifyRecaptcha(token) {
  try {
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = `projects/${projectID}`; // Correction ici !

    const request = {
      assessment: {
        event: { token, siteKey: recaptchaKey },
      },
      parent: projectPath,
    };

    const [response] = await client.createAssessment(request);

    if (!response.tokenProperties.valid) {
      console.error("Token reCAPTCHA invalide :", response.tokenProperties.invalidReason);
      return false;
    }

    console.log("Score reCAPTCHA :", response.riskAnalysis.score);
    return response.riskAnalysis.score >= 0.5;

  } catch (error) {
    console.error("Erreur lors de la vérification reCAPTCHA :", error);
    return false;
  }
}