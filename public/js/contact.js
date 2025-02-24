 // Initialisation EmailJS
 emailjs.init("zk37Ij7zhrcXUWD5V");

 // Générer un numéro unique pour le message
 document.getElementById("contact_number").value = Date.now();

 document.getElementById('contact-form').addEventListener('submit', async function(event) {
   event.preventDefault();

   // Confirmation de l'utilisateur avant envoi
   const confirmation = window.confirm("Êtes-vous sûr de vouloir envoyer ce message ?");
   if (!confirmation) {
     console.log("Envoi du message annulé.");
     return;
   }

   // Exécuter reCAPTCHA pour récupérer le token
   const token = await grecaptcha.enterprise.execute('6Ld0_NYqAAAAACzmWzW2J_dGeWfaxMExl8dJJ9KM', { action: "contact_form" });

   // Vérifier le token reCAPTCHA côté serveur
   const recaptchaResponse = await fetch("/verify-recaptcha", {
     method: "POST",
     body: JSON.stringify({ token }),
     headers: { "Content-Type": "application/json" },
   });

   const result = await recaptchaResponse.json();

   if (!result.success) {
     alert("Échec du test reCAPTCHA, veuillez réessayer.");
     return;
   }

   // Envoi de l'email avec EmailJS
   emailjs.sendForm('contact_service', 'contact_form', this)
        .then(function(response) {
          console.log('SUCCESS!', response);
          alert('Votre message a été envoyé avec succès !');
          
          // Réinitialiser les champs du formulaire après l'envoi réussi
          document.querySelector('input[name="user_name"]').value = '';
          document.querySelector('input[name="user_email"]').value = '';
          document.querySelector('textarea[name="message"]').value = '';
        }, function(error) {
          console.log('FAILED...', error);
          alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
        });
 });
