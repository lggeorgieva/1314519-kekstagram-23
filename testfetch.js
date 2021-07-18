    const GET_URL  = 'https://23.javascript.pages.academy/kekstagram/data';
    const POST_URL = 'https://23.javascript.pages.academy/kekstagram';
    const buttonElt = document.getElementById('button');
    const response1Elt = document.getElementById('response1');
    const response2Elt = document.getElementById('response2');
    const response3Elt = document.getElementById('response3');
    const response4Elt = document.getElementById('response4');

    function get() {
      fetch(GET_URL)
      //fetch(POST_URL)
      .then(x => {
        console.log(x.status);
        //response1Elt.innerHTML = x.status;
        return x;
      })
      .then(x => {
        console.log(x.ok);
        //response2Elt.innerHTML = x.ok;
        return x.json();
      })
      .then(x => {
        console.log(x);
        //response3Elt.innerHTML = x;
        return JSON.stringify(x);
      })
      .then(x => {
        console.log(x);
        //response4Elt.innerHTML = x;
      })
      .catch(e => {
        console.log(e);
      });
    }

    //setTimeout(get, 3000);
    buttonElt.addEventListener('click', get);
