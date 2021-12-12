import { Typography } from "@material-ui/core";
import React from "react";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";

export default function AboutScreen() {
    const classes = useStyles();
    return (
        <Layout>
            <Typography
                variant="h1"
                component="h1"
                className={classes.mainHeading}
            >
                About us
            </Typography>
            <Typography className={classes.text}>
                Ullamco non id adipisicing labore do qui nisi ut et aliquip
                magna sunt dolor cupidatat. Duis deserunt deserunt amet culpa
                aliquip quis in aliquip in officia laboris. Tempor dolor ea et
                elit mollit sint reprehenderit sunt ea. Id ullamco incididunt
                voluptate reprehenderit cupidatat. Excepteur magna eiusmod ad
                laboris aliquip veniam veniam est ad aliquip ad. Mollit in ad
                pariatur officia sint ea laboris exercitation officia laborum
                excepteur et.
            </Typography>
            <Typography className={classes.text}>
                Nisi nulla elit nostrud nostrud ullamco sunt veniam ut anim
                nulla ad tempor velit. Tempor sunt in anim magna magna irure
                cillum deserunt cillum consequat. In qui reprehenderit consequat
                non Lorem adipisicing. Do cupidatat id ea deserunt occaecat.
            </Typography>
            <Typography className={classes.text}>
                Et pariatur voluptate consequat dolore nostrud eu nulla.
                Deserunt deserunt officia nisi deserunt. Cillum eiusmod occaecat
                consectetur voluptate consequat dolore do sit occaecat excepteur
                aliquip. Incididunt aliquip ullamco mollit deserunt excepteur
                minim consectetur eu qui sunt pariatur ex mollit anim. Tempor
                sint sit minim nulla et ullamco cillum et. Laboris sint
                voluptate cupidatat minim anim.
            </Typography>
        </Layout>
    );
}
