var profileImgBtn = document.getElementById('profileImage');
var profileFile = document.getElementById('profileFile');

profileImgBtn.addEventListener('click', function () {
    profileFile.click();
});

profileFile.addEventListener('change', function(){
    const choosedFile = this.files[0];
    
    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            profileImgBtn.setAttribute('src', reader.result);
        });
    
        reader.readAsDataURL(choosedFile);
    }
}); 

var bannerImgBtn = document.getElementById('editBanner');
var bannerFile = document.getElementById('bannerFile');

bannerImgBtn.addEventListener('click', function () {
    bannerFile.click();
});

bannerFile.addEventListener('change', function(){
    const choosedFile = this.files[0];
    
    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            if (window.location.pathname == '/userprofile') {
                document.getElementById('banner').style.backgroundImage = 'url("' + reader.result + '")';
            } else {
                document.getElementById('bannerMob').style.backgroundImage = 'url("' + reader.result + '")';
            }
        });
    
        reader.readAsDataURL(choosedFile);
    }
}); 

$.ajax({
    url: '/getUserInfo',
    type: "GET",
    success: function (data) {
        $("#displayFullname").text(`${data.firstName}  ${data.lastName}`)
        $("#displayUsername").text(`@${data.username}`)
        $("#joinedDate").text(`${new Date(data.createdAt).toDateString()}`)
        $("#joinedDateMob").text(`Joined: ${new Date(data.createdAt).toDateString()}`)
        $("#firstname").attr("value", `${data.firstName}`)
        $("#lastname").attr("value", `${data.lastName}`)
        $("#username").attr("value", `${data.username}`)
        $("#email").attr("value", `${data.email}`)
        $("#emailmobile").text(`${data.email}`)
        if (!data.phoneNum) {
            $("#phone").attr("value",)
            $("#phonemobile").text()
        } else {
            let phonenumber = data.phoneNum;
            // phonenumber = formatPhoneNumber(phonenumber);
            $("#phone").attr("value", phonenumber)
            $("#phonemobile").text(phonenumber)
        }
    }
});

$.ajax({
    url: '/getProfilePicture',
    type: 'GET',
    success: function(data) {
        $("#profileImage").attr('src', data)
    }
})
// function formatPhoneNumber(phoneNumberString) {
//     var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
//     var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
//     if (match) {
//         return '(' + match[1] + ') ' + match[2] + '-' + match[3];
//     }
//     return null;
// }

$('#saveChanges').click(() => {
    var emp = document.getElementById("password").value;
    $.ajax({
        url: '/editProfile',
        type: 'POST',
        data: {
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            email: $("#email").val(),
            username: $("#username").val(),
            phone: $("#phone").val(),
            password: $("#password").val(),
        }, success: function (data) {
            console.log(data);
            if(data == "existingEmail") {
                document.getElementById("emailErrorMessage").innerHTML = "A user with that email already exists";
            } else if (data == "existingPhone") {
                document.getElementById("phoneErrorMessage").innerHTML = "A user with that phone number already exists";
                document.getElementById("emailErrorMessage").innerHTML = "";
            } else if (data == "existingUsername") {
                document.getElementById("usernameErrorMessage").innerHTML = "A user with that username already exists";
                document.getElementById("emailErrorMessage").innerHTML = "";
                document.getElementById("phoneErrorMessage").innerHTML = "";
            } else if(data == "updated") {
                if (emp == "") {
                    setTimeout(() => {
                        window.location = '/userprofile'
                    }, 50);
                } else {
                    $.post("/logout");
                    window.location = '/login'
                }
            } else if(data == "logout") {
                window.location = '/login'
            }
        }
    })
});