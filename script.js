function maind() {
    startdate = new Date()
    now(startdate.getYear(), startdate.getMonth(), startdate.getDate(), startdate.getHours(), startdate.getMinutes(), startdate.getSeconds())
}


function ChangeValue(number, pv) {
    numberstring = ""
    var j = 0
    var i = 0
    while (number > 1) {

        numberstring = (Math.round(number - 0.5) % 10) + numberstring
        number = number / 10
        j++
        if (number > 1 && j == 3) {
            numberstring = "," + numberstring
            j = 0
        }
        i++
    }

    numberstring = numberstring

    if (pv == 1) { document.getElementById("worldpop").innerHTML = numberstring }
}


function now(year, month, date, hours, minutes, seconds) {
    startdatum = new Date(year, month, date, hours, minutes, seconds)

    var now = 5600000000.0
    var now2 = 5690000000.0
    var groeipercentage = (now2 - now) / now * 100
    var groeiperseconde = (now * (groeipercentage / 100)) / 365.0 / 24.0 / 60.0 / 60.0
    nu = new Date()
    schuldstartdatum = new Date(96, 1, 1)
    secondenoppagina = (nu.getTime() - startdatum.getTime()) / 1000
    totaleschuld = (nu.getTime() - schuldstartdatum.getTime()) / 1000 * groeiperseconde + now
    ChangeValue(totaleschuld, 1);


    timerID = setTimeout("now(startdatum.getYear(),startdatum.getMonth(),startdatum.getDate(),startdatum.getHours(),startdatum.getMinutes(),startdatum.getSeconds())", 200)
}

window.onload = maind



function showResult() {
    let year = document.querySelector('#year').value;
    let country = document.querySelector('#country').value;
    let age = document.querySelector('#age').value;
    $.ajax({
        url: `https://api.population.io:80/1.0/population/${year}/${country}/${age}/`,
        dataType: "json",

        success: function (data) {
            // document.querySelector('main').innerHTML;
            console.log(data);
            let femaleRatio = data[0].females;
            let maleRatio = data[0].males;
            let totalpopul = data[0].total;

            var ctx = document.getElementById("myChart").getContext('2d');
            // for (let i = 0; i < data.length; i++) {
        

            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [`Female`, `Male`, `Total`],
                    datasets: [{
                        label: `Current Population`,
                        data: [femaleRatio, maleRatio, totalpopul],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }

            });
            contactForm.addAjaxMessage($.parseJSON(response.responseText).message, true);
            // }
        },
        error: function (error) {
            alert(error.responseJSON.message);
        }
    })
}