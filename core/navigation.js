//globals
/*let notifications = [];

//warning-toggle
let dropDown;
let toggle;

$(function () {
    dropDown = document.getElementById("dropdown-menu");
    searchWarning = document.getElementById("er-data-not-set-header");
    toggle = false;
});

function requestNotifications() {
    let token = getToken();

    if (token !== false) {
        $.get(apiBaseUrl + apiNotificationsPath).done(function (response) {
            let notifications = response._embedded.tripNotifications;
            for (let notification in notifications) {
                console.log(notification);
                //addNotifications(result, i);
            }
        });
    }
}*/