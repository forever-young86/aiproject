async function getJsonData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const jsonData = await response.json();
    console.log(jsonData);
    /* let parentTag = document.getElementById("json");
    for (let i = 0; i < jsonData.length; i++) {
        let childTag_userid = document.createElement('p');
        let childTag_id = document.createElement('p');
        let childTag_title = document.createElement('p');
        let childTag_body = document.createElement('p');
        childTag_userid.innerHTML = "userid : "+ jsonData[i].userId +"<br />";
        childTag_id.innerHTML = "id : "+ jsonData[i].id +"<br />";
        childTag_title.innerHTML = "title : "+ jsonData[i].title +"<br />";
        childTag_body.innerHTML = "body : "+ jsonData[i].body +"<br />";
        parentTag.appendChild(childTag_userid);
        parentTag.appendChild(childTag_id);
        parentTag.appendChild(childTag_title);
        parentTag.appendChild(childTag_body);
    } */
}

getJsonData();