import client from '../config/database.js'; 

const dataMapper = {

  async getThreeLastsProducts() {
    const result = await client.query("SELECT * FROM product ORDER BY id DESC LIMIT 3;");
    return result.rows;
  },

  async getThreeRandomProducts() {
    const result = await client.query("SELECT * FROM product ORDER BY RANDOM() LIMIT 3;");
    return result.rows;
  },

  async getProductById(productId) {
    const result = await client.query("SELECT * FROM product WHERE id = $1;", [productId]);    
    return result.rows[0];
  },

  async getAllProducts() {
    const result = await client.query("SELECT * FROM product;");
    return result.rows;
  },

  async getAllCategories() {
    const result = await client.query("SELECT category FROM product GROUP BY category;");
    return result.rows;
  },

  async getProductsByCategory(categoryName) {
    const result = await client.query("SELECT * FROM product WHERE category = $1", [categoryName]);
    return result.rows;
  },

  async insertProductToDatabase(product) {
    await client.query("INSERT INTO product (name, category, price, origin, available, description, reference_number) VALUES ($1, $2, $3, $4, $5, $6, $7)", [product.name, product.category, product.price, product.origin, product.available, product.description, product.reference_number])
  },

  // async selectProductByReference(product) {
  //   const result = await client.query("SELECT reference_number FROM product WHERE reference_number = $1", [product.reference_number]);
  //   return result.rows[0];
  // },

  async deleteProductFromDatabase(productId) {
    await client.query("DELETE FROM product WHERE id = $1", [productId])
  },

  async getUserByUsername(username) {
    const result = await client.query("SELECT * FROM user_session WHERE username = $1;", [username]);
    return result.rows[0];
  },

  async modifyProductInDatabase(product) {
    try {
      await client.query("UPDATE product SET name = $1, category = $2, price = $3, origin = $4, available = $5, description = $6, reference_number = $7 WHERE id = $8", [product.name, product.category, product.price, product.origin, product.available, product.description, product.reference_number, product.id])
    } catch (error) {
      console.error("Erreur lors de la modification dans la database :", error);
      res.status(500).send("Serveur en PLS :(");
    }
    
  }



}


export default dataMapper;