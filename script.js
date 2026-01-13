function predictScore() {
    let overs = parseFloat(document.getElementById("overs").value);
    let runs = parseInt(document.getElementById("runs").value);
    let wickets = parseInt(document.getElementById("wickets").value);

    if (overs <= 0 || overs > 20 || wickets > 10) {
        alert("Please enter valid inputs");
        return;
    }

    // Run rate calculation
    let runRate = runs / overs;

    // Wicket impact factor
    let wicketPenalty = wickets * 2;

    // Predicted final score
    let predictedScore = Math.round((runRate * 20) - wicketPenalty);

    document.getElementById("result").innerText =
        "Predicted Final Score: " + predictedScore;

    // Save to database (LocalStorage)
    let record = {
        overs: overs,
        runs: runs,
        wickets: wickets,
        predictedScore: predictedScore
    };

    let history = JSON.parse(localStorage.getItem("iplData")) || [];
    history.push(record);
    localStorage.setItem("iplData", JSON.stringify(history));
}

function viewHistory() {
    let historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("iplData")) || [];

    if (history.length === 0) {
        historyDiv.innerHTML = "No data available.";
        return;
    }

    history.forEach((item, index) => {
        historyDiv.innerHTML += `
            <p>
                Match ${index + 1}: 
                Overs ${item.overs}, Runs ${item.runs}, 
                Wickets ${item.wickets} → 
                <b>${item.predictedScore}</b>
            </p>
        `;
    });
}
