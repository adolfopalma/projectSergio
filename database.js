    const db = firebase.firestore();
    const form = document.getElementById('contactForm');
    const container = document.getElementById('container');
    const reset = document.getElementById('reset');

    const guardarDatos = (nombre, apellido, email, fecha, sexo, how, rango, opinion, comentario) =>
        db.collection('users').doc().set({
            nombre,
            apellido,
            email,
            fecha,
            sexo,
            how,
            rango,
            opinion,
            comentario
        });

    const obtenerDatos = () => db.collection('users').get();

    window.addEventListener('DOMContentLoaded', async (e) => {
        const usuarios = await obtenerDatos();
        usuarios.forEach(doc => {
            console.log(doc.data())
            container.innerHTML += `<div class="card card-body mt-2 border-primary">
                <h3>${doc.data().nombre} ${doc.data().apellido} (${doc.data().email})</h5>
                <h5>Sexo: ${doc.data().sexo}</h5>
                <h5>Fecha de nacimiento: ${doc.data().fecha}</h5>
                <h5>Nos conociste: ${doc.data().how}</h5>             
                <h5>Tipo de juego favorito: ${doc.data().opinion}</h5>             
                <h5>Dejanos tu comentario: ${doc.data().comentario}</h5>   
                <button onclick="deleteUsers('${doc.id}')" class="btn btn-dark" style="width: 7em;align-self: flex-end;">Borrar</button>                       
            </div>`
        })
    })
    
    function send() {
        form.addEventListener('submit', async e => {    
            e.preventDefault();
            const nombre = form['nombre'];
            const apellido = form['apellido'];
            const email = form['email'];
            const fecha = form['fecha'];
            const sexo = document.querySelector('input[name="sexo"]:checked');
            const how = form['how'];
            const rango = form['rango'];
            const opinion = document.querySelector('input[name="opinion"]:checked');
            const comentario = form['texto'];
        
            await guardarDatos(nombre.value, apellido.value, email.value, fecha.value, sexo.value, how.value, rango.value, opinion.value, comentario.value);
    
            console.log("Usuario añadido");
            resetForm();
            nombre.focus();
        })
    }

    function resetForm(){
        form.reset();
        nombre.focus();
    }

    function deleteUsers(id){
            db.collection('users').doc(id).delete().then(() => {
            console.log('Usuario borrado');
            location.reload();
        })
    }
