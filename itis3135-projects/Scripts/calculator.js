/*
 * calculator.js
 * Interaction 3: Bundle price calculator for product-details.html.
 * Selecting a hair length range and bundle count updates the estimated price live.
 * Author: K Bathily | ITIS 3135 Spring 2026
 */
(function () {
  var PRICES = {
    '10-14': 30,
    '16-18': 40,
    '20-22': 50,
    '24-26': 65,
    '28-30': 80
  };

  function init() {
    var lengthSelect = document.getElementById('calc-length');
    var countSelect = document.getElementById('calc-count');
    var output = document.getElementById('calc-total');

    if (!lengthSelect || !countSelect || !output) { return; }

    function update() {
      var basePrice = PRICES[lengthSelect.value] || 0;
      var count = parseInt(countSelect.value, 10) || 1;
      var total = basePrice * count;
      output.textContent = total > 0
        ? 'Estimated Total: $' + total
        : 'Select a length range above to see pricing.';
    }

    lengthSelect.addEventListener('change', update);
    countSelect.addEventListener('change', update);
    update();
  }

  window.addEventListener('load', init);
}());
