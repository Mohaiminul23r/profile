 var isSendable = 0;
 var isNameValid = 0;
 var isEmailValid = 0;
 var isEmailSubjectValid = 0;
 var isMessageValid = 0;
$(document).ready(function(){

	 window.scrollTo(0,0);
	 $('#message').summernote({
	 	placeholder: 'Type your message...',
        tabsize: 2,
        height: 100
	 });

	 //sending message email
	$('#sendMsgBtn').click(function(){
		validateMessageForm();
      	if(isNameValid == 1 && isEmailValid == 1 && isEmailSubjectValid == 1 && isMessageValid == 1){
        	isSendable = 1;
     	 }else{
        	isSendable = 0;
      	}
		if(isSendable == 1){
			let valid_name = $('#name').val();
			let valid_email = $('#email_address').val();
			let valid_email_subj = $('#email_subj').val();
		  	let valid_message = $('#message').summernote('code');
			let message = "Successfully send the Message.";
			$.confirm({
			    title: 'Confirm !!',
			    content: 'Your message will directly come to my email..',
			    type: 'green',
			    typeAnimated: true,
			    buttons: {
			        tryAgain: {
			            text: 'Send',
			            btnClass: 'btn-green',
			            action: function(){
			            	Email.send({
			            		//SecureToken : "3e663791-178f-4279-a765-d60f81eeb79d",
			            		Host : "smtp.gmail.com",
							    Username : "mohaiminul.dev@gmail.com",
							    Password : "15103171@email",
							    To : 'mohaiminul23r@gmail.com',
							    From : valid_email,
							    Subject : valid_email_subj,
							    Body : 'A message from <strong>'+valid_name+'</strong><br>'+ valid_message
							}).then(function(response){
								if(response == 'OK'){
									//alert("Message sent successfully.");
									toastr.success('Message sent successfully.');
									resetForm();
								}else{
									console.log(response);
								}
							});
			            }
			        },
			        close: function () {
			        	resetForm();
			        }
			    }
			});
		}else{
			//resetForm();
			toastr.warning('Please, Fill Up The Form !!');

		}
	});
  	
	$('#resetBtn').click(function(){
  		resetForm();
  	});

	 window.scrollTo(0,0);		

});


//sidebar scrolling funciton
function goTo(divid, classOne, classTwo){
	let d_id = divid;
	let class_1 = classOne;
	let class_2 = classTwo;
	let elem = $(document).find("#"+d_id+"");
	$(document).find("#"+class_1+"").addClass('show');
	$(document).find("#"+class_2+"").removeClass('show');
	$('html, body').animate({
        scrollTop: elem.offset().top
    }, 500);
}


function validateMessageForm(){
	removeValidationMsg();
	//getting value from the input field
	let name = $('#name').val();
	let email = $('#email_address').val();
	let email_subj = $('#email_subj').val();
	let message = $('#message').summernote('code');

	//validating the input fields
	if(name == ''){
    	$('#name-validation').removeClass('d-none').text('Name is required !');
   		isNameValid = 0;
    }else if((name.length)<=2){
    	$(document).find('#name-validation').removeClass('d-none').text('Name should be of at least 3 characters !');
    	isNameValid = 0;
  	}else{
    	$(document).find('#name-validation').addClass('d-none');
    	isNameValid = 1;
    }


    if(IsEmail(email)==false){
      $('#email-validation').removeClass('d-none');
      isEmailValid = 0;
    }else{
      $(document).find('#email-validation').addClass('d-none');
      isEmailValid = 1;
    }

    if(email_subj == ''){
    	$('#subject-validation').removeClass('d-none');
    	isEmailSubjectValid = 0;
    }else{
    	$(document).find('#subject-validation').addClass('d-none');
    	isEmailSubjectValid = 1;
    }

    if(message == ''){
    	$(document).find('#message-validation').removeClass('d-none');
    	isMessageValid = 0;
    }else{
    	$(document).find('#message-validation').addClass('d-none');
    	isMessageValid = 1;
    }
}

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(email)) {
    return false;
  }else{
    return true;
  }
}

function removeValidationMsg(){
	$(document).find('#name-validation').addClass('d-none');
	$(document).find('#email-validation').addClass('d-none');
	$(document).find('#subject-validation').addClass('d-none');
	$(document).find('#message-validation').addClass('d-none');
}

function resetForm(){
	removeValidationMsg();
  	$(document).find('#contact-form').trigger("reset");
  	$('#message').summernote('reset');
}

