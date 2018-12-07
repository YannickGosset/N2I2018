
// Create a "close" button and append it to each list item

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        $.ajax({
            url: Routing.generate('remove-display'),
            type: 'POST', // Le type de la requête HTTP.
            data: {
                element: div.getAttribute('data-elementid')
            }
        }).done(function (data) {
            window.location.replace(Routing.generate('checklist'));
        });
    }
}

// Add a "checked" symbol when clicking on a list item



function check(nameUL) {
    var list = document.getElementById(nameUL);
    list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            $.ajax({
                url: Routing.generate('check'),
                type: 'POST', // Le type de la requête HTTP.
                data: {
                    element: ev.target.getAttribute('data-elementid')
                }
            }).done(function (data) {
                window.location.replace(Routing.generate('checklist'));
            });
        }
    }, false);

}
// Create a new list item when clicking on the "Add" button
function newElement(nameInput, nameUL) {
    var name = document.getElementById(nameInput).value;
    var list = document.getElementById(nameUL).getAttribute('data-internalid');
    if (name === '') {
        alert("You must write something!");
    } else {

        $.ajax({
            url: Routing.generate('add-element'),
            type: 'POST', // Le type de la requête HTTP.
            data: {
                name: name,
                list: list
            }
        }).done(function (data) {
            window.location.replace(Routing.generate('checklist'));
        });
    }

}

//Create a new list with a name
function addList(lastId){
    var name = document.getElementById("nameList").value;
    if(name === ''){ alert("You must write something!"); }
    else{
        $.ajax({
            url: Routing.generate('add-checklist'),
            type : 'POST', // Le type de la requête HTTP.
            data : {
                name: name
            }
        }).done(function(data){
            window.location.replace(Routing.generate('checklist'));
        });
    }
}

$(document).on('click', '#addListe', function(){
    lastListeId = lastListeId + 1;
    addList(lastListeId);
});
console.log(lastListeId);