$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var reqId = item.val();
      $.ajax({
        type: 'GET',
        url: '/approve/hotel/' + reqId,
        success: function(data){
          //do something with the data via front-end framework
          window.location.reload(true);
        }
      });

      return false;

  });
});
