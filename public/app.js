document.addEventListener("click", event => {
    if (event.target.dataset.type === 'remove'){
        const id = event.target.dataset.id
        remove(id)
            .then(event.target.closest('li').remove())
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    })
}

document.addEventListener("click", event  => {
    if (event.target.dataset.type === 'edit'){
        const id = event.target.dataset.id
        edit(id)
            .then(res => console.log(res))
    }
})

async function edit(id) {
    const result = prompt('Please enter new title')
    console.log(result)
    if (result){
        await fetch(`/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                title: result
            })
        })
        location.reload()
    }
}