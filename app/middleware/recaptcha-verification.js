import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import 'dotenv/config';

const projectID = process.env.RECAPTCHA_PROJECT_ID;
const recaptchaKey = process.env.RECAPTCHA_SITE_KEY;

export async function verifyRecaptcha(token) {
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  const request = {
    assessment: {
      event: { token, siteKey: recaptchaKey },
    },
    parent: projectPath,
  };

  const [response] = await client.createAssessment(request);

  return response.tokenProperties.valid && response.riskAnalysis.score >= 0.5;
}