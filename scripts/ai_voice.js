document.getElementById("click_record").addEventListener('click', function () {
    handleButtonClick();
});

// document.getElementById("click_color_record").addEventListener('click', function () {
//     handleButtonClick('colorBlobPoint');
// });

function handleButtonClick() {
    console.log("voice start");
    var speech = true;

    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Set continuous to false to receive only the final result
    recognition.interimResults = false; // Set interimResults to false to suppress intermediate results

    // Mapping between words and numbers
    const wordToNumber = {
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        // Add more as needed
    };

    let transcript = ''; // Initialize an empty transcript variable

    recognition.addEventListener('result', e => {
        const result = e.results[0];
        transcript = result[0].transcript; // Update the transcript with the final result
        console.log(transcript);

        const dangerOrColor = transcript
            .toLowerCase()
            .split(' ');
        console.log(dangerOrColor);
        

        // Extract words from the recognized speech
        const words = transcript
            .toLowerCase()
            .split(/\s+|\b(?=\W)/) // Split by any whitespace character
            .filter(word => wordToNumber.hasOwnProperty(word));

        console.log(words);

        if (words && words.length >= 2) {
            const row = wordToNumber[words[0]];
            const column = wordToNumber[words[1]];
            console.log(row);
            console.log(column);
            document.getElementById("convert_text").innerHTML = transcript;

            // Update the input fields based on the button ID
            if (dangerOrColor[0] == "danger") {
                document.getElementById("hazardRowInput").value = row;
                document.getElementById("hazardColumnInput").value = column;
                buttonId = 'hazardPoint';
            } else if (dangerOrColor[0] == "color") {
                document.getElementById("colorBlobRowInput").value = row;
                document.getElementById("colorBlobColumnInput").value = column;
                buttonId = 'colorBlobPoint';
            }

            // Trigger the submission based on the button ID
            handleSubmit(buttonId);
        }

        
    });

    if (speech == true) {
        recognition.start();
    }
}
