const resizox = require('resizox');

const container = document.querySelector('.container');

function addResizable(options = {}) {
  const resizable = document.createElement('div');
  resizable.className = 'resizable';
  container.append(resizable);
  resizox.makeResizable(resizable, options);
}

addResizable();
addResizable({ barSize: 30 });
addResizable({ barSize: 30, barOffset: 50 });