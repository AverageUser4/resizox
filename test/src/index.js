const resizox = require('resizox');

const container = document.querySelector('.container');

function addResizable(textContent = '', options = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  const resizable = document.createElement('div');
  resizable.className = 'resizable';
  resizable.textContent = textContent;

  wrapper.append(resizable);
  container.append(wrapper);

  resizox.makeResizable(resizable, { ...options, _debug_isShowBars: true });
}

addResizable('default options');
addResizable('small barSize', { barSize: 10 });
addResizable('big barSize', { barSize: 40 });
addResizable('barSize = barOffset', { barSize: 20, barOffset: 20 });
addResizable('big barOffset', { barOffset: 40 });
addResizable('negative barOffset', { barOffset: -20 });
addResizable('isConstrained: true', { isConstrained: true });
addResizable('maxWidth: 150, maxHeight: 400', { maxWidth: 150, maxHeight: 400 });
addResizable('minWidth: 200, minHeight: 400', { minWidth: 200, minHeight: 400 });
addResizable('directions: All', { directions: 'All' });