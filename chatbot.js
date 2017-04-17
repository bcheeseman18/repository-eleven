// ------------------- make function that actually creates/displays information -------------

function displayText(newMessage) {

    let parent = document.querySelector('ul');

    let fullmsg = document.createElement('li');
    fullmsg.classList.add('newMessage');


    let name = document.createElement('span');
    name.textContent = newMessage.from;

    let text = document.createElement('p')
    text.textContent = newMessage.message;

    let parts = text.innerHTML.split(" ")//split inner HTML into words (inner html = a specific element of html)

    for(let i = 0; i < parts.length; i++) { //looks at each word...
        if( parts[i].startsWith("http") || parts[i].startsWith("https")) { //to check to see if it starts with http or https
            parts[i] = "<a href='" + parts[i] + "'>" + parts[i] + "</a>" //new parts equals an a href plus the part of the word with http plus the rest of the text to display the link
        } else if ( parts[i] === ":)" ) {
            //parts[i] = "&#x23;&#x20e3;"
            parts[i] = "&#x1f603;"
        } else if ( parts[i] === ":(" ) {
            parts[i] = "&#x1f622;"
        }
    }
        
    text.innerHTML = parts.join(" ") //joins the words from the array together with a space in between each word
    fullmsg.appendChild(name);
    fullmsg.appendChild(text);



    parent.appendChild(fullmsg)


    console.log('show message');

}



//--------------------- AJAX --------------------------------------------

window.addEventListener('load', function () {  //loads page


    function getNewText() { // function to create the process of recieving new texts from API
        let request = new XMLHttpRequest(); // requests information from the API
        request.open('GET', 'https://tiy-28202.herokuapp.com/chats');
        request.addEventListener('load', function () { //lets you know that we recieved information

            let response = JSON.parse(request.responseText);  //JSON
            for (let i = 0; i < response.chats.length; i++) {
                displayText(response.chats[i]); // this calls the display function for chat messages
            }

            console.log(response);


        });

        request.send();


    }

    getNewText();

    let btn = document.querySelector('#getMsg'); 
    btn.addEventListener('click', function () {
        console.log('new message'); 
        getNewText(); 
    });
    
});


window.addEventListener('load', function () {

    let sendMsg = document.querySelector('#send');
    sendMsg.addEventListener('click', function () {
        let message = document.querySelector('#text');

        console.log(message.value);

        let request = new XMLHttpRequest();
        request.open('POST', 'https://tiy-28202.herokuapp.com/chats');
        request.addEventListener('load', function () {
            console.log('recieved response'); //this is not necessary for POST
        });

        request.send(JSON.stringify ({
            from: 'Ben',
            message: message.value,
            
        }));

    });

});