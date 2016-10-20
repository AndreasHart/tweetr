

let count = $('.counter');
let typing = $('textarea');
let i = 0;
let length

console.log(count.html());

count.on('click', function(ev) {
  ev.stopPropagation();

});

typing.on('keyup', function(ev) {
  $(this).siblings('span').html(140 - Number($(this).val().length));
  if($(this).siblings('span').html() < 0){
    $(this).siblings('span').css("color" , "red");
  };
});


