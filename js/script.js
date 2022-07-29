const form = document.querySelector('form');
const input_file = document.querySelector('#profil');
const prev_box = document.querySelector('#prev_box');
var link = document.querySelector('#link');
let base64 = '';

form.addEventListener('submit',handlerForm)

input_file.addEventListener('change',(e)=>{
    const file_meta = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener('load',()=>{
        const upload_img = fileReader.result;
        prev_box.src = upload_img;
        base64 = upload_img
    })
    fileReader.readAsDataURL(file_meta);
})


function handlerForm(e){
    e.preventDefault();
    const pre_nom = e.target[0].value;
    const nom = e.target[1].value;
    const tel = e.target[2].value;
    const email = e.target[3].value;
    const bio = e.target[4].value;

    const user = {
        "prenom":pre_nom,
        "nom":nom,
        "tel":tel,
        "email":email,
        "bio":bio,
        "profil":base64
    }
    let users = localStorage.getItem("users");
    if (users !== null) {
        users = JSON.parse(users);
        console.log(users)
        users.push(user);
    }else{
        users = [user]
    }
    localStorage.setItem('users',JSON.stringify(users));
    show_user();
}

function show_user(){
    let users = JSON.parse(localStorage.getItem("users"));
    let container_list = document.querySelector('.container_list-contact');
    let list_contact_html = '';

    users.forEach((user,index)=>{
        list_contact_html += user_template(user,index);
    })

    container_list.innerHTML = list_contact_html;
}

button = document.querySelector('#link');


 

function user_template(user,index){
   return ` <div class="contenue" id="contact_${index}">
        <div class="img" >
            <img src="${user.profil}" id="image"/>
        </div>
        <div class="cont">
            <p id="nm">${user.nom}</p>
            <p id="pst">${user.prenom}</p>
            <p id="biot">${user.bio}</p>
        </div>
        <div class="gauche">
            <button id="link">supprimer </button>
            <a href="#">editer</a>
        </div>
    </div>
    `
}

