window.onload = function() {
    $('#word-form').hide();

    $('#word-index').click(function() {
        location.reload();
    });
    $('#word-add').click(function() {
        $('#word-index').removeClass('side-active');
        $(this).addClass('side-active');
        $('#word-form').show();
    })
    $('#cancel').click(function() {
        location.reload();
    });
};