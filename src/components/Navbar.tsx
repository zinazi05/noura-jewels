import React, { useState } from 'react';
import { Search, ShoppingBag, X, Menu } from 'lucide-react';
import { ActivePage, JewelryCategory } from '../types/jewelry';

interface NavbarProps {
  activePage: ActivePage;
  bagCount: number;
  searchQuery: string;
  onNavigate: (page: ActivePage) => void;
  onSelectCategory: (category: JewelryCategory) => void;
  onSearchSubmit: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  bagCount,
  searchQuery,
  onNavigate,
  onSelectCategory,
  onSearchSubmit,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(localSearch);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#D5D5D2]">
      {/* Main Navigation (3-Zone Top Bar Contract) */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group whitespace-nowrap shrink-0 cursor-pointer"
          aria-label="Noura Jewels Home"
        >
          <svg
            width="28"
            height="24"
            viewBox="0 0 32 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#171717] shrink-0"
            aria-hidden="true"
          >
            <circle cx="12" cy="14" r="9.5" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="20" cy="14" r="9.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span className="font-editorial text-2xl md:text-[26px] font-normal tracking-tight text-[#171717]">
            Noura Jewels
          </span>
        </button>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-9 text-[11px] font-medium tracking-[0.18em] uppercase text-[#171717]/75"
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'home'
                ? 'text-[#171717] border-b border-[#171717]'
                : 'hover:text-[#171717]'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectCategory('All Jewelry');
            }}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'shop' || activePage === 'product'
                ? 'text-[#171717] border-b border-[#171717]'
                : 'hover:text-[#171717]'
            }`}
          >
            Shop
          </button>
          <button
            type="button"
            onClick={() => onNavigate('story')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'story'
                ? 'text-[#171717] border-b border-[#171717]'
                : 'hover:text-[#171717]'
            }`}
          >
            Our Story
          </button>
        </nav>

        {/* Zone 3: Search & Shopping Bag Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => {
              setLocalSearch(searchQuery);
              setSearchOpen((prev) => !prev);
            }}
            aria-label="Open search"
            className="p-2 text-[#171717] hover:bg-[#F4F4F2] transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('bag')}
            aria-label={`Shopping bag with ${bagCount} items`}
            className="relative p-2 text-[#171717] hover:bg-[#F4F4F2] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            <span className="bg-[#171717] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
              {bagCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-[#171717] hover:bg-[#F4F4F2] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-[#D5D5D2] bg-[#F4F4F2] px-6 md:px-12 py-4">
          <form
            onSubmit={handleSearchFormSubmit}
            className="max-w-[1280px] mx-auto flex items-center gap-3"
          >
            <Search className="w-4 h-4 text-[#171717]/60 shrink-0" />
            <input
              type="search"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search by piece, region (Kabylie, Aurès, Beni Yenni), or material (coral, silver, enamel)..."
              aria-label="Search jewelry collection"
              className="w-full bg-white border border-[#D5D5D2] px-4 py-2.5 text-sm text-[#171717] placeholder:text-[#171717]/45 focus:outline-none focus:border-[#171717]"
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#171717] text-white px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#171717]/90 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="p-2 text-[#171717]/60 hover:text-[#171717] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-[#D5D5D2] bg-white px-6 py-5 flex flex-col gap-4 text-xs font-medium tracking-[0.18em] uppercase"
        >
          <button
            type="button"
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 border-b border-[#F4F4F2]"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectCategory('All Jewelry');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 border-b border-[#F4F4F2]"
          >
            Shop Collection
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('story');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2"
          >
            Our Story
          </button>
        </nav>
      )}
    </header>
  );
};
