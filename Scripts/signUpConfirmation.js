let addedSpinner;
const addSpinnerStyle = function() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(".spinnerLoading {border: 16px solid #f3f3f3; /* Light grey */border-top: 16px solid #3498db; /* Blue */border-radius: 50%;width: 120px;height: 120px;animation: spin 2s linear infinite;}@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}"));
    document.body.appendChild(style);
};
const subscribe = function () {
    swal({
        title: "Confirmation",
        text: "Are you sure you want to subscribe to our newsletter?",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        var spinner = document.createElement('div');
        var outer = document.createElement('div');
        outer.id = 'spinnerLoading';
        spinner.className = 'spinnerLoading';
        outer.style.background = 'rgba(0,0,0,0.7)';
        outer.style.borderRadius = '20px';
        outer.style.position = 'fixed';
        outer.style.left = ((window.innerWidth - 205) / 2).toString() + 'px';
        outer.style.width = '205px';
        outer.style.top = '30%';
        outer.style.height = '205px';
        outer.style.zIndex = '10000';
        spinner.style.marginLeft = '42.5px';
        spinner.style.marginTop = '42.5px';
        outer.appendChild(spinner);
        document.body.appendChild(outer);
        if (!addedSpinner) {
            addedSpinner = true;
            addSpinnerStyle();
        }
        $.ajax({
            url: 'https://heyleia.com/php/clientNewsletter.php',
            data: {
                'email': document.getElementById('sEmail').value,
                'url': window.location.origin.split('//')[1]
            },
            type: 'POST',
            success: function (data) {
                document.getElementById('spinnerLoading').parentElement.removeChild(document.getElementById('spinnerLoading'));
                if (data === 'success') {
                    swal("Success", "You have successfully subscribed to our newsletter!", "success");
                    document.body.className = '';
                } else {
                    swal("Uh Oh!", data, "error");
                    document.body.className = '';
                }
            },
            error: function (err) {
                console.log(err);
                document.getElementById('spinnerLoading').parentElement.removeChild(document.getElementById('spinnerLoading'));
                swal("Uh Oh!", "There was a problem. Please try again later.", "error");
                document.body.className = '';
            }
        });
    });
    document.body.className = '';
};
addedSpinner = false;