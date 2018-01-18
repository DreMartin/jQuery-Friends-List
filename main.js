$(document).ready(function() {

    $.ajax({
        url: 'http://rest.learncode.academy/api/dreMartin/friends',
        type: 'GET'
    }).done( (data) => {
        data.forEach( (eachFriend) => {
            let name = eachFriend.first + " " + eachFriend.last;
            let newElement = createFriend(name);
            $('#friend-list').append(newElement);
        })
    }).fail( () => {
        alert('AJAX call failed, unable to retrieve friends.');
    })



    $('#friend-form').submit( (e) => {
        e.preventDefault();
        let newFriend = $('#input').val();
        
        let first = newFriend.substr(0, newFriend.indexOf(' '));
        let last = newFriend.substr(newFriend.indexOf(' ')+1);
        
        $.ajax({
            url: 'http://rest.learncode.academy/api/dreMartin/friends',
            type: 'POST',
            data: {
                first: first,
                last: last,
                email: `${first}@${last}.com`
            }
        }).done( (data) => {
            console.log(data)
        }).fail( () => {
            alert('AJAX call failed, unable to POST new friend.');
        })
        let newElement = createFriend(newFriend);
        $('#friend-list').append(newElement);
        $('#input').val('');
    } )
    
    $('#friend-list').on('click', 'li', function(e){
        $(this).remove();
    })
    
    
    function createFriend(name) {
        return $(`<li>${name}</li>`).addClass('list-group-item list-group-item-action list-group-item-dark');
    }

});