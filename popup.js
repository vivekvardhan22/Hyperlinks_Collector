document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: fetchLinks
    });
  });
});

function fetchLinks() {
  var links = [];
  var elements = document.querySelectorAll('a');
  elements.forEach(function(element) {
    links.push({
      text: element.innerText,
      href: element.href
    });
  });

  if (links.length > 0) {
    displayLinks(links);
  } else {
    displayError('No links found on the page.');
  }
}

function displayLinks(links) {
  var ul = document.getElementById('links');
  ul.innerHTML = '';

  links.forEach(function(link) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = link.href;
    a.target = '_blank';
    a.innerText = link.text;
    li.appendChild(a);
    ul.appendChild(li);
  });

  document.getElementById('loadingIndicator').style.display = 'none';
}

function displayError(message) {
  var content = document.getElementById('content');
  content.innerHTML = '<h1>Error</h1><p>' + message + '</p>';
  document.getElementById('loadingIndicator').style.display = 'none';
}