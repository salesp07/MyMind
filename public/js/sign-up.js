$('#signupBtn').click(() => {
    var phoneLength = $("#phone").val();
    if (phoneLength.length != 10) {
        document.getElementById("signUpErrorMessage").innerHTML = "Your phone number must be of length 10";
    } else if (!isEmail($("#email").val())) {
        document.getElementById("signUpErrorMessage").innerHTML = "Please follow this email pattern: example@email.com";
    } else if (inputValidation()) {
        window.scrollTo(0, document.body.scrollHeight);
        document.getElementById("signUpErrorMessage").innerHTML = "There are empty fields";
    } else if(passwordValidation()) {
        document.getElementById("signUpErrorMessage").innerHTML = "Password must be at least 5 or less than 20 characters long";
    } else {
        $.ajax({
            url: '/sign-up',
            type: 'POST',
            data: {
                firstname: $("#firstname").val().charAt(0).toUpperCase() + $("#firstname").val().substring(1),
                lastname: $("#lastname").val().charAt(0).toUpperCase() + $("#lastname").val().substring(1),
                username: $("#username").val().toLowerCase(),
                phone: $("#phone").val(),
                email: $("#email").val(),
                userType: $("#userType").val(),
                password: $("#password").val(),
                yearsExperience: $("#yearsExperience").val(),
                sessionCost: $("#sessionCost").val(),
            }, success: function (data) {
                console.log(data);
                if (data == "existingEmail") {
                    document.getElementById("signUpErrorMessage").innerHTML = "A user with that email already exists";
                } else if (data == "existingPhone") {
                    document.getElementById("signUpErrorMessage").innerHTML = "A user with that phone number already exists";
                } else if (data == "existingUsername") {
                    document.getElementById("signUpErrorMessage").innerHTML = "A user with that username already exists";
                } else if (data == "login") {
                    window.location = '/login'
                }
            }
        })
    }
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function inputValidation() {
    const inpObjFirstName = document.getElementById("firstname");
    const inpObjLastName = document.getElementById("lastname");
    const inpObjUsername = document.getElementById("username");
    if (!inpObjFirstName.checkValidity() || !inpObjLastName.checkValidity() || !inpObjUsername.checkValidity()) {
        return true;
    }
}

function passwordValidation() {
    const inpObjPassword = document.getElementById("password");
    if (!inpObjPassword.checkValidity()) {
        return true;
    }
}

// Display therapy field options if usertype is a therapist
function showTherapyOptions(selectObject) {
    const value = selectObject.value;
    const therapyFieldOptions = document.querySelectorAll('.therapistOptions');
    if (value == 'therapist') {
        for (var i = 0; i < therapyFieldOptions.length; i++) {
            therapyFieldOptions[i].style.display = 'flex';
        }
    } else {
        for (var i = 0; i < therapyFieldOptions.length; i++) {
            therapyFieldOptions[i].style.display = 'none';
        }
    }
}

// Trigger click function for enter key for all input fields
const input = document.querySelectorAll(".form-control");
for (var i = 0; i < input.length; i++) {
    input[i].addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("signupBtn").click();
        }
    });
}