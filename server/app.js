import express from 'express';
import cors from 'cors'
import inventoryRoutes from "./routes/inventoryRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Welcome to the Inventory API!");
})

app.use("/api/inventory", inventoryRoutes);

export default app
