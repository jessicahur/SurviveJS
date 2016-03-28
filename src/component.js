module.exports = function () {
  var element = document.createElement('h1');
  var place = "Mars";

  element.innerHTML = `Hello ${place}`;

  return element;
};
