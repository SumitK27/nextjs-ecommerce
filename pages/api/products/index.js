import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
    // Connect to Database
    await db.connect();

    // Get all the products from the Database
    const products = await Product.find({});

    // Disconnect from the Database
    db.disconnect();

    // Send the array of products as the response
    res.send(products);
});

export default handler;
