export const assets = {
  lawFirmAudio: "/assets/law-firm-conversation.mp3",
  restaurantAudio: "/assets/restaurant-conversation.mp3",
  realEstateConvAudio: "/assets/real-estate-conversation.mp3",
  insuranceConvAudio: "/assets/insurance-conversation.mp3",
  accountingAudio: "/assets/accounting-conversation.mp3",
  electricianAudio: "/assets/electrician-conversation.mp3",
} as const;

export const brand = {
  /** Legal entity — used in the footer, metadata and structured data. */
  name: "Ashbourne Partners LLP",
  /** Conversational short form — used inline in body copy and headlines. */
  shortName: "Ashbourne",
  tagline: "Voice AI that answers every call",
  /** Contact address published on the privacy page. */
  email: "ashbournepartnersllp@gmail.com",
  phoneDisplay: "+44 20 4525 8810",
  phoneHref: "tel:+442045258810",
  /** Every CTA on the site points here. External URL, so Button renders it as
   * an anchor with target="_blank". */
  bookDemoUrl:
    "https://cal.com/vandan-mandloi/30min?user=vandan-mandloi&overlayCalendar=true",
  /** Holding company — credited in the footer and in the Organization schema. */
  parent: {
    name: "LitLabs",
    url: "https://litlabs.io",
  },
} as const;
