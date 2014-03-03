var jqteStatus = true;
var bodyContent = '<textarea name="textarea" class="jqte-test"></textarea>';

$( document ).ready(function() {
  	$('.jqte-test').jqte();
  	$(".status").click(function()
		{
			jqteStatus = jqteStatus ? false : true;
			$('.jqte-test').jqte({"status" : jqteStatus})
		}
	);

	$("#updateBtn").click(function()
		{
			var content = '';
			for (var i = 0; i < $('#paraNum').val(); i++) {
				content += bodyContent;
			};
			$('#content-box').html(content);
			$(".jqte-test").jqte();
		}
	);
});