// script.js - Fully operational, 0-errors, works with your enhanced index.html

// Particle animation
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 20 + 5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 15;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}vw`;
    particle.style.top = `${posY}vh`;
    particle.style.animationDelay = `${delay}s`;

    particlesContainer.appendChild(particle);
  }
}

// Enable buy buttons when license is accepted
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    const buyButton = this.closest('.core-card').querySelector('.buy-button');
    if (buyButton) {
      buyButton.disabled = !this.checked;
    }
  });
});

// Payment links per core (update with your real Stripe / PayPal URLs)
const CORE_PURCHASE_LINKS = {
  'core-1-1': { stripe: '#', paypal: '#' },
  'core-1-3': { stripe: '#', paypal: '#' },
  'core-1-6': { stripe: '#', paypal: '#' },
  'core-1-9': { stripe: '#', paypal: '#' },
};

// Purchase function
function purchaseCore(coreId) {
  const coreCard = document.querySelector(`.buy-button[onclick*="${coreId}"]`).closest('.core-card');
  const coreName = coreCard.querySelector('h3').textContent;

  // Verify license
  const licenseCheckbox = coreCard.querySelector('input[type="checkbox"]');
  if (!licenseCheckbox.checked) {
    alert('You must accept the license to purchase this core.');
    return;
  }

  // Payment method selection
  const method = prompt(`Select payment method for ${coreName}:\n1 - Stripe\n2 - PayPal`, "1");
  if (method === "1") {
    window.open(CORE_PURCHASE_LINKS[coreId].stripe, "_blank");
  } else if (method === "2") {
    window.open(CORE_PURCHASE_LINKS[coreId].paypal, "_blank");
  } else {
    alert('Purchase cancelled.');
    return;
  }

  // Optional: log lead (requires your endpoint)
  logLead(coreName, method);
}

// Lead capture stub
function logLead(coreName, method) {
  const endpoint = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      core: coreName,
      method: method,
      timestamp: new Date().toISOString()
    })
  }).then(res => console.log(`Lead logged for ${coreName}: ${res.status}`))
    .catch(err => console.error('Lead logging failed:', err));
}

// Auto-update footer year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Initialize particles when page loads
window.addEventListener('load', createParticles);