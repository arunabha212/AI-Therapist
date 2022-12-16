// Collapsible
var coll = document.getElementsByClassName("collapsible");
console.log(coll)

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        // alert("clicked")
        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage() {
    let firstMessage = "Hello there..! This test contains some questions and you have to choose an option.<br/>1 = Did not apply to me at all.<br/>2 = Applied to me to some degree, or some of the time.<br/>3 = Applied to me to a considerable degree, or a good part of the time.<br/>4 = Applied to me very much, or most of the time"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
// function getHardResponse(userText) {
//     let botResponse = getBotResponse(userText);
//     let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
//     $("#chatbox").append(botHtml);

//     document.getElementById("chat-bar-bottom").scrollIntoView(true);
// }
answers = []
//Gets the text text from the input box and processes it
// function getResponse() {
//     let userText = $("#textInput").val();

//     if (userText == "") {
//         userText = "Please enter something!";
//     }

//     let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

//     $("#textInput").val("");
//     $("#chatbox").append(userHtml);
//     document.getElementById("chat-bar-bottom").scrollIntoView(true);

//     setTimeout(() => {
//         getHardResponse(userText);
//     }, 1000)

// }

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText("Heart clicked!")
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getoptions();
    }
});
var idx = -1;
const questions = ["I found myself getting upset by quite trivial things?", "I was aware of dryness of my mouth?", "I couldn't seem to experience any positive feeling at all", "I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness in the absence of physical exertion).", "I just couldn't seem to get going.", "I tended to over-react to situations.", "I had a feeling of shakiness (eg, legs going to give way).", "I found it difficult to relax.", "I found myself in situations that made me so anxious I was most relieved when they ended.", "I felt that I had nothing to look forward to.", "I found myself getting upset rather easily.", "I felt that I was using a lot of nervous energy.", "I felt sad and depressed.", "I found myself getting impatient when I was delayed in any way (eg, elevators, traffic lights, being kept waiting).", "I had a feeling of faintness.", "I felt that I had lost interest in just about everything.", "I felt I wasn&#39;t worth much as a person.", "I felt that I was rather touchy.", "I perspired noticeably (eg, hands sweaty) in the absence of high temperatures or physical exertion.", "I felt scared without any good reason.", "I felt that life wasn&#39;t worthwhile.", "I found it hard to wind down.", "I had difficulty in swallowing.", "I couldn&#39;t seem to get any enjoyment out of the things I did.", "I was aware of the action of my heart in the absence of physical exertion (eg, sense of heart rate increase, heart missing a beat).", "I felt down-hearted and blue.", "I found that I was very irritable.", "I felt I was close to panic.", "I found it hard to calm down after something upset me.", "I feared that I would be &quot;thrown&quot; by some trivial but unfamiliar task.", "I was unable to become enthusiastic about anything.", "I found it difficult to tolerate interruptions to what I was doing.", "I was in a state of nervous tension.", "I felt I was pretty worthless.", "I was intolerant of anything that kept me from getting on with what I was doing.", "I felt terrified.", "I could see nothing in the future to be hopeful about.", "I felt that life was meaningless.", "I found myself getting agitated.", "I was worried about situations in which I might panic and make a fool of myself.", "I experienced trembling (eg, in the hands).", "I found it difficult to work up the initiative to do things."]
function secondset() {
    const str = "You are provided 7 options to rate yourself.<br/>1 = Disagree strongly<br/>2 = Disagree moderately<br/>3 = Disagree a little<br/>4 = Neither agree nor disagree<br/>5 = Agree a little<br/>6 = Agree moderately<br/>7 = Agree strongly"
    let userHtml = '<p class="botText"><span>' + str + '</span></p>';
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}
function getoptions() {
    var flag = false
    let i = 0;
    let userText = $("#textInput").val();

    if (userText == "" || userText > 4 || userText < 1) {
        userText = "Please enter a valid option!"
    }
    else {
        flag = true;
        idx++;
    }


    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
    if (flag == true) {
        // console.log("hello\nWorld")

        if (idx <= 41) {
            answers.push(userText)
            askquestions(idx, questions)
            console.log(answers)
        }
        else if (idx >= 42 && idx < 52) {

            secondset();
            answers.push(userText)
            askquestions(idx - 42, questions2);
            console.log(answers)

        }
        else if (idx >= 52 && idx < 60) {
            alert('3rd set')
            answers.push(userText)
            askquestions(idx - 52, questions3);
            console.log(answers)
            alert(idx)
        }
        else {
            answers.push(userText)
            alert('end')
            testend();
            setTimeout(() => {
                callsubmit(answers);;
            }, 1000)

        }

    }
}
// function askquestions(idx) {
//     // alert(idx)
//         let userHtml = '<p class="botText"><span>' + questions[idx] + '</span></p>';
//         $("#textInput").val("");
//         $("#chatbox").append(userHtml);
//         document.getElementById("chat-bar-bottom").scrollIntoView(true);
// }
questions2 = ['I see myself as Extraverted, enthusiastic.', 'I see myself as Critical, quarrelsome.', 'I see myself as Dependable, self-disciplined.', 'I see myself as Anxious, easily upset.', 'I see myself as Open to new experiences, complex.', 'I see myself as Open to Reserved, quiet.', 'I see myself as Sympathetic, warm.', 'I see myself as Disorganized, careless.', 'I see myself as Calm, emotionally stable.', 'I see myself as Conventional, uncreative.']
function askquestions(idx, questions) {
    // alert(idx)
    let userHtml = '<p class="botText"><span>' + questions[idx] + '</span></p>';
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    // alert(flag)
}
questions3 = ['How much education have you completed?<br/>1=Less than high school<br/>2=High school<br/>3=University degree<br/>4=Graduate degree', 'What type of area did you live when you were a child?<br/>1=Rural (country side)<br/>2=Suburban<br/>3=Urban (town, city)', 'What is your gender?<br/>1=Male<br/>2=Female<br/>3=Other', 'How many years old are you?<br/>1= Age<= 12<br/>2=13 <= Age <= 16<br/>3=17 <= Age <= 21<br/>4= 21 < Age <= 35 <br/>5= 35 < Age <= 48 <br/>6= Age >= 49', 'What is your religion?,<br/>1=Agnostic<br/>2=Atheist<br/>3=Buddhist<br/>4=Christian (Catholic)<br/>5=Christian (Mormon)<br/>6=Christian (Protestant)<br/>7=Christian (Other)<br/>8=Hindu<br/>9=Jewish<br/>10=Muslim<br/>11=Sikh<br/>12=Other','"What is your race?"<br/>10=Asian<br/> 20=Arab<br/> 30=Black<br/> 40=Indigenous Australian<br/> 50=Native American<br/> 60=White<br/>70=Other', 'What is your marital status?<br/>1=Never married<br/>2=Currently married<br/>3=Previously married', 'Including you, how many children did your mother have?']

