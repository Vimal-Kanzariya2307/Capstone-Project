
let priceChart;
let volatilityChart;
// , dates, prices, volatility, predicted
function renderCharts(data ) {

    const daysDropdown = document.getElementById("limit");
    const selectedDays = parseInt(daysDropdown.value);

    // console.log("Rendering charts with data:", data);
    // console.log(daysDropdown);
    // console.log(selectedDays);

    // Slice last N days
    const labels = data.dates.slice(-selectedDays);
    const prices = data.prices.slice(-selectedDays);
    const ma5 = data.ma5.slice(-selectedDays);
    const ma10 = data.ma10.slice(-selectedDays);
    const ma50 = data.ma50.slice(-selectedDays);
    const ma100 = data.ma100.slice(-selectedDays);
    const volatility = data.volatility.slice(-selectedDays);
    const predictedVol = data.predicted_volatility.slice(-selectedDays);

    if (priceChart) priceChart.destroy();
    if (volatilityChart) volatilityChart.destroy();

    const ctx1 = document.getElementById("priceChart").getContext("2d");
    const ctx2 = document.getElementById("volatilityChart").getContext("2d");

    priceChart = new Chart(ctx1, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Stock Price",
                data: prices,
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 0
            },
            {
                label: "MA 5",
                data: ma5,
                borderWidth: 1,
                pointRadius: 0
            },
            {
                label: "MA 10",
                data: ma10,
                borderWidth: 1,
                pointRadius: 0
            },
            {
                label: "MA 50",
                data: ma50,
                borderWidth: 1,
                pointRadius: 0
            },
            {
                label: "MA 100",
                data: ma100,
                borderWidth: 1,
                pointRadius: 0
            }]
        },
    options: {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 10
                }
            }
        }
    }
});


    volatilityChart = new Chart(ctx2, {
    type: "line",
    data: {
        labels: labels,
        datasets: [
            {
                label: "Rolling Volatility (30D)",
                data: volatility,
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 0
            },
            {
                label: "Predicted Volatility",
                data: predictedVol,
                borderWidth: 2,
                borderDash: [6, 6],
                tension: 0.3,
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 10
                }
            }
        }
    }
});
};
