/* eslint-disable @next/next/no-img-element */
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from "@material-ui/core";
import Layout from "../components/Layout";
import NextLink from "next/link";
import db from "../utils/db";
import Product from "../models/Product";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/Store";

export default function Home(props) {
    const { products } = props;
    const router = useRouter();
    const { state, dispatch } = useContext(Store);

    const addToCartHandler = async (product) => {
        const existItem = state.cart.cartItems.find(
            (x) => x._id === product._id
        );
        const quantity = existItem ? existItem.quantity + 1 : 1;

        // Check for stock and alert if out of stock
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert("Sorry, Product is out of stock");
            return;
        }

        // Add Item to Cart
        dispatch({
            type: "CART_ADD_ITEM",
            payload: { ...product, quantity },
        });

        // Redirect user to cart
        router.push("/cart");
    };

    return (
        <Layout>
            <Typography variant="h2">All Products</Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item md={4} key={product.name}>
                        <Card>
                            <NextLink
                                href={`/product/${product.slug}`}
                                passHref
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={product.image}
                                        title={product.name}
                                    ></CardMedia>
                                    <CardContent>
                                        <Typography>{product.name}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </NextLink>
                            <CardActions>
                                <Typography>${product.price}</Typography>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => addToCartHandler(product)}
                                >
                                    Add to cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    );
}

// Pre-render the page on each request
export async function getServerSideProps() {
    // Connect to Database
    await db.connect();

    // Get all the products from the Database. lean() converts document object to javascript object
    const productsDocs = await Product.find({}).lean();

    // Disconnect from the Database
    db.disconnect();

    // Return data
    return {
        props: {
            products: productsDocs.map(db.convertDocToObj),
        },
    };
}
