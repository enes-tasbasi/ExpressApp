
$('.submitButton').on('click', function () {
    let url;
    if(($('#titleInput').val()) && ($('#bodyInput').val())) {
        url = '/submitArticle/?title=' + $('#titleInput').val() + "&body=" + $('#bodyInput').val();
        if($('input[name=author]:checked').val()) {
            url += "&author=" + $('input[name=author]:checked').val();
        }
    } else {
        alert('Please fill both title and body of the article to submit it.');
    }

    window.location.href = url;
});