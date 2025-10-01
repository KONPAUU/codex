const sections = document.querySelectorAll('.reveal');
const progressNumber = document.querySelector('.progress-number');
const progressCircle = document.querySelector('.progress-value');
const demoBtn = document.getElementById('demo-btn');
const fileInput = document.getElementById('file');
const uploadLabel = document.querySelector('.upload-label');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
  }
);

sections.forEach(section => observer.observe(section));

if (progressCircle && progressNumber) {
  let direction = 1;
  let percentage = 78;

  const updateProgress = () => {
    percentage += direction * 0.3;

    if (percentage >= 92 || percentage <= 72) {
      direction *= -1;
    }

    const normalized = Math.max(0, Math.min(100, percentage));
    const circumference = 2 * Math.PI * 54;
    const offset = circumference * (1 - normalized / 100);

    progressCircle.style.strokeDashoffset = offset.toFixed(2);
    progressNumber.textContent = `${Math.round(normalized)}%`;
  };

  setInterval(updateProgress, 90);
}

const ripple = event => {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add('ripple');

  const rippleElement = button.getElementsByClassName('ripple')[0];

  if (rippleElement) {
    rippleElement.remove();
  }

  button.appendChild(circle);
};

const primaryButtons = document.querySelectorAll('.cta.primary');
primaryButtons.forEach(button => button.addEventListener('click', ripple));

if (demoBtn) {
  demoBtn.addEventListener('click', () => {
    const heroVisual = document.querySelector('.hero-visual');
    heroVisual.classList.add('flash');
    setTimeout(() => heroVisual.classList.remove('flash'), 1500);
  });
}

if (fileInput && uploadLabel) {
  fileInput.addEventListener('change', event => {
    const fileName = event.target.files?.[0]?.name;
    if (fileName) {
      uploadLabel.textContent = `Wybrano: ${fileName}`;
    }
  });
}
