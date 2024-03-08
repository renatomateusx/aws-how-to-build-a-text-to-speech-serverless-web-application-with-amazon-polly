var API_ENDPOINT = "https://nq2z15jp1i.execute-api.us-east-1.amazonaws.com/Dev/data"

document.getElementById("sayButton").onclick = function(){

	var inputData = {
		"voice": $('#voiceSelected option:selected').val(),
		"text" : $('#postText').val()
	};

	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) {
					document.getElementById("postIDreturned").textContent="Message : " + response;
					fetching();
	      },
	      error: function () {
	          alert("error");
			  fetching();
	      }
	  });
}

function fetching() { 
	$.ajax({
		url: API_ENDPOINT,
		type: 'GET',
		success: function (response) {

			$('#posts tr').slice(1).remove();

	jQuery.each(response, function(i,data) {

				var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

				if (typeof data['url'] === "undefined") {
				var player = ""
				}

				$("#posts").append("<tr>\
						<td>" + data['selected voice'] + "</td> \
						<td>" + data['input text'] + "</td> \
						<td>" + data['status'] + "</td> \
						<td>" + player + "</td> \
						</tr>");
	});
		},
		error: function () {
				alert("error");
		}
});
}


document.getElementById("searchButton").onclick = function(){

	var postId = $('#postId').val();


	$.ajax({
				url: API_ENDPOINT,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {

						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}

						$("#posts").append("<tr>\
								<td>" + data['selected voice'] + "</td> \
								<td>" + data['input text'] + "</td> \
								<td>" + data['status'] + "</td> \
								<td>" + player + "</td> \
								</tr>");
	        });
				},
				error: function () {
						alert("error");
				}
		});
}

document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}

