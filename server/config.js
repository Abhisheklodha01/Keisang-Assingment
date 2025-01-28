import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CSV_FILE_PATH = path.join(__dirname, "sample-data-v2.csv");
