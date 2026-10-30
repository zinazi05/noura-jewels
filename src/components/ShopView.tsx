import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';
import {
  ActivePage,
  JewelryCategory,
  JewelryMaterial,
  JewelryOccasion,
  JewelryProduct,
  ShopFilterState,
  SortOption,
} from '../types/jewelry';
import {
  getImageObjectPosition,
} from '../data/catalog';
import { formatDZD } from '../utils/shopLogic';

interface ShopViewProps {
  products: JewelryProduct[];
  totalCount: number;
  filters: ShopFilterState;
  onFilterChange: (filters: ShopFilterState) => void;
  onResetFilters: () => void;
  onOpenProduct: (productId: string) => void;
  onQuickAdd: (product: JewelryProduct) => void;
  onNavigate: (page: ActivePage) => void;
}

// Category tabs across the horizontal bar exactly matching Categories___Noura_Jewels_7f85dd30.pdf
const HORIZONTAL_TABS: { label: string; value: JewelryCategory }[] = [
  { label: 'ALL JEWELRY', value: 'All Jewelry' },
  { label: 'NECKLACES', value: 'Necklaces & Pendants' },
  { label: 'EARRINGS', value: 'Earrings' },
  { label: 'BRACELETS', value: 'Bracelets' },
  { label: 'RINGS', value: 'Rings' },
  { label: 'TRADITIONAL SETS', value: 'Traditional Sets' },
  { label: 'BROOCHES & FIBULAS', value: 'Brooches & Fibulas' },
];

// Category filter checklist in the left sidebar with archival counts from the blueprint
const SIDEBAR_CATEGORIES: { name: Exclude<JewelryCategory, 'All Jewelry'>; count: number }[] = [
  { name: 'Necklaces & Pendants', count: 8 },
  { name: 'Earrings', count: 6 },
  { name: 'Bracelets', count: 5 },
  { name: 'Rings', count: 3 },
  { name: 'Traditional Sets', count: 2 },
  { name: 'Brooches & Fibulas', count: 4 },
];

const SIDEBAR_MATERIALS: { name: JewelryMaterial; count: number }[] = [
  { name: 'Solid Silver (925)', count: 14 },
  { name: 'Gold Plated / Gilded', count: 6 },
  { name: 'Hand-Poured Enamel', count: 8 },
  { name: 'Coral & Semi-Precious', count: 9 },
  { name: 'Chiseled Copper', count: 3 },
];

