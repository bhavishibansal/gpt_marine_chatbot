function openPopup() {
    document.getElementById('login-popup').style.display = 'block'
}

function closePopup() {
    document.getElementById('login-popup').style.display = 'none'
}

document.getElementById('register-btn').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none'
    document.getElementById('register-form').style.display = 'block'
})
document.getElementById('sign-in-btn').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'block'
    document.getElementById('register-form').style.display = 'none'
})


// displayQuestion(); // Show the first question when the page loads
document.addEventListener("DOMContentLoaded", function() {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const chatbotCloseBtn = document.querySelector(".close-btn");

    chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
    chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
});

function showInput() {
    // Get the value from the textarea
    var userInput = document.getElementById("user-input").value.trim();

    // Display the value in the console
    console.log(userInput);
    document.getElementById("user-input").value = '';
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

function filterPorts(sourceKeyword, destinationKeyword) {
    fetch('Data.json') // Replace 'your_file.json' with your file path
        .then(response => response.json())
        .then(data => {
            // Filter data based on 'source' and 'destination' variables
            var filteredData = data.filter(function(row) {
                return row.source === sourceKeyword && row.destination === destinationKeyword;
            });
            console.log(filteredData);
            displayFilteredPorts(filteredData);
        })
}

// function displayFoundRow(row) {
//     var container = document.getElementById('display-container');

//     // Create a div element to hold the row data
//     var rowElement = document.createElement('div');
//     rowElement.classList.add('found-row');

//     // Loop through the properties of the row object and create paragraphs for each property
//     for (var key in row) {
//         if (row.hasOwnProperty(key)) {
//             var propertyElement = document.createElement('p');
//             propertyElement.textContent = key + ': ' + row[key.valueOf];
//             rowElement.appendChild(propertyElement);
//         }
//     }
//     // Append the row element to the container
//     container.appendChild(rowElement);
// }

function displayFilteredPorts(filteredPorts) {
    const tableBody = document.getElementById('data-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous table data

    filteredPorts.forEach(port => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${port.id}</td>
            <td >${port["Company Name"]}</td>
            <td class="ship-type-link">${port["Ship Type"]}</td>
            <td>${port.source}</td>
            <td>${port.destination}</td>
            <td>${port["Halt Ports"]}</td>
            <td>${port["Freight Rate"]}</td>
            <td>${port["Time"]}</td>
            <td>${port["Weather"]}</td>
            <!-- Add other attributes here -->
        `;
        tableBody.appendChild(row);
        const shipTypeCell = row.querySelector('.ship-type-link');
        shipTypeCell.addEventListener('click', function() {
            const companyName = port["Company Name"];
            if (companyName === "Oceanic Transport Co.") {
                window.location.href = "Brazil.html";
            } else if (companyName === "SeaVenture Logistics") {
                window.location.href = "Shanghai.html";
            }
            // Add more conditions for other company names if needed
        });
    });
    openModal();
}

var modal = document.getElementById("myModal");

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}