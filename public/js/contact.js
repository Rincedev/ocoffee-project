// async function contactForm({ token }) {
//   // Include the token for server-side assessment.
//   // Include the user input values from your form to pass to the backend.
//   const body = {
//     token,
//   };
//   // Code for fetching the assessment from server-side goes here.
//   // Refer to demo app backend code for more information.
//   // If you already use a library or framework for event handlers, you
//   // can handle events your usual way.
//   const result = await fetchServerResponse({
//     body,
//     url: "/verify-recaptcha",
//   });

//   return result;
// }

// Initialisation EmailJS
emailjs.init("zk37Ij7zhrcXUWD5V");

// Générer un numéro unique pour le message
document.getElementById("contact_number").value = Date.now();

document
  .getElementById("contact-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Confirmation de l'utilisateur avant envoi
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir envoyer ce message ?"
    );
    if (!confirmation) {
      console.log("Envoi du message annulé.");
      return;
    }
    // grecaptcha.enterprise.ready(async () => {
    //   const token = await grecaptcha.enterprise.execute(
    //     "6Ld0_NYqAAAAACzmWzW2J_dGeWfaxMExl8dJJ9KM",
    //     { action: "contact_form" }
    //   );
    //   const result = await contactForm({ token });
    //   return result;
    // });

    // if (!result.success) {
    //   alert("Échec du test reCAPTCHA, veuillez réessayer.");
    //   return;
    // }

    // Envoi de l'email avec EmailJS
    emailjs.sendForm("contact_service", "contact_form", this).then(
      function (response) {
        console.log("SUCCESS!", response);
        alert("Votre message a été envoyé avec succès !");

        // Réinitialiser les champs du formulaire après l'envoi réussi
        document.querySelector('input[name="user_name"]').value = "";
        document.querySelector('input[name="user_email"]').value = "";
        document.querySelector('textarea[name="message"]').value = "";
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
      }
    );
  });
