// Tahun otomatis di footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Progress bar skill terisi saat terlihat di layar
const bars = document.querySelectorAll('.progress-bar[data-width]');
if (bars.length) {
  const fill = el => { el.style.width = el.dataset.width + '%'; };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { fill(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.4 });
    bars.forEach(b => io.observe(b));
  } else { bars.forEach(fill); }
}

// Formulir kontak: validasi, lalu buka aplikasi email
const form = document.getElementById('contactForm');
if (form) {
  // EDIT: email tujuan
  const TARGET_EMAIL = 'popohmaulana5@gmail.com';
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input, textarea').forEach(f => {
      const ok = f.checkValidity() && f.value.trim() !== '';
      f.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) return;
    const v = id => document.getElementById(id).value.trim();
    const body = `Nama: ${v('nama')}\nEmail: ${v('email')}\n\n${v('pesan')}`;
    window.location.href = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(v('subjek'))}&body=${encodeURIComponent(body)}`;
    form.reset();
  });
}
