var featuresAdded = false;

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId() + "\n" +
        "Full Name: " + profile.getName() + "\n" +
        "Given Name: " + profile.getGivenName() + "\n" +
        "Family Name: " + profile.getFamilyName() + "\n" +
        "Image URL: " + profile.getImageUrl() + "\n" +
        "Email: " + profile.getEmail());

    // The ID token you need to pass xfto your backend:
    let idToken = googleUser.getAuthResponse().id_token;
    //console.log("ID Token: " + idToken);
    let user = [
        profile.getName(),
        profile.getImageUrl()
    ];

    //change current event search and token to sessionstorage
    window.sessionStorage.setItem('token', idToken);
    login(user);
}

function getToken() {
    console.log("checking token");
    let result = sessionStorage.getItem("token");
    if (result != null) {
        return result;
    } else {
        window.location = "./index.html";
        return null;
    }
}

function initializeUser() {
    if (sessionStorage.getItem("token") !== undefined && sessionStorage.getItem("user") != null) {
        login(sessionStorage.getItem("user"));
    }
}

function login(user) {
    if (featuresAdded === false) {
        setFeatures();
        document.getElementsByClassName("g-signin2")[0].style.display = "none";

        let usrImgContainer = document.createElement("DIV");
        usrImgContainer.id = "user-img-container";

        let usrDetails = document.createElement("DIV");
        usrDetails.id = "user-details";

        let usrImg = document.createElement("IMG");
        usrImg.id = "user-img";
        usrImg.src = user[1];
        usrImgContainer.onclick = function () {
            toggleWindow(document.getElementById("user-details"));
        };

        let usrName = document.createElement("P");
        usrName.innerHTML = "Hallo " + user[0] + "!";
        usrName.id = "user-name";

        let usrLogout = document.createElement("A");
        usrLogout.id = "logout";
        usrLogout.innerHTML = "Logout";
        usrLogout.target = "_top";
        usrLogout.href = "https://mail.google.com/mail/u/0/?logout&hl=en";
        usrLogout.onclick = function () {
            logout(true);
        };

        document.getElementById("user-container").appendChild(usrImgContainer);
        document.getElementById("user-img-container").appendChild(usrImg);
        document.getElementById("user-container").appendChild(usrDetails);
        document.getElementById("user-container").lastChild.appendChild(usrName);
        document.getElementById("user-container").lastChild.appendChild(usrLogout);
        featuresAdded = true;
    } else {
        let usrNameOld = document.getElementById("user-name");
        usrNameOld.innerHTML = "Hallo " + sessionStorage.getItem('user').split(',')[0] + "!";

        let usrImgOld = document.getElementById("user-img");
        usrImgOld.id = "user-img";
        usrImgOld.src = sessionStorage.getItem('user').split(',')[1];
    }
}

function logout(signout) {
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    clearInterval(interval);
    if (document.readyState === 4) {
        document.getElementsByClassName("g-signin2")[0].style.display = "block";
        document.getElementById("notification-bell").style.display = "none";
        document.getElementById("nav-elem-trips").style.display = "none";
        document.getElementById("usr-img-container").style.display = "none";
    }
    if (signout === true) {
        location.reload();
    }
}

function setFeatures() {
    let result = sessionStorage.getItem("token");

    if (result === "null" || result === undefined || result === null) {
        document.getElementById("notification-bell").style.display = "none";
        document.getElementById("nav-elem-trips").style.display = "none";
        clearInterval(interval);
        window.location = "./index.html";
    } else {
        document.getElementById("notification-bell").style.display = "block";
        document.getElementById("nav-elem-trips").style.display = "block";
        requestNotifications();
        interval = setInterval(function () {
            requestNotifications();
        }, 2000);
    }
}

function verifyUser() {
    if (sessionStorage === undefined || sessionStorage.getItem("token") === undefined) {
        logout();
    } else {
        //checktoken
    }
}

function requestNotifications() {
    $.ajax({
        url: apiBaseUrl + apiNotificationsPath,
        method: "GET",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        beforeSend : function(xhr) {
            /*var cookie = credentials["COOKIE"];
            console.info( "adding cookie: "+ cookie );
            xhr.setRequestHeader('Cookie', cookie);*/
        },
    }).done(function (response) {
        let notifications = response._embedded.tripNotifications;
        for (let notification in notifications) {
            console.log(notification);
            //addNotifications(result, i);
        }
    });

    /*let axt = new XMLHttpRequest();
    axt.open('GET', root + requestLink + queryId, true);
    axt.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    axt.send();
    axt.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
        }

        //notifications-toggle
        function toggleNotifications() {
            let element = document.getElementById('notification-container');
            if (element.style.display !== "block") {
                element.style.display = "block";

            } else {
                element.style.display = "none";
            }
        }

        //add notifications
        function addNotifications(json, index) {
            if (!(notifications.includes(json[index].id))) {

                document.getElementById("notifier").style.display = "block";

                let container = document.createElement("DIV");
                container.className = "notification-wrapper";

                let input = document.createElement("P");
                input.className = "notification";
                input.readOnly = "readonly";
                input.innerHTML = json[index].first_name;
                input.href = json[index].link;

                let buttonDel = document.createElement("BUTTON");
                buttonDel.innerHTML = "x";
                buttonDel.className = "notification-btn size-btn delete-btn";
                buttonDel.type = "button";
                buttonDel.onclick = function () {
                    buttonDel.parentNode.parentNode.removeChild(container);
                };

                document.getElementById("notification-list").appendChild(container);
                document.getElementById("notification-list").lastChild.appendChild(input);
                document.getElementById("notification-list").lastChild.appendChild(buttonDel);
                notifications.push(json[index].id);

            } else {

            }
        }
    }*/
}

//window-toggle
function toggleWindow(elem) {
    if (elem.style.visibility === "visible") {
        elem.style.visibility = "hidden";
    } else {
        elem.style.visibility = "visible";
    }
}