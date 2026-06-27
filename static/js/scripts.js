window.onload = function() {
    if ($('#myModal').length && $.fn.modal) {
        $('#myModal').modal('show');
    }
    $('#word-form').hide();
    $('#logo-form').hide();
    $('.edit-word, .edit-meaning').hide();
    $('.update, .cancel').parent().hide();
    
    $('#word-index').click(function() {
        location.reload();
    });

    $('#flash-alert-close').click(function(){
        $('#flash-alert').hide();
    })

    $('#word-add').click(function() {
        $(this).addClass('side-active');
        $('#logo-add, #word-index').removeClass('side-active');
        $('#logo-form').hide();
        $('#word-form').show();
    });

    $('#logo-add').click(function() {
        $(this).addClass('side-active');
        $('#word-index, #word-add').removeClass('side-active');
        $('#word-form').hide();
        $('#logo-form').show();
    });
    $('#logo-form').submit(function(event) {
        event.preventDefault();

        const fileInput = $('#logo')[0];
        if (!fileInput || !fileInput.files.length) {
            location.reload();
            return;
        }

        let data = new FormData();
        data.append('file', fileInput.files[0]);

        $.ajax({
            url: '/add_logo',
            type: 'POST',
            data: data,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            success: function(data){
                location.reload();
            },
            error: function(err){
                location.reload();
            }
        });
        
    });
    $('#logo-cancel').click(function() {
        location.reload();
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
                location.reload();
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
                location.reload();
            }
        });
    });
};