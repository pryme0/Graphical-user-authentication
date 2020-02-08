let locate = window.location.pathname
let fullname = ""
let Email = ""

if (locate == "/") {
    let reglink = document.getElementById('registerlink')
    let loglink = document.getElementById('loginlink')

    reglink.style = "display:none"
    loglink.style = "display:none"
}
//admin page
if (locate == "/user/admin") {
    let tablebody = document.getElementById("tablebody")
    tablebody.className = "table-bordered table-stripped"
    let tablebody1 = document.getElementById("tablebody1")
    tablebody.className = "table-bordered table-stripped"

    fetch('/user/adminimages')
        .then((res) => res.json())
        .then((data) => {
            for (i = 0; i < data.length; i++) {
                usercount = 1
                let tablrow = document.createElement('tr')
                let sn = document.createElement('td')
                let imagename = document.createElement('td')
                let image = document.createElement('img')
                let imagerw = document.createElement('td')
                let button = document.createElement('button')
                button.id = data[i]._id
                sn.style.width = '10%'
                image.src = data[i].name
                image.width = '40'
                image.height = '40'
                image.className = 'img-responsive'
                image.style.cssText = 'margin-right:10px;border-radius:10px'
                imagename.style.width = '10%'
                button.name = 'deleteimage'
                button.className = 'btn btn-danger'
                button.innerHTML = "deleteimage"
                sn.innerHTML = i
                imagename.innerHTML = data[i].name
                tablrow.appendChild(sn)
                tablrow.appendChild(imagename)
                tablrow.appendChild(image)
                tablrow.appendChild(button)
                tablebody1.appendChild(tablrow)
            }



        })

    //delete image method
    let delimg = (event) => {
            id = event.toElement.id


            var r = confirm("Delete the image?");
            if (r == true) {
                fetch('/user/deleteimages/' + id, {
                        method: 'POST'
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data == 'deleted') {
                            tablebody1.innerHTML = "<div class='d-flex justify-content-center'><div class='spinner-border  text-dark' role='status' style='width: 4rem; height:4rem;'> <span class='sr-only'>Loading .........</span></></div></div>"

                            setTimeout(() => {
                                tablebody1.innerHTML = ''
                                fetch('/user/adminimages')
                                    .then((res) => res.json())
                                    .then((data) => {
                                        for (i = 0; i < data.length; i++) {
                                            usercount = 1
                                            let tablrow = document.createElement('tr')
                                            let sn = document.createElement('td')
                                            let imagename = document.createElement('td')
                                            let image = document.createElement('img')
                                            let imagerw = document.createElement('td')
                                            let button = document.createElement('button')
                                            button.id = data[i]._id
                                            sn.style.width = '10%'
                                            image.src = data[i].name
                                            image.width = '40'
                                            image.height = '40'
                                            image.className = 'img-responsive'
                                            image.style.cssText = 'margin-right:10px;border-radius:10px'

                                            imagename.style.width = '10%'
                                            button.name = 'deleteimage'
                                            button.className = 'btn btn-danger'
                                            button.innerHTML = "deleteimage"
                                            button.addEventListener('click', delimg)
                                            sn.innerHTML = i
                                            imagename.innerHTML = data[i].name
                                            tablrow.appendChild(sn)
                                            tablrow.appendChild(imagename)
                                            tablrow.appendChild(image)
                                            tablrow.appendChild(button)
                                            tablebody1.appendChild(tablrow)
                                        }

                                    })
                            }, 2000)

                        }
                    })
            } else {

            }
        }
        //setting deleteimage  event listener
    let imgdel = setTimeout(() => {
        deleteimage = document.getElementsByName('deleteimage').forEach(im => {
            im.addEventListener('click', delimg)
        }, )
    }, 3000)

    let usercount = 0
    fetch('/user/getusers')
        .then((res) => res.json())
        .then((data) => {
            for (i = 0; i < data.length; i++) {
                usercount = 1
                let tablrow = document.createElement('tr')
                let sn = document.createElement('td')
                let fulln = document.createElement('td')
                let emal = document.createElement('td')
                let Id = document.createElement('td')
                let button = document.createElement('button')
                button.id = data[i]._id
                sn.style.width = '10%'
                fulln.style.width = '40%'
                button.name = 'deactivate'
                button.className = 'btn btn-danger'
                button.innerHTML = "deactivate"
                sn.innerHTML = i
                Id.innerHTML = data[i]._id
                fulln.innerHTML = data[i].fullname
                emal.innerHTML = data[i].email
                tablrow.appendChild(sn)
                tablrow.appendChild(fulln)
                tablrow.appendChild(emal)
                tablrow.appendChild(button)
                tablebody.appendChild(tablrow)
            }

        })
    let id = ''
    let del = (event) => {
        id = event.toElement.id

        var r = confirm("Press a button");
        if (r == true) {

            fetch('/user/delete/' + id, {
                    method: 'POST'
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data == 'deleted') {
                        tablebody.innerHTML = "<div class='d-flex justify-content-center'><div class='spinner-border  text-dark' role='status' style='width: 4rem; height:4rem;'> <span class='sr-only'>Loading .........</span></></div></div>"

                        setTimeout(() => {
                            tablebody.innerHTML = ''
                            fetch('/user/getusers')
                                .then((res) => res.json())
                                .then((data) => {
                                    for (i = 0; i < data.length; i++) {
                                        usercount = 1
                                        let tablrow = document.createElement('tr')
                                        let sn = document.createElement('td')
                                        let fulln = document.createElement('td')
                                        let emal = document.createElement('td')
                                        let Id = document.createElement('td')
                                        let button = document.createElement('button')
                                        button.id = data[i]._id
                                        sn.style.width = '10%'
                                        fulln.style.width = '40%'
                                        button.name = 'deactivate'
                                        button.className = 'btn btn-danger'
                                        button.innerHTML = "deactivate"
                                        sn.innerHTML = i
                                        Id.innerHTML = data[i]._id
                                            //Id.style = "display:none"
                                        fulln.innerHTML = data[i].fullname
                                        emal.innerHTML = data[i].email
                                        tablrow.appendChild(sn)
                                        tablrow.appendChild(fulln)
                                        tablrow.appendChild(emal)
                                        tablrow.appendChild(button)
                                        tablebody.appendChild(tablrow)
                                    }

                                })
                        }, 2000)

                    }
                })
        } else {

        }
    }


    let se = setTimeout(() => {
        deactivate = document.getElementsByName('deactivate').forEach(im => {
            im.addEventListener('click', del)
        }, )
    }, 2000)

    let formdata = new FormData()

    //image upload logic
    const upload = (event) => {
        event.preventDefault()
        let fomrdata = new FormData()
        let photos = document.querySelector('input[type="file"][multiple]');
        if (photos.files.length < 1) {
            console.log(photos.files.length)
            let error = "please select an image"
            let alert = document.getElementById("alert")
            let alertholder = document.getElementById("alertholder")
            alert.innerHTML = error
            alertholder.style = "display:inline"
            return error

        } else {
            for (let i = 0; i < photos.files.length; i++) {
                formdata.append('photos', photos.files[i]);
            }
            fetch('/user/upload', {
                    method: 'POST',
                    body: formdata
                }).then(res => res.json())
                .then((data) => {
                    let alert = document.getElementById("alert")
                    let alertholder = document.getElementById("alertholder")
                    alert.innerHTML = data
                    alertholder.style = "display:inline"

                })
        }

    }

    const uploadimages = document.getElementById('filesubmit').addEventListener('click', upload)
}
//register page
if (locate == "/user/register") {
    let imgcontainer = document.getElementById('imgcontainer')
    let imageHeader = document.getElementById('image_header')

    let formdata = new FormData()
    let password = ""
    let image_container = document.getElementById('image_container')
    let dat = []
    fetch('/user/getimages')
        .then((resp) => resp.json())
        .then((data) => {
            for (i = 0; i < data.length; i++) {
                dat.push(data[i])
                let img = document.createElement("img");
                img.width = '80'
                img.height = '80'
                img.className = 'img-responsive imgs'
                img.id = "img"
                img.src = data[i].name
                let name = img.src
                image_container.append(img)

            }
        })
    let count = 0

    let next = () => {
        imgcontainer.innerHTML = "<div class='d-flex justify-content-center'><div class='spinner-border  text-dark' role='status' style='width: 4rem; height:4rem;'> <span class='sr-only'>Loading .........</span></></div></div>"
        setTimeout(async() => {
            imgcontainer.innerHTML = ""
            dat = []
            await fetch('/user/getimages')
                .then((resp) => resp.json())
                .then((data) => {
                    for (i = 0; i < data.length; i++) {
                        dat.push(data[i])
                        let img = document.createElement("img");
                        img.width = '80'
                        img.height = '80'
                        img.className = 'img-responsive imgs'
                        img.id = "img"
                        img.src = data[i].name
                        img.addEventListener('click', clock)
                        imgcontainer.appendChild(img)

                    }
                })
            let span = document.createElement("span")
            let button = document.createElement("button")
            button.id = "next"
            button.innerText = "next"
            button.className = "btn btn-danger"
            button.addEventListener('click', next)
            span.appendChild(button)
            imgcontainer.appendChild(span)

        }, 2000)

    }
    let clock = (imaEvent) => {
        count += 1
        imaEvent.toElement.style = "opacity:0.2"
        let element = imaEvent.toElement
        let string = element.src

        let stringArray = Array.from(string)
        for (i = 0; i < 31; i++) {
            stringArray.shift([i])
        }
        let pass = ""
        for (j = 0; j < stringArray.length; j++) {
            pass += stringArray[j]
        }
        let arrayOfImgs = []
        password += pass
        arrayOfImgs.push(password)

        if (count == 4) {
            imgcontainer.innerHTML = "<p>Password set fill in details and click submit to register" + "<br>" + "<p class='text-danger'>Or click reset below to reset password</p><button id='reset' type='reset' value='reset' class='btn btn-danger'>RESET</button>"
            setTimeout(() => {
                let reset = document.getElementById("reset").addEventListener('click', async() => {
                    imgcontainer.innerHTML = "<div class='d-flex justify-content-center'><div class='spinner-border  text-dark' role='status' style='width: 4rem; height:4rem;'> <span class='sr-only'>Loading .........</span></></div></div>"
                    await setTimeout(() => {
                        imgcontainer.innerHTML = ""
                        count = 0
                        for (i = 0; i < dat.length; i++) {
                            let img = document.createElement("img");
                            img.width = '80'
                            img.height = '80'
                            img.className = 'img-responsive imgs'
                            img.id = "img"
                            img.src = dat[i].name
                            img.addEventListener('click', clock)
                            imgcontainer.appendChild(img)
                        }
                        let span = document.createElement("span")
                        let button = document.createElement("button")
                        button.id = "next"
                        button.innerText = "next"
                        button.className = "btn btn-danger"
                        button.addEventListener('click', next)
                        span.appendChild(button)
                        imgcontainer.appendChild(span)
                    }, 2000)

                    password = ""

                })
            }, 1000)
        }

    }

    var imgs
    images = document.querySelectorAll('img')
    let se = setTimeout(() => {
        images = document.querySelectorAll('img').forEach(im => {
            im.addEventListener('click', clock)
        }, )
    }, 2000)


    const register = (event) => {
        event.preventDefault()
        let formdata = new FormData()
        let fullname = document.forms['regform']['fullname'].value
        let email = document.forms['regform']['email'].value
        let error
        if (password == "" || email == "" || fullname == "") {
            let error = "fields cannot be empty"
            let alert = document.getElementById("alert")
            let alertholder = document.getElementById("alertholder")
            alert.innerHTML = error
            alertholder.style = "display:inline"
            return error
        }
        const postBody = {
            fullname: fullname,
            email: email,
            password: password
        }

        fetch('/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postBody)
            }).then((resp) => resp.json())
            .then((data) => {
                let alert = document.getElementById("alert")
                let alertholder = document.getElementById("alertholder")
                alert.innerHTML = data
                alertholder.style = "display:inline"

                return data
            })

    }


    let nxtclick = document.getElementById("next").addEventListener('click', next)
    const registerUser = document.getElementById('regsubmit').addEventListener('click', register)
}



