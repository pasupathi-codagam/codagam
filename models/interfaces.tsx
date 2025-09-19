import { ReactNode } from "react";

// ============================================================================
// COMMON INTERFACES
// ============================================================================

export interface AnimationElement {
  elementId: string;
  baseClass: string;
}

export interface StatsData {
  number: string;
  label: string;
  color: string;
  elementId: string;
}

// ============================================================================
// HERO SECTION INTERFACES
// ============================================================================

export interface HeroSectionProps {
  className?: string;
}

// ============================================================================
// ABOUT SECTION INTERFACES
// ============================================================================

export interface Feature {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
  stats: { number: string; label: string };
}

export interface FloatingIcon {
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  position: { left: number; top: number };
  animationDelay?: string;
}

export interface AboutSectionState {
  mousePosition: { x: number; y: number };
  scrollY: number;
  time: number;
  animatedElements: Set<string>;
}

// ============================================================================
// PRODUCTS SECTION INTERFACES
// ============================================================================

export interface ProductItem {
  id: string;
  label: string;
  headline: string;
  description: string;
  image: string;
  alt: string;
  website: string;
  details: string;
  features: string[];
}

export interface ProductCardProps {
  item: ProductItem;
  index: number;
  currentIndex: number;
  onCardClick: (product: ProductItem) => void;
}

export interface NavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
}

export interface ProductDetailsDialogProps {
  selectedProduct: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onVisitWebsite: (url: string) => void;
}

export interface ProductsSectionState {
  currentIndex: number;
  selectedProduct: ProductItem | null;
  isDialogOpen: boolean;
  isScrolling: boolean;
  animatedElements: Set<string>;
}

// ============================================================================
// SERVICES SECTION INTERFACES
// ============================================================================

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface ServiceCardProps {
  item: GalleryItem;
  index: number;
  currentIndex: number;
}

export interface ServicesSectionState {
  currentIndex: number;
  isScrolling: boolean;
  animatedElements: Set<string>;
}

// ============================================================================
// CLIENT SECTION INTERFACES
// ============================================================================

export interface ClientLogo {
  name: string;
  logo: string;
  alt: string;
}

export interface ClientLogoCardProps {
  client: ClientLogo;
  index: number;
  getAnimationClass: (baseClass: string, elementId: string) => string;
}

export interface StatsCardProps {
  number: string;
  label: string;
  color: string;
  elementId: string;
}

export interface ContactFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface ClientSectionState {
  isDialogOpen: boolean;
  animatedElements: Set<string>;
}

// ============================================================================
// CAREER SECTION INTERFACES
// ============================================================================

export interface FormData {
  name: string;
  email: string;
  resume: File | null;
}

export interface BenefitCard {
  id: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  elementId: string;
}

export interface BenefitCardProps {
  benefit: BenefitCard;
  getAnimationClass: (baseClass: string, elementId: string) => string;
}

export interface FormFieldProps {
  id: string;
  name: string;
  type: string;
  value: string | File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  accept?: string;
  elementId: string;
  getAnimationClass: (baseClass: string, elementId: string) => string;
  children?: ReactNode;
}

export interface CareerSectionState {
  formData: FormData;
  isSubmitting: boolean;
  submitMessage: string;
  animatedElements: Set<string>;
}

// ============================================================================
// ANIMATION INTERFACES
// ============================================================================

export interface AnimationConfig {
  threshold: number;
  rootMargin: string;
}

export interface AnimationClassFunction {
  (baseClass: string, elementId: string): string;
}

// ============================================================================
// FORM INTERFACES
// ============================================================================

export interface FormSubmitEvent {
  (e: React.FormEvent): Promise<void>;
}

export interface FormChangeEvent {
  (e: React.ChangeEvent<HTMLInputElement>): void;
}

// ============================================================================
// SCROLL INTERFACES
// ============================================================================

export interface ScrollToItemFunction {
  (index: number): void;
}

export interface HandleScrollFunction {
  (): void;
}

// ============================================================================
// DIALOG INTERFACES
// ============================================================================

export interface DialogState {
  isOpen: boolean;
  onClose: () => void;
}

export interface DialogWithSuccess extends DialogState {
  onSuccess: () => void;
}

// ============================================================================
// IMAGE INTERFACES
// ============================================================================

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

// ============================================================================
// BUTTON INTERFACES
// ============================================================================

export interface ButtonClickHandler {
  (): void;
}

export interface ButtonWithUrlHandler {
  (url: string): void;
}

// ============================================================================
// SECTION INTERFACES
// ============================================================================

export interface SectionProps {
  id: string;
  className?: string;
  role?: string;
  "aria-label"?: string;
}

export interface SectionWithRef extends SectionProps {
  ref: React.RefObject<HTMLDivElement>;
}

// ============================================================================
// ALL INTERFACES ARE EXPORTED ABOVE
// ============================================================================
