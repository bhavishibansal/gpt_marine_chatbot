let currentQuestionIndex = 0;
const questions = ['Hii!! How can I help you?'];
const questionElement = document.getElementById('question');

function showInput() {
    // Get the value entered by the user
    const userInput = document.getElementById('user-input').value.trim();
    const words = userInput.split(" ");
    userInput.value = '';
    let sourceKeyword = null;
    let destinationKeyword = null;

    for (let i = 0; i < words.length; i++) {
        if (words[i].toLowerCase() === "source" && i < words.length - 1) {
            sourceKeyword = words[i + 1];
        }
        if (words[i].toLowerCase() === "destination" && i < words.length - 1) {
            destinationKeyword = words[i + 1];
        }
    }
    console.log("sourceKeyword: ", sourceKeyword);
    console.log("destinationKeyword: ", destinationKeyword);
    filterPorts(sourceKeyword, destinationKeyword);
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionElement.textContent = questions[currentQuestionIndex];
        // userInput.value = ''; // Clear previous input
    } else {
        // userInput.value = '';
        // displayResults(); // Display results at the end
        currentQuestionIndex = 0; // Reset index to ask questions again
        setTimeout(() => displayQuestion(), 100); // Display questions again after 3 seconds
    }

}

function filterPorts(sourceKeyword, destinationKeyword) {
    fetch('Data.json') // Replace 'your_file.json' with your file path
        .then(response => response.json())
        .then(data => {
            // Filter data based on 'source' and 'destination' variables
            var filteredData = data.filter(function(row) {
                return row.source === sourceKeyword && row.destination === destinationKeyword;
            });
            console.log(filteredData);
            showModalWithData(filteredData);
        })
}

function showModalWithData(data) {
    var modal = document.getElementById("myModal");
    var table = document.getElementById("resultTable");
    console.log(table);
    table.innerHTML = "";

    var headerRow = document.createElement("tr");
    for (var key in data[0]) {
        var th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    }
    console.log(headerRow);
    table.append(headerRow);
    data.forEach(function(row) {
        var tr = document.createElement("tr");
        for (var key in row) {
            var td = document.createElement("td");
            td.textContent = row[key];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    });
    modal.style.display = "block";
}

// function sendAnswer() {
//     const userAnswer = userInput.value.trim();
//     if (userAnswer !== '') {
//         if (currentQuestionIndex === 0) {
//             source = userAnswer; // Store source
//         } else if (currentQuestionIndex === 1) {
//             destination = userAnswer; // Store destination
//         }
//         currentQuestionIndex++;
//         displayQuestion();
//     } else {
//         alert('Please enter your answer.');
//     }
//     filterPorts();
// }





function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}