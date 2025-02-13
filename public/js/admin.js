function confirmDeletion(event, element) {
  const productName = element.getAttribute("data-product-name");
  const confirmation = confirm(`Es-tu sûr de vouloir supprimer ${productName} ?`);
  if (!confirmation) {
      event.preventDefault();
  }
}