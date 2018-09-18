
$('.submitButton').on('click', function () {
    let url;
    if(($('#titleInput').val()) && ($('#bodyInput').val())) {
        url = '/submitArticle?title=' + $('#titleInput').val() + "&body=" + $('#bodyInput').val();
        if($('input[name=author]:checked').val()) {
            url += "&author=" + $('input[name=author]:checked').val();
        }

        window.location.href = url;

    } else {
        alert('Please fill both title and body of the article to submit it.');
    }


});