$(document).ready(function () {
    $('main.container').toggle();
    $.ajax({
        url: "http://localhost:1234/isloggedin/recruiter",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function (res) {
            $('main.container').toggle();
        },
        error: function (err) {
            $('#log').text('Log in');
            $('main.container').empty().append("<h2>Please log in as a Recruiter first.</h2>").toggle();

        }
    });

    $(".nav-link").on("click", function(){
        $(".nav-link.active").removeClass("active");
        $(this).addClass("active");
    });
});

function postVacancy() {
    var pname = $('#pname').val(), dur = $('#dur').val();
    var spec = $('#spec').val(), ddl = $('#ddl').val(), slots = $('#slots').val();
    if(pname == '' || dur == '' || spec == '' || ddl == '')
        return alert('Please enter all required fields.');

    var data = {pname: pname, dur:dur, spec:spec, ddl:ddl, slots:parseInt(slots)};
        $.ajax({
            url: "http://localhost:1234/recruiter/postVacancy",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            type: "POST",
            success: function () {
                alert("Successfully posted vacancy for a program!");
            },
            error: function (err) {
                console.log(err);
                alert(err.responseText);
            }
        });
}