//login page

if (locate == "/user/login") {
    let cont = document.getElementById("body")
    let imgcontainer = document.getElementById('imgcontainer')
    let img_container = document.getElementById('image_container')
    let logform = document.getElementById('logform')

    let password = ""
    let dat = []
    fetch('/user/getimages')
        .then((resp) => resp.json())
        .then((data) => {
            for (i = 0; i < data.length; i++) {
                dat.push(data[i])
                let img = document.createElement("img");
                img.width = '80'
                img.height = '80'
                img.className = 'img-responsive imgs'
                img.id = "img"
                img.src = data[i].name
                let name = img.src
                img_container.append(img)
            }
        })
    let count = 0

    let next = () => {
        imgcontainer.innerHTML = "<div class='d-flex justify-content-center'><div class='spinner-border  text-dark' role='status' style='width: 4rem; height:4rem;'> <span class='sr-only'>Loading .........</span></></div></div>"
        setTimeout(async() => {
            imgcontainer.innerHTML = ""
            dat = []
            await fetch('/user/getimages')
                .then((resp) => resp.json())
                .then((data) => {
                    for (i = 0; i < data.length; i++) {
                        dat.push(data[i])
                        let img = document.createElement("img");
                        img.width = '80'
                        img.height = '80'
                        img.className = 'img-responsive imgs'
                        img.id = "img"
                        img.src = data[i].name
                        img.addEventListener('click', clock)
                        imgcontainer.appendChild(img)

                    }
                })
            let span = document.createElement("span")
            let button = document.createElement("button")
            button.id = "next"
            button.innerText = "next"
            button.className = "btn btn-danger"
            button.addEventListener('click', next)
            span.appendChild(button)
            imgcontainer.appendChild(span)

        }, 2000)

    }
    let clock = (imaEvent) => {
        count += 1
        imaEvent.toElement.style = "opacity:0.2"
        logform.style = "opacity: 0.9"
        let element = imaEvent.toElement
        let string = element.src

        let stringArray = Array.from(string)
        for (i = 0; i < 31; i++) {
            stringArray.shift([i])
        }
        let pass = ""
        for (j = 0; j < stringArray.length; j++) {
            pass += stringArray[j]
        }
        let arrayOfImgs = []
        password += pass
        arrayOfImgs.push(password)

        if (count == 4) {
            imgcontainer.innerHTML = "<p>Password set fill in details and click submit to register" + "<br>" + "<p class='text-danger'>Or click reset below to reset password</p><button id='reset' type='reset' value='reset' class='btn btn-danger'>RESET</button>"
            setTimeout(() => {
                let reset = document.getElementById("reset").addEventListener('click', async() => {
                    imgcontainer.innerHTML = "<div class='d-flex justify-content-center'><div class='spinner-border  text-dark' role='status' style='width: 4rem; height:4rem;'> <span class='sr-only'>Loading .........</span></></div></div>"
                    await setTimeout(() => {
                        imgcontainer.innerHTML = ""
                        count = 0
                        for (i = 0; i < dat.length; i++) {
                            let img = document.createElement("img");
                            img.width = '80'
                            img.height = '80'
                            img.className = 'img-responsive imgs'
                            img.id = "img"
                            img.src = dat[i].name
                            img.addEventListener('click', clock)
                            imgcontainer.appendChild(img)
                        }
                        let span = document.createElement("span")
                        let button = document.createElement("button")
                        button.id = "next"
                        button.innerText = "next"
                        button.className = "btn btn-danger"
                        button.addEventListener('click', next)
                        span.appendChild(button)
                        imgcontainer.appendChild(span)
                    }, 2000)

                    password = ""

                })
            }, 1000)
        }

    }

    var imgs
    images = document.querySelectorAll('img')

    let se = setTimeout(() => {
        images = document.querySelectorAll('img').forEach(im => {
            im.addEventListener('click', clock)
        }, )
    }, 2000)




    let loginev = (event) => {
        event.preventDefault()

        let email = document.forms["loginform"]["email"].value
        if (email == " " || password == " ") {
            let error = "fields cannot be empty"
            let alert = document.getElementById("alert")
            let alertholder = document.getElementById("alertholder")

            alert.innerHTML = error
            alertholder.style = "display:inline"
            return error
        }

        let postbody = {
            email: email,
            password: password
        }
        fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postbody)
            }).then((res) => res.json())
            .then((data) => {

                if (data.report == "match") {

                    cont.innerHTML = "<div class='d-flex justify-content-center'><div class='spinner-border  text-white' role='status' style='width: 6rem; height:6rem;'> <span class='sr-only'>Loading .........</span></></div></div>"
                    setTimeout(() => {
                        fullname = data.fullname
                        if (data.email == 'admin@gmail.com') {
                            window.location.assign("/user/admin")
                        } else {
                            window.location.assign("/user/dashboard")
                        }

                    }, 2000)
                } else {
                    let alert = document.getElementById("alert")
                    let alertholder = document.getElementById("alertholder")
                    alert.innerHTML = data
                    alertholder.style = "display:inline"
                }
            })
    }

    let nxtclick = document.getElementById("next").addEventListener('click', next)
    let lo = document.getElementById('submit').addEventListener('click', loginev)

}

