import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';
import { FAQ_ITEMS, MODEL_ASSETS } from '../data/catalog';
import { ActivePage, JewelryCategory } from '../types/jewelry';

interface StoryContactViewProps {
  initialSection?: 'story' | 'contact';
  onNavigate: (page: ActivePage) => void;
  onSelectCategory: (category: JewelryCategory) => void;
}

export const StoryContactView: React.FC<StoryContactViewProps> = ({
  initialSection = 'story',
  onSelectCategory,
}) => {
  const contactRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (initialSection === 'contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [initialSection]);

  const [contactForm, setContactForm] = useState({
    fullName: '',
    contactMethod: '',
    subject: 'Bespoke / Bridal Inquiry',
    message: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.fullName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (contactForm.contactMethod.trim().length < 5) {
      setFormError('Please provide a valid phone number or email address.');
      return;
    }
    if (contactForm.message.trim().length < 10) {
      setFormError('Please enter a short message (at least 10 characters).');
      return;
    }
    setFormError(null);
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col">
      {/* Section A — Page Introduction (Blueprint Section 09) */}
      <section className="bg-[#F4F4F2] border-b border-[#D5D5D2] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#171717]/60 mb-3">
              Our Story & Cultural Heritage
            </p>
            <h1
              className="font-editorial text-4xl sm:text-5xl md:text-[56px] leading-[1.08] font-normal text-[#171717]"
              style={{ textWrap: 'balance' }}
            >
              Rooted in tradition. Chosen for today.
            </h1>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#171717]/75 max-w-xl">
              Algerian jewelry is a world of distinctive forms, expressive colors and intricate details. At Noura Jewels, we bring together pieces inspired by this rich visual heritage, creating a space where traditional adornment can be discovered and appreciated.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[16/11] overflow-hidden border border-[#D5D5D2] bg-[#E5E5E2]">
              <img
                src={MODEL_ASSETS.heroAlgiersBay}
                alt="Algerian heritage editorial on the shores of Algiers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section B — The Noura Jewels Story (Split Layout) */}
      <section className="py-20 md:py-24 max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden border border-[#D5D5D2] bg-[#171717]">
              <img
                src={MODEL_ASSETS.silversmithKasbah}
                alt="Master silversmith crafting traditional filigree in the Kasbah of Algiers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-8 space-y-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#171717]/60">
              Sovereign Craftsmanship
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-normal text-[#171717]">
              Preserving living workshops from Beni Yenni to the Aurès Mountains.
            </h2>
            <p className="text-sm leading-relaxed text-[#171717]/75">
              Noura Jewels was founded in Algiers to bridge generational artisan guilds with contemporary collectors. Rather than mass-producing imitations, we partner directly with family workshops in Ath Yenni (Tizi Ouzou), Menaa and Batna in the Aurès, and the historic Kasbah of Algiers.
            </p>
            <p className="text-sm leading-relaxed text-[#171717]/75">
              Each piece in our catalog is photographed worn by our muse in consistent natural light and verified for metal purity—925 sterling silver, 18K gold vermeil, natural Mediterranean red coral (Corallium rubrum), and kiln-fired vitreous enamel.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => onSelectCategory('All Jewelry')}
                className="bg-[#171717] text-white px-7 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-[#171717]/90 transition-colors cursor-pointer"
              >
                Explore the Archive
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section D & E — Contact Information & Contact Form */}
      <section
        ref={contactRef}
        id="contact-section"
        className="py-20 md:py-24 max-w-[1280px] mx-auto px-6 md:px-12 border-b border-[#D5D5D2]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#171717]/60">
              Contact Atelier
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-normal text-[#171717]">
              Speak with our Algiers Curators
            </h2>
            <p className="text-sm text-[#171717]/75 leading-relaxed">
              Whether you are inquiring about a specific piece, sizing for a traditional cuff, or commissioning a bridal parure, our team responds promptly.
            </p>

            <div className="space-y-4 pt-2 text-xs text-[#171717]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#171717]/60 shrink-0 mt-0.5" />
                <div>
                  <strong className="block uppercase tracking-wider text-[11px]">
                    Telephone & WhatsApp Coordination
                  </strong>
                  <span className="text-[#171717]/75">+213 (0) 550 84 19 20</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#171717]/60 shrink-0 mt-0.5" />
                <div>
                  <strong className="block uppercase tracking-wider text-[11px]">
                    Atelier Email
                  </strong>
                  <span className="text-[#171717]/75">contact@nourajewels.dz</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#171717]/60 shrink-0 mt-0.5" />
                <div>
                  <strong className="block uppercase tracking-wider text-[11px]">
                    Showroom Location
                  </strong>
                  <span className="text-[#171717]/75">
                    18 Rue des Frères Bouadou, Hydra · Alger, Algeria
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#171717]/60 shrink-0 mt-0.5" />
                <div>
                  <strong className="block uppercase tracking-wider text-[11px]">
                    Opening Hours
                  </strong>
                  <span className="text-[#171717]/75">
                    Saturday – Thursday: 10:00 – 18:30 (By appointment on Fridays)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#F4F4F2] border border-[#D5D5D2] p-8 md:p-10">
            {formSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-8 h-8 text-[#171717] mx-auto stroke-[1.5]" />
                <h3 className="font-editorial text-3xl text-[#171717]">
                  Your message has been sent to the Atelier.
                </h3>
                <p className="text-xs text-[#171717]/75 max-w-md mx-auto leading-relaxed">
                  Thank you, {contactForm.fullName}. Our curator in Algiers will reply via{' '}
                  {contactForm.contactMethod} within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setContactForm({
                      fullName: '',
                      contactMethod: '',
                      subject: 'Bespoke / Bridal Inquiry',
                      message: '',
                    });
                  }}
                  className="mt-4 border border-[#171717] px-6 py-2.5 text-xs uppercase tracking-[0.16em] text-[#171717] hover:bg-[#171717] hover:text-white transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
                <h3 className="font-editorial text-2xl text-[#171717]">Send a Message</h3>

                {formError && (
                  <p role="alert" className="text-xs text-red-700 bg-red-50 border border-red-200 p-3">
                    {formError}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#171717] mb-1.5"
                    >
                      Full Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactForm.fullName}
                      onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-white border border-[#D5D5D2] px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-method"
                      className="block text-xs font-medium text-[#171717] mb-1.5"
                    >
                      Phone or Email <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="contact-method"
                      type="text"
                      required
                      value={contactForm.contactMethod}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, contactMethod: e.target.value })
                      }
                      placeholder="0550 12 34 56 or email@domain.dz"
                      className="w-full bg-white border border-[#D5D5D2] px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-[#171717] mb-1.5"
                  >
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-white border border-[#D5D5D2] px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#171717]"
                  >
                    <option value="Bespoke / Bridal Inquiry">Bespoke / Bridal Inquiry</option>
                    <option value="Product Dimensions & Sizing">Product Dimensions & Sizing</option>
                    <option value="Order & Wilaya Delivery">Order & Wilaya Delivery</option>
                    <option value="Showroom Appointment">Showroom Appointment</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#171717] mb-1.5"
                  >
                    Message <span className="text-red-700">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us which piece or regional style you are interested in..."
                    className="w-full bg-white border border-[#D5D5D2] p-3.5 text-sm text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#171717] text-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#171717]/90 transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Section F — FAQ and Practical Information */}
      <section className="py-20 max-w-4xl mx-auto px-6 md:px-12 w-full">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#171717]/60 mb-2">
            Practical Information
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl font-normal text-[#171717]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="border-t border-[#D5D5D2] divide-y divide-[#D5D5D2]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full py-5 flex items-center justify-between text-left font-editorial text-xl font-medium text-[#171717] cursor-pointer"
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="pb-5 text-xs md:text-sm leading-relaxed text-[#171717]/75">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