function testend() {
    const str = "Thank you for taking up this test, the AI Therapist will soon update the results "
    let userHtml = '<p class="botText"><span>' + str + '</span></p>';
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
    
}

async function callsubmit(answers){
    // alert(answers)
    var t=["Q1A", "Q2A", "Q3A", "Q4A", "Q5A", "Q6A", "Q7A", "Q8A", "Q9A", "Q10A",
        "Q11A", "Q12A", "Q13A", "Q14A", "Q15A", "Q16A", "Q17A", "Q18A", "Q19A",
        "Q20A", "Q21A", "Q22A", "Q23A", "Q24A", "Q25A", "Q26A", "Q27A", "Q28A",
        "Q29A", "Q30A", "Q31A", "Q32A", "Q33A", "Q34A", "Q35A", "Q36A", "Q37A",
        "Q38A", "Q39A", "Q40A", "Q41A", "Q42A", "TIPI1", "TIPI2", "TIPI3",
        "TIPI4", "TIPI5", "TIPI6", "TIPI7", "TIPI8", "TIPI9", "TIPI10",
        "education", "urban", "gender","age", "religion", "race", "married",
        "familysize"]
    var dict={}
    for( var i=0; i<answers.length;i++)
    {
        dict[t[i]] = answers[i+1];
    }
    console.log(JSON.stringify(dict))

    const prediction = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dict)
    }).then((res) => res.json())
    // alert(JSON.stringify(prediction)['prediction'])

    //Displaying the prediction
    document.getElementById("myDiv").innerHTML="<div style='padding: 2%;width: fit-content;margin-top: 10%;margin-left: auto;margin-right: auto;display: flex;align-items: center;flex-wrap: wrap;align-content: center;justify-content: space-evenly;background-color: #890a0a;border-radius: 10px;color: white;'>Your DASS Scale: "+prediction['prediction']+"</div>"
}