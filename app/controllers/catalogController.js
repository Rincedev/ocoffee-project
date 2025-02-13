import dataMapper from "../dataMapper.js";

const catalogController = {

  async renderCatalogPage(req, res) {
    try {
      const randomProducts = await dataMapper.getThreeRandomProducts();
      res.render("catalog", { title: " - Catalogue", randomProducts })
    } catch (error) {
      console.log(error);
      res.status(500).send("Serveur en PLS :(");
    }    
  },

  async renderProductPage(req, res) {
    try {
      const productId = parseInt(req.params.id);
      const product = await dataMapper.getProductById(productId);
      res.render("product", { title: ` - ${product.name}`, product })
    } catch (error) {
      console.log(error);
      res.status(500).send("Serveur en PLS :(");
    }
  },

  async renderAllCatalogPage(req, res) {
    try {
      const allProducts = await dataMapper.getAllProducts();
      res.render("catalog-all", { title: " - Tous nos produits", allProducts });
    } catch (error) {
      console.log(error);
      res.status(500).send("Serveur en PLS :(");
    }
  },

  async renderProductsByCategory(req, res) {
    try {
      const categoryName = req.query.category;
      const categoryProducts = await dataMapper.getProductsByCategory(categoryName);
      res.render("category-products", { title: ` - ${categoryName}`, categoryProducts });
    } catch (error) {
      console.log(error);
      res.status(500).send("Serveur en PLS :(");
    }
  },  

}

export default catalogController;