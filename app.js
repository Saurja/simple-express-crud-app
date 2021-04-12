const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// Middlewares & Static files
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
const db_URI =
    "mongodb+srv://saurja123:saurja123@nodetuts.gcpzu.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
    .connect(db_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
        console.log("Connected to DB and Listing to Port");
    })
    .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');

// Routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

// Blog Routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
