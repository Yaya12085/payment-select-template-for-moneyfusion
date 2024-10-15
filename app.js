let iti; // Variable globale pour stocker l'instance intlTelInput

function createPaymentForm() {
  const optionsContainer = document.getElementById("paymentOptions");

  // Création des boutons de choix de paiement
  paymentOptions.forEach((option) => {
    const button = document.createElement("button");
    button.className =
      "payment-option bg-white border border-gray-300 rounded-md p-2 flex flex-col items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-green-500";
    button.setAttribute("data-option", option.name);
    button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${option.icon}" />
            </svg>
            ${option.name}
        `;
    optionsContainer.appendChild(button);
  });

  // Ajout des event listeners aux boutons de choix de paiement
  document.querySelectorAll(".payment-option").forEach((button) => {
    button.addEventListener("click", function () {
      const selectedOption = paymentOptions.find(
        (opt) => opt.name === this.getAttribute("data-option")
      );
      selectPaymentOption(selectedOption, this);
    });
  });
}

function selectPaymentOption(option, buttonElement) {
  // Mise à jour des styles de boutons
  document
    .querySelectorAll(".payment-option")
    .forEach((btn) => btn.classList.remove("ring-2", "ring-green-500"));
  buttonElement.classList.add("ring-2", "ring-green-500");

  // Affichage des détails de paiement
  const detailsContainer = document.getElementById("paymentDetails");
  detailsContainer.classList.remove("hidden");
  detailsContainer.innerHTML = createOptionDetails(option);

  // Initialisation de International Telephone Input si besoin
  const phoneInput = document.querySelector("#phone");
  if (phoneInput && !phoneInput.classList.contains("iti-initialized")) {
    iti = window.intlTelInput(phoneInput, {
      initialCountry: "ci",
      preferredCountries: ["ci", "sn", "bf", "ml"],
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
    phoneInput.classList.add("iti-initialized");

    // Ajout d'un event listener pour le changement de pays
    phoneInput.addEventListener("countrychange", function () {
      updateSubOptions(option);
    });
  }

  updateSubOptions(option);
}

function updateSubOptions(option) {
  if (!option.selects) return;

  const subOptionsContainer = document.querySelector(".sub-options-container");
  if (!subOptionsContainer) return;

  const selectedCountry = iti ? iti.getSelectedCountryData().iso2 : "ci";

  subOptionsContainer.innerHTML = option.selects
    .filter(
      (select) =>
        !select.countries || select.countries.includes(selectedCountry)
    )
    .map(
      (select) => `
            <button class="sub-option bg-white border border-gray-300 rounded-md p-1 gap-1 flex flex-col items-center justify-center text-sm focus:outline-none" data-value="${select.value}" data-pin-code="${select.asPinCode}">
                <img src="${select.image}" class="size-[80px] object-contain">
                ${select.name}
            </button>
        `
    )
    .join("");

  // Ajouter des récepteurs d'événements aux boutons de sous-option
  document.querySelectorAll(".sub-option").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".sub-option")
        .forEach((b) => b.classList.remove("bg-green-500", "text-white"));
      this.classList.add("bg-green-500", "text-white");
      updatePinCodeVisibility(option);
    });
  });

  updatePinCodeVisibility(option);
}

function updatePinCodeVisibility(option) {
  const pinCodeInput = document.getElementById("pinCode");
  if (!pinCodeInput) return;

  const selectedSubOption = document.querySelector(".sub-option.bg-green-500");
  const showPinCode =
    selectedSubOption &&
    selectedSubOption.getAttribute("data-pin-code") === "true";

  pinCodeInput.classList.toggle("hidden", !showPinCode);
}

function createOptionDetails(option) {
  let content = "";

  if (option.asPhoneInput) {
    content += `
            <div class="mb-4">
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                <input type="tel" id="phone" class="w-full p-2 border border-gray-300 rounded-md">
            </div>
        `;
  }

  if (option.selects) {
    content += `
            <div class="sub-options-container grid grid-cols-${Math.min(
              option.selects.length,
              3
            )} gap-4 mb-4">
                <!-- Sub-options will be dynamically inserted here -->
            </div>
        `;

    content += `
            <div id="pinCode" class="mb-4 hidden">
                <label for="pinCodeInput" class="block text-sm font-medium text-gray-700 mb-1">Code PIN :</label>
                <input type="password" id="pinCodeInput" class="w-full p-2 border border-gray-300 rounded-md" placeholder="Entrez votre code PIN">
            </div>
        `;
  } else if (option.id === "carte") {
    content += `
            <button class="w-full bg-blue-600 text-white p-2 rounded-md">
                Payer avec Stripe
            </button>
        `;
  }

  if (option.showPayButton) {
    content += `
            <button id="payButton" class="w-full bg-green-600 text-white p-2 rounded-md mt-4">
                Payer xxx XOF
            </button>
        `;
  }

  return content;
}

// Initialiser le formulaire lorsque le DOM est chargé
document.addEventListener("DOMContentLoaded", createPaymentForm);
