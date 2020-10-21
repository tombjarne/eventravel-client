function requestCombinations() {
    if (sessionStorage.getItem("selectedEvent") == null)
    {
        showAlert("Event auswählen");
        return;
    }

    let inputBody = {
        "latitude": parseFloat(sessionStorage.getItem("latitude")),
        "longitude": parseFloat(sessionStorage.getItem("longitude")),
        "arrivalDate": formatDate($("#departure-date").val()),
        "departureDate": formatDate($("#arrival-date").val()),
        "adults": parseInt($("#adults-number").val()),
        "priceFrom": 0,
        "limit": -1,
        "maxHotelDistance": 50
    };

    let priceTo = parseInt($("#price-range-display").val());
    /*let childrenNum = document.getElementById("children-number").value;

    let cookieValues = [
        formatDate($("#arrival-date").val()),
        formatDate($("#departure-date").val()),
        parseInt($("#adults-number").val()),
        childrenNum,
        getChildrenAges(childrenNum),
        priceTo
    ];

    console.log(cookieValues);

    createCookie('USRNP', 1, cookieValues);*/

    $('#loader-container').css('display', 'flex');

    if (!isNaN(priceTo)) {
        inputBody["priceTo"] = priceTo;
    }

    let childAges = NaN;
    if (!isNaN(childAges)) {
        inputBody["childAges"] = childAges;
    }

    let event = JSON.parse(sessionStorage.getItem("selectedEvent"));
    let combinationQueriesUrl = apiBaseUrl + event._links["combination-queries"].href;

    $.ajax({
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        url: combinationQueriesUrl,
        method: "POST",
        data: JSON.stringify(inputBody),
        dataType: "json"
    }).done(function (response) {
        if (response === undefined)
        {
            showAlert("Keine Ergebnisse gefunden");
            $("#loader-container").hide();
            return;
        }
        console.log(response);
        sessionStorage.setItem("combination-query", JSON.stringify(response));
        window.location = "search.html";
    });
}

function formatDate(date) {
    let day = date.substring(0, 2);
    let month = date.substring(3, 5);
    let year = date.substring(6, 10);
    return year + "-" + month + "-" + day;
}

/*function createCookie(name, exp, request) {
    var expiration = new Date();
    expiration.setTime(expiration.getTime() + (exp * 24 * 60 * 60 * 1000));
    var expires = "expires=" + expiration.toUTCString();
    document.cookie = name + "=" + request + ";" + expires + ";path=/";
}*/
