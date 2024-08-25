function submitData() {
    const jsonInput = document.getElementById('jsonInput').value;
    let jsonData;

    try {
        jsonData = JSON.parse(jsonInput);
    } catch (e) {
        alert("Invalid JSON format");
        return;
    }

    fetch('http://localhost:3000/bfhl', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        filterResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error with the request: ' + error.message);
    });
}

function filterResults(data) {
    const resultDiv = document.getElementById('result');
    const showAlphabets = document.getElementById('alphabets').checked;
    const showNumbers = document.getElementById('numbers').checked;
    const showHighestLowercaseAlphabet = document.getElementById('highestLowercaseAlphabet').checked;

    let filteredResult = '<h3>Response:</h3>';

    if (showAlphabets) {
        filteredResult += `<p>Alphabets: ${JSON.stringify(data.alphabets)}</p>`;
    }

    if (showNumbers) {
        filteredResult += `<p>Numbers: ${JSON.stringify(data.numbers)}</p>`;
    }

    if (showHighestLowercaseAlphabet) {
        filteredResult += `<p>Highest Lowercase Alphabet: ${JSON.stringify(data.highest_lowercase_alphabet)}</p>`;
    }

    resultDiv.innerHTML = filteredResult;
}
