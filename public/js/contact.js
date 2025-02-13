const contactNumber = Date.now();
console.log(contactNumber)

document.getElementById("contact_number").value = contactNumber;


emailjs.init({
  publicKey: "zk37Ij7zhrcXUWD5V",
});

window.onload = function() {
  document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      // these IDs from the previous steps
      emailjs.sendForm('contact_service', 'contact_form', this)
          .then(() => {
              console.log('SUCCESS!');
          }, (error) => {
              console.log('FAILED...', error);
          });
  });
}

