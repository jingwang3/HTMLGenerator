var jqteStatus = true;
var bodyContent = '<textarea name="textarea" class="jqte-test"></textarea>';

$( document ).ready(function() {
	//toggle html and editor
  	$(".status").click(function()
		{
			if(jqteStatus){
				jqteStatus = false;
				$('.jqte-test').jqte({"status" : false});
			}else{
				jqteStatus = true;
				$('.jqte-test').jqte({"status" : true});
			}
			
		}
	);
  	//generate paragraph containers
	$("#updateBtn").click(function()
		{
			if($('#paraNum').val() >0 && $('#paraNum').val()<=15){
				var content = '';
				for (var i = 0; i < $('#paraNum').val(); i++) {
					content += "<h2>Paragraph " + (i+1) + "</h2>" + bodyContent;
				};
				$('#content-box').html(content);
				$(".jqte-test").jqte();
				jqteStatus = true;
			}
		}
	);
	//generate html
	$("#export").click(function()
		{
			var content = "";
			if(jqteStatus){
				$('.jqte-test').jqte({"status" : false});
				jqteStatus = false;
			}
			$(".jqte-test").each(function() {
				content += ('<div>' + $(this).text() + '</div><br><hr>');
    			$('.html-code').text(content);
			})
		}
	);
});