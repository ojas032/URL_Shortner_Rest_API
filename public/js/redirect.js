function Redirect() {
    console.log(window.location.href) 

    const url=window.location.href;
    const code=url.slice(-4)
    console.log(code)
    const arr=url.split('/')

    const newString='http://'+arr[2]+'/short/'+arr[4];
    console.log(newString)

    fetch(newString).then((result)=>{
        console.log(result.json().then((data)=>{
            console.log(data.short)
            window.location=data.short
        }))
    }).catch((err)=>{
        console.log(err)
    })

}

Redirect()

