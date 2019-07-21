$(".new-ingredient").on("click", function(e){
  e.preventDefault();

  var newInput = document.createElement("input"); 
  newInput.type="text";
  newInput.classList.add("ingredient");
  var counter = $(".ingredient").length;
  newInput.name=`ingredient${counter+1}`;

  $(".ingredients").append(newInput);  
})