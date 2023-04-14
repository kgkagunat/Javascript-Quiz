

var timerContainer = document.getElementById('timer-container');            

var startContainer = document.getElementById('start-container');            
var startButton = document.getElementById('start');                       

var quizContainer = document.getElementById('quiz-container');              
var questionElement = document.getElementById('question');                  
var choicesElement = document.getElementById('choices');                   

var endContainer = document.getElementById('end-container');           
var scoreElement = document.getElementById('score');                      
var initialsInput = document.getElementById('initials');                
var saveButton = document.getElementById('save');                         



//------------------------------------------------------------------------------------------------------------





var questions = [
    {
      title: 'Commonly used data types DO NOT include:',        
      choices: ['strings', 'booleans', 'alerts', 'numbers'],   
      answer: 2,                                                 
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 2,
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
      answer: 3,
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 2,
    },
    {
      title: 'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 3,
    },
    
  ];




//------------------------------------------------------------------------------------------------------------



var currentQuestionIndex = 0;    
var timeLeft = 10;          
var timer;                      
var correctAnswers = 0;            



//------------------------------------------------------------------------------------------------------------




startButton.addEventListener('click', startQuiz);
saveButton.addEventListener('click', saveScore);





//------------------------------------------------------------------------------------------------------------




function startQuiz() {
  startContainer.hidden = true;             
  quizContainer.hidden = false;             
  timer = setInterval(updateTimer, 1000);     
  showQuestion();                       
}



//------------------------------------------------------------------------------------------------------------




function updateTimer() {
  timeLeft--;                                                
  timerContainer.textContent = "Time left: " + timeLeft;         
  if (timeLeft === 0) {                                   
    endQuiz();
  }
}



//------------------------------------------------------------------------------------------------------------




function showQuestion() {
    const question = questions[currentQuestionIndex];   
    questionElement.textContent = question.title;      
    choicesElement.innerHTML = '';                     

    question.choices.forEach(function(value, index) {         
      const button = document.createElement('button');        
      button.textContent = value;                          
      button.classList.add('choice');                      
      button.addEventListener('click', function() {        
        handleAnswer(index);                             
      });
      choicesElement.appendChild(button);               
    });
  }
  



//------------------------------------------------------------------------------------------------------------



function handleAnswer(choiceIndex) {
  if (choiceIndex === questions[currentQuestionIndex].answer) {
    correctAnswers++;                                                 
  }
  currentQuestionIndex++;                                       

  timeLeft = 10;                                                 

  if (currentQuestionIndex >= questions.length || timeLeft <= 0) {     
    endQuiz();                                                        
  } else {
    showQuestion();                                                 
  }
}

  
  


//------------------------------------------------------------------------------------------------------------



  function endQuiz() {
    clearInterval(timer);               
    quizContainer.hidden = true;      
    endContainer.hidden = false;       
  
    const score = Math.round((correctAnswers / questions.length) * 100);           
    scoreElement.textContent = score + "%";                                       
  }




//------------------------------------------------------------------------------------------------------------




function saveScore() {
    const initials = initialsInput.value.trim();        
    
    if (initials !== "") {  
      const storedScores = JSON.parse(localStorage.getItem("scores")) || [];                                                                                                                                        
      const score = Math.round((correctAnswers / questions.length) * 100);        

      const newScore = {        
        initials: initials,
        score: score,
      };

      storedScores.push(newScore);                                   
      localStorage.setItem("scores", JSON.stringify(storedScores));     
  
    } else {
      alert("Initials must be inputted");    
    }
  }
  