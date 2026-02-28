/** Central business configuration — edit values here to update the entire site */
export const BUSINESS = {
  name: "Velvet Cake & Bakery",
  tagline: "Where Every Celebration Begins",
  subheading: "Freshly baked cakes & custom designs. Walk-ins and delivery available.",
  phone: "+91 90961 23495",
  phoneRaw: "919096123495",
  email: "hello@velvetcakebakery.com",
  address: "Shop No. 5, Main Road, Kolhapur, Maharashtra 416001, India",
  coordinates: { lat: 16.6762491, lng: 74.2138908 },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.5!2d74.2138908!3d16.6762491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQwJzM0LjUiTiA3NMKwMTInNTAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000",
  hours: [
    { day: "Monday - Saturday", time: "9:00 AM - 9:00 PM" },
    { day: "Sunday", time: "10:00 AM - 8:00 PM" },
  ],
  social: {
    instagram: "https://instagram.com/velvetcakebakery",
    facebook: "https://facebook.com/velvetcakebakery",
    whatsapp: "https://wa.me/919096123495",
  },
  fssai: "FSSAI Lic. No. XXXXXXXXXXXX",
  yearEstablished: 2018,
  categories: [
    "All",
    "Designer Cakes",
    "Birthday Cakes",
    "Wedding Cakes",
    "Photo Cakes",
    "Cupcakes",
    "Pastries",
    "Festival Specials",
  ] as const,
  whatsappPrefill: (item?: string) =>
    encodeURIComponent(
      `Hi Velvet Cake & Bakery — I want to ${item ? `order ${item}` : "place an order / enquire about custom cakes"}. My name: ________. Pickup/delivery date: ________`
    ),
} as const;
