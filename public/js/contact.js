const contactNumber = Date.now();
console.log(contactNumber)

document.getElementById("contact_number").value = contactNumber;


emailjs.init({
  publicKey: "zk37Ij7zhrcXUWD5V",
});

window.onload = function() {
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher l'envoi immédiat du formulaire

    // Afficher une boîte de dialogue de confirmation
    const confirmation = window.confirm("Êtes-vous sûr de vouloir envoyer ce message ?");
    
    if (confirmation) {
      // Si l'utilisateur confirme, envoyer le formulaire avec EmailJS
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
    } else {
      // Si l'utilisateur annule, afficher un message d'annulation
      console.log("Envoi du message annulé.");
    }
  });
};

