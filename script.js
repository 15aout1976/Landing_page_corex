// CoreSuite Landing Page Script
// Author: Mourad Soltani, Global AI Architect
// Company: Gaiva&Aether AI Architecture

/**
 * Handles core purchase workflow
 * @param {string} coreId - Core identifier (core-1-1, core-1-3, etc.)
 */
function purchaseCore(coreId) {
  const licenseAccepted = document.getElementById(`licenseAccept-${coreId}`).checked;
  
  if (!licenseAccepted) {
    alert("⚠ You must accept the CoreSuite License to proceed.");
    return;
  }

  // Choose payment method
  const paymentMethod = prompt(
    "Enter payment method:\nType 'stripe' or 'paypal' to proceed."
  )?.toLowerCase();

  if (!paymentMethod || (paymentMethod !== "stripe" && paymentMethod !== "paypal")) {
    alert("⚠ Invalid payment method. Please enter 'stripe' or 'paypal'.");
    return;
  }

  // Map core to payment URL
  const paymentUrls = {
    "core-1-1": {stripe: "https://your-stripe-checkout-link/core-1-1", paypal: "https://your-paypal-checkout-link/core-1-1"},
    "core-1-3": {stripe: "https://your-stripe-checkout-link/core-1-3", paypal: "https://your-paypal-checkout-link/core-1-3"},
    "core-1-6": {stripe: "https://your-stripe-checkout-link/core-1-6", paypal: "https://your-paypal-checkout-link/core-1-6"},
    "core-1-9": {stripe: "https://your-stripe-checkout-link/core-1-9", paypal: "https://your-paypal-checkout-link/core-1-9"}
  };

  const url = paymentUrls[coreId][paymentMethod];

  if (!url) {
    alert("⚠ Payment URL not found. Please contact support.");
    return;
  }

  // Open payment page in new tab
  window.open(url, "_blank");

  // Optional: send lead info to Apps Script for dashboard logging
  sendLeadToDashboard(coreId, paymentMethod);
}

/**
 * Sends lead info to Google Apps Script dashboard
 * @param {string} coreId - Core identifier
 * @param {string} paymentMethod - 'stripe' or 'paypal'
 */
function sendLeadToDashboard(coreId, paymentMethod) {
  const name = prompt("Enter your name:");
  const email = prompt("Enter your email:");
  const company = prompt("Enter your company (optional):") || "N/A";

  const dashboardUrl = "https://script.google.com/macros/s/YOUR_APPS_SCRIPT_DEPLOYMENT_ID/exec";

  const payload = new URLSearchParams({
    name: name,
    email: email,
    company: company,
    coreId: coreId,
    paymentMethod: paymentMethod
  });

  fetch(dashboardUrl, {
    method: "POST",
    body: payload
  })
  .then(response => response.text())
  .then(data => console.log("Dashboard updated:", data))
  .catch(err => console.error("Dashboard error:", err));
}