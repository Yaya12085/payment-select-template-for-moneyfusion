const paymentOptions = [
  {
    id: "mobile-money",
    name: "Mobile Money",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    asPhoneInput: true,
    showPayButton: true,
    selects: [
      {
        name: "MTN",
        value: "MTN",
        image:
          "https://upload.wikimedia.org/wikipedia/fr/e/e9/Mtn-logo-svg.svg",
        asPinCode: false,
        countries: ["ci", "sn"],
      },
      {
        name: "Orange",
        value: "Orange",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/langfr-1920px-Orange_logo.svg.png",
        asPinCode: true,
        countries: ["ci"],
      },
      {
        name: "Moov",
        value: "Moov",
        image:
          "https://upload.wikimedia.org/wikipedia/fr/1/1d/Moov_Africa_logo.png?20210529100313",
        asPinCode: false,
        countries: ["ci", "bf"],
      },
      {
        name: "Airtel",
        value: "Airtel",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Airtel_Africa_logo.svg/langfr-1920px-Airtel_Africa_logo.svg.png",
        asPinCode: false,
        countries: ["ml", "ci"],
      },
    ],
  },
  {
    id: "carte",
    name: "Carte de crédit",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    asPhoneInput: false,
    showPayButton: false,
  },
  {
    id: "wallet",
    name: "Wallet",
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    asPhoneInput: false,
    showPayButton: true,
    selects: [
      {
        name: "Wave CI",
        image:
          "https://play-lh.googleusercontent.com/-Mp3XW7uhwn3KGQxUKGPoc4MbA5ti-3-q23TgoVi9ujBgHWW5n4IySvlG5Exwrxsjw=w480-h960-rw",
        value: "wave-ci",
      },
      {
        name: "Wave SN",
        image:
          "https://play-lh.googleusercontent.com/-Mp3XW7uhwn3KGQxUKGPoc4MbA5ti-3-q23TgoVi9ujBgHWW5n4IySvlG5Exwrxsjw=w480-h960-rw",
        value: "wave-sn",
      },
      {
        name: "Cryptomonnaie",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
        value: "crypto",
      },
    ],
  },
];
