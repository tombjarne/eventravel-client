$("#hero-search-field").keyup(function (event) {
    let axt = new XMLHttpRequest();
    let inputString = $("#hero-search-field").val();

    if (inputString.length === 0) {
        $("#autocomplete-container").hide();
    } else {
        console.log(apiBaseUrl + apiEventsPath + "?q=" + inputString);
        axt.open("GET", apiBaseUrl + apiEventsPath + "?q=" + inputString + "&size=5", true);
        axt.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        axt.send(inputString);
        axt.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let response = JSON.parse(this.responseText);
                    if (response._embedded != null) {
                        let events = response._embedded.events;
                        if (events.length > 0) {
                            let html = "";
                            for (let i = 0; i < events.length; i++) {
                                html += "<li id='event" + i + "' class='list-elem autocomplete-event'>" + events[i].name + "</li>";
                            }
                            $("#autocomplete-container").html(html);

                            $(".autocomplete-event").click(function () {
                                let i = $(this).attr("id").substr(5);
                                let event = events[i];
                                sessionStorage.setItem("selectedEvent", JSON.stringify(event));
                                $("#hero-search-field").val($(this).text());
                                let startDate = new Date(event.start);
                                let prevDate = new Date(startDate.getTime() - 86400000);
                                let endDate = new Date(event.start);
                                let nextDate = new Date(startDate.getTime() + 86400000);
                                $( "#departure-date" ).datepicker( "setDate", prevDate);
                                $( "#arrival-date" ).datepicker( "setDate", nextDate);
                                $("#autocomplete-container").hide();
                            });
                        } else {
                            $("#autocomplete-container").html("Keine Events (embedded null)");
                        }
                    } else {
                        $("#autocomplete-container").html("Keine Events");
                    }
                    $("#autocomplete-container").show();
                } else {
                    console.log("Unexpected status code: " + this.status);
                }
            }
        };
        axt.onerror = function () {
            console.log("Request failed");
        };
    }
});