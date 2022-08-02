// we call button class 
const addBtn = document.querySelector('#add');


//here we declare local storage function 
const updateLSData = ()=>{
    const textAreaData = document.querySelectorAll('textarea');  //here we get the textarea value as array because we select querySelectorAll it convert value in a array
    const notes = [];               //here we store data in array
    console.log(textAreaData);
    textAreaData.forEach((note) => {  //when user add data in note each data will puch to empty array
        return notes.push(note.value);    //here we push data to notes
    });
    console.log(notes);  //we can show the data user data

    localStorage.setItem('notes',JSON.stringify(notes));     //here we have lacol storage it is has a key and value.we have to convert array to string 
    // hum tho set kardiye data local storage pe par humko use data ko get v karna padega in mainDiv
}

//here we call that function in arrow function we have to declear first 
 const addNewNote = ( text = '')=>{
    //we have to create div dynamically because when we cilck button note autometicall generate 
    //for that we have to create a div
    const note = document.createElement('div');
    //we have to give a class name for this div for that we have a perporty called "classList.add()"
    note.classList.add('note')
    //after that we have create another div for text area for that  we have to write same code but we have a short cut templet litrals
    const htmlData = `
        <div class="oparetion">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class= "main ${text ? "" : "hidden"} "> </div>
        <textarea class="${text ?  "hidden" : "" }"></textarea>
         `;
        //here what happend is if text is avialbe in this div then we have to hidden textarea because alredy text is there
        //but if there is empty div then we have to hidden main div unhide textarea for user to write note
        //this toggle function will declear in edit button below

    //we have create htmlData div but we have to add this div under note div for that we have a perproty insertAdjacentHTML.in this we have perporty like afterbegin beforend
    note.insertAdjacentHTML("afterbegin",htmlData);
    // console.log(note); // we can show whole div in web console 

    //so e have some edit button and delete button these are improtant because after write note we have to save or delete that note
    //for that we have to give those button some function

    //for that we want those button referrence 
    const editBtn = note.querySelector('.edit');        //we have select node those button are part of note now
    const delBtn = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //now deleting the note for that we have to use addeventlistner with a function that remove note for tha we have method "remove()"
    delBtn.addEventListener('click',()=>{
        note.remove();
        updateLSData(); //this function will use for remove data from local storage permanetly
    });

    //if i give some text in main function than it will show in note here we write something in function parameter addNewNote(text = 'chinku')
    textArea.value= text;
    mainDiv.innerHTML = text;


    //now we going to toggle edit button means hum mainDiv textarea bich toggle kar sakte hain
    editBtn.addEventListener('click', ()=>{
        mainDiv.classList.toggle('hidden');  //it will hidden when it clicked
        textArea.classList.toggle('hidden'); ////it will hidden when it clicked
    })

    //hum yanha textarea mein user ne kya likha usko mainDiv pe v show karenge 
    textArea.addEventListener('change', (event)=>{
        const value = event.target.value;
        mainDiv.innerHTML = value;

        //hume user ka data ko ek local storage mein save karenge jisse brawser close karense data delete nahi hoga
            // The localStorage and sessionStorage properties allow to save key/value pairs
            // in a web browser. The localStorage object stores data with no expiration date.
            // The data will not be deleted when the browser is closed, and will be available
            // the next dav week or year

        // for that we going create a function updateLSData()m inside this we are going to create local storage
        //updateLSData() function will declare at above 
        updateLSData();

    })

    //after that we have to add whole div in our html body as child of that body for that we have method called AppendChild
    //AppendChild means add karna something like node as last the last child of node.
    document.body.appendChild(note);

}


//gettin data from local storage 
const notes = JSON.parse(localStorage.getItem('notes'));


if (notes){
    notes.forEach((note) => addNewNote(note))
};

// here we give button event call when we click that function will perfrom
addBtn.addEventListener('click', ()=>{
    addNewNote()
});