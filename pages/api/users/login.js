import bcrypt from "bcryptjs";
import nc from "next-connect";
import User from "../../../models/User";
import { signToken } from "../../../utils/auth";
import db from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
    // Connect to Database
    await db.connect();

    // Get the user from Database
    const user = await User.findOne({ email: req.body.email });

    // Disconnect from the Database
    db.disconnect();

    // Check for User and check for the password
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        // Create token
        const token = signToken(user);

        // Send user Information back
        res.send({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401).send({ message: "Invalid email or password" });
    }
});

export default handler;
