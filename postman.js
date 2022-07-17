console.log("Welcome");
let json = document.getElementById('json');
let params = document.getElementById('params');
let parameterBox = document.getElementById('parameterBox');
let requestJsonBox = document.getElementById('requestJsonBox');
let addParameters = document.getElementById('addParameters');
let addParamCount = 2;

//display function for addparametersdiv
function display() {
    console.log('Adding data to the parameters');
    let str = `<div class="form-group row">
 <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamCount}</label>
 <div class="col-sm-4">
     <input type="text" class="form-control"  id="parameterkey${addParamCount}" placeholder="Enter Parameter ${addParamCount} Key">
 </div>
 <div class="col-sm-4">
     <input type="text" class="form-control"  id="parametervalue${addParamCount}" placeholder="Enter Parameter ${addParamCount} Value">
 </div>
 <button class="btn btn-primary subClass"> - </button>
</div>`;
    addParameters.innerHTML += str;
    
    //Subtracting parameter box when clicked on sub button

    let subClass = document.getElementsByClassName('subClass');
    for (item of subClass) {
        item.addEventListener('click', (e) => {
            let check = confirm("Do you really want to delete this parameter?");
            if (check == true) {
                e.target.parentElement.remove();
                console.log('sub button removed');
            }
            else {
                e.preventDefault();
            }
        });
    }
    addParamCount++;
}

//Initially hiding the div for extra parameterBoxes
parameterBox.style.display = 'none';
//hiding jsonBox when params is chosen
params.addEventListener('click', function () {

    parameterBox.style.display = 'block';
    requestJsonBox.style.display = 'none';

});
json.addEventListener('click', function () {

    parameterBox.style.display = 'none';
    requestJsonBox.style.display = 'block';
});
//Adding parameter boxes on clicking on add button

let add = document.getElementById('add');
add.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('button is clicked');
    display();
});

//Extracting values and code for submit button
let data;
let response;
let content;
let url;
let submitButton = document.getElementById('submit');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    //url 
    url = document.getElementById('url').value;
    console.log(url);

    //response
    let get = document.getElementById('get');
    let post = document.getElementById('post');
    if (get.checked) {
        response = get.value;
    }
    else if (post.checked) {
        response = post.value;
    }
    console.log(response);

    //content

    let jsonc = document.getElementById('json');
    let custom = document.getElementById('params');
    if (jsonc.checked) {
        content = jsonc.value;
    }
    else if (custom.checked) {
        content = custom.value;
    }
    console.log(content);

    //parameters value
    if (content == custom.value) {
        let paramobj = {};
        for (let i = 1; i < addParamCount; i++) {
            if (document.getElementById('parameterkey' + i) != undefined) {
                let parameterkey = document.getElementById('parameterkey' + i).value;
                let parametervalue = document.getElementById('parametervalue' + i).value;
                paramobj[parameterkey] = parametervalue;
            }
        }
        
        console.log(paramobj);
        data = JSON.stringify(paramobj);

    }
    //Request Json
    else {

        requestJson = document.getElementById('requestJson').value;
        data =requestJson;
    }
    console.log(data);

    //Using Fetch Api

    //If the selected type is GET
    if (response == 'GET') {
        fetch(url).then(function (response) {
            return response.text();
        }).then(function (result) {
            console.log(result);

            let responseText = document.getElementById('responseText');
            responseText.innerHTML = result;
        })
    }
    //If the selected type is POST
    else if (response == 'POST') {
        fetch(url, {
            method: "post",
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(function (response) {
            return response.text();
        }).then(function (result) {
            console.log('result=',result);

            let responseText = document.getElementById('responseText');
            responseText.innerHTML = result;
        })
    }
})
