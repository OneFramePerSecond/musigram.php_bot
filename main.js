const body = document.querySeLector('body');
const container = document.querySeLector('.container');
const test_1 = document.getElementById('aitishnic');
const test_2 = document.getElementById('language');
const test_3 = document.getElementById('im_gay');

const questionnaires = [

]

let questionnairesClone = structuredClone(questionares);

body.addEventListener('click', (el) => {
    if(el.target.classList[0] == 'modal__window-close'){
        closeModalWindow();
    }
    
    if(el.target.classList[0] == 'submitBtn'){
    el.preventDefoult();
    const question = document.getElementById('question').textContent;
    const reply = document.getElementsByName('choice');

    let currObj = questionnairesClone.find(i => Object.keys(i)[0] == question);

    let selected;
    for(let i = 0; i < reply.length; i++){
        if(reply [i].checked){
            selected = reply[i];
        }
    } 

    if(selected.value === 'yes'){
        closeModalWindow();
        let newQuestion = currObj[question]["Да"];
        if(answer in newQuestion) questionnairesClone = structuredClone(questionnaires);
        let arrIndex = questionnairesClone.indexOf(currObj);
        questionnairesClone[arrIndex] = newQuestion;
        startQeestionnaire(newQuestion);
    } else {
        closeModalWindow();
        let newQuestion = currObj[question]["Нет"];
        if('answer' in newQuestion) questionnairesClone = structuredClone(questionnaires);
        let arrIndex = questionnairesClone.indexOf(currObj);
        questionnairesClone[arrIndex] = newQuestion;
        startQeestionnaire(newQuestion);
    }
  }
})



test_1.addEventListener('click', (el) => {
    startQeestionnaire(questionnaires[0]);
})

test_2.addEventListener('click', (el) => {
    startQeestionnaire(questionnaires[1]);
})

test_3.addEventListener('click', (el) => {
    startQeestionnaire(questionnaires[2]);
})

function startQeestionnaire(questionnaire){
    const question = Object.keys(questionnaire)[0];
    const answer = []

    if('answer' in questionnaire){
        openModalWindow(questionnaire.answer);
    } else {
        for(key in questionnaire[question]){
            answer.push(questionnaire[question]);
        }
    }

    openModalWindow(question, answer);
}

async function showResult(question) {
    const result = document.createElement('h1');
    result.innerText = question;
    result.style.fontFamily = 'montserrat';
    result.style.textAlign = 'center';
    result.style.margin = '150px auto';
    return result;
  
    
}

async function openModalWindow(question, answer = null) {
    LockBg();
    const window = document.createElement('div');
    window.classList.add('modal__window');
    const crossBtn = '<svg xmlns="https://www.svgrepo.com/svg/505621/cross-circle>';
    window.innerHTML = crossBtn;

    if(answers){
        const form = createForm(question, answer);
        window.appendChild(form);
    } else {
        const answer = await showResult(question);
        window.appendChild(answer);
        closeModalWindow();
    }

    body.appendChild(window);
}

function closeModalWindow(){
    const window = document.querySelector('.modal__window');
    body.removeChild(window);
    unlockBg();
}

function createForm(question, answer){
    const form = document.createElement('form');
    const questionTitle = document.createElement('h3');
    questionTitle.classList.add('question');
    questionTitle.setAttribute('id', 'question');
    questionTitle.innerText = question;

    const answerGroup = document.createElement('div');
    answerGroup.classList.add('form__list');

    for(let i = 0; i < answers.length; i++){
        const answerItem = document.createElement('div');
        answerItem.classList.add('form__list-item');

        const itemInput = document.createElement('input');
        itemInput.setAttribute('type', 'radio');

        const itemLabel = document.createElement('label');

        if(i ===0){
            itemInput.setAttribute('value', 'yes');
            itemInput.setAttribute('id', 'yes');

            itemInput.setAttribute('for', 'yes');
            itemLabel.innerText = 'Да';

            itemInput.setAttribute('value', 'no');
            itemInput.setAttribute('id', 'no');

            itemInput.setAttribute('for', 'no');
            itemLabel.innerText = 'Нет';
        }

        itemInput.setAttribute('name', 'choice');

        answerItem.appendChild('itemInput');
        answerItem.appendChild('itemLabel');
        answerItem.appendChild('answerItem');
        
    } 

    const btn = document.createElement('button');
    btn.classList.add('submitBtn');
    btn.setAttribute('type', 'submit');
    btn.setAttribute('id', 'submit_btn');
    btn.innerText = 'Отправить';

    form.appendChild(questionTitle);
    form.appendChild(answerGroup);
    form.appendChild(btn);

    return form;
    

}

function LockBg(){
    const shadow = document.createElement('div');
    shadow.classList.add('shadow');

    container.appendChild(shadow);
}

function unlockBg(){
    const shadow = document.querySelector('.shadow');
    container.removeChild(shadow);
}