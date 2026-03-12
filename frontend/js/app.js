let globalStockData = null;

async function analyzeStock() {

    const symbol = document.getElementById("tickerInput").value.trim();
    const limit = parseInt(document.getElementById("limit").value);

    if (!symbol) {
        alert("Please enter a stock ticker");
        return;
    }

    const resultsDiv = document.getElementById("analysisResults");
    const button = document.querySelector(".controls button");

    // loading animation
    resultsDiv.innerHTML = "<p>⏳ Loading stock data...</p>";

    button.disabled = true;

    try {

        const response = await fetch(
            `http://127.0.0.1:5000/api/stock-details?symbol=${symbol}`
        );

        const data = await response.json();
        globalStockData = data;

        if (data.error) {
            alert(data.error);
            button.disabled = false;
            return;
        }

        // Update results
        resultsDiv.innerHTML = `
            <div class="result-card">
                <p><strong>Exchange:</strong> ${data.exchange_symbol}</p>
                <p><strong>Latest Price:</strong> ₹${data.latest_price}</p>
                <p><strong>Latest Volatility:</strong> ${data.latest_volatility}</p>
                <p><strong>Predicted Volatility:</strong> ${data.latest_predicted_volatility}</p>
            </div>
        `;

        renderCharts(data);

        // Smooth scroll to results
        document.querySelector(".results").scrollIntoView({
            behavior: "smooth"
        });

        button.disabled = false;

    } catch (error) {

        console.error(error);
        alert("Error fetching data from server");

        button.disabled = false;

    }
}


// change data points
document.getElementById("limit").addEventListener("change", function () {
    if (globalStockData) {
        renderCharts(globalStockData);
    }
});

// ------------------------------
// PDf genrater
// ------------------------------

function downloadPDF(){

if(!globalStockData){
alert("Please analyze stock first");
return;
}

const data = globalStockData;

// chart images
const priceChartImage = document.getElementById("priceChart").toDataURL("image/png");
const volatilityChartImage = document.getElementById("volatilityChart").toDataURL("image/png");

const reportHTML = `
<div style="font-family:Arial;padding:25px">

<h2 style="text-align:center;">Stock Analysis Report</h2>

<hr>

<h3>Stock Information</h3>

<p><strong>Exchange:</strong> ${data.exchange_symbol}</p>
<p><strong>Latest Price:</strong> ₹${data.latest_price}</p>
<p><strong>Latest Volatility:</strong> ${data.latest_volatility}</p>
<p><strong>Predicted Volatility:</strong> ${data.latest_predicted_volatility}</p>

<br>

<h3>Price Chart</h3>
<img src="${priceChartImage}" style="width:100%;margin-bottom:20px">

<h3>Volatility Chart</h3>
<img src="${volatilityChartImage}" style="width:100%;margin-bottom:20px">

<p style="margin-top:30px;font-size:12px;">
Generated on: ${new Date().toLocaleString()}
</p>

</div>
`;

const element = document.createElement("div");
element.innerHTML = reportHTML;

html2pdf().from(element).save("stock-analysis-report.pdf");

}


// ------------------------------
// AUTOCOMPLETE SEARCH
// ------------------------------

const tickerInput = document.getElementById("tickerInput");
const suggestionsBox = document.getElementById("suggestions");

tickerInput.addEventListener("input", async function () {

    const query = this.value.trim();

    if (query.length < 1) {
        suggestionsBox.innerHTML = "";
        return;
    }

    try {

        const response = await fetch(
            `http://127.0.0.1:5000/api/search-stocks?q=${query}`
        );

        const results = await response.json();

        suggestionsBox.innerHTML = "";

        results.forEach(stock => {

            const div = document.createElement("div");
            div.classList.add("suggestion-item");

            div.textContent = `${stock.symbol} - ${stock.name}`;

            div.addEventListener("click", () => {

                tickerInput.value = stock.symbol;
                suggestionsBox.innerHTML = "";

            });

            suggestionsBox.appendChild(div);

        });

    } catch (error) {

        console.error("Search error:", error);

    }

});