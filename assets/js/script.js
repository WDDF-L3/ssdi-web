document.addEventListener('DOMContentLoaded', function () {
  // Navbar shadow + back-to-top visibility on scroll
  var nav = document.getElementById('mainNav');
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
    if (backToTop) backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
  });
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Animated counters (used on home + inner stat strips)
  var counters = document.querySelectorAll('.stat-box .num');
  var counted = false;
  function animateCounters() {
    if (counted) return;
    counted = true;
    counters.forEach(function (el) {
      var target = +el.getAttribute('data-count');
      var current = 0;
      var step = Math.max(1, Math.ceil(target / 60));
      var timer = setInterval(function () {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current.toLocaleString();
      }, 25);
    });
  }
  var statsStrip = document.querySelector('.stats-strip');
  if (statsStrip && counters.length) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) animateCounters(); });
    }, { threshold: 0.4 });
    statsObserver.observe(statsStrip);
  }

  // Course category filter (courses.html)
  var filterButtons = document.querySelectorAll('.filter-pills .btn');
  var courseItems = document.querySelectorAll('.course-item');
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      courseItems.forEach(function (item) {
        item.style.display = (filter === 'all' || item.getAttribute('data-cat') === filter) ? '' : 'none';
      });
    });
  });

  // Generic contact / admission form submit feedback (no backend wired up)
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var alertBox = form.querySelector('.form-alert');
      if (alertBox) {
        alertBox.classList.remove('d-none');
        form.reset();
        setTimeout(function () { alertBox.classList.add('d-none'); }, 4000);
      }
    });
  });
});
