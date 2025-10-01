const sections = document.querySelectorAll('.reveal');
const progressCircle = document.querySelector('[data-progress-circle]');
const progressNumber = document.querySelector('[data-progress-number]');
const fileInput = document.getElementById('file');
const uploadLabel = document.querySelector('.upload-label');

if (sections.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach(section => observer.observe(section));
}

if (progressCircle && progressNumber) {
  const radius = Number(progressCircle.getAttribute('r'));
  const circumference = 2 * Math.PI * radius;
  let current = 78;
  let direction = 1;

  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;

  const setProgress = value => {
    const offset = circumference - (value / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset.toFixed(2);
    progressNumber.textContent = `${Math.round(value)}%`;
  };

  const animate = () => {
    current += direction * 0.2;

    if (current >= 82 || current <= 74) {
      direction *= -1;
    }

    setProgress(current);
    requestAnimationFrame(animate);
  };

  setProgress(current);
  requestAnimationFrame(animate);
}

if (fileInput && uploadLabel) {
  fileInput.addEventListener('change', event => {
    const name = event.target.files?.[0]?.name;
    if (name) {
      uploadLabel.textContent = `Wybrano: ${name}`;
    }
  });
}
