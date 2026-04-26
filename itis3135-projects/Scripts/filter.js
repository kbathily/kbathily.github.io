/*
 * filter.js
 * Interaction 2: Product texture filter for shop.html.
 * Clicking a filter button shows only cards matching that texture category.
 * Active button style is updated to reflect the current selection.
 * Author: K Bathily | ITIS 3135 Spring 2026
 */
(function () {
  function init() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.card[data-texture]');

    if (!filterBtns.length || !cards.length) { return; }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var selected = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) { b.classList.remove('filter-selected'); });
        btn.classList.add('filter-selected');

        cards.forEach(function (card) {
          if (selected === 'all' || card.getAttribute('data-texture') === selected) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  window.addEventListener('load', init);
}());
