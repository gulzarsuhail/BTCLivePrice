var amount = document.getElementById('usd');
var bg = document.getElementById('cover');
var priceUp = true;
var previousRate = 0;

function repaintBackground(){
  if (priceUp){
    bg.style.backgroundColor = '#52c234';
  } else {
   bg.style.backgroundColor = '#ff3b3b';
  }
}

function setPrice(usd){
  amount.innerHTML = usd;
  var currentRate = parseFloat(usd.replace(/,/g, ''));
  if (currentRate >= previousRate && !priceUp){
    priceUp = true;
    repaintBackground()
  } else if (currentRate < previousRate && priceUp){
    priceUp = false;
    repaintBackground();
  }
  previousRate = currentRate;
}

var getPriceInProgress = false;

function getPrice(){
  if (!(getPriceInProgress)){
    getPriceInProgress = true;
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function(){
      if (XHR.readyState == 4 && XHR.status == 200){
        var res = JSON.parse(XHR.responseText);
        setPrice(res.bpi.USD.rate)
      }
      getPriceInProgress = false;
    }
    XHR.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');
    XHR.send()
  }
}

window.onload = function(){
    setInterval(getPrice, 2500);
    getPrice();
}