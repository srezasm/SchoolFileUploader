const formElement = document.getElementById("form");

function handleChange(id) {
    var data = new FormData();
    data.append("file", document.getElementById(id).files[0]);
    // document.getElementById(id).setAttribute("disabled", "true");

    fetch("https://file.io/", {
        method: "POST",
        body: data,
    })
        .then((response) => {
            response.json().then((res) => {
                // var qrDiv = document.getElementById("qr-div");
                // var qrId = `${id}-qr`;
                // qrDiv.innerHTML =
                //     qrDiv.innerHTML +
                //     `<div class="mt-4"> <small>${res.name}</small><div class="mt-1 mb-1" id="${qrId}"></div> <small>${res.link}</small> </div>`;

                // var qrcode = new QRCode(
                //     document.getElementById(qrId),
                //     res.link
                // );
                // qrcode.makecode();

                var qrDiv = document.getElementById("qr-div");
                var qrId = `${id}-qr`;
                qrDiv.innerHTML =
                    qrDiv.innerHTML +
                    `<div class="card col-lg-3 col-md-6 col-12 m-1">` +
                    `<div id="${qrId}" class="card-img-top mt-2"></div>` +
                    `<div class="card-body">`+
                    `<h5 class="card-title">${res.name}</h5>` +
                    `<a class="card-text" href="${res.link}">${res.link}</a>` +
                    `<a class="btn btn-primary" onclick="navigator.clipboard.writeText('${res.link}')">Copy link</a>` +
                    `</div>` +
                    `</div>`;


                var qrcode = new QRCode(
                    document.getElementById(qrId),
                    res.link
                );
                qrcode.makecode();
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    // handle add new file inputs
    var newId = id + 1;
    var element = document.getElementById(id);
    element.id = newId;
    element.setAttribute("onchange", `handleChange(${newId})`);
}
