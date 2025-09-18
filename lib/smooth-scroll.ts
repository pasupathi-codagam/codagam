// Smooth scroll utility for single-page navigation
export const smoothScrollTo = (elementId: string, offset: number = 80) => {
  // Add a small delay to ensure DOM is ready
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.warn(`Element with id "${elementId}" not found`);
    }
  }, 100);
};

// Section mapping for navigation
export const sections = {
  home: "hero-section",
  about: "about-section",
  services: "services-section",
  products: "products-section",
  careers: "career-section",
  contact: "client-section", // Using client section as contact
} as const;

export type SectionKey = keyof typeof sections;
