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
      setTimeout(function () { if (loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 500);
    });
  }

  // Particle Background
  var particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    var particleCount = 25;
    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement('div');
      particle.classList.add('particle');
      var size = Math.random() * 4 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      var delay = Math.random() * 15;
      var duration = Math.random() * 10 + 10;
      particle.style.animationDelay = delay + 's';
      particle.style.animationDuration = duration + 's';
      particle.style.backgroundColor = Math.random() > 0.5 ? 'rgba(42, 110, 187, 0.1)' : 'rgba(34, 139, 34, 0.1)';
      particlesContainer.appendChild(particle);
    }
  }

  // 3D Hover Effects for Cards
  function handle3DHover(elements, rotateFactor) {
    elements.forEach(function(el) {
      el.addEventListener('mousemove', function(e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateY = (x - centerX) / (rotateFactor || 30);
        var rotateX = (centerY - y) / (rotateFactor || 30);
        el.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px)';
      });
      el.addEventListener('mouseleave', function() {
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  handle3DHover(document.querySelectorAll('.product-card'), 25);
  handle3DHover(document.querySelectorAll('.card'), 30);
  handle3DHover(document.querySelectorAll('.location-text'), 40);
  handle3DHover(document.querySelectorAll('.location-map'), 40);
  handle3DHover(document.querySelectorAll('.accordion-item'), 50);
  
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var whatsappNumber = '26878552994';
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var nameEl = document.getElementById('name');
      var phoneEl = document.getElementById('phone');
      var emailEl = document.getElementById('email');
      var messageEl = document.getElementById('message');
      var orderTypeEl = document.getElementById('orderType');
      var name = nameEl ? nameEl.value.trim() : '';
      var phone = phoneEl ? phoneEl.value.trim() : '';
      var email = emailEl ? emailEl.value.trim() : '';
      var message = messageEl ? messageEl.value.trim() : '';
      var orderType = orderTypeEl ? orderTypeEl.value.trim() : '';
      var lines = ['Hello Umkhanyakude Farm', '', 'Name: ' + name, 'Phone: ' + phone, 'Email: ' + email];
      if (orderType) lines.push('Order: ' + orderType);
      if (message) lines.push('Details: ' + message);
      var waText = lines.join('\n');
      var waUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(waText);
      var formData = new FormData(form);
      var src = (location.pathname.split('/').pop() || 'unknown');
      formData.append('source', src);
      fetch(form.action || 'https://formspree.io/f/mqekjjzl', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      }).catch(function(){});
      var notification = document.createElement('div');
      notification.style.cssText = 'position: fixed; top: 100px; right: 20px; background: linear-gradient(45deg, var(--green), var(--blue)); color: white; padding: 20px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,255,136,0.5); z-index: 9999; max-width: 300px; transform: translateX(400px); transition: transform 0.5s ease; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);';
      notification.innerHTML = '<h3>Thank you ' + name + '!</h3><p>We have sent your message to our email and opened WhatsApp.</p>';
      document.body.appendChild(notification);
      setTimeout(function(){ notification.style.transform = 'translateX(0)'; }, 10);
      setTimeout(function(){ notification.style.transform = 'translateX(400px)'; setTimeout(function(){ if (notification.parentNode) notification.parentNode.removeChild(notification); }, 500); }, 5000);
      form.reset();
      window.location.href = waUrl;
    });
  }
  
  initContactForm();

});
