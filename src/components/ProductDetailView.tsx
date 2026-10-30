import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minus,
  Plus,
  Check,
  X,
} from 'lucide-react';
import {
  ActivePage,
  JewelryCategory,
  JewelryProduct,
} from '../types/jewelry';
import { formatDZD } from '../utils/shopLogic';
import { getImageObjectPosition } from '../data/catalog';

interface ProductDetailViewProps {
  product: JewelryProduct;
  relatedProducts: JewelryProduct[];
  onNavigate: (page: ActivePage) => void;
  onSelectCategory: (category: JewelryCategory) => void;
  onOpenProduct: (productId: string) => void;
  onAddToBag: (product: JewelryProduct, quantity: number, selectedOption?: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  relatedProducts,
  onNavigate,
  onSelectCategory,
  onOpenProduct,
  onAddToBag,
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    product.options?.choices[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedConfirm, setAddedConfirm] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>('description');

  // Reset local state when product changes
  React.useEffect(() => {
    setSelectedImageIdx(0);
    setSelectedOption(product.options?.choices[0]);
    setQuantity(1);
    setAddedConfirm(false);
  }, [product]);

  const currentGalleryItem =
    product.galleryImages[selectedImageIdx] ?? product.galleryImages[0];

  const handleAdd = () => {
    onAddToBag(product, quantity, selectedOption);
    setAddedConfirm(true);
    setTimeout(() => setAddedConfirm(false), 2000);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion((prev) => (prev === section ? '' : section));
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-14">
      {/* Section A — Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="text-xs text-[#171717]/60 mb-8 flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="hover:text-[#171717] transition-colors cursor-pointer"
        >
          Home
        </button>
        <span aria-hidden="true">/</span>
        <button
          type="button"
          onClick={() => onSelectCategory('All Jewelry')}
          className="hover:text-[#171717] transition-colors cursor-pointer"
        >
          Shop
        </button>
        <span aria-hidden="true">/</span>
        <button
          type="button"
          onClick={() => onSelectCategory(product.category)}
          className="hover:text-[#171717] transition-colors cursor-pointer"
        >
          {product.category}
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-[#171717] font-medium">{product.name}</span>
      </nav>

      {/* Section B & C — Two-Column Gallery + Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Product Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Vertical Thumbnail Strip */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:w-24 shrink-0">
            {product.galleryImages.map((img, idx) => (
              <button
                key={img.url + idx}
                type="button"
                onClick={() => setSelectedImageIdx(idx)}
                aria-label={`View image ${idx + 1}: ${img.caption}`}
                className={`relative aspect-[3/4] w-20 md:w-full overflow-hidden border transition-all cursor-pointer ${
                  selectedImageIdx === idx
                    ? 'border-[#171717] ring-1 ring-[#171717]'
                    : 'border-[#D5D5D2] opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  referrerPolicy="no-referrer"
                  style={{ objectPosition: getImageObjectPosition(img.url) }}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Large Photograph */}
          <div className="relative flex-1 aspect-[4/5] bg-[#E5E5E2] overflow-hidden border border-[#D5D5D2]/60">
            <img
              src={currentGalleryItem.url}
              alt={currentGalleryItem.caption}
              referrerPolicy="no-referrer"
              onClick={() => setZoomOpen(true)}
              style={{ objectPosition: getImageObjectPosition(currentGalleryItem.url) }}
              className="w-full h-full object-cover cursor-zoom-in"
            />
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              aria-label="Open full-screen image viewer"
              className="absolute bottom-4 right-4 bg-white/90 text-[#171717] p-2.5 border border-[#D5D5D2] hover:bg-white transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1.5 text-[11px] text-[#171717]/80">
              {currentGalleryItem.caption}
            </div>
          </div>
        </div>

        {/* Right: Product Information & Purchase Controls */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#171717]/60">
            <span>{product.region}</span>
            <span aria-hidden="true">·</span>
            <span>{product.category}</span>
            {product.badge && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#171717] font-semibold">{product.badge}</span>
              </>
            )}
          </div>

          <h1 className="font-editorial text-3xl md:text-4xl font-normal text-[#171717] mt-2">
            {product.name}
          </h1>

          <p className="mt-3 text-xl font-semibold text-[#171717] tabular-nums">
            {formatDZD(product.priceDZD)}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-[#171717]/75">
            {product.shortDescription}
          </p>

          {/* Verified Material & Availability Summary */}
          <div className="mt-6 pt-5 border-t border-[#D5D5D2] flex flex-col gap-2.5 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-[#171717]/60 uppercase tracking-wider">Verified Material</span>
              <span className="text-[#171717] text-right font-medium max-w-xs">
                {product.verifiedMaterialSummary}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#171717]/60 uppercase tracking-wider">Dimensions</span>
              <span className="text-[#171717] text-right">{product.dimensions}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#171717]/60 uppercase tracking-wider">Availability</span>
              <span className="text-[#171717] font-medium">{product.availability}</span>
            </div>
          </div>

          {/* Option Selector (if product has verified size or clasp options) */}
          {product.options && (
            <div className="mt-6 pt-5 border-t border-[#D5D5D2]">
              <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#171717] mb-2.5">
                {product.options.label}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.options.choices.map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => setSelectedOption(choice)}
                    className={`px-3.5 py-2 text-xs border transition-colors cursor-pointer ${
                      selectedOption === choice
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-white text-[#171717] border-[#D5D5D2] hover:border-[#171717]'
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Primary Add to Bag Action */}
          <div className="mt-7 pt-5 border-t border-[#D5D5D2] flex items-center gap-4">
            <div className="flex items-center border border-[#D5D5D2] h-12">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-10 h-full flex items-center justify-center text-[#171717] hover:bg-[#F4F4F2] cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span
                aria-label="Selected quantity"
                className="w-10 text-center text-xs font-semibold tabular-nums"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-10 h-full flex items-center justify-center text-[#171717] hover:bg-[#F4F4F2] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              disabled={product.availability === 'Out of Stock'}
              onClick={handleAdd}
              className="flex-1 h-12 bg-[#171717] text-white text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#171717]/90 disabled:bg-[#D5D5D2] disabled:text-[#171717]/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {addedConfirm ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Your Bag</span>
                </>
              ) : (
                <span>Add to Bag · {formatDZD(product.priceDZD * quantity)}</span>
              )}
            </button>
          </div>

          {addedConfirm && (
            <div className="mt-3 p-3 bg-[#F4F4F2] border border-[#D5D5D2] flex items-center justify-between text-xs">
              <span>Piece added to your shopping bag.</span>
              <button
                type="button"
                onClick={() => onNavigate('bag')}
                className="font-semibold underline underline-offset-4 cursor-pointer"
              >
                View Bag & Checkout
              </button>
            </div>
          )}

          {/* Section D — Expandable Specification Rows */}
          <div className="mt-8 border-t border-[#D5D5D2] divide-y divide-[#D5D5D2]">
            {/* Row 1: Description */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('description')}
                aria-expanded={openAccordion === 'description'}
                className="w-full py-4 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#171717] cursor-pointer"
              >
                <span>Description & Cultural Provenance</span>
                {openAccordion === 'description' ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openAccordion === 'description' && (
                <div className="pb-5 text-xs leading-relaxed text-[#171717]/75">
                  {product.fullDescription}
                </div>
              )}
            </div>

            {/* Row 2: Materials & Dimensions */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('materials')}
                aria-expanded={openAccordion === 'materials'}
                className="w-full py-4 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#171717] cursor-pointer"
              >
                <span>Materials & Dimensions</span>
                {openAccordion === 'materials' ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openAccordion === 'materials' && (
                <div className="pb-5 text-xs leading-relaxed text-[#171717]/75 space-y-1.5">
                  <p>
                    <strong>Composition:</strong> {product.verifiedMaterialSummary}
                  </p>
                  <p>
                    <strong>Dimensions:</strong> {product.dimensions}
                  </p>
                  <p>
                    <strong>Archival Weight:</strong> {product.weight}
                  </p>
                </div>
              )}
            </div>

            {/* Row 3: Care Instructions */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('care')}
                aria-expanded={openAccordion === 'care'}
                className="w-full py-4 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#171717] cursor-pointer"
              >
                <span>Care Instructions</span>
                {openAccordion === 'care' ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openAccordion === 'care' && (
                <div className="pb-5 text-xs leading-relaxed text-[#171717]/75">
                  {product.careInstructions}
                </div>
              )}
            </div>

            {/* Row 4: Delivery & Returns */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('delivery')}
                aria-expanded={openAccordion === 'delivery'}
                className="w-full py-4 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.16em] text-[#171717] cursor-pointer"
              >
                <span>Delivery & Returns</span>
                {openAccordion === 'delivery' ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openAccordion === 'delivery' && (
                <div className="pb-5 text-xs leading-relaxed text-[#171717]/75">
                  {product.deliveryInfo}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section E — Related Pieces */}
      <section aria-label="Discover similar pieces" className="mt-20 pt-14 border-t border-[#D5D5D2]">
        <h2 className="font-editorial text-3xl font-normal text-[#171717] mb-8">
          Discover similar pieces
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.slice(0, 4).map((rel) => (
            <article
              key={rel.id}
              onClick={() => onOpenProduct(rel.id)}
              className="group bg-white border border-[#D5D5D2]/80 flex flex-col justify-between cursor-pointer hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div>
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E5E5E2]">
                  <img
                    src={rel.primaryImage}
                    alt={`${rel.name} worn by model`}
                    referrerPolicy="no-referrer"
                    style={{ objectPosition: getImageObjectPosition(rel.primaryImage) }}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#171717]/55">
                    {rel.region}
                  </p>
                  <h3 className="font-editorial text-lg font-medium text-[#171717] mt-1">
                    {rel.name}
                  </h3>
                </div>
              </div>
              <div className="px-4 pb-4 pt-2 border-t border-[#F4F4F2] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#171717] tabular-nums">
                  {formatDZD(rel.priceDZD)}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#171717]/60 group-hover:text-[#171717]">
                  View →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Full-Screen Zoom Lightbox */}
      {zoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full screen product image zoom"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label="Close zoom viewer"
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={currentGalleryItem.url}
            alt={currentGalleryItem.caption}
            referrerPolicy="no-referrer"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
};
