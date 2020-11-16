function query(id){
    return document.querySelector(id);
}

query('.button').addEventListener('click',(e)=>{
    var short=query('.input').value;
    console.log(short)
    e.preventDefault()
    fetch('http://localhost:4005/short/'+short).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            query('.field2').textContent=data.short;

        })
    })
})