const SIDEBAR_OCCASIONS: JewelryOccasion[] = [
  'Everyday / Casual',
  'Wedding & Bridal',
  'Traditional Celebrations',
  'Meaningful Gifts',
];

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  totalCount,
  filters,
  onFilterChange,
  onOpenProduct,
  onNavigate,
}) => {
  const handleSelectCategory = (category: JewelryCategory) => {
    onFilterChange({
      ...filters,
      category,
    });
  };

  const toggleMaterial = (material: JewelryMaterial) => {
    const exists = filters.materials.includes(material);
    const nextMaterials = exists
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material];
    onFilterChange({
      ...filters,
      materials: nextMaterials,
    });
  };

  const toggleOccasion = (occasion: JewelryOccasion) => {
    const exists = filters.occasions.includes(occasion);
    const nextOccasions = exists
      ? filters.occasions.filter((o) => o !== occasion)
      : [...filters.occasions, occasion];
    onFilterChange({
      ...filters,
      occasions: nextOccasions,
    });
  };

  const removePriceFilter = () => {
    onFilterChange({
      ...filters,
      minPrice: '',
      maxPrice: '',
    });
  };

  const handleClearAll = () => {
    onFilterChange({
      category: 'All Jewelry',
      materials: [],
      occasions: [],
      minPrice: '',
      maxPrice: '',
      searchQuery: '',
      sortBy: 'featured',
    });
  };

  // Calculate selected filter count for "X Selected" in the sidebar
  const selectedCount =
    (filters.category !== 'All Jewelry' ? 1 : 0) +
    filters.materials.length +
    filters.occasions.length +
    (filters.minPrice || filters.maxPrice ? 1 : 0);

  const hasActiveCriteria =
    filters.category !== 'All Jewelry' ||
    filters.materials.length > 0 ||
    filters.occasions.length > 0 ||
    Boolean(filters.minPrice || filters.maxPrice) ||
    Boolean(filters.searchQuery);

  return (
    <div className="bg-white text-[#171717]">
      {/* 1. Top Section on White Background: Breadcrumbs, Title, Subtitle, Category Tabs */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 pt-7 pb-5">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-3.5 flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#171717]/60"
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-[#171717] transition-colors cursor-pointer"
          >
            HOME
          </button>
          <span aria-hidden="true" className="text-[#171717]/40">
            /
          </span>
          <span className="text-[#171717] font-semibold">SHOP</span>
        </nav>

        {/* Title and Badge */}
        <div className="mb-2 flex items-baseline gap-3.5 flex-wrap">
          <h1 className="font-editorial text-4xl sm:text-[46px] font-normal text-[#171717] tracking-tight leading-none">
            The Collection
          </h1>
          <span className="border border-[#D5D5D2] px-2.5 py-0.5 rounded text-[10px] uppercase tracking-[0.2em] text-[#171717]/70 font-medium tabular-nums">
            {totalCount} PIECES
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-[13px] text-[#171717]/75 max-w-2xl leading-relaxed mb-6 font-normal">
          Carefully curated traditional Algerian jewelry pieces, preserved in authenticity and crafted with enduring elegance.
        </p>

        {/* Horizontal Category Tabs */}
        <div
          role="tablist"
          aria-label="Category Archives"
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
        >
          {HORIZONTAL_TABS.map((tab) => {
            const isActive = filters.category === tab.value;
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectCategory(tab.value)}
                className={`px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#EDEDEA] text-[#171717]/80 hover:text-[#171717] hover:bg-[#E2E2DC]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Active Criteria & Sort Bar */}
      <div className="bg-[#F3F3F4] border-y border-[#CAD5D1] px-6 md:px-12 py-3">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Active Criteria */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px]">
            <span className="font-bold tracking-[0.16em] uppercase text-[#171717] mr-1">
              ACTIVE CRITERIA:
            </span>

            {hasActiveCriteria ? (
              <>
                {filters.category !== 'All Jewelry' && (
                  <button
                    type="button"
                    onClick={() => handleSelectCategory('All Jewelry')}
                    className="inline-flex items-center gap-1.5 bg-white border border-[#CAD5D1] px-2.5 py-1 text-[#171717] hover:bg-[#E5E5E2] transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>{filters.category}</span>
                    <span className="font-bold text-xs text-[#171717]/70">×</span>
                  </button>
                )}

                {filters.materials.map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => toggleMaterial(mat)}
                    className="inline-flex items-center gap-1.5 bg-white border border-[#CAD5D1] px-2.5 py-1 text-[#171717] hover:bg-[#E5E5E2] transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>{mat.replace(' (925)', '')}</span>
                    <span className="font-bold text-xs text-[#171717]/70">×</span>
                  </button>
                ))}

                {filters.occasions.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => toggleOccasion(occ)}
                    className="inline-flex items-center gap-1.5 bg-white border border-[#CAD5D1] px-2.5 py-1 text-[#171717] hover:bg-[#E5E5E2] transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>{occ}</span>
                    <span className="font-bold text-xs text-[#171717]/70">×</span>
                  </button>
                ))}

                {(filters.minPrice || filters.maxPrice) && (
                  <button
                    type="button"
                    onClick={removePriceFilter}
                    className="inline-flex items-center gap-1.5 bg-white border border-[#CAD5D1] px-2.5 py-1 text-[#171717] hover:bg-[#E5E5E2] transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>
                      {filters.maxPrice
                        ? `Under ${Number(filters.maxPrice).toLocaleString('en-US')} DZD`
                        : `From ${Number(filters.minPrice).toLocaleString('en-US')} DZD`}
                    </span>
                    <span className="font-bold text-xs text-[#171717]/70">×</span>
                  </button>
                )}

                {filters.searchQuery && (
                  <button
                    type="button"
                    onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                    className="inline-flex items-center gap-1.5 bg-white border border-[#CAD5D1] px-2.5 py-1 text-[#171717] hover:bg-[#E5E5E2] transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Search: "{filters.searchQuery}"</span>
                    <span className="font-bold text-xs text-[#171717]/70">×</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-[#171717] underline underline-offset-4 ml-2 hover:opacity-75 cursor-pointer"
                >
                  CLEAR ALL
                </button>
              </>
            ) : (
              <span className="text-[11px] text-[#171717]/50 italic">
                All artifacts displayed
              </span>
            )}
          </div>

          {/* Right: Sort By */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-by-select"
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#171717]"
            >
              SORT BY:
            </label>
            <select
              id="sort-by-select"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({ ...filters, sortBy: e.target.value as SortOption })
              }
              className="border border-[#CAD5D1] bg-white px-3 py-1 text-xs text-[#171717] font-semibold uppercase tracking-wider focus:outline-none focus:border-[#171717] cursor-pointer"
            >
              <option value="featured">FEATURED</option>
              <option value="newest">NEWEST</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Archival Body: Soft Sage Celadon Background (#D9E2DF) matching Categories___Noura_Jewels_7f85dd30.pdf */}
      <section
        aria-label="Archive Collection Grid"
        className="bg-[#D9E2DF] px-6 md:px-12 py-10 transition-colors"
      >
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
          {/* Left Sidebar: Filter Archive */}
          <aside
            aria-label="Filter Archive"
            className="w-full lg:w-60 xl:w-64 shrink-0 lg:sticky lg:top-24"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#CAD5D1] mb-6">
              <h2 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#171717]">
                FILTER ARCHIVE
              </h2>
              <span className="text-[11px] font-medium text-[#171717]/70 tabular-nums">
                {selectedCount} Selected
              </span>
            </div>

            <div className="space-y-6 text-xs">
              {/* Category Filter */}
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#171717] mb-3">
                  CATEGORY
                </h3>
                <div className="space-y-2.5">
                  {SIDEBAR_CATEGORIES.map((cat) => {
                    const isChecked = filters.category === cat.name;
                    return (
                      <label
                        key={cat.name}
                        onClick={() =>
                          handleSelectCategory(
                            isChecked ? 'All Jewelry' : cat.name
                          )
                        }
                        className="flex items-center justify-between text-[#171717] hover:opacity-85 cursor-pointer group select-none"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-[#171717] border-[#171717]'
                                : 'border-[#94A59F] bg-transparent group-hover:border-[#171717]'
                            }`}
                          >
                            {isChecked && (
                              <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                            )}
                          </span>
                          <span className="text-xs font-normal">{cat.name}</span>
                        </div>
                        <span className="text-[11px] text-[#171717]/65 tabular-nums font-normal">
                          {cat.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Material Filter */}
              <div className="border-t border-[#CAD5D1] pt-5">
                <h3 className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#171717] mb-3">
                  MATERIAL
                </h3>
                <div className="space-y-2.5">
                  {SIDEBAR_MATERIALS.map((mat) => {
                    const isChecked = filters.materials.includes(mat.name);
                    return (
                      <label
                        key={mat.name}
                        onClick={() => toggleMaterial(mat.name)}
                        className="flex items-center justify-between text-[#171717] hover:opacity-85 cursor-pointer group select-none"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-[#171717] border-[#171717]'
                                : 'border-[#94A59F] bg-transparent group-hover:border-[#171717]'
                            }`}
                          >
                            {isChecked && (
                              <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                            )}
                          </span>
                          <span className="text-xs font-normal">{mat.name}</span>
                        </div>
                        <span className="text-[11px] text-[#171717]/65 tabular-nums font-normal">
                          {mat.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Occasion Filter */}
              <div className="border-t border-[#CAD5D1] pt-5">
                <h3 className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#171717] mb-3">
                  OCCASION
                </h3>
                <div className="space-y-2.5">
                  {SIDEBAR_OCCASIONS.map((occ) => {
                    const isChecked = filters.occasions.includes(occ);
                    return (
                      <label
                        key={occ}
                        onClick={() => toggleOccasion(occ)}
                        className="flex items-center gap-2.5 text-[#171717] hover:opacity-85 cursor-pointer group select-none"
                      >
                        <span
                          className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-[#171717] border-[#171717]'
                              : 'border-[#94A59F] bg-transparent group-hover:border-[#171717]'
                          }`}
                        >
                          {isChecked && (
                            <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                          )}
                        </span>
                        <span className="text-xs font-normal">{occ}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="border-t border-[#CAD5D1] pt-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#171717]">
                    PRICE RANGE
                  </h3>
                  <span className="text-[10px] font-bold tracking-wider text-[#171717]/70">
                    DZD
                  </span>
                </div>

                {/* Visual Slider Bar matching Categories___Noura_Jewels_7f85dd30.pdf */}
                <div className="relative mb-3 flex items-center py-1">
                  <div className="w-full h-0.5 bg-[#CAD5D1] relative">
                    <div className="absolute left-0 top-0 bottom-0 bg-[#171717] w-[45%]" />
                    <div className="absolute left-[45%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-[#171717] rounded-full ring-2 ring-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#171717]/70 mb-1 font-semibold">
                      MIN
                    </span>
                    <input
                      type="text"
                      value={filters.minPrice ? Number(filters.minPrice).toLocaleString('en-US') : '10,000'}
                      onChange={(e) =>
                        onFilterChange({
                          ...filters,
                          minPrice: e.target.value.replace(/[^0-9]/g, ''),
                        })
                      }
                      className="w-full border border-[#CAD5D1] px-2.5 py-1.5 text-xs text-[#171717] font-semibold bg-white tabular-nums focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#171717]/70 mb-1 font-semibold">
                      MAX
                    </span>
                    <input
                      type="text"
                      value={filters.maxPrice ? Number(filters.maxPrice).toLocaleString('en-US') : '50,000'}
                      onChange={(e) =>
                        onFilterChange({
                          ...filters,
                          maxPrice: e.target.value.replace(/[^0-9]/g, ''),
                        })
                      }
                      className="w-full border border-[#CAD5D1] px-2.5 py-1.5 text-xs text-[#171717] font-semibold bg-white tabular-nums focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-[#171717]/65 mt-2 font-medium">
                  Catalog ceiling: 95,000 DZD
                </p>
              </div>

              {/* Atelier Guarantee Card: Solid White Card */}
              <div className="mt-7 p-4 bg-white shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#171717]" />
                  <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#171717]">
                    ATELIER GUARANTEE
                  </span>
                </div>
                <p className="text-[11px] text-[#171717]/80 leading-relaxed font-normal">
                  Each artifact is accompanied by a regional certificate validating alloy purity, tribal motif authenticity, and master silversmith provenance.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Area: 4-Column Products Grid */}
          <div className="flex-1 w-full">
            {products.length === 0 ? (
              <div className="bg-white p-12 text-center shadow-xs">
                <h2 className="font-editorial text-2xl text-[#171717]">
                  No pieces match your selected filters.
                </h2>
                <p className="mt-2 text-xs text-[#171717]/65 max-w-sm mx-auto">
                  Clear active criteria to browse all archival Algerian jewelry pieces.
                </p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="mt-6 bg-[#171717] text-white px-6 py-2.5 text-xs uppercase tracking-[0.18em] cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
                {products.map((product) => {
                  return (
                    <article
                      key={product.id}
                      onClick={() => onOpenProduct(product.id)}
                      className="group bg-white flex flex-col justify-between cursor-pointer shadow-xs hover:shadow-md transition-shadow"
                    >
                      <div>
                        {/* Image container in aspect-[3/4] */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECECE8]">
                          <img
                            src={product.primaryImage}
                            alt={`${product.name} worn by model`}
                            referrerPolicy="no-referrer"
                            style={{
                              objectPosition: getImageObjectPosition(
                                product.primaryImage
                              ),
                            }}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          />
                        </div>

                        {/* Provenance and Name */}
                        <div className="px-3.5 pt-3.5 pb-2">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#171717]/70 truncate">
                            {product.provenanceLabel ||
                              `${product.region} · ${product.category}`}
                          </p>
                          <h2 className="font-editorial text-[21px] sm:text-[22px] font-normal text-[#171717] mt-1 leading-snug">
                            {product.name}
                          </h2>
                        </div>
                      </div>

                      {/* Keep the amount and currency together on every card. */}
                      <div className="px-3.5 pb-3.5 pt-1">
                        <span className="text-sm font-bold text-[#171717] tabular-nums whitespace-nowrap">
                          {formatDZD(product.priceDZD)}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* 4. Bottom Centered Archival Progress Indicator (exactly matching Categories___Noura_Jewels_7f85dd30.pdf) */}
            <div className="mt-12 mb-4 flex flex-col items-center justify-center">
              <div className="w-36 h-1 bg-[#BDC8C4] rounded-full overflow-hidden">
                <div className="w-[33.3%] h-full bg-[#171717] rounded-full" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#171717]/70 mt-2.5">
                SHOWING {products.length} OF {totalCount} PIECES
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
