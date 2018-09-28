function refreshCM()
{
	htmlCodeMirror.refresh();
	cssCodeMirror.refresh();
	jsCodeMirror.refresh();
}

function saveCM()
{
	htmlCodeMirror.save();
	cssCodeMirror.save();
	jsCodeMirror.save();
}

function runCode()
{
	var setTo =
	'<style type="text/css">' +
	$("#cssCode").val() +
	'</style>' +
	$("#htmlCode").val();
	
	$("iframe").contents().find("html").html(setTo);
	document.getElementById("resultFrame").contentWindow.eval($("#jsCode").val());
}

function getAmountOfShowingDivs()
{
	var showingDivs = $(".codeContainer").filter(function()
	{
		return ($(this).css("display") != "none");
	}).length;
	
	return showingDivs;
}

function updateContainerWidths(showingDivs)
{
	var width = 12 / showingDivs;
	var c = "col-md-" +width;
	
	$(".codeContainer").attr('class', c);
	$("." +c).addClass("codeContainer");
}

var windowHeight = $(window).height();
var menuBarHeight = $(".navbar").height();
var codeContainerHeight = windowHeight - menuBarHeight - 45;
var fadeTime = 500;

$(".panel").height(codeContainerHeight + "px");
$(".panel-body").css("height", codeContainerHeight - 41);

swal({
	title: "Welcome to Code Player!",
	text: "Test your HTML, CSS, and JavaScript\ncode directly in your browser!",
	button: "Let's Go!",
	closeModal: true
});

// ...
jQuery.get('https://mycxle.github.io/Code-Player/txt/exampleHTML.txt', function(data)
{
	document.getElementById("htmlCode").innerHTML = data;
	
	jQuery.get('https://mycxle.github.io/Code-Player/txt/exampleCSS.txt', function(data)
	{
		document.getElementById("cssCode").innerHTML = data;
		
		jQuery.get('https://mycxle.github.io/Code-Player/txt/exampleJS.txt', function(data)
		{
			document.getElementById("jsCode").innerHTML = data;
			
			htmlCodeMirror = CodeMirror.fromTextArea(document.getElementById("htmlCode"),
			{
				lineNumbers: true,
				mode: "text/html",
				matchBrackets: true
			});

			cssCodeMirror = CodeMirror.fromTextArea(document.getElementById("cssCode"),
			{
				lineNumbers: true,
				mode: "text/css",
				matchBrackets: true
			});

			jsCodeMirror = CodeMirror.fromTextArea(document.getElementById("jsCode"),
			{
				lineNumbers: true,
				mode: "text/javascript",
				matchBrackets: true
			});
			
			saveCM();
			runCode();
			
			if($("#htmlCode").html().length > 0)$("#HTMLtoggle").addClass("active");
			if($("#cssCode").html().length > 0)$("#CSStoggle").addClass("active");
			if($("#jsCode").html().length > 0)$("#JStoggle").addClass("active");
			$("#ResultToggle").addClass("active");
			
			updateContainerWidths($(".active").length);
			
			if($("#HTMLtoggle").hasClass("active"))$("#HTMLContainer").fadeIn(fadeTime);
			if($("#CSStoggle").hasClass("active"))$("#CSSContainer").fadeIn(fadeTime);
			if($("#JStoggle").hasClass("active"))$("#JavaScriptContainer").fadeIn(fadeTime);
			$("#ResultContainer").fadeIn(fadeTime);
			
			refreshCM();
		});
	});
});

$(".toggle").click(function()
{
	$(this).toggleClass("active");
	var activeDiv = $(this).find("a").html();
	var fullName = "#" + activeDiv + "Container";
	
	var showingDivs = getAmountOfShowingDivs();
	
	if($(fullName).css("display") == "none")
	{
		$(fullName).fadeIn(fadeTime);
		showingDivs++;
	}
	else
	{
		$(fullName).fadeOut(fadeTime, function()
		{
			updateContainerWidths(getAmountOfShowingDivs());
			refreshCM();
		});
	}
	
	updateContainerWidths(showingDivs);
	refreshCM();
});

$("#runButton").click(function()
{
	saveCM();
	runCode();
});

$("#resetButton").click(function()
{
	swal({
		title: "Are you sure?",
		text: "You won't be able to recover your code!",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
	.then((willDelete) => {
	  	if (willDelete) {
			swal({
				title: "Code Player Reset!",
				text: "Your code has been destroyed!",
				type: "success",
				confirmButtonText: "Wow! Thanks!",
			});
			
			saveCM();
			
			$("#cssCode").val("");
			$("#htmlCode").val("");
			$("#jsCode").val("");
		
			htmlCodeMirror.setValue("");
			cssCodeMirror.setValue("");
			jsCodeMirror.setValue("");
			
			$("iframe").contents().find("html").html("");
		}
	});
});