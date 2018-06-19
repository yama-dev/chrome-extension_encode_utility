
/**
 * ClipCopy function.
 * @textVal : str
 * @return  : (true|false)
 */
function copyTextToClipboard(textVal){
  var copyFrom = document.createElement('textarea');
  copyFrom.textContent = textVal;
  var bodyElm = document.getElementsByTagName('body')[0];
  bodyElm.appendChild(copyFrom);
  copyFrom.select();
  var returnVal = document.execCommand('copy');
  bodyElm.removeChild(copyFrom);
  return returnVal;
}

chrome.tabs.getSelected(null, function(tab){
  document.querySelector('body').style.width = (tab.width*0.45) + 'px';
  document.querySelector('body').style.minHeight = (tab.height*0.2) + 'px';
});

chrome.tabs.getSelected(null, function(tab){  
  chrome.tabs.sendMessage(tab.id, {title:''}, function(response) {
    const url = tab.url;
    const text = response.text;
    const count = response.count;
    document.querySelector('#inputBefore').innerHTML = text;
    document.querySelector('.input-before-count').innerHTML = count;
    document.querySelector('form').inputAfter.value = encodeURI(text);
  });
});

let elemBtnEncode = document.querySelector('.btn-encode');
elemBtnEncode.addEventListener('click', (e) => {
  let text = document.querySelector('form').inputBefore.value;
  let count = document.querySelector('form').inputBefore.value.length;
  if(count == 0){
    alert(' Text has not been entered. ');
  }
  document.querySelector('form').inputBefore.value = text;
  document.querySelector('.input-before-count').innerHTML = count;
  document.querySelector('form').inputAfter.value = encodeURI(text);
});

const elemBtnCopy = document.querySelector('.btn-copy');
elemBtnCopy.addEventListener('click', (e) => {
  copyTextToClipboard(document.querySelector('form').inputAfter.value);
  alert(' Copy completion. ');
});

