let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = '771aa8f7-d363-4ff0-a824-10181a86ac47';
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');
let wordBox = document.querySelector('.words_and_meaning');
//const tableBody = document.querySelector('#tableData');
let i=0;

let oldLength = 0;
function myFunction(){
    var elem = $('#input');
    str = elem.val();
    alert(elem.val()+" "+oldLength);
    if(oldLength!=elem.val().length)
    {
        oldLength = elem.val().length;
        if(i!=0)
        {
            strTosearch=word.slice(str.lastIndexOf(" "),str.length);
        }
        else
        {
            strTosearch = str;
        }
        getData(strTosearch);
        alert(elem.val());
        i++;
    }
   // Save current value of element

   // Look for changes in the value
   
      // If value has changed...
      
}

setInterval(function() { myFunction()} , 5000);



var speech=true;
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.interimResults = true;

recognition.continuous = true;


recognition.addEventListener('result',e=>{
//console.log(e.results);
let transcript = Array.from(e.results)
.map(result => result[0])
.map(result => result.transcript)
.join('')

document.getElementById("input").value = transcript;

//document.getElementById("input").value = "";
console.log(transcript);
//transcript="";


});


recognition.start();

recognition.addEventListener('end',recognition.start);



searchBtn.addEventListener('click', function(e){
    e.preventDefault();

    // clear data 
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';

    // Get input data
    let word = input.value;
    // call API get data
    if (word === '') {
        alert('Word is required');
        return;
    }
    var wordTosearch="";
    if(i!=0)
    {
        wordTosearch=word.slice(word.lastIndexOf(" "),word.length);
    }
    else
    {
        wordTosearch = word;
    }
    
    
   // alert(wordTosearch);
    
    getData(wordTosearch);
    i++;
    //document.getElementById("input").value = "";
}) 



async function getData(word) {
    //alert("getData function is called")
    loading.style.display = 'block';
    // Ajax call 
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);
    const data = await response.json();
    // if empty result 
    if (!data.length) {
        loading.style.display = 'none';
        notFound.innerText = ' No result found';
        return;
    }

    // If result is suggetions
    if (typeof data[0] === 'string') {
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggetion = document.createElement('span');
            suggetion.classList.add('suggested');
            suggetion.innerText = element;
            notFound.appendChild(suggetion);
            
        })
        //recognition.stop();
        return;
    }

    // Result found 
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;

    let words = document.createElement('span');
    let meanging = document.createElement('span');
    let br = document.createElement('br');

    words.classList.add('suggested');
    meanging.classList.add('suggested');
    words.innerHTML = word;
    meanging.innerHTML = defination;
    wordBox.appendChild(words);
    wordBox.appendChild(meanging);
    wordBox.appendChild(br);
    

    

 




    // Sound 
  /*  const soundName = data[0].hwi.prs[0].sound.audio;
        if(soundName) {
            renderSound(soundName);
        }
        document.getElementById("input").value = "";
    console.log(data);
}

function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud); */

}