$(function(){
    $("#appointmentForm").on("submit",function(e){
        e.preventDefault();
        let type = $(this).attr("data-type");
        let config = {
            button : "bookAppointment",
            message : "Appointment",
            response : "Trial Booked!"
        }
        if(type == 'contact'){
            config.button = "submitMessage";
            config.message = "Send Message";
            config.response = "Your query has been submitted, We'll contact you soon!";
        }

        $(`#${config.button}`).val("Submitting..").attr("disabled",true);
        let data = {};
        data = $(this).serializeArray().reduce(function(obj, item) {
            obj[item.name] = $.trim(item.value);
            return obj;
        }, {});

        console.log(data,config,type);
        let url = $(this).attr("action");
        $.ajax({
            type : "POST",
            url : url,
            headers: {
                "Accept" : "application/json"
            },
            data: data,
            success: function(response){
                $("#appointmentResponse").html(config.response).addClass("animated fadeIn").removeClass("d-none");
            },
            error : function (xhr, ajaxOptions, thrownError){
                alert("Some error occurred, Please try again later!");
            },
            complete: function(){
                $(`#${config.button}`).val(config.message).attr("disabled",false);
                $("##appointmentForm").trigger('reset');
            }
        })
    })
})