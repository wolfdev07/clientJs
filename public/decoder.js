'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const decodeBase64Btn = document.getElementById('decodeB64');
    const encodeBase64Btn = document.getElementById('encodeB64');
    const decodeUriBtn = document.getElementById('decodeUri');
    const encodeUriBtn = document.getElementById('encodeUri');
    const copyFromReqBtn = document.getElementById('copyFromReq');
    const copyFromResBtn = document.getElementById('copyFromRes');
    const copyFromCbBtn = document.getElementById('copyFromCb');
    const copyToReqBtn = document.getElementById('copyToReq');
    const copyToResBtn = document.getElementById('copyToRes');
    const copyToCbBtn = document.getElementById('copyToCb');
    let decoderTextArea = document.getElementById('decoderTextArea');
    let requestBodyArea = document.getElementById('requestBody');
    let responseTextArea = document.getElementById('responseTextArea');

    decodeBase64Btn.addEventListener('click', () => {
        const inputText = decoderTextArea.value;
        if(inputText === '') { console.error("Text void"); return;}
        let decodedValue = decodeBase64(inputText);
        decoderTextArea.value = decodedValue;
    });

    encodeBase64Btn.addEventListener('click', () => {
        const inputText = decoderTextArea.value;
        if(inputText === '') { console.error("Text void"); return;}
        let encodedValue = encodeBase64(inputText);
        decoderTextArea.value = encodedValue;
    });

    decodeUriBtn.addEventListener('click', () => {
        const inputText = decoderTextArea.value;
        if(inputText === '') { console.error("Text void"); return;}
        let decodedValue = urlParseDecode(inputText);
        decoderTextArea.value = decodedValue; 
    });

    encodeUriBtn.addEventListener('click', () => {
        const inputText = decoderTextArea.value;
        if(inputText === '') { console.error("Text void"); return;}
        let encodedValue = urlParseEncode(inputText);
        decoderTextArea.value = encodedValue;
    });

    copyFromReqBtn.addEventListener('click', () => {
        if(requestBodyArea.value === '') { console.error("Text void"); return;}
        decoderTextArea.value = requestBodyArea.value;
    });
    
    copyFromResBtn.addEventListener('click', () => {
        if(responseTextArea.value === '') { console.error("Text void"); return; }
        decoderTextArea.value = responseTextArea.value;
    });

    copyFromCbBtn.addEventListener('click', () => {
        try {
            navigator.clipboard.readText()
            .then(textOnCb => {
                if(textOnCb === ''){ console.error("Text void"); return; }
                decoderTextArea.value = textOnCb;
            })
            .catch(error => {
                console.error("Error", error)
            });
        } catch (error) {
            console.error("Error" + error.message);
        }
    });

    copyToReqBtn.addEventListener('click', () => {
        if(decoderTextArea.value === ''){ console.error("Text Void"); return; }
        requestBodyArea.value = decoderTextArea.value;
    });

    copyToResBtn.addEventListener('click', () => {
        if(decoderTextArea.value === ''){ console.error("Text Void"); return; }
        responseTextArea.value = decoderTextArea.value;
    });

    copyToCbBtn.addEventListener('click', () => {
        if(decoderTextArea.value === ''){ console.error("Text Void"); return; }
        try {
            navigator.clipboard.writeText(decoderTextArea.value);
            alert("Tex copy to clipboard");
        } catch (error) {
            console.error('Error:' + error.message);
        }
    });
});


function decodeBase64(textB64) {
    try {
        let decoded = atob(textB64);
        return decoded;
    } catch (error) {
        alert('Error decoding Base64: ' + error.message);
    }
}

function encodeBase64(text) {
    try {
        let encoded = btoa(text);
        return encoded;
    } catch (error) {
        alert('Error encoding Base64: ' + error.message);
    }
}

function urlParseDecode(textUriEncode) {
    try {
        let decode = decodeURIComponent(textUriEncode);
        return decode;
    } catch (error) {
        alert('Error Uri decoding' + error.message);
    }
}

function urlParseEncode(text) {
    try {
        let encode = encodeURIComponent(text);
        return encode;
    } catch (error) {
        alert('Error encoding URI: ' + error.message);
    }
}
