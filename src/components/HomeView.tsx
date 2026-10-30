import React, { useState } from 'react';
import { ArrowRight, Plus, Check } from 'lucide-react';
import {
  ActivePage,
  JewelryCategory,
  JewelryProduct,
} from '../types/jewelry';
import {
  HOMEPAGE_CATEGORY_TILES,
  MODEL_ASSETS,
  getImageObjectPosition,
} from '../data/catalog';
import { formatDZD } from '../utils/shopLogic';

interface HomeViewProps {
  products: JewelryProduct[];
  onNavigate: (page: ActivePage) => void;
  onSelectCategory: (category: JewelryCategory) => void;
  onOpenProduct: (productId: string) => void;
  onQuickAdd: (product: JewelryProduct) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onNavigate,
  onSelectCategory,
  onOpenProduct,
  onQuickAdd,
}) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const featuredProducts = products.slice(0, 4);
  const visibleCategoryTiles = showAllCategories
    ? HOMEPAGE_CATEGORY_TILES
    : HOMEPAGE_CATEGORY_TILES.slice(0, 3);

  const handleQuickAddClick = (e: React.MouseEvent, product: JewelryProduct) => {
    e.stopPropagation();
    onQuickAdd(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev));
    }, 1400);
  };

  return (
    <div className="flex flex-col">
      {/* Section C — Hero (Exact match to 01___Home___Noura_Jewels_a383a98c.pdf) */}
      <section
        aria-label="Hero Banner"
        className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-center overflow-hidden bg-[#E5E4DF]"
      >
        <img
          src={MODEL_ASSETS.heroAlgiersBay}
          alt="Two Algerian women in traditional white Haïk and gold forehead ornaments playing chess in the shallow golden-hour waters of the Bay of Algiers"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Subtle left-side scrim so the dark charcoal typography remains razor-sharp */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#E6EAE8]/75 via-[#E6EAE8]/30 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 md:px-12 py-20">
          <div className="max-w-lg">
            <h1
              className="font-editorial text-5xl sm:text-6xl md:text-[72px] leading-[1.02] font-normal text-[#171717] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Jewels that carry a story.
            </h1>

            <p className="mt-6 text-sm md:text-[15px] leading-relaxed text-[#171717]/80 max-w-md">
              Discover traditional Algerian jewelry, where every detail reflects a heritage of artistry and expression.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => onSelectCategory('All Jewelry')}
                className="bg-[#171717] text-white px-7 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-[#171717]/90 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Discover the Collection
              </button>

              <button
                type="button"
                onClick={() => onNavigate('story')}
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171717] border-b border-[#171717]/50 pb-1 hover:border-[#171717] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>View Archives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section D — Explore by Category (3 Characters with Algiers Bay background as requested) */}
      <section
        aria-label="Explore by Category"
        className="relative py-20 md:py-28 overflow-hidden bg-[#0B0B0B] text-white border-b border-[#D5D5D2]/20"
      >
        {/* Background image under the 3 characters */}
        <img
          src={MODEL_ASSETS.heroAlgiersBay}
          alt="Algiers Bay background under categories"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/85 via-[#0B0B0B]/70 to-[#0B0B0B]/90 pointer-events-none" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="font-editorial text-3xl md:text-[40px] font-normal tracking-tight text-white">
                Explore by Category
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowAllCategories((prev) => !prev)}
              className="text-[11px] uppercase tracking-[0.18em] text-white/75 hover:text-white border-b border-white/30 pb-1 self-start sm:self-auto transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {showAllCategories ? 'Show Primary Archives (03)' : 'View All 6 Categories'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleCategoryTiles.map((tile) => (
              <button
                key={tile.numberLabel}
                type="button"
                onClick={() => onSelectCategory(tile.category)}
                className="group text-left bg-white text-[#171717] flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer shadow-md"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E5E5E2]">
                  <img
                    src={tile.image}
                    alt={`${tile.title} — ${tile.subtitle}`}
                    referrerPolicy="no-referrer"
                    style={{ objectPosition: getImageObjectPosition(tile.image) }}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <span className="absolute top-3.5 left-3.5 bg-white text-[#171717] px-2.5 py-1 text-[10px] font-medium tracking-[0.16em] uppercase">
                    {tile.numberLabel}
                  </span>
                </div>
                <div className="p-5 bg-white flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-editorial text-xl font-medium text-[#171717]">
                      {tile.title}
                    </h3>
                    <p className="text-xs text-[#171717]/60 mt-0.5">
                      {tile.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#171717]/40 group-hover:text-[#171717] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section E — Featured Pieces (All 4 elements in one horizontal line on homepage) */}
      <section
        aria-label="Featured Pieces"
        className="py-20 md:py-24 bg-[#F9F9F8] border-b border-[#D5D5D2]"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#171717]/60 mb-1">
                Handcrafted Algerian Heritage
              </p>
              <h2 className="font-editorial text-3xl md:text-[40px] font-normal tracking-tight text-[#171717]">
                Featured Pieces
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onSelectCategory('All Jewelry')}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171717] hover:opacity-75 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
            >
              VIEW ALL ({products.length})
            </button>
          </div>

          {/* 4 elements in one single line */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {featuredProducts.map((product) => {
              const isAdded = addedId === product.id;
              return (
                <article
                  key={product.id}
                  onClick={() => onOpenProduct(product.id)}
                  className="group bg-white border border-[#E5E5E2] flex flex-col justify-between cursor-pointer shadow-sm hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <div>
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E5E5E2]">
                      <img
                        src={product.primaryImage}
                        alt={`${product.name} worn by model`}
                        referrerPolicy="no-referrer"
                        style={{ objectPosition: getImageObjectPosition(product.primaryImage) }}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      {product.badge && (
                        <span
                          className={`absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-semibold tracking-[0.16em] uppercase ${
                            product.badge === 'NEW'
                              ? 'bg-[#171717] text-white'
                              : 'bg-white text-[#171717]'
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-3 sm:p-5 sm:pb-3">
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#171717]/55 truncate">
                        {product.region}
                      </p>
                      <h3 className="font-editorial text-sm sm:text-lg md:text-xl font-medium text-[#171717] mt-0.5 sm:mt-1 leading-snug line-clamp-2">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  <div className="px-3 sm:px-5 pb-3 sm:pb-5 pt-2 flex items-center justify-between border-t border-[#F4F4F2]">
                    <span className="text-[11px] sm:text-xs font-semibold text-[#171717] tabular-nums">
                      {formatDZD(product.priceDZD)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleQuickAddClick(e, product)}
                      aria-label={`Add ${product.name} to bag`}
                      className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center border transition-colors cursor-pointer shrink-0 ${
                        isAdded
                          ? 'bg-[#171717] text-white border-[#171717]'
                          : 'border-[#D5D5D2] text-[#171717] hover:bg-[#171717] hover:text-white hover:border-[#171717]'
                      }`}
                    >
                      {isAdded ? (
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      ) : (
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section F — Brand Story Teaser: Picture and text strictly side-by-side */}
      <section
        aria-label="Brand Heritage Story"
        className="bg-[#0B0B0B] text-white py-20 md:py-28"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Side by side: Left = Picture */}
          <div className="w-full">
            <div className="overflow-hidden bg-[#171717] border border-white/10">
              <img
                src={MODEL_ASSETS.silversmithKasbah}
                alt="Master Silversmith at Work in the Kasbah of Algiers"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[560px] object-cover"
              />
            </div>
            <p className="text-[11px] text-white/50 mt-3 tracking-wide">
              Master Silversmith at Work · Kasbah of Algiers
            </p>
          </div>

          {/* Side by side: Right = Text */}
          <div className="flex flex-col items-start md:pl-4">
            <h2
              className="font-editorial text-4xl md:text-[46px] leading-[1.1] font-normal text-white"
              style={{ textWrap: 'balance' }}
            >
              More than an ornament.
              <br />A heritage.
            </h2>

            <p className="mt-6 text-sm md:text-[15px] leading-relaxed text-white/75 max-w-lg">
              From intricate silverwork to expressive colors and traditional forms, Algerian jewelry carries stories of identity, celebration and craftsmanship.
            </p>

            <p className="mt-4 text-xs md:text-sm leading-relaxed text-white/60 max-w-lg">
              Noura Jewels brings these treasures into a contemporary space working directly with generational master jewelers from Beni Yenni to the Aurès peaks to protect sacred techniques while refining each piece for today’s collector.
            </p>

            <button
              type="button"
              onClick={() => onNavigate('story')}
              className="mt-9 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white border-b border-white/40 pb-1.5 hover:border-white transition-colors cursor-pointer"
            >
              <span>Discover Our Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
