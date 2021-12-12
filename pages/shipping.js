import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Store } from "../utils/Store";

export default function Shipping() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    // Redirect to home if already Logged in
    if (!userInfo) {
        router.push("/login?redirect=/shipping");
    }

    return <div>Shipping</div>;
}
