// ====== NAVBAR ======
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ====== HAMBURGER ======
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeNav = document.getElementById('closeNav');
if (hamburger) {
  hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  closeNav.addEventListener('click', () => mobileNav.classList.remove('open'));
}

// ====== HERO SLIDER ======
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
if (slides.length) {
  const nextSlide = () => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  };
  setInterval(nextSlide, 5000);
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = +dot.dataset.i;
      slides[current].classList.add('active');
      dot.classList.add('active');
    });
  });
}

// ====== ROOMS SLIDER ======
const slider = document.querySelector('.rooms-slider');
const prevBtn = document.getElementById('prevRoom');
const nextBtn = document.getElementById('nextRoom');
if (slider && prevBtn && nextBtn) {
  nextBtn.addEventListener('click', () => slider.scrollBy({ left: 310, behavior: 'smooth' }));
  prevBtn.addEventListener('click', () => slider.scrollBy({ left: -310, behavior: 'smooth' }));
}

// ====== REVEAL ON SCROLL ======
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ====== BOOKING FORM ======
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✅ Booking request submitted! We\'ll call you within 2 hours.');
    bookingForm.reset();
  });
}

// ====== CONTACT FORM ======
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('✅ Message sent! We\'ll get back to you shortly.');
    contactForm.reset();
  });
}

// ====== TOAST ======
function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed; bottom:100px; left:50%; transform:translateX(-50%);
    background:#C9A84C; color:#0D1410; padding:16px 32px;
    border-radius:50px; font-size:14px; font-weight:500;
    z-index:9999; box-shadow:0 8px 32px rgba(0,0,0,0.4);
    animation: fadeInUp 0.4s ease;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

// ====== FILTER BUTTONS ======
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ====== LIGHTBOX (Gallery) ======
const galleryImgs = document.querySelectorAll('.gallery-full-grid img, .gallery-masonry img');
galleryImgs.forEach(img => {
  img.addEventListener('click', () => {
    const lb = document.createElement('div');
    lb.style.cssText = `
      position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:9999;
      display:flex; align-items:center; justify-content:center; cursor:pointer;
    `;
    const i = document.createElement('img');
    i.src = img.src;
    i.style.cssText = 'max-width:90vw; max-height:90vh; border-radius:12px; object-fit:contain;';
    lb.appendChild(i);
    lb.addEventListener('click', () => lb.remove());
    document.body.appendChild(lb);
  });
});

// ====== BOOKING SUMMARY LIVE UPDATE ======
const roomSelect = document.getElementById('roomSelect');
const summaryRoom = document.getElementById('summaryRoom');
const summaryPrice = document.getElementById('summaryPrice');
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');
const summaryNights = document.getElementById('summaryNights');
const summaryTotal = document.getElementById('summaryTotal');

const prices = {
  'Forest Harmony': 2800,
  'Panorama Rise': 3400,
  'Romantic Bloom': 3900,
  'Wild Soul': 3600,
  'Zen Retreat': 3800,
  'Family Villa': 4500,
  'Luxury Suite': 6500,
};

function updateSummary() {
  if (!roomSelect || !summaryRoom) return;
  const room = roomSelect.value;
  const price = prices[room] || 2800;
  if (summaryRoom) summaryRoom.textContent = room || '—';
  if (summaryPrice) summaryPrice.textContent = room ? `₹${price.toLocaleString()}/night` : '—';

  if (checkin?.value && checkout?.value) {
    const d1 = new Date(checkin.value);
    const d2 = new Date(checkout.value);
    const nights = Math.max(1, Math.round((d2 - d1) / 86400000));
    if (summaryNights) summaryNights.textContent = `${nights} night${nights > 1 ? 's' : ''}`;
    if (summaryTotal) summaryTotal.textContent = `₹${(price * nights).toLocaleString()}`;
  }
}

if (roomSelect) roomSelect.addEventListener('change', updateSummary);
if (checkin) checkin.addEventListener('change', updateSummary);
if (checkout) checkout.addEventListener('change', updateSummary);