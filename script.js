const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "What is 5 + 3?",
      answers: ["6", "8", "9", "7"],
      correct: 1
    },
    {
      question: "Which animal is known as the King of the Jungle?",
      answers: ["Elephant", "Tiger", "Lion", "Cheetah"],
      correct: 2
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 10;
  
  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const resultEl = document.getElementById('result');
  const scoreEl = document.getElementById('score');
  const timerEl = document.getElementById('timer');
  const nextBtn = document.getElementById('next-btn');
  
  function startQuiz() {
    showQuestion();
  }
  
  function showQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    updateTimer();
    timer = setInterval(countdown, 1000);
  
    const q = questions[currentQuestionIndex];
    questionEl.textContent = q.question;
    answersEl.innerHTML = '';
    resultEl.textContent = '';
    nextBtn.classList.add('hidden');
  
    q.answers.forEach((answer, index) => {
      const btn = document.createElement('button');
      btn.textContent = answer;
      btn.onclick = () => checkAnswer(index);
      answersEl.appendChild(btn);
    });
  }
  
  function checkAnswer(selected) {
    clearInterval(timer);
    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = answersEl.querySelectorAll('button');
  
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correctIndex) {
        btn.style.backgroundColor = '#28a745';
      } else if (i === selected) {
        btn.style.backgroundColor = '#dc3545';
      }
    });
  
    if (selected === correctIndex) {
      score++;
      resultEl.textContent = '✅ Correct!';
      resultEl.style.color = 'lightgreen';
    } else {
      resultEl.textContent = '❌ Wrong!';
      resultEl.style.color = '#ff4d4d';
    }
  
    scoreEl.textContent = `Score: ${score}`;
    nextBtn.classList.remove('hidden');
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    questionEl.textContent = "🎉 Quiz Finished!";
    answersEl.innerHTML = '';
    timerEl.textContent = '';
    resultEl.textContent = `Final Score: ${score}/${questions.length}`;
    nextBtn.classList.add('hidden');
  }
  
  function countdown() {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(timer);
      resultEl.textContent = "⏰ Time's up!";
      resultEl.style.color = '#ffaa00';
      checkAnswer(-1); // simulate wrong answer
    }
  }
  
  function updateTimer() {
    timerEl.textContent = `Time left: ${timeLeft}s`;
  }
  
  startQuiz();