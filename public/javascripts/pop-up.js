// add the action listeners for the sign-out button
$('#sign-out').on('click', function () {
    axios({
        method: 'delete',
        url: '/user/me/token'
    }).then(data => {
        location.reload();
    });
});

//add the key press listener for the enter key
$('.form-container #email, #password, #name').keypress(function (e) {
    if (e.keyCode == 13) {
        $('.form-container button').click();
    }
});

// adds the action listeners for the log in/sign up button and sends the post requests with the appropriate data
$('.form-container button').on('click', () => {
    let email = $('#email').val();
    let password = $('#password').val();
    let name = $('#name').val();


    if ($('#form-header').text() === "Log In") {

        axios({
            method: 'post',
            url: '/user/login',
            data: {email, password}
        }).then(data => {
            $('body').removeClass('hidden');
            $('.pop-up-background').removeClass('active');
            location.reload();
        }, err => {
            $('#wrong-credentials').css('display', 'block');
            $('#wrong-credentials').toggleClass('shake');
        });

    } else {
        axios({
            method: 'post',
            url: '/user',
            data: {name, email, password}
        }).then(data => {
            $('body').removeClass('hidden');
            $('.pop-up-background').removeClass('active');
            location.reload();
        }, err => {
            $('#wrong-credentials').css('display', 'block');
            $('#wrong-credentials').toggleClass('shake');
        });


    }


});


// toggles the sign-up/log-in header as well as the text on the bottom
let signUpButton = $('#sign-up-button');
let formParagraph = $('#form-paragraph');
let nameInput = $('#name');
let nameLabel = $('#name-label');
signUpButton.on('click', () => {
    let popOutHeader = $('#form-header');

    if (popOutHeader.text() === "Log In") {
        popOutHeader.text('Sign Up');
        formParagraph.text('Already have an account? ');
        signUpButton.text("Log In!");
        nameInput.css('display', 'inline-block');
        nameLabel.css('display', 'inline-block');
        $('#wrong-credentials').css('display', 'none');
    } else {
        popOutHeader.text('Log In');
        formParagraph.text("Don't have an account? ");
        signUpButton.text('Sign Up!');
        nameInput.css('display', 'none');
        nameLabel.css('display', 'none');
        $('#wrong-credentials').css('display', 'none');
    }
});


// Toggles the pop-up window for log in and sign up
$('.header .nav-bar-login a').on('click', () => {
    $('body').addClass('hidden');
    $('.pop-up-background').addClass('active');

    $('.pop-up').removeClass('slide-out')
    $('.pop-up').addClass('slide-in');
});

$('.pop-up .delete-icon').on('click', () => {

    // set timeout is set to 500ms so that the pop-up menu can finish its slide-out animation
    setTimeout(function () {
        $('body').removeClass('hidden');
        $('.pop-up-background').removeClass('active');
    }, 500);

    $('.pop-up').removeClass('slide-in');
    $('.pop-up').addClass('slide-out');
    $('#wrong-credentials').css('display', 'none');
});

// hide/show the nav-bar items when the nav-bar button is clicked

$('.header .fa-bars').on('click', function () {
    $('.header ul').toggleClass('open');
    $(this).toggleClass('open');
});
