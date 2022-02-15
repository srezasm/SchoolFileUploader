const formElement = document.getElementById("form");

function handleChange(id) {
    var data = new FormData();
    data.append("file", document.getElementById(id).files[0]);
    document.getElementById(id).setAttribute("disabled", "true");

    fetch("https://file.io/", {
        method: "POST",
        body: data,
    })
        .then((response) => {
            response.json().then((res) => {
                var qrDiv = document.getElementById("qr-div");
                var qrId = `${id}-qr`;
                qrDiv.innerHTML =
                    qrDiv.innerHTML +
                    `<div class="mt-4"> <small>${res.name}</small><div class="mt-1 mb-1" id="${qrId}"></div> <small>${res.link}</small> </div>`;

                var qrcode = new QRCode(document.getElementById(qrId), res.link);
                qrcode.makecode();
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    // handle add new file inputs
    var newId = id + 1;
    var element = `<input id="${newId}" class="m-2" type="file" onchange="handleChange(${newId})">`;
    formElement.innerHTML = formElement.innerHTML + element;
}
