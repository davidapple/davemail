chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    'outerBounds': {
      'width': 940,
      'height': 720
    }
  });
});