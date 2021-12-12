/* eslint-disable react/no-unescaped-entities */
import {
    Button,
    List,
    ListItem,
    TextField,
    Typography,
} from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";
import NextLink from "next/link";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";

export default function Login() {
    const router = useRouter();
    const { redirect } = router.query; // "/login?redirect=/shipping" => "/shipping"
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    useEffect(() => {
        // Redirect to home if already Logged in
        if (userInfo) {
            router.push("/");
        }
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("/api/users/login", {
                email,
                password,
            });

            dispatch({ type: "USER_LOGIN", payload: data });

            // Store user in cookie
            Cookies.set("userInfo", data);

            // Redirect user (shipping or home screen)
            router.push(redirect || "/");

            alert("Successfully Logged in");
        } catch (err) {
            alert(err.response.data ? err.response.data.message : err.message);
        }
    };
    return (
        <div>
            <Layout title="Login - Amazon">
                <form onSubmit={submitHandler} className={classes.form}>
                    <Typography component="h1" variant="h1">
                        Login
                    </Typography>
                    <List>
                        <ListItem>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email"
                                inputProps={{ type: "email" }}
                                onChange={(e) => setEmail(e.target.value)}
                            ></TextField>
                        </ListItem>
                        <ListItem>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="password"
                                label="Password"
                                inputProps={{ type: "password" }}
                                onChange={(e) => setPassword(e.target.value)}
                            ></TextField>
                        </ListItem>
                        <ListItem>
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                color="primary"
                            >
                                Login
                            </Button>
                        </ListItem>
                        <ListItem>
                            Don't have an account? &nbsp; &nbsp;
                            <NextLink href="/register" passHref>
                                <Link>Register</Link>
                            </NextLink>
                        </ListItem>
                    </List>
                </form>
            </Layout>
        </div>
    );
}
