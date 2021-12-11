import nc from "next-connect";
import Product from "../../models/Product";
import db from "../../utils/db";
import data from "../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
    // Connect to Database
    await db.connect();

    // Delete Previous Products
    await Product.deleteMany();

    // Insert new sample products
    await Product.insertMany(data.products);

    // Disconnect from the Database
    db.disconnect();

    // Send the response
    res.send({ message: "Seeded Successfully" });
});

export default handler;
