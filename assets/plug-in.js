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
			var r=confirm("Are you sure?! Reset will erase all your existing content");
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
	//import html
	$("#importBtn").click(function()
		{

			var paraNumber = $('#import-content-box').find('.para-box').length;
			if(paraNumber >0 && paraNumber<=15){
					var content = '';
					for (var i = 0; i < paraNumber; i++) {
						content += "<div class='para-section'><h2>Paragraph " + (i+1) + "</h2>" + paraHeading + bodyContent + "</div>"
					};
					$('#content-box').html(content);
					$(".jqte-test").jqte();
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
	function handleFileSelect(evt) {
	    var files = evt.target.files; // FileList object

	    // Loop through the FileList and render image files as thumbnails.
	    for (var i = 0, f; f = files[i]; i++) {

	      // Only process image files.
	      if (!f.type.match('text/html') && !f.type.match('text/plain')) {
        		//console.log('this happened');
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
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
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
				content += ('<div class="para-box" id="paraNum' + $(this).index() + '"><h1 class="para-title"><a href="#" name="link-' + $(this).index() + '"></a>' + $(this).find('.heading-text').val() + '</h1><div class="para-content">' + $(this).find('.jqte-test').text() + '</div></div><br><hr>');
    			
			})
			$('.html-code').text(content);
			//disable edit for output textarea
			disableContentEdit();
		}
	);
	$('#download').click(function(e){

		var dNow = new Date();
		var utcdate = 'newsletter_'+(dNow.getMonth()+ 1) + '_' + dNow.getDate() + '_' + dNow.getFullYear() + '.html';
		
		$.generateFile({
			filename	: utcdate,
			content		: $('#final-output').val(),
			script		: 'download.php'
		});
		
		e.preventDefault();
	});
});


function disableContentEdit() {
	$('.output').find('.jqte_toolbar').hide();
	$('.output').find('.jqte_editor').attr("contenteditable","false");
	$('.html-code').attr("disabled", "disabled");
}