// Set the date we're counting down to
        var countDownDate = new Date("Jul 10, 2024 17:00:00").getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="countdown"
            document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

            // If the count down is over, write some text and add fade-out animation
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "The maintenance is over!";
                document.getElementById("countdown").classList.add("fade-out");
                var contactButton = document.getElementById("contactButton");
                contactButton.style.display = "inline-block";
                contactButton.classList.add("slideIn");
            }
        }, 1000);
