async function logar(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {email,password};
    
    const response = await fetch('http://localhost:3000/usuario/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const results = await response.json();

    console.log(results)

    if(results.success) {
        localStorage.setItem("usuario", results.data[0].id)
        alert(results.message)
        location.pathname = "conta.html"
    } else {
        alert(alert.message)
    }
}

// Mudar página

if (localStorage.getItem("usuario")) {
    location.pathname = "conta.html"
}

// Modal

let elemento = document.querySelectorAll("#final")
let modal = document.querySelectorAll(".modal")
let fechar = document.querySelectorAll("#fechar-modal")

elemento[0].addEventListener('click', (e) =>{
    modal[0].style.visibility = 'visible'
})

fechar[0].addEventListener('click', (e) =>{
    modal[0].style.visibility = 'hidden'
})