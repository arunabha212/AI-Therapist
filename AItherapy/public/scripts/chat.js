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
    let firstMessage = "Hello there..! This test contains some questions and you have to choose an option.1 = Did not apply to me at all. 2 = Applied to me to some degree, or some of the time. 3 = Applied to me to a considerable degree, or a good part of the time. 4 = Applied to me very much, or most of the time"
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
var idx=-1;
const questions = ["I found myself getting upset by quite trivial things?", "I was aware of dryness of my mouth?", "I couldn't seem to experience any positive feeling at all","I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness in the absence of physical exertion).","I just couldn't seem to get going.","I tended to over-react to situations.","I had a feeling of shakiness (eg, legs going to give way).","I found it difficult to relax.","I found myself in situations that made me so anxious I was most relieved when they ended.","I felt that I had nothing to look forward to.","I found myself getting upset rather easily.","I felt that I was using a lot of nervous energy.","I felt sad and depressed.","I found myself getting impatient when I was delayed in any way (eg, elevators, traffic lights, being kept waiting).","I had a feeling of faintness.","I felt that I had lost interest in just about everything.","I felt I wasn&#39;t worth much as a person.","I felt that I was rather touchy.","I perspired noticeably (eg, hands sweaty) in the absence of high temperatures or physical exertion.","I felt scared without any good reason.","I felt that life wasn&#39;t worthwhile.","I found it hard to wind down.","I had difficulty in swallowing.","I couldn&#39;t seem to get any enjoyment out of the things I did.","I was aware of the action of my heart in the absence of physical exertion (eg, sense of heart rate increase, heart missing a beat).","I felt down-hearted and blue.","I found that I was very irritable.","I felt I was close to panic.","I found it hard to calm down after something upset me.","I feared that I would be &quot;thrown&quot; by some trivial but unfamiliar task.","I was unable to become enthusiastic about anything.","I found it difficult to tolerate interruptions to what I was doing.","I was in a state of nervous tension.","I felt I was pretty worthless.","I was intolerant of anything that kept me from getting on with what I was doing.","I felt terrified.","I could see nothing in the future to be hopeful about.","I felt that life was meaningless.","I found myself getting agitated.","I was worried about situations in which I might panic and make a fool of myself.","I experienced trembling (eg, in the hands).","I found it difficult to work up the initiative to do things."]
function getoptions() {
    var flag = false
    let userText = $("#textInput").val();

    if (userText == "" || userText>4 || userText<1) {
        userText = "Please enter a valid option!"
    }
    else
    {
        flag = true;
        idx++;
    }
        

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
    if(flag==true)
    {
        answers.push(userText)
        if(idx<=41)
        {
            askquestions(idx)
        }
        
        console.log(answers)
    }
}
function dummy()
{

}
function askquestions(idx) {
    // alert(idx)
        let userHtml = '<p class="botText"><span>' + questions[idx] + '</span></p>';
        $("#textInput").val("");
        $("#chatbox").append(userHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);

        // alert(flag)
}

// askquestions();