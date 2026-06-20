window.onload = function() {
    $('#word-form').hide();

    $('#word-index').click(function() {
        location.reload();
    });
    $('#word-add').click(function() {
        $('#word-index').removeClass('side-active');
        $(this).addClass('side-active');
        $('#word-form').show();
    });

    $('#word-form').submit(function(event) {
        event.preventDefault();

        let word = $('#word').val();
        let meaning = $('#meaning').val();

        $.ajax({
            url: '/word',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                'word': word,
                'meaning': meaning,
            }),
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                location.reload();
            },
            error: function(err){
                console.log(err);
            }
        });
        
    });
    $('#cancel').click(function() {
        location.reload();
    });
};