import React, { useState } from 'react';
import { CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';
import {
  ActivePage,
  BagItem,
  CheckoutFormData,
  JewelryProduct,
  OrderReceipt,
} from '../types/jewelry';
import { ALGERIAN_WILAYAS } from '../data/catalog';
import {
  calculateBagSummary,
  CheckoutValidationErrors,
  formatDZD,
  validateCheckoutForm,
} from '../utils/shopLogic';

interface CheckoutViewProps {
  bagItems: BagItem[];
  catalog: JewelryProduct[];
  orderNote: string;
  lastOrderReceipt: OrderReceipt | null;
  isConfirmationMode: boolean;
  onNavigate: (page: ActivePage) => void;
  onSubmitOrder: (receipt: OrderReceipt) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  bagItems,
  catalog,
  orderNote,
  lastOrderReceipt,
  isConfirmationMode,
  onNavigate,
  onSubmitOrder,
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    email: '',
    wilayaCode: '16',
    commune: '',
    streetAddress: '',
    deliveryNotes: '',
    deliveryMethod: 'home_delivery',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState<CheckoutValidationErrors>({});

  // Page 06 — Order Confirmation State
  if (isConfirmationMode && lastOrderReceipt) {
    const selectedWilaya = ALGERIAN_WILAYAS.find(
      (w) => w.code === lastOrderReceipt.customer.wilayaCode
    );

    return (
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-14 md:py-20">
        <div className="bg-white border border-[#D5D5D2] p-8 md:p-12">
          <div className="flex items-center gap-3 text-[#171717]">
            <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold">
              Order Request Received
            </span>
          </div>

          <h1 className="font-editorial text-4xl md:text-5xl font-normal text-[#171717] mt-4">
            Thank you for your order.
          </h1>

          <p className="mt-3 text-sm text-[#171717]/75 leading-relaxed">
            Your order details have been received by our Algiers atelier. Our coordinator will call{' '}
            <strong className="text-[#171717]">{lastOrderReceipt.customer.phone}</strong> within 2 business hours to verify your delivery schedule before dispatch.
          </p>

          <div className="mt-6 p-4 bg-[#F4F4F2] border border-[#D5D5D2] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-[#171717]/60 uppercase tracking-wider block">
                Archival Order Reference
              </span>
              <span className="font-mono font-semibold text-sm text-[#171717] mt-0.5 block">
                {lastOrderReceipt.referenceId}
              </span>
            </div>
            <div>
              <span className="text-[#171717]/60 uppercase tracking-wider block">
                Recipient & Wilaya
              </span>
              <span className="font-medium text-[#171717] mt-0.5 block">
                {lastOrderReceipt.customer.fullName} · {selectedWilaya?.name ?? lastOrderReceipt.customer.wilayaCode}
              </span>
            </div>
            <div>
              <span className="text-[#171717]/60 uppercase tracking-wider block">
                Fulfillment Mode
              </span>
              <span className="font-medium text-[#171717] mt-0.5 block">
                {lastOrderReceipt.customer.deliveryMethod === 'home_delivery'
                  ? 'Insured Home Delivery'
                  : 'Algiers Atelier Pickup'}
              </span>
            </div>
          </div>

          {/* Concise Itemized Order Summary */}
          <div className="mt-8 border-t border-[#D5D5D2] pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#171717] mb-4">
              Reserved Pieces
            </h2>
            <div className="divide-y divide-[#F4F4F2]">
              {lastOrderReceipt.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedOption ?? 'default'}`}
                  className="py-3 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-medium text-[#171717]">{item.product.name}</span>
                    {item.selectedOption && (
                      <span className="text-[#171717]/60"> ({item.selectedOption})</span>
                    )}
                    <span className="text-[#171717]/60"> × {item.quantity}</span>
                  </div>
                  <span className="font-semibold text-[#171717] tabular-nums">
                    {formatDZD(item.lineTotalDZD)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#D5D5D2] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#171717]/70">Subtotal</span>
                <span className="tabular-nums">{formatDZD(lastOrderReceipt.subtotalDZD)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#171717]/70">Delivery Fee</span>
                <span className="tabular-nums">
                  {lastOrderReceipt.deliveryFeeDZD === 0
                    ? 'Complimentary (Atelier Pickup)'
                    : formatDZD(lastOrderReceipt.deliveryFeeDZD)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#D5D5D2] text-sm font-semibold">
                <span>Total Due</span>
                <span className="tabular-nums">{formatDZD(lastOrderReceipt.totalDZD)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#D5D5D2] flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="bg-[#171717] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#171717]/90 transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-xs uppercase tracking-[0.16em] text-[#171717] underline underline-offset-4 cursor-pointer"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Page 05 — Checkout Form State
  const summary = calculateBagSummary(
    bagItems,
    catalog,
    formData.wilayaCode,
    formData.deliveryMethod
  );

  const selectedWilayaObj = ALGERIAN_WILAYAS.find((w) => w.code === formData.wilayaCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCheckoutForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const receipt: OrderReceipt = {
      referenceId: `NR-${new Date().getFullYear()}-${String(
        Math.floor(1000 + Math.random() * 9000)
      )}`,
      submittedAt: new Date().toISOString(),
      customer: formData,
      items: summary.detailedItems,
      subtotalDZD: summary.subtotalDZD,
      deliveryFeeDZD: summary.deliveryFeeDZD,
      totalDZD: summary.totalDZD,
      orderNote: orderNote.trim() || undefined,
    };

    onSubmitOrder(receipt);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-14">
      {/* Section A — Checkout Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#D5D5D2]">
        <button
          type="button"
          onClick={() => onNavigate('bag')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#171717]/70 hover:text-[#171717] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Bag</span>
        </button>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#171717]">
          Checkout
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
        {/* Left Column: Customer & Delivery Form */}
        <div className="lg:col-span-7 space-y-10">
          {/* Section B — Contact Information */}
          <section aria-labelledby="checkout-contact-heading">
            <h2
              id="checkout-contact-heading"
              className="font-editorial text-2xl font-normal text-[#171717] mb-4"
            >
              1. Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="checkout-fullname"
                  className="block text-xs font-medium text-[#171717] mb-1.5"
                >
                  Full Name <span className="text-red-700">*</span>
                </label>
                <input
                  id="checkout-fullname"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  placeholder="e.g. Yasmine Mansouri"
                  className={`w-full border px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none ${
                    errors.fullName ? 'border-red-700 bg-red-50/30' : 'border-[#D5D5D2] focus:border-[#171717]'
                  }`}
                />
                {errors.fullName && (
                  <p role="alert" className="text-xs text-red-700 mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-medium text-[#171717] mb-1.5"
                >
                  Phone Number (Algeria) <span className="text-red-700">*</span>
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  placeholder="0550 12 34 56"
                  className={`w-full border px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none ${
                    errors.phone ? 'border-red-700 bg-red-50/30' : 'border-[#D5D5D2] focus:border-[#171717]'
                  }`}
                />
                {errors.phone && (
                  <p role="alert" className="text-xs text-red-700 mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-email"
                  className="block text-xs font-medium text-[#171717] mb-1.5"
                >
                  Email Address (Optional)
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="yasmine@example.dz"
                  className={`w-full border px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none ${
                    errors.email ? 'border-red-700 bg-red-50/30' : 'border-[#D5D5D2] focus:border-[#171717]'
                  }`}
                />
                {errors.email && (
                  <p role="alert" className="text-xs text-red-700 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Section D — Delivery Method */}
          <section aria-labelledby="checkout-method-heading" className="border-t border-[#D5D5D2] pt-8">
            <h2
              id="checkout-method-heading"
              className="font-editorial text-2xl font-normal text-[#171717] mb-4"
            >
              2. Delivery Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`border p-4 cursor-pointer flex flex-col justify-between ${
                  formData.deliveryMethod === 'home_delivery'
                    ? 'border-[#171717] bg-[#F4F4F2]'
                    : 'border-[#D5D5D2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Insured Home Delivery
                  </span>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={formData.deliveryMethod === 'home_delivery'}
                    onChange={() => setFormData({ ...formData, deliveryMethod: 'home_delivery' })}
                    className="accent-[#171717]"
                  />
                </div>
                <p className="text-xs text-[#171717]/70 mt-2">
                  Courier delivery to your Wilaya address ({selectedWilayaObj?.estimatedDays ?? '24–72h'}).
                </p>
              </label>

              <label
                className={`border p-4 cursor-pointer flex flex-col justify-between ${
                  formData.deliveryMethod === 'atelier_pickup'
                    ? 'border-[#171717] bg-[#F4F4F2]'
                    : 'border-[#D5D5D2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Algiers Atelier Pickup
                  </span>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={formData.deliveryMethod === 'atelier_pickup'}
                    onChange={() => setFormData({ ...formData, deliveryMethod: 'atelier_pickup' })}
                    className="accent-[#171717]"
                  />
                </div>
                <p className="text-xs text-[#171717]/70 mt-2">
                  Complimentary collection by appointment at our Hydra / Kasbah showroom.
                </p>
              </label>
            </div>
          </section>

          {/* Section C — Delivery Information */}
          <section aria-labelledby="checkout-address-heading" className="border-t border-[#D5D5D2] pt-8">
            <h2
              id="checkout-address-heading"
              className="font-editorial text-2xl font-normal text-[#171717] mb-4"
            >
              3. Delivery Location (Algeria)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="checkout-wilaya"
                  className="block text-xs font-medium text-[#171717] mb-1.5"
                >
                  Wilaya <span className="text-red-700">*</span>
                </label>
                <select
                  id="checkout-wilaya"
                  value={formData.wilayaCode}
                  onChange={(e) => setFormData({ ...formData, wilayaCode: e.target.value })}
                  className="w-full border border-[#D5D5D2] bg-white px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#171717]"
                >
                  {ALGERIAN_WILAYAS.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.name} ({formatDZD(w.homeDeliveryFeeDZD)})
                    </option>
                  ))}
                </select>
              </div>

              {formData.deliveryMethod === 'home_delivery' && (
                <div>
                  <label
                    htmlFor="checkout-commune"
                    className="block text-xs font-medium text-[#171717] mb-1.5"
                  >
                    Commune / City <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="checkout-commune"
                    type="text"
                    value={formData.commune}
                    onChange={(e) => {
                      setFormData({ ...formData, commune: e.target.value });
                      if (errors.commune) setErrors({ ...errors, commune: undefined });
                    }}
                    placeholder="e.g. Hydra / El Biar / Tizi Ouzou"
                    className={`w-full border px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none ${
                      errors.commune ? 'border-red-700 bg-red-50/30' : 'border-[#D5D5D2] focus:border-[#171717]'
                    }`}
                  />
                  {errors.commune && (
                    <p role="alert" className="text-xs text-red-700 mt-1">
                      {errors.commune}
                    </p>
                  )}
                </div>
              )}

              {formData.deliveryMethod === 'home_delivery' && (
                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-street"
                    className="block text-xs font-medium text-[#171717] mb-1.5"
                  >
                    Street Address or Delivery Location <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="checkout-street"
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) => {
                      setFormData({ ...formData, streetAddress: e.target.value });
                      if (errors.streetAddress) setErrors({ ...errors, streetAddress: undefined });
                    }}
                    placeholder="Building, street name, and nearby landmark"
                    className={`w-full border px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none ${
                      errors.streetAddress
                        ? 'border-red-700 bg-red-50/30'
                        : 'border-[#D5D5D2] focus:border-[#171717]'
                    }`}
                  />
                  {errors.streetAddress && (
                    <p role="alert" className="text-xs text-red-700 mt-1">
                      {errors.streetAddress}
                    </p>
                  )}
                </div>
              )}

              <div className="sm:col-span-2">
                <label
                  htmlFor="checkout-notes"
                  className="block text-xs font-medium text-[#171717] mb-1.5"
                >
                  Additional Delivery Instructions (Optional)
                </label>
                <input
                  id="checkout-notes"
                  type="text"
                  value={formData.deliveryNotes}
                  onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                  placeholder="Preferred call hours or gate access instructions"
                  className="w-full border border-[#D5D5D2] px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Section F & G — Order Summary & Confirm Order */}
        <aside className="lg:col-span-5 bg-[#F4F4F2] border border-[#D5D5D2] p-7 h-fit">
          <h2 className="font-editorial text-2xl font-normal text-[#171717] pb-4 border-b border-[#D5D5D2]">
            Order Summary
          </h2>

          <div className="divide-y divide-[#D5D5D2] py-4 max-h-80 overflow-y-auto">
            {summary.detailedItems.map(({ product, selectedOption, quantity, lineTotalDZD }) => (
              <div
                key={`${product.id}-${selectedOption ?? 'default'}`}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-16 object-cover border border-[#D5D5D2]"
                  />
                  <div>
                    <p className="font-editorial text-base font-medium text-[#171717]">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-[#171717]/65">
                      Qty: {quantity}
                      {selectedOption ? ` · ${selectedOption}` : ''}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#171717] tabular-nums shrink-0">
                  {formatDZD(lineTotalDZD)}
                </span>
              </div>
            ))}
          </div>

          <div className="py-4 border-t border-[#D5D5D2] space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-[#171717]/70">Subtotal</span>
              <span className="font-semibold tabular-nums">{formatDZD(summary.subtotalDZD)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#171717]/70">
                Delivery ({formData.deliveryMethod === 'atelier_pickup' ? 'Atelier Pickup' : selectedWilayaObj?.name})
              </span>
              <span className="font-semibold tabular-nums">
                {summary.deliveryFeeDZD === 0 ? 'Complimentary' : formatDZD(summary.deliveryFeeDZD)}
              </span>
            </div>
          </div>

          <div className="py-4 border-t border-[#D5D5D2] flex justify-between items-baseline">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#171717]">
              Total Due
            </span>
            <span className="text-xl font-semibold text-[#171717] tabular-nums">
              {formatDZD(summary.totalDZD)}
            </span>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#171717] text-white text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#171717]/90 transition-colors cursor-pointer"
          >
            Confirm Order
          </button>

          <div className="mt-4 flex items-start gap-2.5 text-[11px] text-[#171717]/65 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
            <span>
              Submitting this form registers your archival order request. Our Algiers concierge will telephone you to confirm your order prior to dispatch.
            </span>
          </div>
        </aside>
      </form>
    </div>
  );
};
