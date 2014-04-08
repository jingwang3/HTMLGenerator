var jqteStatus = true;
var paraHeading = '<input type="text" class="heading-text" value="Paragraph Heading">';
var bodyContent = '<textarea name="textarea" class="jqte-test"></textarea>';

$( document ).ready(function() {
	$('.output .jqte-test').jqte();
	disableContentEdit();
	//toggle html and editor
  	$(".status").click(function()
		{
			if(jqteStatus){
				jqteStatus = false;
				$('#content-box .jqte-test').jqte({"status" : false});
				$('.status').text('Edit');
			}else{
				jqteStatus = true;
				$('#content-box .jqte-test').jqte({"status" : true});
				$('.status').text('View HTML');
			}
			//disable edit for output textarea
			disableContentEdit();
		}
	);
  	//generate paragraph containers
	$("#updateBtn").click(function()
		{
			var r=confirm("Are you sure?! Reset will erase all your existing content");
			if (r==true)
			{
			  if($('#paraNum').val() >0 && $('#paraNum').val()<=15){
					var content = '';
					for (var i = 0; i < $('#paraNum').val(); i++) {
						content += "<div class='para-section'><h2>Paragraph " + (i+1) + "</h2>" + paraHeading + bodyContent + "</div>";
					};
					$('#content-box').html(content);
					$("#content-box .jqte-test").jqte();
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
			  //do nothing
			}
		}
	);
	//import html
	$("#importBtn").click(function()
		{

			var paraNumber = $('#import-content-box').find('.para-box').length;
			if(paraNumber >0 && paraNumber<=15){
				var content = '';
				for (var i = 0; i < paraNumber; i++) {
					content += "<div class='para-section'><h2>Paragraph " + (i+1) + "</h2>" + paraHeading + bodyContent + "</div>"
				};
				$('#pubDate').val($('.publication-date').text());
				$('#content-box').html(content);
				$("#content-box .jqte-test").jqte();
				for (var i = 0; i < paraNumber; i++) {
					$($('.heading-text').get(i)).val($($('.para-title').get(i)).text())
				};
					
				$(".para-section").each(function(){
					$(this).find('.jqte_editor').html($($('.para-content').get($(this).index())).html());
				})
				jqteStatus = true;
				//disable edit for output textarea
				disableContentEdit();
			}
			
		}
	);
	//Read file from local drive
  	$('#files').on( "change", handleFileSelect);
	//document.getElementById('files').addEventListener('change', handleFileSelect, false);
	//generate html
	$("#export").click(function()
		{
			$('.output .jqte-test').jqte();

			var content = '';
			if($('#pubDate').val().length != 0){
				content = '<div class="date-box"><span class="publication-date">' + $('#pubDate').val() + '</span></div><hr>';
			}
			content += '<div class="quick-links"><span>In This Issue</span><ul>';
			$(".para-section").each(function() {

				content += ('<li class="quick-link-item" id="quickLink' + $(this).index() + '"><a href="#link-' + $(this).index() + '">' + $(this).find('.heading-text').val() + '</a></li>');
    			
			})
			content += '</ul></div><hr>';
			$(".para-section").each(function() {
				if(($(".para-section").length - $(this).index()) > 1){
					content += ('<div class="para-box" id="paraNum' + $(this).index() + '"><h1 class="para-title"><a href="#" name="link-' + $(this).index() + '"></a>' + $(this).find('.heading-text').val() + '</h1><div class="para-content">' + $(this).find('.jqte-test').text() + '</div></div><br><hr>');
    			}else{
    				content += ('<div class="para-box" id="paraNum' + $(this).index() + '"><h1 class="para-title"><a href="#" name="link-' + $(this).index() + '"></a>' + $(this).find('.heading-text').val() + '</h1><div class="para-content">' + $(this).find('.jqte-test').text() + '</div></div>');
    			}
			})
			$('.html-code').text(content);
			//disable edit for output textarea
			$('.output .jqte-test').jqte();
			disableContentEdit();
		}
	);
	$('#download').click(function(e)
		{
			var dNow = new Date();
			var utcdate = 'newsletter_'+(dNow.getMonth()+ 1) + '_' + dNow.getDate() + '_' + dNow.getFullYear() + '.html';
			
			$.generateFile({
				filename	: utcdate,
				content		: $('#final-output').val(),
				script		: 'download.php'
			});
			
			e.preventDefault();
		}
	);
	$('#addPara').click(function()
		{
			var paraNum = $("#content-box .para-section").length;
			$('#content-box').append("<div class='para-section'><h2>Paragraph " + (paraNum+1) + "</h2>" + paraHeading + bodyContent + "</div>");
			$('#paraNum').val(paraNum + 1);
			if(jqteStatus){
				$("#content-box .jqte-test").last().jqte()
				$("#content-box .para-section").last().find('.jqte_editor').html("<p>Please enter the content for this paragraph...</p>");
			}else{
				$("#content-box .jqte-test").last().html("<p>Please enter the content for this paragraph...</p>");
			}
		}
	);
	$('#removePara').click(function()
		{
			if($("#content-box .para-section").length > 0){
				$("#content-box .para-section").last().remove();
				$('#paraNum').val($("#content-box .para-section").length);
			}else{
				alert('No more paragraph can be removed!');
			}
		}
	);
});


function disableContentEdit() {
	$('.output').find('.jqte_toolbar').hide();
	$('.output').find('.jqte_editor').attr("contenteditable","false");
	$('.html-code').attr("disabled", "disabled");
}

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object
	// Loop through the FileList and render image files as thumbnails.
	for (var i = 0, f; f = files[i]; i++) {
	// Only process image files.
		if (!f.type.match('text/html') && !f.type.match('text/plain')) {
			continue;
		}

		var reader = new FileReader();
		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				// Render thumbnail.
				$('#import-content-box').html(e.target.result);
				if($('#import-content-box').find('.para-box').length <= 0){
					$('#import-content-box').html('');
				}          
			};
		})(f);

		// Read in the image file as a data URL.
		reader.readAsText(f);

	}
}
