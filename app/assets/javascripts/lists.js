$(function(){
	var addItem = function (data, callbacks) {
		var $listForm = $(".list form");
		$.ajax({
			url: $listForm.attr('action'),
			type: $listForm.attr('method'),
			dataType: "json",
			data: data,
			success: function (response) {
				console.log(response);
			}
		});
	}


	$(".add-ingredient").on("click", function(event) {
		event.preventDefault();
		var inputData,
				_this = this,
				ingredientIndex = $(this).data().index,
				$parent = $(this).parent(),
				success = function(){
					$(".list").find(".empty").remove()
					$parent.fadeOut("fast", function(){
						$(".list").append(_this);
						$(_this).fadeIn('fast');
					});
				}
		inputData = {item: {quantity: $parent.find(".amount").val(), content: $parent.find(".ingredient").val(), measurement: $parent.find(".unit").val()}}
		addItem(inputData, {success: success});



		$(this).off("click");
	});
});



