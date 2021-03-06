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
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

export default function Login() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const { redirect } = router.query; // "/login?redirect=/shipping" => "/shipping"
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    useEffect(() => {
        // Redirect to home if already Logged in
        if (userInfo) {
            router.push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = useStyles();
    const submitHandler = async ({ email, password }) => {
        closeSnackbar();
        try {
            const { data } = await axios.post("/api/users/login", {
                email,
                password,
            });

            dispatch({ type: "USER_LOGIN", payload: data });

            // Store user in cookie
            Cookies.set("userInfo", JSON.stringify(data));

            // Redirect user (shipping or home screen)
            router.push(redirect || "/");

            alert("Successfully Logged in");
        } catch (err) {
            enqueueSnackbar(
                err.response.data ? err.response.data.message : err.message,
                { variant: "error" }
            );
        }
    };
    return (
        <div>
            <Layout title="Login - Amazon">
                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className={classes.form}
                >
                    <Typography component="h1" variant="h1">
                        Login
                    </Typography>
                    <List>
                        <ListItem>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    pattern:
                                        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        inputProps={{ type: "email" }}
                                        error={Boolean(errors.email)}
                                        helperText={
                                            errors.email
                                                ? errors.email.type ===
                                                  "pattern"
                                                    ? "Email is not valid"
                                                    : "Email is required"
                                                : ""
                                        }
                                        {...field}
                                    ></TextField>
                                )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 6,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        inputProps={{ type: "password" }}
                                        error={Boolean(errors.password)}
                                        helperText={
                                            errors.password
                                                ? errors.password.type ===
                                                  "minLength"
                                                    ? "Password length is more than 5"
                                                    : "Password is required"
                                                : ""
                                        }
                                        {...field}
                                    ></TextField>
                                )}
                            ></Controller>
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
                                <NextLink
                                    href={`/register?redirect=${
                                        redirect || "/"
                                    }`}
                                    passHref
                                >
                                    <Link>Register</Link>
                                </NextLink>
                            </NextLink>
                        </ListItem>
                    </List>
                </form>
            </Layout>
        </div>
    );
}
