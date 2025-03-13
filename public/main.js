'use strict';

document.getElementById('requestBtn').addEventListener('click', function () {
    const urlApi = document.getElementById('urlValue').value;
    const methodRequest = document.getElementById('method').value || 'GET';
    let requestBody = document.getElementById('requestBody').value || '';

    if (urlApi === '') {
        alert('Debes ingresar una URL');
        return;
    }

    // Validar métodos soportados
    const validMethods = ['GET', 'POST'];
    if (!validMethods.includes(methodRequest)) {
        alert('Método HTTP no soportado.');
        return;
    }

    // Intentar parsear el JSON si el método es POST
    if (methodRequest === 'POST' && requestBody !== '') {
        try {
            requestBody = JSON.parse(requestBody);
        } catch (error) {
            alert('El cuerpo de la solicitud no es un JSON válido.');
            console.error('Error:', error);
            return;
        }
    }

    // Llamar a la función correspondiente
    if (methodRequest === 'GET') {
        getRequest(urlApi);
    } else if (methodRequest === 'POST') {
        postRequest(urlApi, requestBody);
    }
});

async function postRequest(urlApi, bodyRequest) {
    try {
        const response = await fetch(urlApi, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:8080'
            },
            body: JSON.stringify(bodyRequest)
        });

        if (!response.ok) throw new Error('Error en la llamada a la API');

        const data = await response.json();
        console.log(data);
        document.getElementById('output').innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getRequest(urlApi) {
    try {
        const response = await fetch(urlApi, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:8080'
            }
        });

        if (!response.ok) throw new Error('Error en la llamada a la API');

        const data = await response.json();
        console.log(data);
        document.getElementById('output').innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error:', error);
    }
}
