export const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(" USD", "").trim());
};

export const parseTimestamp = (timestampString) => {
    if (!timestampString) return null;
    const parts = timestampString.split(" ");
    const datePart = parts[0].split("/");
    const timePart = parts[1] ? parts[1] : "00:00";

    const month = parseInt(datePart[0], 10) - 1;
    const day = parseInt(datePart[1], 10);
    const year = parseInt(datePart[2], 10);

    return new Date(year, month, day, ...timePart.split(":").map(Number));
};
