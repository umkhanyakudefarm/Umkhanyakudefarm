document.addEventListener('DOMContentLoaded', function () {
  var mobileBtn = document.getElementById('mobileMenuBtn');
  var navLinks = document.getElementById('navLinks');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function () {
      var isActive = navLinks.classList.toggle('active');
      mobileBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      if (isActive) {
        document.body.style.overflow = 'hidden';
        mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        document.body.style.overflow = '';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
    document.querySelectorAll('#navLinks a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--in');
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  document.querySelectorAll('.accordion-item > button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var content = item.querySelector('.accordion-content');
      var isOpen = item.classList.contains('open') || item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(function (i) {
        i.classList.remove('open');
        i.classList.remove('active');
        var c = i.querySelector('.accordion-content');
        if (c) c.style.maxHeight = 0;
      });

      if (!isOpen) {
        item.classList.add('open');
        item.classList.add('active');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }
    });
  });

  var loader = document.getElementById('pageLoader');
  if (loader) {
    window.addEventListener('load', function () {
      loader.classList.add('hide');
      setTimeout(function () { if (loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 400);
    });
  }
});
