/* Helper function, required if jQuery is not available */
var ajax = function ajax(method, url, callback) {
    var xhr = !!window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.onreadystatechange = function() {4 == this.readyState && callback(xhr)};
    xhr.open(method, url, true);
    xhr.send();
};

function do_something(coords) {
    // Do something with the coords here
    console.log(coords);
}

if (navigator.userAgent.match(/bot|spider/i)) {
    // It is a bot. We might want to set some defaults here, or do nothing.
} else {
    // It's not a bot! Hit the API
    navigator.geolocation.getCurrentPosition(function(position) {
            do_something(position.coords);
        },
        function(failure) {
            /* If jQuery is available */
            /*
            $.get('https://ipinfo.io/json', function(response) {
                var loc = response.loc.split(',');
                var coords = {
                    latitude: loc[0],
                    longitude: loc[1]
                };
                do_something(coords);
            });
            */

            /* If jQuery is not available */
            ajax("GET", "https://ipinfo.io/json", function(response) {
                if (response.status == 200) {
                    var data = JSON.parse(response.responseText),
                        loc = data.loc.split(','),
                        coords = {
                            latitude: loc[0],
                            longitude: loc[1]
                        };
                    do_something(coords);
                }
            });
        }
    );
}
