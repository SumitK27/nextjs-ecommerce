import {
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";

export default function ContactScreen() {
    const classes = useStyles();
    const TableCellCustom = withStyles({
        root: {
            borderBottom: "none",
        },
    })(TableCell);
    const handleSubmit = (event) => {
        // get data from the form and send to database
    };
    return (
        <Layout>
            <Typography
                variant="h1"
                component="h1"
                className={classes.mainHeading}
            >
                Contact us
            </Typography>

            <Card style={{ padding: 20 }}>
                <form method="POST" onSubmit={handleSubmit}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCellCustom>
                                        <Typography>SI No.</Typography>
                                    </TableCellCustom>
                                    <TableCellCustom>
                                        <TextField
                                            name="si-no"
                                            required
                                            label="Required"
                                            fullWidth
                                            autoComplete="none"
                                            variant="outlined"
                                            placeholder="Enter your SI No."
                                        ></TextField>
                                    </TableCellCustom>
                                </TableRow>
                                <TableRow>
                                    <TableCellCustom>
                                        <Typography>Name</Typography>
                                    </TableCellCustom>
                                    <TableCellCustom>
                                        <TextField
                                            name="name"
                                            required
                                            label="Required"
                                            fullWidth
                                            autoComplete="none"
                                            variant="outlined"
                                            placeholder="Enter your Name"
                                        ></TextField>
                                    </TableCellCustom>
                                </TableRow>
                                <TableRow>
                                    <TableCellCustom>
                                        <Typography>Contact No.</Typography>
                                    </TableCellCustom>
                                    <TableCellCustom>
                                        <TextField
                                            name="contact-no"
                                            required
                                            label="Required"
                                            fullWidth
                                            autoComplete="none"
                                            variant="outlined"
                                            placeholder="Enter your Contact No."
                                        ></TextField>
                                    </TableCellCustom>
                                </TableRow>
                                <TableRow>
                                    <TableCellCustom>
                                        <Typography>Email ID</Typography>
                                    </TableCellCustom>
                                    <TableCellCustom>
                                        <TextField
                                            name="email"
                                            required
                                            label="Required"
                                            fullWidth
                                            autoComplete="none"
                                            variant="outlined"
                                            placeholder="Enter your Email Address"
                                        ></TextField>
                                    </TableCellCustom>
                                </TableRow>
                                <TableRow>
                                    <TableCellCustom>
                                        <Typography>Message</Typography>
                                    </TableCellCustom>
                                    <TableCellCustom>
                                        <TextField
                                            name="message"
                                            required
                                            label="Required"
                                            fullWidth
                                            autoComplete="none"
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            placeholder="Enter your Message"
                                        ></TextField>
                                    </TableCellCustom>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button
                        fullWidth
                        style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontSize: "1.2rem",
                        }}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Card>
        </Layout>
    );
}
