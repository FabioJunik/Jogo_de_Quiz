let currentQuestion = 0;
let correctAnswes = 0;

const categores = document.querySelectorAll('.contCategoreQuiz div');
    
let questionsForShow;

categores.forEach(categ=> categ.addEventListener('click',()=>
    {
        questionsForShow = questions[categ.classList.value];
        showQuestion();
    })
);


// console.log(categore)


document.querySelector('.scoreArea button').addEventListener('click',resetEvent);

function showQuestion(){
    
    document.querySelector('.contCategoreQuiz').style.display='none';
    document.querySelector('.contQuiz').style.display='flex';

    if(questionsForShow[currentQuestion]){
        let question = questionsForShow[currentQuestion];
        
        let percentagem = Math.floor((currentQuestion/questionsForShow.length)*100);
        document.querySelector('.progress--bar').style.width = `${percentagem}%`;

        document.querySelector('.scoreArea').style.display = 'none';

        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = question.question;
        
        let optionsHTML = '';

        for(let i in question.options){
            optionsHTML+= `<div class="option" data-op="${i}"><span>${parseInt(i)+1}</span> ${question.options[i]}</div>`;
        }

        document.querySelector('.options').innerHTML= optionsHTML;


        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
    } else{
        finishQuiz();
    }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questionsForShow[currentQuestion].answer == clickedOption){
        correctAnswes++;
    }
    
    currentQuestion++;
    showQuestion();
}

function finishQuiz(){

    let ponts = Math.floor((correctAnswes/questionsForShow.length)*100);

    if(ponts < 30){
        document.querySelector('.scoreText1').innerHTML= "Esta mau";
        document.querySelector('.scorePct').style.color= '#ff0000';
    } else if (ponts >=30 && ponts < 70)
    {
        document.querySelector('.scoreText1').innerHTML= "Muito bem";
        document.querySelector('.scorePct').style.color= '#ffff00';
    }
    else{
        document.querySelector('.scoreText1').innerHTML= "Parabéns";
        document.querySelector('.scorePct').style.color= '#0d630d';
    }

    document.querySelector('.scorePct').innerHTML= `Acertou ${ponts}%`;

    document.querySelector('.scoreText2').innerHTML= `Você respondeu ${questionsForShow.length} questões e acertou ${correctAnswes}`;

    document.querySelector('.scoreArea').style.display = 'block';

    document.querySelector('.questionArea').style.display = 'none';

    document.querySelector('.progress--bar').style.width = `100%`;
}

function resetEvent(){
    location.reload(); 
}