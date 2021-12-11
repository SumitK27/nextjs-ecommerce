import {
    Button,
    Card,
    Grid,
    List,
    ListItem,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import NextLink from "next/link";
import { Store } from "../utils/Store";
import Link from "next/link";
import Image from "next/image";

function CartScreen() {
    const { state } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    return (
        <Layout title="Shopping Cart">
            <Typography component="h1" variant="h1">
                Shopping Cart
            </Typography>
            {cartItems.length === 0 ? (
                <div>
                    Cart is empty. <NextLink href="/">Go shopping</NextLink>
                </div>
            ) : (
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">
                                            Quantity
                                        </TableCell>
                                        <TableCell align="right">
                                            Price
                                        </TableCell>
                                        <TableCell align="right">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell>
                                                <NextLink
                                                    href={`/product/${item.slug}`}
                                                    passHref
                                                >
                                                    <Link>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                        />
                                                    </Link>
                                                </NextLink>
                                            </TableCell>
                                            <TableCell>
                                                <NextLink
                                                    href={`/product/${item.slug}`}
                                                    passHref
                                                >
                                                    <Link>
                                                        <Typography>
                                                            {item.name}
                                                        </Typography>
                                                    </Link>
                                                </NextLink>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Select value={item.quantity}>
                                                    {[
                                                        ...Array(
                                                            item.countInStock
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <MenuItem
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell align="right">
                                                ${item.price}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                >
                                                    x
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid md={3} xs={12}>
                        <Card>
                            <List>
                                <ListItem>
                                    <Typography variant="h2">
                                        Subtotal (
                                        {cartItems.reduce(
                                            (accumulator, currentItem) =>
                                                accumulator +
                                                currentItem.quantity,
                                            0
                                        )}{" "}
                                        items) : ${" "}
                                        {cartItems.reduce(
                                            (accumulator, currentItem) =>
                                                accumulator +
                                                currentItem.quantity *
                                                    currentItem.price,
                                            0
                                        )}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Check Out
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Layout>
    );
}

// Set server side rendering to false and renders page on client side
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
