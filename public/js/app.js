function query(id){
    return document.querySelector(id);
}

function create(data){
    fetch('http://localhost:4005/expand',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(res=>{
        res.json().then((data)=>{
            console.log(data.url);
            query('.field1').textContent=data.url
        })
    })
    .catch(err=>{
        console.log(err);
    })
}




query('.button1').addEventListener('click',(e)=>{
    var url=query('.input').value;
    e.preventDefault()
    const data={
        url:url
    }
    console.log(url)
       create(data);
});


