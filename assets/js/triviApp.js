
var search = [
'drift', 
'drive',
'E30',
'driving+M1',
'M5',
'motors',
'v12',
'drifting',
'i3',
'i8',
'rolls-royce',
'M5',
'headquatre',
'founder'
];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
    correct: "Yes, that's right, You drive!",
    incorrect: "No, that's not it. Brakes off!",
    endTime: "The lap is getting over!",
    finished: "Alright! Let's see where we arrived."
}


$('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;

    //sets up new questions & answerList
    $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 5; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({
            'data-index': i
        });
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();
    var APIKey = "0iKJvSjZ5WSw65Kch4s0mddSPH8UAVIa";
    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    //giphy api
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=cars+bmw+" + search[currentQuestion] + "&rating=g&api_key="+ APIKey;
    $.ajax({
        url: giphyURL,
        method: 'GET'
    }).done(function (giphy) {
        var currentGif = giphy.data;
        $.each(currentGif, function (index, value) {
            var embedGif = value.images.original.url;
            newGif = $('<img>');
            newGif.attr('src', embedGif);
            newGif.addClass('gifImg');
            $('#gif').html(newGif);
        });
    });
    //checks to see correct, incorrect, or unanswered
    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 3000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 7000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}
// All Q&A
var triviaQuestions = [{
    question: "What is BMW's all-wheel-drive system branded as?",
    answerList: ["4Motion", "4MATIC", "Quattro", "X-Drive"],
    answer: 3
}, {
    question: "Which of the following has been a BMW slogan ?",
    answerList: ["Don't dream it. Drive it.", "The art of performance.", "The best never rest.", "Sheer driving pleasure."],
    answer: 3
}, {
    question: "In what years did the BMW E30 3-Series span ?",
    answerList: ["1975-1983", "1990-1999", "1982-1992", "1998-2006"],
    answer: 2
}, {
    question: "How many 1978-1981 BMW M1 cars were built and sold to the public ?",
    answerList: ["456", "233", "501", "38"],
    answer: 0
}, {
    question: "What does the 'M' stand for on BMW's M models such as the M6 ?",
    answerList: ["Munzenberg", "Maximum Excitement", "Maximum Horsepower", "Motorsport"],
    answer: 3
}, {
    question: "What does BMW stand for ?",
    answerList: ["Borgholzhausen Motor Works", "Bavarian Motor Works", "Berlin Motor Works", "Brunswick Motor Works"],
    answer: 1
}, {
    question: "The 2014 BMW 740i and 750i sedans produce how much horsepower respectively ?",
    answerList: ["265 / 325", "400 / 560", "315 / 445", "290 / 375"],
    answer: 2
}, {
    question: "Which 2014 BMW model has the highest starting MSRP ?",
    answerList: ["X6 M", "ALPINA B7", "760Li", "M6 Convertible"],
    answer: 2
}, {
    question: "Which is NOT a BMW model ?",
    answerList: ["1600", "2001C", "Z8", "2800CS "],
    answer: 1
}, {
    question: "Which BMW has the quickest 0-60 time?",
    answerList: ["1997 BMW M3 Sedan", "2009 BMW ActiveHybrid 7", "1994 BMW M5", "2011 BMW 640i SE Convertible "],
    answer: 1
}, {
    question: "In 1998 BMW acquired which luxury car brand ?",
    answerList: ["Jaguar", "Maserati", "Rolls-Royce", "Bentley"],
    answer: 2
}, {
    question: "The Jaguar F-Type S is the BMW Z4 sDrive35 as the Jaguar XFR-S is to the BMW?",
    answerList: ["760Li", "M3 Convertible", "M5", "X6 M "],
    answer: 2
}, {
    question: "In which German city is the BMW headquartered?",
    answerList: ["Nuremberg", "Berlin", "Stuttgart", "Munich"],
    answer: 3
}, {
    question: "Founder(s) of BMW",
    answerList: ["Karl Rapp", "Camillo Castiglioni", "Gustav Otto", "Franz Josef Popp", "All of the above"],
    answer: 4
}];