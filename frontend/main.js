var homepage = true

var imgclearbutton = document.createElement("button")
imgclearbutton.style.display = "none"
imgclearbutton.innerHTML = "Clear Image"
imgclearbutton.addEventListener("click", function () {

    homepage = true

    var editedimg = document.getElementById("editedimg")
    if (editedimg != null) {
        editedimg.style.display = "none"
        editedimg.src = ""
    }
    var uneditedimg = document.getElementById("uneditedimg")
    if (uneditedimg != null) {
        uneditedimg.style.display = "none"
        uneditedimg.src = ""
    }
    imginputbutton.value = null
    imguploadbtnimg.style.display = "block"
    imguploadtext.style.display = "block"
    imgclearbtnimg.style.display = "none"
    imgsubmitbtnimg.style.display = "none"
    loadingwheel.style.display = "none"
})

var submitbutton = document.createElement("button")
submitbutton.style.display = "none"
submitbutton.innerHTML = "Submit image for editing"
submitbutton.addEventListener("click", async function () {
    var imguploaded = document.getElementById("uneditedimg")
    if (imguploaded != null) {

        editedimg.style.display = "none"

        var imgwidth = uneditedimg.clientWidth
        var imgheight = uneditedimg.clientHeight

        var widthmargin = (imgwidth - 400) / 2
        var heightmargin = (imgheight - 400) / 2

        var paddingtext = "padding: " + heightmargin.toString() + "px " + widthmargin.toString() + "px"


        loadingwheel.className = "loadingwheel"
        loadingwheel.setAttribute("style", paddingtext)
        loadingwheel.setAttribute("height", imgheight)
        loadingwheel.style.display = "inline-block"

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = uneditedimg.width / 1
        canvas.height = uneditedimg.height / 1
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        var numPixels = pixels.length;



        for (var i = 0; i < numPixels; i++) {
            pixels[i * 4] = pixels[i * 4] - (pixels[i * 4] % 32);
            pixels[i * 4 + 1] = pixels[i * 4 + 1] - (pixels[i * 4 + 1] % 32);
            pixels[i * 4 + 2] = pixels[i * 4 + 2] - (pixels[i * 4 + 2] % 32);
        }
        ctx.putImageData(imageData, 0, 0)
        ctx.drawImage(uneditedimg, 0, 0, canvas.width, canvas.height)
        var base64imgfull = canvas.toDataURL()
        var base64img = base64imgfull.split(",")[1];


        var formdata = new FormData();
        formdata.append("base64", base64img)

        var requestOptions = {
            method: 'POST',
            body: formdata,


        };

        fetch("https://noaharram.pythonanywhere.com/", requestOptions)
            .then(function (response) {
                return response.text().then(function (data) {
                    loadingwheel.style.display = "none"
                    editedimg.id = "editedimg"
                    editedimg.className = "editedimg"
                    if (homepage == false) {
                        editedimg.src = ("data:image/png;base64," + data)
                        editedimg.style.display = "inline-block"
                    }

                })
            }).catch(error => console.log('error', error));


    } else {
        console.log("No image uploaded")
    }
})
document.body.appendChild(submitbutton)

document.body.appendChild(imgclearbutton)

var imguploadtext = document.createElement("p")
imguploadtext.className = "imguploadtxt"
imguploadtext.id = "imguploadtxt"
imguploadtext.innerText = "Click below to add image for editing (png only)"
document.body.appendChild(imguploadtext)

var imginputbutton = document.createElement("input")
imginputbutton.setAttribute("type", "file")
imginputbutton.setAttribute("accept", ".png")
imginputbutton.style.display = "none"
imginputbutton.addEventListener("change", function (event) {

    homepage = false

    imguploadbtnimg.style.display = "none"
    uneditedimg.id = "uneditedimg"
    uneditedimg.className = "uneditedimg"
    uneditedimg.src = URL.createObjectURL(event.target.files[0])
    uneditedimg.style.display = "inline-block"


    imgclearbtnimg.style.display = "inline-block"
    imgsubmitbtnimg.style.display = "inline-block"
    imguploadtext.style.display = "none"
})
document.body.appendChild(imginputbutton)

var imguploadbtnimg = document.createElement("input")
imguploadbtnimg.type = "image"
imguploadbtnimg.src = "imguploadbutton.png"
imguploadbtnimg.style.width = "300px"
imguploadbtnimg.addEventListener("click", function () {
    imginputbutton.click()
})

document.body.appendChild(imguploadbtnimg)


var uneditedimg = document.createElement("img")
uneditedimg.style.display = "none"
document.body.appendChild(uneditedimg)

var editedimg = document.createElement("img")
editedimg.style.display = "none"
document.body.appendChild(editedimg)

var loadingwheel = document.createElement("img")
loadingwheel.src = "loading_wheel.gif"
loadingwheel.style.display = "none"
document.body.appendChild(loadingwheel)

var linebreak = document.createElement("br")
linebreak.class = "blank"
document.body.appendChild(linebreak)

var imgsubmitbtnimg = document.createElement("input")
imgsubmitbtnimg.type = "image"
imgsubmitbtnimg.src = "imgsubmitbutton.png"
imgsubmitbtnimg.style.display = "none"
imgsubmitbtnimg.style.width = "300px"
imgsubmitbtnimg.style.clear = "left"
imgsubmitbtnimg.class = "buttonimg"
imgsubmitbtnimg.style.paddingTop = "20px"
imgsubmitbtnimg.addEventListener("click", function () {
    submitbutton.click()
})

document.body.appendChild(imgsubmitbtnimg)

var imgclearbtnimg = document.createElement("input")
imgclearbtnimg.type = "image"
imgclearbtnimg.src = "imgclearbutton.png"
imgclearbtnimg.style.display = "none"
imgclearbtnimg.style.width = "300px"
imgclearbtnimg.class = "buttonimg"
imgclearbtnimg.style.paddingLeft = "30px"
imgclearbtnimg.addEventListener("click", function () {
    imgclearbutton.click()
})

document.body.appendChild(imgclearbtnimg)
