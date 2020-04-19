// If user add notes add it to the local storage

showNotes();

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : addTitle.value,
        text : addTxt.value,
        important : false
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);

    showNotes();
})

// Function to show element from localStorage

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += 
            `<div class="noteCard card my-2 mx-2" style="width: 18rem;">
                <div id="card${index}" class="card-body" onclick="makeNoteImportant(this.id.slice(4))">
                    <h5 class="card-title">Note ${index + 1} : <em>${element.title}</em></h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`
    });

    let notesElm = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
        notesObj.forEach((element,index) => {
            if(element.important == true){
                document.getElementById("card"+String(index)).classList.add("myStyle");
            }
        });
    }
    else{
    notesElm.innerHTML =   `<p> Nothing to show! Kindly add notes </p>`
    }

}

// Function to delete a note

function deleteNote(index) {
    console.log("One note deleted","The id is : ",index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    //splice take the starting index from where to delete,and the number of the element
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputVal = search.value;
    let noteCards  = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;

        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    })
})

// Making a note Important
function makeNoteImportant(index){
    console.log("The note",index," is marked as important");
    document.getElementById("card"+String(index)).classList.toggle("myStyle");
    updateLocalstroage(index);
}

// Adding important parameter in the notes objects in the local storage
function updateLocalstroage(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let flag;
    if(document.getElementById("card"+String(index)).classList.contains('myStyle')){
        flag = true;
    }
    else{
        flag = false;
    }
    notesObj[index].important = flag;
    localStorage.setItem("notes", JSON.stringify(notesObj));
}
