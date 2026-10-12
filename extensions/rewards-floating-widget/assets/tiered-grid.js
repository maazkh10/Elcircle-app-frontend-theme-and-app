document.addEventListener('DOMContentLoaded', () => {
  // Safe validation check to move modals to document root body context
  ['luxuryEnquiryModal', 'luxuryQuickViewModal'].forEach(id => {
    const modal = document.getElementById(id);
    if (modal && modal.parentNode !== document.body) {
      document.body.appendChild(modal);
    }
  });
});

/**
 * POPUP 1: Opens the Quick View Modal Window
 */
function openQuickViewModal(productTitle, productImage, productDescription) {
  const modal = document.getElementById("luxuryQuickViewModal");
  
  document.getElementById("qvProductTitle").textContent = productTitle;
  document.getElementById("qvProductImage").src = productImage;
  document.getElementById("qvProductDesc").innerHTML = productDescription || "No registration specifications outlined for this high-tier selection.";

  modal.classList.add("is-active");
  modal.setAttribute("aria-hidden" , "false");
  document.body.classList.add("luxury-modal-open");
}

/**
 * POPUP 2: Opens the Request Enquiry Consultation Modal Form
 */
function openEnquiryModal(productId, productTitle, productImage, customerId, customerEmail) {
  const modal = document.getElementById("luxuryEnquiryModal");

  document.getElementById("modalProductTitle").textContent = productTitle;
  document.getElementById("modalProductImage").src = productImage;

  document.getElementById("formProductId").value = productId;
  document.getElementById("formCustomerId").value = customerId;
  document.getElementById("formCustomerEmail").value = customerEmail;

  // Show form, reset success state
  document.getElementById("luxuryEnquiryForm").style.display = "block";
  document.getElementById("formSuccessMessage").style.display = "none";

  modal.classList.add("is-active");
  modal.setAttribute("aria-hidden" , "false");
  document.body.classList.add("luxury-modal-open");

  // Endpoint analytics entry track trigger
  fetch(`http://localhost:54098/apps/luxury-analytics/track?product_id=${productId}`, {
    method: "POST",
    headers : { "Content-Type" : "application/json" },
    body: JSON.stringify({ productId, customerId, customerEmail })
  })
  .then((res) => res.json())
  .then((data) => console.log("TRACK SUCCESS", data))
  .catch((err) => console.error("TRACK ERROR", err));
}

/**
 * Universal Close Modal Helper
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden" , "true");
    document.body.classList.remove("luxury-modal-open");
  }
}

function handleEnquirySubmit(event) {
  event.preventDefault();
  document.getElementById("luxuryEnquiryForm").style.display = "none";
  document.getElementById("formSuccessMessage").style.display = "block";
}

function handleLockedItemClick(requiredTier) {
  alert(`This premium selection requires ${requiredTier.toUpperCase()} status. Let's redirect you to purchase/unlock your membership points.`);
  window.location.href = "/pages/loyalty-rewards";
}

// Global windows scope exposures
window.openQuickViewModal = openQuickViewModal;
window.openEnquiryModal = openEnquiryModal;
window.closeModal = closeModal;
window.handleEnquirySubmit = handleEnquirySubmit;
window.handleLockedItemClick = handleLockedItemClick;