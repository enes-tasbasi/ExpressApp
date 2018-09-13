
$('.form-container button').on('click', () => {
    let email = $('#email').val();
    let password = $('#password').val();

    if($('#form-header').text() === "Log In") {
        window.location.href = `/user/login?email=${email}&password=${password}`;
    } else {
        window.location.href = `/user?email=${email}&password=${password}`;
    }
});


// toggles the sign-up/log-in header as well as the text on the bottom
let signUpButton = $('#sign-up-button');
let formParagraph = $('#form-paragraph');
signUpButton.on('click', () => {
    let popOutHeader = $('#form-header');

    if(popOutHeader.text() === "Log In") {
        popOutHeader.text('Sign Up');
        formParagraph.text('Already have an account? ');
        signUpButton.text("Log In!");
    } else {
        popOutHeader.text('Log In');
        formParagraph.text("Don't have an account? ");
        signUpButton.text('Sign Up!');
    }
});



// Toggles the pop-up window for log in and sign up
$('.header .nav-bar-login a').on('click', () => {
   $('body').addClass('hidden');
   $('.pop-up-background').addClass('active');

});

$('.pop-up .delete-icon').on('click', () => {
   $('body').removeClass('hidden');
   $('.pop-up-background').removeClass('active');
});

