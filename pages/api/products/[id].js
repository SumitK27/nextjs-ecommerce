import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
    // Connect to Database
    await db.connect();

    // Get products with the ID from the Database
    const product = await Product.findById(req.query.id);

    // Disconnect from the Database
    db.disconnect();

    // Send the array of products as the response
    res.send(product);
});

export default handler;
