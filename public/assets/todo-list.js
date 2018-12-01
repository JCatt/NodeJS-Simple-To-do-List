//When document is loaded, fire function
$(document).ready(function(){

  //When submit for form is clicked
  $('form').on('submit', function(){
      //Create these variables
      var item = $('form input'); //Get value from form input
      var todo = {item: item.val()}; //set item object from value of form

      $.ajax({ 
        type: 'POST', //Type of request
        url: '/todo', //to this route
        data: todo, //Pass data from the todo var, can work with in Controller app.post section
        success: function(data){ //on success of receiving data, run function
          //do something with the data via front-end framework
          location.reload(); //reload page to show new data
        }
      });

      return false;

  });

  $('li').on('click', function(){ //when we click a li tag, fire function
      var item = $(this).text().trim().replace(/ /g, "-"); //replace those li items with -
      $.ajax({ //ajax request
        type: 'DELETE', //delete request
        url: '/todo/' + item, //whatever item within the /todo...
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
