let cl = console.log;

let baseUrl ="http://localhost:3000/posts";
let compInfoForm= document.getElementById('compInfoForm');

let empname= document.getElementById('empname');
let username= document.getElementById('username');
let email= document.getElementById('email');
let street= document.getElementById('street');
let suite= document.getElementById('suite');
let city= document.getElementById('city');
let zipcode= document.getElementById('zipcode');
let lat= document.getElementById('lat');
let lng= document.getElementById('lng');
let phone= document.getElementById('phone');
let website= document.getElementById('website');
let name= document.getElementById('name');
let catchPhrase= document.getElementById('catchPhrase');
let bs= document.getElementById('bs');
let submitBtn= document.getElementById('submitBtn');
let updateBtn= document.getElementById('updateBtn');
let compData= document.getElementById('compData');
let postArray =[];
function makeHttpCall(methodName,url,body){
    return fetch(url,{
        method : methodName,
        body : body,
        headers :{
            "content-type" : "application/json; charset=UTF-8",
            "Authrazation" :"Bearer Token qwertyuiop"
        }
    }).then((res) =>res.json())
}
async function getPost(){
    try{
        let responseData = await makeHttpCall('GET',baseUrl);
        postArray= responseData;
        templeting(postArray)
    }catch(err){
        cl(err)
    }
}
getPost();
// fetch(baseUrl)
//         .then(response => response.json())
//         .then(res =>{
//             cl(res)
//             // templeting(res)
//             postArray = res;
//             templeting(postArray) ;
//         })
//         .catch(cl)
function onEditHandler(eve){
    let getId = +eve.dataset.id;
    // cl(getId);
    localStorage.setItem('setId',getId);
    let getObj = postArray.find(obj => obj.id === getId);
    empname.value = getObj.empname;
    username.value = getObj.username;
    email.value = getObj.email;
    street.value = getObj.address.street;
    suite.value = getObj.address.suite;
    city.value = getObj.address.city;
    zipcode.value = getObj.address.zipcode;
    lat.value = getObj.address.geo.lat;
    lng.value = getObj.address.geo.lng;
    phone.value = getObj.phone;
    website.value = getObj.website;
    name.value = getObj.company.name;
    catchPhrase.value = getObj.company.catchPhrase;
    bs.value = getObj.company.bs;
    submitBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
}
function onupdateHandler(eve){
    let getId = localStorage.getItem('setId');
    // cl(getId)
    let updatedUrl = `${baseUrl}/${getId}`;
    let updatedObj ={
        empname : empname.value,
        username : username.value,
        email : email.value,
        address:{
             street : street.value,
             suit : suite.value,
            city : city.value,
            zipcode : zipcode.value,
             geo :{
                 lat : lat.value,
                lan : lng.value,
        },
    },
        phone : phone.value,
        website : website.value,
        company :{
            name : name.value,
             catchPhrase : catchPhrase.value,
             bs : bs.value,
        }
    }
    makeHttpCall('PATCH',updatedUrl,JSON.stringify(updatedObj))
}

function onDeleteHandler(eve){
    let getId = localStorage.getItem('setId');
    let deletedUrl = `${baseUrl}/${getId}`;
    makeHttpCall('DELETE',deletedUrl);
}
function templeting(arr){
    let result ="";
    arr.forEach((ele) =>{
        result +=`
        <tr>
        <td>${ele.id}</td>
        <td>${ele.empname}</td>
        <td>${ele.username}</td>
        <td>${ele.email}</td>
        <td>
            Street :${ele.address.street},
            Suite :${ele.address.suite},
            City : ${ele.address.city},
            Zipcode :${ele.address.zipcode},
        </td>
        <td>
            Lattitude:${ele.address.geo.lat},
            Longitude: ${ele.address.geo.lng},
        </td>
        <td>${ele.phone}</td>
        <td>${ele.website}</td>
        <td>
            Company-Name :${ele.company.name},
            CatchPhrase :${ele.company.catchPhrase},
            Comapny-Bs : ${ele.company.bs},
        </td>
        <td> <button class="btn btn-success" data-id="${ele.id}"onclick="onEditHandler(this)">EDIT</button></td>
        <td>  <button class="btn btn-danger" data-id="${ele.id}"onclick="onDeleteHandler(this)">DELETE</button></td>
    </tr>
        `
    })
    compData.innerHTML = result;
}

async function onsubmitHandler(eve){
    eve.preventDefault();
    let obj ={
        empname : empname.value,
        username : username.value,
        email : email.value,
        address:{
             street : street.value,
             suite : suite.value,
            city : city.value,
            zipcode : zipcode.value,
             geo :{
                 lat : lat.value,
                lng : lng.value,
        },
    },
        phone : phone.value,
        website : website.value,
        company :{
            name : name.value,
             catchPhrase : catchPhrase.value,
             bs : bs.value,
        }
    }
    cl(obj);
    postArray.push(obj);
    compInfoForm.reset();
    try{
        let responseData = await makeHttpCall('POST', baseUrl,JSON.stringify(obj))
    }catch(err){
        cl(err)
    }
}

compInfoForm.addEventListener('submit',onsubmitHandler);
updateBtn.addEventListener('click',onupdateHandler)