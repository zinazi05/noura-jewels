import React from 'react';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { ActivePage, BagItem, JewelryProduct } from '../types/jewelry';
import { calculateBagSummary, formatDZD } from '../utils/shopLogic';
import { getImageObjectPosition } from '../data/catalog';

interface BagViewProps {
  bagItems: BagItem[];
  catalog: JewelryProduct[];
  orderNote: string;
  onUpdateOrderNote: (note: string) => void;
  onUpdateQuantity: (productId: string, selectedOption: string | undefined, delta: number) => void;
  onRemoveItem: (productId: string, selectedOption: string | undefined) => void;
  onNavigate: (page: ActivePage) => void;
  onOpenProduct: (productId: string) => void;
}

export const BagView: React.FC<BagViewProps> = ({
  bagItems,
  catalog,
  orderNote,
  onUpdateOrderNote,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  onOpenProduct,
}) => {
  const summary = calculateBagSummary(bagItems, catalog);

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-14">
      {/* Section A — Page Heading */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#171717]/60 mb-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="hover:text-[#171717] transition-colors cursor-pointer"
        >
          Home
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-[#171717] font-medium">Shopping Bag</span>
      </nav>

      <div className="flex items-baseline justify-between gap-4 pb-8 border-b border-[#D5D5D2]">
        <h1 className="font-editorial text-4xl md:text-5xl font-normal text-[#171717]">
          Your Bag
        </h1>
        <span className="text-xs uppercase tracking-[0.18em] text-[#171717]/65 tabular-nums">
          {summary.totalCount} {summary.totalCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Empty Bag State (Blueprint Section 06) */}
      {summary.detailedItems.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto flex flex-col items-center">
          <ShoppingBag className="w-10 h-10 text-[#171717]/35 stroke-[1.25] mb-5" />
          <h2 className="font-editorial text-3xl font-normal text-[#171717]">
            Your bag is waiting for something special.
          </h2>
          <p className="mt-3 text-sm text-[#171717]/70 leading-relaxed">
            Explore the collection and discover a piece that speaks to you.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="mt-8 bg-[#171717] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#171717]/90 transition-colors cursor-pointer"
          >
            Explore Jewelry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          {/* Section B — Bag Items */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-[#D5D5D2]">
            {summary.detailedItems.map(({ product, selectedOption, quantity, lineTotalDZD }) => (
              <div
                key={`${product.id}-${selectedOption ?? 'default'}`}
                className="py-6 first:pt-0 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
              >
                <div className="flex items-start gap-5">
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product.id)}
                    className="w-24 aspect-[3/4] bg-[#E5E5E2] overflow-hidden border border-[#D5D5D2] shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      style={{ objectPosition: getImageObjectPosition(product.primaryImage) }}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#171717]/55">
                      {product.region} · {product.category}
                    </p>
                    <button
                      type="button"
                      onClick={() => onOpenProduct(product.id)}
                      className="font-editorial text-2xl font-medium text-[#171717] hover:underline text-left mt-0.5 cursor-pointer"
                    >
                      {product.name}
                    </button>
                    <p className="text-xs text-[#171717]/65 mt-1">
                      {product.materials.join(' · ')}
                      {selectedOption ? ` — ${selectedOption}` : ''}
                    </p>
                    <p className="text-xs font-medium text-[#171717] mt-2 tabular-nums">
                      Unit price: {formatDZD(product.priceDZD)}
                    </p>
                  </div>
                </div>

                {/* Quantity & Line Total Controls */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                  <div className="flex items-center border border-[#D5D5D2]">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(product.id, selectedOption, -1)}
                      aria-label={`Decrease quantity of ${product.name}`}
                      className="w-8 h-8 flex items-center justify-center text-[#171717] hover:bg-[#F4F4F2] cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(product.id, selectedOption, 1)}
                      aria-label={`Increase quantity of ${product.name}`}
                      className="w-8 h-8 flex items-center justify-center text-[#171717] hover:bg-[#F4F4F2] cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-[#171717] tabular-nums">
                      {formatDZD(lineTotalDZD)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(product.id, selectedOption)}
                      aria-label={`Remove ${product.name} from bag`}
                      className="text-xs text-[#171717]/55 hover:text-[#171717] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Optional Atelier Request / Gift Note */}
            <div className="pt-6">
              <label
                htmlFor="bag-order-note"
                className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#171717] mb-2"
              >
                Atelier Request or Gift Note (Optional)
              </label>
              <textarea
                id="bag-order-note"
                rows={2}
                value={orderNote}
                onChange={(e) => onUpdateOrderNote(e.target.value)}
                placeholder="Specify wrist measurement adjustments or archival gift card wording..."
                className="w-full border border-[#D5D5D2] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="text-xs uppercase tracking-[0.18em] text-[#171717] underline underline-offset-4 hover:opacity-75 cursor-pointer"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Section C & D — Order Summary & Checkout CTA */}
          <aside className="lg:col-span-4 bg-[#F4F4F2] border border-[#D5D5D2] p-7 h-fit">
            <h2 className="font-editorial text-2xl font-normal text-[#171717] pb-4 border-b border-[#D5D5D2]">
              Order Summary
            </h2>

            <div className="py-5 space-y-3 text-xs border-b border-[#D5D5D2]">
              <div className="flex justify-between">
                <span className="text-[#171717]/70">Subtotal</span>
                <span className="font-semibold text-[#171717] tabular-nums">
                  {formatDZD(summary.subtotalDZD)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#171717]/70">Delivery</span>
                <span className="text-right text-[#171717]/75">
                  Calculated at checkout by Wilaya (600–1,500 DZD) or complimentary Algiers pickup
                </span>
              </div>
            </div>

            <div className="py-5 flex justify-between items-baseline">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#171717]">
                Total (Excl. Delivery)
              </span>
              <span className="text-lg font-semibold text-[#171717] tabular-nums">
                {formatDZD(summary.subtotalDZD)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('checkout')}
              className="w-full h-12 bg-[#171717] text-white text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#171717]/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="mt-4 text-[11px] leading-relaxed text-[#171717]/60">
              Each piece is shipped in a sealed museum-grade presentation case. Orders are confirmed by telephone with our Algiers atelier prior to dispatch.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
};
