import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import 'dotenv/config';

export async function createAssessment(
  projectId,
  recaptchaSiteKey,
  token,
  expectedAction
) {
  // <!-- ATTENTION: reCAPTCHA Example (Server Part 2/2) Starts -->
  const client = new RecaptchaEnterpriseServiceClient();

  // Build the assessment request.
  const [response] = await client.createAssessment({
    parent: `projects/${projectId}`,
    assessment: {
      // Set the properties of the event to be tracked.
      event: {
        siteKey: recaptchaSiteKey,
        token: token,
        expectedAction: expectedAction,
      },
    },
  });
  // <!-- ATTENTION: reCAPTCHA Example (Server Part 2/2) Ends -->
  return response;
};

