let priceChart;
let volatilityChart;

async function fetchStock() {
    const symbol = document.getElementById("symbolInput").value;

    if (!symbol) {
        alert("Please enter a stock symbol");
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/stock-details?symbol=${symbol}`);
        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        console.log(data);


        renderCharts(data);

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch data");
    }
}

