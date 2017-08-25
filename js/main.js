(function () {
    console.log("Up and Running!");
    var obstacleCountTop = 1;
    var obstacleCountBottom = 0;
    var level = 2;
    var carSpeed = 6000 - level * 1000; //1000 = 1sec
    var countDown = 3;
    var lives = 3;
    var score = 0;
    var gameOver = true;
    var win = false;
    var reset = false;

    // resets all variables and game board to their initial state
    $(".reset").on('click', function () {
        obstacleCountTop = 1;
        obstacleCountBottom = 0;
        level = 1;
        carSpeed = 6000 - level * 1000; //1000 = 1sec
        countDown = 3;
        lives = 3;
        score = 0;
        gameOver = true;
        win = false;
        reset = true;

        $('.score').text(`SCORE: ${score}`);
        $('.countdown').hide();
        endGame();
        $(".start").show();
        console.log("reset clicked");
    });
    // starts the game and collision detection
    $(".start").on('click', function () {
        console.log("start clicked");
        $(".start").hide();
        startGame();
    });
    //starts the game with appended images and collision control
    function startGame(params) {
        document.getElementById('gamePlay').play();

        $('#obstacle1').show();
        
        if (level === 3) {
        $('#gamePlay').attr('src','audio/adrenaline.m4a');    
        document.getElementById('gamePlay').play();      
        $('#gamePlay').prop("volume", 0.7);  
        document.getElementById('gamePlay').loop = true;
        }else if(level === 1){
            $('#gamePlay').attr('src','audio/gamePlay.mp3');    
            document.getElementById('gamePlay').play();  
            $('#gamePlay').prop("volume", 0.7);
        document.getElementById('gamePlay').loop = true;
        }
        $('.level').text(`LEVEL: ${level}`)//update level being displayed to user
        countDown = 3;
        gameOver = false;
        reset = false;
        startCollision();
        setTimeout(function () {
            if (reset === false) {
                $('.obstacleWrapper').append(`<img class="obstacle2" id = "obstacle4"src="media/carObstacle4.png" alt="car">`);
                nextBottomObstacle(4);
            }
        }, carSpeed / 2);
        $(".obstacle").animate({
            right: "+=110vw",

        }, carSpeed, 'linear', function () {
            $('.obstacleWrapper').append(`<img class="obstacle" id = "obstacle2"src="media/carObstacle2.png" alt="car">`);
            nextTopObstacle(2);
        });

        console.log('obstacle right: ', $(".obstacle").css('right'));
    }
    // continually generates and cycles through obstacles in the top lane efficiently without garbage collection
    function nextBottomObstacle(obstacleId) {
        console.log('obstacle count bottom: ', obstacleCountBottom);
        obstacleCountBottom++;
        $(`#obstacle${obstacleId}`).css('right', '0vw');

        $(`#obstacle${obstacleId}`).animate({
            right: "+=110vw",
            //height: "toggle"
        }, carSpeed, 'linear', function () {
            if (obstacleId < 6) { //will be 6
                obstacleId++;
            } else {
                obstacleId = 4;
            }
            if (obstacleCountBottom < 3) {
                $(".obstacleWrapper").append(`<img class="obstacle2" id = "obstacle${obstacleId}"src="media/carObstacle${obstacleId}.png" alt="car">`);
            }
            nextBottomObstacle(obstacleId);
        });
    }
    // continually generates and cycles through obstacles in the bottom lane efficiently without garbage collection
    function nextTopObstacle(obstacleId) {
        console.log('obstacle count top: ', obstacleCountTop);
        obstacleCountTop++;
        $(`#obstacle${obstacleId}`).css('right', '0vw');

        $(`#obstacle${obstacleId}`).animate({
            right: "+=110vw",
            //height: "toggle"
        }, carSpeed, 'linear', function () {
            if (obstacleId < 3) {
                obstacleId++;
            } else {
                obstacleId = 1;

            }
            if (obstacleCountTop < 3) {
                $(".obstacleWrapper").append(`<img class="obstacle" id = "obstacle${obstacleId}"src="media/carObstacle${obstacleId}.png" alt="car">`);
            }
            nextTopObstacle(obstacleId);
        });
    }
    // this function does all the collision detection for each obstacle
    function startCollision() {

        collisionChecker = setInterval(function () {
            console.log("timimg function working");
            console.log('Top obstacle count', obstacleCountTop);
            console.log('Bottom obstacle count', obstacleCountBottom);
            console.log("obstacle 1 class is:", $('#obstacle1').hasClass('obstacle'));
            console.log('user right:', parseInt($("#userCar").css('right')));
            console.log('user top:', parseInt($("#userCar").css('top')));
            console.log('obstacle right:', parseInt($(".obstacle").css('right')));
            var obstacle1Right = parseInt($("#obstacle1").css('right'));
            var userLocationRight = parseInt($("#userCar").css('right'));
            var userLocationTop = parseInt($("#userCar").css('top'));
            addScore();

            if ((obstacle1Right >= userLocationRight - 150) && (obstacle1Right <= userLocationRight + 150) && userLocationTop < 480 && $('#obstacle1').hasClass('obstacle') === true) { //Collision check for top lane
                console.log("car hit Obstacle 1 in top lane!!");
                document.getElementById('crash').play();
                document.getElementById('horn').play();
                endGame(false);
            }

            if ($('#obstacle2') !== null) { //Collision check for top lane
                var obstacle2Right = parseInt($("#obstacle2").css('right'));

                if ((obstacle2Right >= userLocationRight - 150) && (obstacle2Right <= userLocationRight + 150) && userLocationTop < 480 && $('#obstacle2').hasClass('obstacle') === true) {
                    console.log("car hit Obstacle 2 in top lane!!");
                    document.getElementById('policeSiren').play();
                    document.getElementById('crash').play();
                    $('#policeSiren').prop("volume", 0.8);
                    endGame(false);
                }
            }

            if ($('#obstacle3') !== null) { //Collision check for top lane
                var obstacle3Right = parseInt($("#obstacle3").css('right'));

                if ((obstacle3Right >= userLocationRight - 150) && (obstacle3Right <= userLocationRight + 150) && userLocationTop < 480 && $('#obstacle3').hasClass('obstacle') === true) {
                    console.log("car hit Obstacle 3 in top lane!!");
                    document.getElementById('crash').play();
                    document.getElementById('horn').play();
                    endGame(false);
                }
            }

            if ($('#obstacle4') !== null) { //Collision check for bottom lane
                var obstacle4Right = parseInt($("#obstacle4").css('right'));

                if ((obstacle4Right >= userLocationRight - 100) && (obstacle4Right <= userLocationRight + 150) && userLocationTop >= 440 && $('#obstacle4').hasClass('obstacle') === false) {
                    document.getElementById('crash').play();
                    document.getElementById('horn').play();
                    console.log("car hit Obstacle 4 in bottom lane!!");
                    endGame(false);
                }
            }
            if ($('#obstacle5') !== null) { //Collision check for bottom lane
                var obstacle5Right = parseInt($("#obstacle5").css('right'));

                if ((obstacle5Right >= userLocationRight - 150) && (obstacle5Right <= userLocationRight + 150) && userLocationTop >= 440 && $('#obstacle4').hasClass('obstacle') === false) {
                    document.getElementById('crash').play();
                    document.getElementById('horn').play();
                    console.log("car hit Obstacle 5 in bottom lane!!");
                    endGame(false);
                }
            }
            if ($('#obstacle6') !== null) { //Collision check for bottom lane
                var obstacle6Right = parseInt($("#obstacle6").css('right'));

                if ((obstacle6Right >= userLocationRight - 100) && (obstacle6Right <= userLocationRight + 150) && userLocationTop >= 440 && $('#obstacle6').hasClass('obstacle') === false) {
                    document.getElementById('chicken').play();
                    document.getElementById('crash').play();
                    document.getElementById('horn').play();
                    console.log("car hit Obstacle 6 in bottom lane!!");
                    endGame(false);
                }
            }
        }, 300);
    }
    // this function adds to the score based on the level you're on and lives you have
    function addScore(params) {
        $('.score').text(`SCORE: ${score}`);
        score += (level + lives);
    }
    //after each round this function counts down till and initiates the clearing of the game field
    function resetGame(params) {
        console.log("time to reset the playing field");

        var countDownInterval = setInterval(function (params) {
            if (countDown === 0) {
                document.getElementById(`go`).play();
                
                $('.countdown').css('margin-left', '47vw');
                $('.countdown').text('GO!').css('color', 'green').fadeOut('slow');
                
                resetField();
                clearInterval(countDownInterval);
            } else {
                document.getElementById(`countdown${countDown}`).play();
                $('.countdown').css('margin-left', '48vw');                 
                $('.countdown').show();
                $('.countdown').text(`${countDown}`);
                countDown--;
            }
        }, 1000);

    }
    //reset playing field to original state then start the game
    function resetField(params) {
        $('#userCar').css('top', '400px');
        $('#userCar').css('left', '0px');
        $('.obstacleWrapper').empty();
        $('.obstacleWrapper').append(`<img class="obstacle" id="obstacle1" src="media/carObstacle1.png" alt="car">`);
        obstacleCountTop = 1;
        obstacleCountBottom = 0;
        if (reset === false) {
            startGame();
        }
    }
    // every time a life is lost the game is reset until all lives are lost
    function endGame(win) {
        if (win === false) {
            lives--;
        }
        gameOver = true;
        $(".obstacle").stop(); //first stop all animations
        $(".obstacle2").stop();
        clearInterval(collisionChecker); //to stop the checker once a collision happens
        $('.lives').text(`LIVES:  ${lives}`);
        if (reset === false) {
            if (lives > 0) {
                console.log('you have ', lives, 'lives');
                resetGame();
            } else {    
                 document.getElementById('gamePlay').pause();  
                  document.getElementById('gameLost').play();
                  $('#gameLost').prop("volume", 1.0);
                $('.countdown').css('margin-left', '39vw');
                $('.countdown').text(`GAME OVER`).css('color', 'red').fadeIn('slow');
            }
        } else {
            resetField();
        }

    }
    // Arrow key controls
    document.body.onkeydown = function () {
        var e = event.keyCode;
        var offset = 40;

        if (gameOver === false) {
            document.getElementById('engine').play();
            $('#engine').prop("volume", 0.85);

            if (e == 40) { //down Arrow
                if (parseInt($("#userCar").css('top')) < 480) {
                    $("#userCar").css('top', `${parseInt($("#userCar").css('top')) + offset}` + `px`);
                    console.log('down arrow pressed,top:', $('#userCar').css('top'));
                }
            } else if (e == 37) { //left Arrow
                $("#userCar").css('left', `${parseInt($("#userCar").css('left')) - offset}` + `px`);
                console.log('left arrow pressed', $('#userCar').css('left'));
            } else if (e == 39) { //right Arrow
                if (parseInt($('#userCar').css('right')) <= 50) {
                    console.log("You crossed the finish line");
                    document.getElementById('levelUp').play();
                    $('#levelUp').prop("volume", 0.6);
                    level++;
                    carSpeed = 6000 - level * 1000;
                    endGame(true);
                }
                $("#userCar").css('left', `${parseInt($("#userCar").css('left')) + offset}` + `px`);
                console.log('right arrow pressed', parseInt($('#userCar').css('right')));
            } else if (e == 38) { //up Arrow
                if (parseInt($("#userCar").css('top')) > 400) {
                    $("#userCar").css('top', `${parseInt($("#userCar").css('top')) - offset}` + `px`);
                    console.log('up arrow pressed,top:', $('#userCar').css('top'));
                }
            }
        }
    }
})();