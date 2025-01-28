import fs from "fs";
import csvParser from "csv-parser";
import { CSV_FILE_PATH } from "../config.js";
import { parsePrice, parseTimestamp } from "../utils/csvParser.js";

export const getInventory = (req, res) => {
  const results = [];
  const { brand, min_price, max_price, product_type, date_range } = req.query;

  fs.createReadStream(CSV_FILE_PATH)
    .pipe(csvParser())
    .on("data", (row) => {
      let price = parsePrice(row.price);
      let timestamp = parseTimestamp(row.timestamp);
      if (
        (brand && row.brand.toLowerCase() !== brand.toLowerCase()) ||
        (min_price && price < parseFloat(min_price)) ||
        (max_price && price > parseFloat(max_price)) ||
        (product_type &&
          row.product_type.toLowerCase() !== product_type.toLowerCase()) ||
        (date_range === "last_30_days" &&
          timestamp < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      ) {
        return;
      }
      results.push({
        condition: row.condition,
        description: row.description,
        title: row.title,
        brand: row.brand,
        price: price,
        product_type: row.product_type,
        custom_label_0: row.custom_label_0,
        timestamp: timestamp.toISOString(),
      });
    })
    .on("end", () => {
     if (results.length < 1) {
        return res.status(404).json({
            success: true,
            message: "No matching products found",
        })
     }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
};
