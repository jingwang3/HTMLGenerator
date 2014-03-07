var jqteStatus = true;
var paraHeading = '<input type="text" class="heading-text" value="Paragraph Heading">';
var bodyContent = '<textarea name="textarea" class="jqte-test"></textarea>';

$( document ).ready(function() {
	//toggle html and editor
  	$(".status").click(function()
		{
			if(jqteStatus){
				jqteStatus = false;
				$('.jqte-test').jqte({"status" : false});
				$('.status').text('Edit');
			}else{
				jqteStatus = true;
				$('.jqte-test').jqte({"status" : true});
				$('.status').text('View HTML');
			}
			//disable edit for output textarea
			disableContentEdit();
		}
	);
  	//generate paragraph containers
	$("#updateBtn").click(function()
		{
			var r=confirm("Are you sure?! Regenerate fields will lose your work.");
			if (r==true)
			{
			  if($('#paraNum').val() >0 && $('#paraNum').val()<=15){
					var content = '';
					for (var i = 0; i < $('#paraNum').val(); i++) {
						content += "<div class='para-section'><h2>Paragraph " + (i+1) + "</h2>" + paraHeading + bodyContent + "</div>"
					};
					$('#content-box').html(content);
					$(".jqte-test").jqte();
					$(".para-section").each(function(){
						$(this).find('.jqte_editor').html("<p>Please enter the content for this paragraph...</p>");
					})
					jqteStatus = true;
					//disable edit for output textarea
					disableContentEdit();
				}
			}
			else
			{
			  
			}
			
			
		}
	);
	//generate html
	$("#export").click(function()
		{
			var content = '';
			if($('#pubDate').val().length != 0){
				content = '<div class="date-box"><span class="publication-date">' + $('#pubDate').val() + '</span></div><hr>';
			}
			if(jqteStatus){
				$('.jqte-test').jqte({"status" : false});
				jqteStatus = false;
				$('.status').text('Edit');
			}
			$(".para-section").each(function() {
				content += ('<div class="para-box"><h1><a href="#" name="link-' + $(this).find('.heading-text').index() + '"></a>' + $(this).find('.heading-text').val() + '</h1>' + $(this).find('.jqte-test').text() + '</div><br><hr>');
    			
			})
			$('.html-code').text(content);
			//disable edit for output textarea
			disableContentEdit();
		}
	);
});


function disableContentEdit() {
	$('.output').find('.jqte_toolbar').hide();
	$('.output').find('.jqte_editor').attr("contenteditable","false");
	$('.html-code').attr("disabled", "disabled");
}