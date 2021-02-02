(function($){
  $(function(){
    $('.sidenav').sidenav();
    $('#verse').html(localStorage.getItem('data'));
 
    const regex = /\b(\w+)\s*$/;
    //my code
    $('#verse').keydown(function(evt){
      if (evt.ctrlKey && evt.keyCode == 32) {
        let v = $('#verse');
        let lastword = v.last().text().match(regex)[0];
        dispR(lastword);
        localStorage.setItem('data',JSON.stringify(v.html()));
      }
    });

    function dispR(word){
      $.ajax({
        method: "GET",
        url: "https://api.datamuse.com/words?rel_rhy="+word
      })
        .done(function( rwords ) {
          $('#dict').empty();
          for (let i=0;i<rwords.length;i++){
            $('#dict').append(`<div class='rword'>${rwords[i].word}</div>`);
          }
        });
    }

  }); // end of document ready
})(jQuery); // end of jQuery name space
