//Q&A's include wrong choices
var triviaQuestions={
    trivia1: {
        question: `Where is the world's largest desert?`,
        answers: ['North America', 'Africa', 'Asia','Antartica'],
        validAnswer: 3
    },
    trivia2: {
        question: `What company is the world's biggest distributer of toys?`,
        answers: ['ToysRUs','McDonalds','Walmart','Barnes and Noble'],
        validAnswer: 1 
    },
    trivia3: {
        question: `What company produces the most tires in the world?`,
        answers: ['Good Year','Sears','LEGO','Hot Wheels'],
        validAnswer: 2
    },
    trivia4: {
        question: `Who was the first president inagurated in Washington, DC?`,
        answers: ['Thomas Jefferson','George Washington','John Adams','James Madison'],
        validAnswer: 0
    },
    trivia5: {
        question: `According to one study, how many minutes are actually played during the average American football game?`,
        answers: ['45','60','24','11'],
        validAnswer: 3 
    }
}

var correct=0;
var j = 0; 

var gameOrder=[];
//breakdown trivia question objects
for(var key in triviaQuestions){
    if(triviaQuestions.hasOwnProperty(key)){
        gameOrder.push(triviaQuestions[key]);
    }
}

//shuffle gameOrder function
function shuffle(array){
    var currentIndex=array.length, tempValue, randomIndex;
    while(0 !== currentIndex){
        randomIndex=Math.floor(Math.random()*currentIndex);
        currentIndex -= 1;
        tempValue=array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex]=tempValue;
    }
    return array;
}

//count-down
window.onload = function() {
    $("#play").on("click", playGame);
    $('#game-ongoing').hide();
    shuffle(gameOrder);
};

var intervalId;
var clockRunning = false;
var time = 31;

function reset() {
    time = 31;
    $('#timer').text('30');
    playGame();
    
    j++;
    $("#insert-answer").html("");
    check();
    newQuestion(j);
}

function playGame() {
    if (!clockRunning) {
        intervalId=setInterval(count, 1000);
    }
}

function count() {
    time--;
    $('#timer').text(time);
    if (time==-1){
        stopClock();
        alert(`Time's Up!!`);
        reset();        
    }
}

function stopClock(){
    clearInterval(intervalId);
}

//when button is clicked, hide, display new pages
$('#play').on('click',function(){
    triviaTime();
    console.log(gameOrder);
});

function triviaTime(){
    $('#start-game').hide();
    $('#game-ongoing').show();
    newQuestion(j);
}

function newQuestion(indOf){

    for(var i=0; i<gameOrder[indOf].answers.length; i++){
        $('#insert-question').html(gameOrder[indOf].question);
        $('#insert-answer').append(`<div class="ansbox">${gameOrder[indOf].answers[i]}</div>`);
    }

    addIds();

    $('div.ansbox').on('click', function(){
        userClick= $(this).attr("id");
        if (userClick==gameOrder[indOf].validAnswer){
            correct++;
            $('#right-answer').html(`Correct!`);
            stopClock();
            reset();
        } else {
            stopClock();
            $('#right-answer').html(`Incorrect! The right answer was: ${gameOrder[indOf].answers[gameOrder[indOf].validAnswer]}`);
            reset();
        }
    });
}

function addIds() {
    var cls = document.getElementsByClassName("ansbox"); 
    for (i=0, length = cls.length; i < length; i++) {
        cls[i].id= i; 
    }
}; 

//if no more questions
function gameOver(){
    $('#game-ongoing').hide();
    $('#game-over').show();
    message();
}

function message(){
    $('#announce').html(`<h1>You got ${(correct/5)*100}% correct!!</h1>`);
    if (correct==5){
        console.log('yay');
        $('#gif').html(`<img src="assets/images/all-correct.gif" alt="all correct">`);
    } else if(correct==0){
        $('#gif').html(`<img src="assets/images/all-wrong.gif" alt="all wrong">`);
    }
}

function check(){
    if (j==5){
        gameOver();
    }
}