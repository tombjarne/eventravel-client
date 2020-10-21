function initializeGeolocation()
{
    if (sessionStorage.getItem("latitude") == null || sessionStorage.getItem("longitude") == null) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                sessionStorage.setItem("latitude", position.coords.latitude.toString());
                sessionStorage.setItem("longitude", position.coords.longitude.toString());
            });
        } else {
            showAlert("Dein Standort konnte nicht ermittelt werden");
        }
    }
}