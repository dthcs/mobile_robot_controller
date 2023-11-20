document.getElementById("click_record").addEventListener('click', function () {
    handleButtonClick();
});

function handleButtonClick() {
    console.log("voice start");
    var speech = true;

    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ko";
    recognition.continuous = false; // Set continuous to false to receive only the final result
    recognition.interimResults = false; // Set interimResults to false to suppress intermediate results

    // Mapping between words and numbers
    const wordToNumber = {
        '일': 1,
        '이': 2,
        '삼': 3,
        '사': 4,
        '오': 5,
        '육': 6,
        '칠': 7,
        '팔': 8,
        '구': 9,
        '심': 10,
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
        transcript = transcript.replace(/\.$/, '');
        transcript = transcript.replace(/,/g, '');

        console.log("transcript", transcript);

        const hazardOrColor = transcript
            // .toLowerCase()
            .split(' ');
        console.log("hazardOrColor", hazardOrColor);
        

        // Extract words from the recognized speech
        const words = transcript
            .toLowerCase()
            .split(/\s+|\b(?=\W)/) // Split by any whitespace character
            .filter(word => wordToNumber.hasOwnProperty(word));

        console.log("words", words);

        if (words && words.length >= 2) {
            const row = wordToNumber[words[0]];
            const column = wordToNumber[words[1]];
            console.log(row);
            console.log(column);
            document.getElementById("convert_text").innerHTML = transcript;

            // Update the input fields based on the button ID
            if (hazardOrColor[0] == "위험") {
                document.getElementById("hazardRowInput").value = row;
                document.getElementById("hazardColumnInput").value = column;
                buttonId = 'hazardPoint';
                // Trigger the submission based on the button ID
                handleSubmit(buttonId);
            } else if (hazardOrColor[0] == "색깔") {
                document.getElementById("colorBlobRowInput").value = row;
                document.getElementById("colorBlobColumnInput").value = column;
                buttonId = 'colorBlobPoint';
                // Trigger the submission based on the button ID
                handleSubmit(buttonId);
            }

            
        }

        
    });

    if (speech == true) {
        recognition.start();
    }
}