if (locate == '/user/dashboard/') {
    let arr = window.location.href()

    let stringArray = Array.from(arr)
    for (i = 0; i < 36; i++) {
        stringArray.shift([i])
    }

    let nm = document.getElementById('name_span')
    nm.innerHTML = fullname
}
if (locate == "/user/passwordreset") {
    let imgcontainer = document.getElementById('imgcontainer')
    let imageHeader = document.getElementById('image_header')

    let formdata = new FormData()
    let password = ""
    let image_container = document.getElementById('image_container')
    let dat = []
    fetch('/user/getimages')
        .then((resp) => resp.json())
        .then((data) => {
            for (i = 0; i < data.length; i++) {
                dat.push(data[i])
                let img = document.createElement("img");
                img.width = '80'
                img.height = '80'
                img.className = 'img-responsive imgs'
                img.id = "img"
                img.src = data[i].name
                let name = img.src
                image_container.append(img)

            }
        })
    let count = 0

    let next = () => {
        imgcontainer.innerHTML = "<div class='d-flex justify-content-center'><div class='spinner-border  text-dark' role='status' style='width: 4rem; height:4rem;'> <span class='sr-only'>Loading .........</span></></div></div>"
        setTimeout(async() => {
            imgcontainer.innerHTML = ""
            dat = []
            await fetch('/user/getimages')
                .then((resp) => resp.json())
                .then((data) => {
                    for (i = 0; i < data.length; i++) {
                        dat.push(data[i])
                        let img = document.createElement("img");
                        img.width = '80'
                        img.height = '80'
                        img.className = 'img-responsive imgs'
                        img.id = "img"
                        img.src = data[i].name
                        img.addEventListener('click', clock)
                        imgcontainer.appendChild(img)

                    }
                })
            let span = document.createElement("span")
            let button = document.createElement("button")
            button.id = "next"
            button.innerText = "next"
            button.className = "btn btn-danger"
            button.addEventListener('click', next)
            span.appendChild(button)
            imgcontainer.appendChild(span)

        }, 2000)

    }
    let clock = (imaEvent) => {
        count += 1
        imaEvent.toElement.style = "opacity:0.2"
        console.log(count)
        let element = imaEvent.toElement
        let string = element.src

        let stringArray = Array.from(string)
        for (i = 0; i < 31; i++) {
            stringArray.shift([i])
        }
        let pass = ""
        for (j = 0; j < stringArray.length; j++) {
            pass += stringArray[j]
        }
        let arrayOfImgs = []
        password += pass
        arrayOfImgs.push(password)

        if (count == 4) {
            imgcontainer.innerHTML = "<p>Password set fill in details and click submit to register" + "<br>" + "<p class='text-danger'>Or click reset below to reset password</p><button id='reset' type='reset' value='reset' class='btn btn-danger'>RESET</button>"
            setTimeout(() => {
                let reset = document.getElementById("reset").addEventListener('click', async() => {
                    imgcontainer.innerHTML = "<div class='d-flex justify-content-center'><div class='spinner-border  text-dark' role='status' style='width: 4rem; height:4rem;'> <span class='sr-only'>Loading .........</span></></div></div>"
                    await setTimeout(() => {
                        imgcontainer.innerHTML = ""
                        count = 0
                        for (i = 0; i < dat.length; i++) {
                            console.log(dat.length)
                            let img = document.createElement("img");
                            img.width = '80'
                            img.height = '80'
                            img.className = 'img-responsive imgs'
                            img.id = "img"
                            img.src = dat[i].name
                            img.addEventListener('click', clock)
                            imgcontainer.appendChild(img)
                        }
                        let span = document.createElement("span")
                        let button = document.createElement("button")
                        button.id = "next"
                        button.innerText = "next"
                        button.className = "btn btn-danger"
                        button.addEventListener('click', next)
                        span.appendChild(button)
                        imgcontainer.appendChild(span)
                    }, 2000)

                    password = ""

                })
            }, 1000)
        }

    }
    var imgs
    images = document.querySelectorAll('img')
    let se = setTimeout(() => {
        images = document.querySelectorAll('img').forEach(im => {
            im.addEventListener('click', clock)
        }, )
    }, 2000)

    const reset = (event) => {
        event.preventDefault()
        let formdata = new FormData()
        let email = document.forms['resetform']['email'].value
        let error
        if (password == "" || email == "") {
            let error = "fields cannot be empty"
            let alert = document.getElementById("alert")
            let alertholder = document.getElementById("alertholder")
            alert.innerHTML = error
            alertholder.style = "display:inline"
            return error
        }
        const postBody = {
            email: email,
            password: password
        }

        fetch('/user/passwordreset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postBody)
            }).then((resp) => resp.json())
            .then((data) => {
                let alert = document.getElementById("alert")
                let alertholder = document.getElementById("alertholder")
                alert.innerHTML = data
                alertholder.style = "display:inline"

                return data
            })

    }
    let nxtclick = document.getElementById("next").addEventListener('click', next)
    let lo = document.getElementById('reset').addEventListener('click', reset)
}