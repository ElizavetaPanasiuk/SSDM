const getVarsBut = document.querySelector('.getVarsBut');
const problem = document.querySelector('.problem');
const varNum = document.querySelector('.varNum');
let list = document.querySelector('.list');
const getCompareFieldsBut = document.querySelector('.getCompareFields');
const variants = [];
const resultBut = document.querySelector('.getResult');
const choosing = document.querySelector('.choosing');

getVarsBut.addEventListener('click', function func() {
  if (problem.textContent == false || isNaN(+varNum.textContent)) {
    alert('Check input data');
  }
  else {
    let varCount = Number(varNum.textContent);
    problem.contentEditable = false;
    varNum.contentEditable = false;
    for (let i = 0; i < varCount; i++) {
      let li = document.createElement('li');
      li.classList = 'listItem';
      li.contentEditable = true;
      list.append(li);
    };
    getCompareFieldsBut.classList.remove('hidden');
    this.removeEventListener('click', func);
  }
});
  
getCompareFieldsBut.addEventListener('click', function func() {
  
  let lis = document.querySelectorAll('.listItem');
  let isRightInput = true;
  for (let i = 0; i < lis.length; i++){
    if (lis[i].textContent == false) {
      isRightInput = false;
    }
  }
  if (isRightInput) {
    lis.forEach(elem => {
      elem.contentEditable = false;
      variants.push({
        variant: elem.textContent,
        score: 0,
      });
    });
    document.querySelector('.altQ').classList.remove('.hidden');
    let varCount = Number(varNum.textContent);
    for (let i = 0; i < varCount; i++){
      for (let j = i + 1; j < varCount; j++){
        let choiceDiv = document.createElement('div');
        choiceDiv.classList = 'makingChoice';
        choiceDiv.innerHTML = `<p class="q"><b>${variants[i].variant.trim()}</b> or <b>${variants[j].variant.trim()}</b>?</p>`;
        let choiceRadioDiv = document.createElement('div');
        choiceRadioDiv.className = 'choiceRadioDiv';
        let p1 = document.createElement('p');
        let var1 = document.createElement('input');
        var1.type = 'radio';
        var1.name = `${i}${j}`;
        var1.value = variants[i].variant;
        p1.append(var1);
        p1.innerHTML += variants[i].variant.trim();
  
        let p2 = document.createElement('p');
        let var2 = document.createElement('input');
        var2.type = 'radio';
        var2.name = `${i}${j}`;
        var2.value = variants[j].variant;
        p2.append(var2);
        p2.innerHTML += variants[j].variant.trim();
  
        choiceRadioDiv.append(p1);
        choiceRadioDiv.append(p2);
  
        choiceDiv.append(choiceRadioDiv);
        choosing.append(choiceDiv);
      }
    }
    resultBut.classList.remove('hidden');
    this.removeEventListener('click', func);
  } else {
    alert('Check input data');
  }
  
});


resultBut.addEventListener('click', function func() {
  let radios = document.querySelectorAll('input');
  let isAllRadiosFilled = true;
  let count = 0;
  for (let i = 0; i < radios.length; i++){
    if (radios[i].checked) {
      count++;
    } 
  }
  if (count < radios.length / 2) {
    isAllRadiosFilled = false;
  }
  if (isAllRadiosFilled) {
    for (let i = 0; i < radios.length; i++){
      radios[i].disabled = true;
      if (radios[i].checked) {
        for (let j = 0; j < variants.length; j++){
          if (variants[j].variant === radios[i].value) {
            variants[j].score = variants[j].score + 1;
          }
        }
      }
    }
    let bestVarScore = variants[0].score;
    let bestVar = variants[0].variant;
    for (let i = 1; i < variants.length; i++){
      if (variants[i].score > bestVarScore) {
        bestVarScore = variants[i].score;
        bestVar = variants[i].variant;
      } 
    }
  
    let resultField = document.createElement('div');
    let resultW = document.createElement('h3');
    resultW.className = 'resultW';
    resultW.textContent = 'Result';
    resultField.append(resultW);
    resultField.className = 'resultField';
    resultField.innerHTML += `The best choice is <b>${bestVar.trim()}</b> with score <b>${bestVarScore}/${variants.length - 1}</b>`;
    let otherSc = document.createElement('h3');
    otherSc.className = 'resultW';
    otherSc.textContent = 'Other scores';
    resultField.append(otherSc);
    for (let i = 0; i < variants.length; i++){
      if (variants[i].variant !== bestVar) {
        resultField.innerHTML += `<p>The score of variant <b>${variants[i].variant.trim()}</b> is <b>${variants[i].score}/${variants.length - 1}</b></p>`
      }
    }
    document.body.append(resultField);
    this.removeEventListener('click', func);
  } else {
    alert('Fill all the radios');
  }
  
})