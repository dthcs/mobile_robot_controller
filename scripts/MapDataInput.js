

function handleSubmit(submitType) {
    // Get the input values when the button is clicked
    var rowsValue = parseInt(document.getElementById("rowsInput").value)+1;;
    var columnsValue = parseInt(document.getElementById("columnsInput").value)+1;

    var startRowValue = parseInt(document.getElementById("startRowInput").value);
    var startColumnValue = parseInt(document.getElementById("startColumnInput").value);

    var hazardRowValue = parseInt(document.getElementById("hazardRowInput").value);
    var hazardColumnValue = parseInt(document.getElementById("hazardColumnInput").value);

    var endRowValue = parseInt(document.getElementById("endRowInput").value);
    var endColumnValue = parseInt(document.getElementById("endColumnInput").value);

    var colorBlobRowValue = parseInt(document.getElementById("colorBlobRowInput").value);
    var colorBlobColumnValue = parseInt(document.getElementById("colorBlobColumnInput").value);

    // Call the functions to handle the changes
    if (submitType == 'mapSize') {
        handleRowChange(rowsValue);
        handleColumnChange(columnsValue);
    }
     else if (submitType == 'startPoint') {
        handleStartPoint(startRowValue, startColumnValue);
    }
    else if (submitType == 'hazardPoint') {
        handleHazardPoint(hazardRowValue, hazardColumnValue);
    }
    else if (submitType == 'endPoint') {
        handleEndPoint(endRowValue, endColumnValue);
    }
    else if (submitType == 'colorBlobPoint') {
        handleColorBlobPoint(colorBlobRowValue, colorBlobColumnValue);
    }
}