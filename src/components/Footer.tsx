import React from 'react';
import { ShieldCheck, Hammer, Truck, MapPin, Mail, MessageCircle } from 'lucide-react';
import { ActivePage, JewelryCategory } from '../types/jewelry';
import { MODEL_ASSETS } from '../data/catalog';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onSelectCategory: (category: JewelryCategory) => void;
  hideTrustStrip?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  hideTrustStrip = false,
}) => {
  return (
    <footer className="bg-white text-[#171717] border-t border-[#D5D5D2]">
      {/* Footer content */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#D5D5D2]">
          {/* Column 1: Brand & Contact Info */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <svg
                width="28"
                height="24"
                viewBox="0 0 32 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#171717]"
                aria-hidden="true"
              >
                <circle cx="12" cy="14" r="9.5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="20" cy="14" r="9.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <span className="font-editorial text-2xl font-normal tracking-tight text-[#171717]">
                Noura Jewels
              </span>
            </div>

            <p className="text-xs leading-relaxed text-[#171717]/70 max-w-sm">
              Curators of rare, museum-grade traditional Algerian jewelry. From Grande Kabylie filigree to Chaoui coral and carved Aurès medallions, we safeguard living archival craftsmanship.
            </p>

            <div className="flex flex-col gap-2 text-xs text-[#171717]/75 pt-1">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#171717]/60 shrink-0" aria-hidden="true" />
                <span>Kasbah & Hydra Showroom · Alger, Algeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#171717]/60 shrink-0" aria-hidden="true" />
                <span>contact@nourajewels.dz</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#171717]/60 shrink-0" aria-hidden="true" />
                <span>WhatsApp atelier coordination · +213 (0) 550 84 19 20</span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop Archives */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171717] mb-1">
              Shop Archives
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#171717]/75">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('All Jewelry')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  All Jewelry
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Necklaces & Pendants')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Necklaces
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Earrings')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Earrings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Bracelets')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Bracelets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Rings')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Rings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Traditional Sets')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Traditional Sets
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Brooches & Fibulas')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Fibulas
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171717] mb-1">
              Information
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#171717]/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Contact Atelier
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Delivery & Care
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#171717] transition-colors cursor-pointer"
                >
                  Terms & Authenticity
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.16em] uppercase text-[#171717]/55">
          <span>© NOURA JEWELS. HANDCRAFTED ALGERIAN HERITAGE. ALL RIGHTS RESERVED.</span>
          <span>ARCHIVAL PROVENANCE · HANDCRAFTED IN ALGERIA</span>
        </div>
      </div>
    </footer>
  );
};
