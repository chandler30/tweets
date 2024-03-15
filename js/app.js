const formulario = document.getElementById('formulario');
const tweetInput = document.getElementById('tweet');
const listaTweets = document.getElementById('lista-tweets');
const borrarTweetsButton = document.querySelector('#eliminar-tweets');

const customAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('custom-alert');
  alertContainer.textContent = message;
  document.body.appendChild(alertContainer);

  setTimeout(() => {
    document.body.removeChild(alertContainer);
  }, 3000);
};

function crearTweetElemento(tweet, index) {
    const tweetContenedor = document.createElement('div');
    tweetContenedor.classList.add('tweet-container');
  
    const tweetElement = document.createElement('p');
    tweetElement.textContent = `${index + 1}. ${tweet}`;
    tweetElement.classList.add('tweet-text');
  
    const eliminarTweetButton = document.createElement('button');
    eliminarTweetButton.textContent = 'X';
    eliminarTweetButton.style.marginLeft = '1rem';
    eliminarTweetButton.dataset.index = index;
    eliminarTweetButton.classList.add('tweet-button');
    eliminarTweetButton.addEventListener('click', function () {
      borrarTweet(this.dataset.index);
    });
  
    tweetContenedor.appendChild(tweetElement);
    tweetContenedor.appendChild(eliminarTweetButton);
  
    return tweetContenedor;
  }

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const tweet = tweetInput.value;

  if (tweet.trim() === '') {
    customAlert('Por favor, ingresa un tweet');
    return;
  }

  guardarTweetEnLocalStorage(tweet);
  mostrarTweets();

  tweetInput.value = '';
});


function guardarTweetEnLocalStorage(tweet) {
  let tweets;

  if (localStorage.getItem('tweets') === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }

  tweets.push(tweet);
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function mostrarTweets() {
  listaTweets.innerHTML ='';

  if (localStorage.getItem('tweets') !== null) {
    const tweets = JSON.parse(localStorage.getItem('tweets'));

    tweets.forEach(function (tweet, index) {
      const tweetContenedor = crearTweetElemento(tweet, index);
      listaTweets.appendChild(tweetContenedor);
    });
  }
}

function borrarTweet(index) {
  let tweets = JSON.parse(localStorage.getItem('tweets'));
  tweets.splice(index, 1);
  localStorage.setItem('tweets', JSON.stringify(tweets));
  mostrarTweets();
}

mostrarTweets();

const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});