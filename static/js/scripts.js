window.onload = function() {
    if ($('#myModal').length && $.fn.modal) {
        $('#myModal').modal('show');
    }
    $('#word-form').hide();
    $('.edit-word, .edit-meaning').hide();
    $('.update, .cancel').parent().hide();
    
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


    $('.delete').click(function(event) {
        event.preventDefault();

        let word_id = $(this).attr('id');
        

        $.ajax({
            url: '/word/' + word_id + '/delete',
            type: 'POST',
            success: function(data){
                location.reload();
            },
            error: function(err){
                console.log(err);
            }
        });
        
    });

    $('.edit').click(function(event) {
        event.preventDefault();

        let parent = $(this).parents('tr');
        parent.find('.word-word, .word-meaning').hide();
        parent.find('.edit-word, .edit-meaning').show();
        parent.find('.edit, .delete').parent().hide();
        parent.find('.update, .cancel').parent().show();     
        
    });

    $('.cancel').click(function() {
        location.reload();
    });

    $('.update-form').submit(function(event) {
        event.preventDefault();

        let parent = $(this).parents('tr');
        let word = parent.find('input').val();
        let meaning = parent.find('textarea').val();
        let word_id = parent.find('.update').attr('id');

         

        $.ajax({
            url: '/word/' + word_id + '/edit',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                'word': word,
                'meaning': meaning
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
};