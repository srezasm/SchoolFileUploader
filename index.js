//todo: How to import .js file in javascript
const formElement = document.getElementById("form");

function handleChange(id) {
    //! to test the qr code
    // var qrDiv = document.getElementById("qr-div");
    // var qrId = `${id}-qr`;
    // qrDiv.innerHTML =
    //     qrDiv.innerHTML +
    //     `<div class="col-2"> <div id="${qrId}"></div> <br/> <span>https://testlink.com/hhahha/10239</span> </div>`;
    // var qrcode = new QRCode(document.getElementById(qrId), "https://testlink.com/hhahha/10239");
    // qrcode.makecode();

    // handle add new file inputs
    var newId = id + 1;
    var element = `<input id="${newId}" class="m-2" type="file" onchange="handleChange(${newId})">`;
    formElement.innerHTML = formElement.innerHTML + element;

    var data = new FormData();
    data.append("file", document.getElementById(id).files[0]);
    console.log(document.getElementById(id).files[0]);
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
                    `<div class="mt-4"> <small>${res.name}name </small><div class="mt-1 mb-1" id="${qrId}"></div> <small>${res.link}https://testlink.com/hhahha/10239</small> </div>`;

                var qrcode = new QRCode(document.getElementById(qrId), "res.linkhttps://testlink.com/hhahha/10239");
                qrcode.makecode();
            });
        })
        .then((result) => {
            console.log("Success:", result);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}