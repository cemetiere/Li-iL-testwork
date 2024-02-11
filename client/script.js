let services = []
let children = {}

fetch("http://localhost:3000/services")
    .then(data => data.json())
    .then(data => services = data.services)
    .then(()=>main())
   
function main(){
    let rootDom = document.getElementById('services')
    let rootIds = [];
    services.forEach((service)=>{
        if(service.price == 0 ) service.price = ""
        children[service.id] = []
        if (service.head !== null) {
            children[service.head].push(service.id)
        } else {
            rootIds.push(service.id)
        }
    })

    rootIds.sort(compareForService).forEach((id) => {
        createElement(id, rootDom);
    })
}

function createElement(elementId, parentDom){
    let service = services.find((v) => v.id === elementId)
    let el = document.createElement('li')
    if(service.node == 1){
        button = document.createElement('button')
        button.setAttribute('class', 'nodeButton')
        button.innerHTML = '&#9658;'
        button.clicked = true
        el.appendChild(button)
        button.onclick =  (event)=>handleClick(el.id, event.target)
    } else {
        el.style.marginLeft = '25px'
    }

    el.appendChild(document.createTextNode(service.name + " " + service.price))
    el.setAttribute('id', "el"+service.id)
    parentDom.appendChild(el)

    children[elementId].sort(compareForService).forEach((childId) => {
        createElement(childId, el)
    })
}

function handleClick(id, button){
    children = document.querySelectorAll("#"+id+" > li")
    button.clicked = !button.clicked
    children.forEach((element)=>{
        if(button.clicked == true){
            element.style.display =''
        } else {
            element.style.display = 'none'
        }     
    })
    if(button.clicked == true){
        button.style.transform = 'rotate(90deg)'
    } else {
        button.style.transform = 'rotate(0deg)'
    }
}

function compareForService(a, b) {
    const first = services.find((v) => v.id === a)
    const second = services.find((v) => v.id === b)
    return first.sorthead - second.sorthead
}