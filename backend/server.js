const express = require("express");

const app = express();
const productRoutes = require("./routes/productRoutes");

app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send("Subscription Management Backend is running!");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});