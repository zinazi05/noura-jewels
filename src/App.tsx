import { useState, useMemo } from 'react';
import {
  ActivePage,
  JewelryCategory,
  JewelryProduct,
  OrderReceipt,
  ShopFilterState,
} from './types/jewelry';
import { JEWELRY_CATALOG } from './data/catalog';
import { calculateBagSummary, filterAndSortProducts } from './utils/shopLogic';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { ProductDetailView } from './components/ProductDetailView';
import { BagView } from './components/BagView';
import { CheckoutView } from './components/CheckoutView';
import { StoryContactView } from './components/StoryContactView';
import { useAppDispatch, useAppSelector } from './store';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setOrderNote as setReduxOrderNote,
} from './store/cartSlice';

const INITIAL_FILTERS: ShopFilterState = {
  category: 'All Jewelry',
  materials: ['Solid Silver (925)'],
  occasions: ['Wedding & Bridal'],
  minPrice: '10000',
  maxPrice: '50000',
  searchQuery: '',
  sortBy: 'featured',
};

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>(JEWELRY_CATALOG[0].id);
  const [filters, setFilters] = useState<ShopFilterState>(INITIAL_FILTERS);
  const [lastOrderReceipt, setLastOrderReceipt] = useState<OrderReceipt | null>(null);

  // Redux store integration (satisfying ENSTA WAMD TD-TP 02 React + Redux requirements)
  const dispatch = useAppDispatch();
  const bagItems = useAppSelector((state) => state.cart.items);
  const orderNote = useAppSelector((state) => state.cart.orderNote);

  const filteredProducts = useMemo(
    () => filterAndSortProducts(JEWELRY_CATALOG, filters),
    [filters]
  );

  const bagSummary = useMemo(
    () => calculateBagSummary(bagItems, JEWELRY_CATALOG),
    [bagItems]
  );

  const currentProduct = useMemo(
    () =>
      JEWELRY_CATALOG.find((p) => p.id === selectedProductId) ?? JEWELRY_CATALOG[0],
    [selectedProductId]
  );

  const relatedProducts = useMemo(
    () =>
      JEWELRY_CATALOG.filter(
        (p) =>
          p.id !== currentProduct.id &&
          (p.category === currentProduct.category ||
            p.materials.some((m) => currentProduct.materials.includes(m)))
      ),
    [currentProduct]
  );

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: JewelryCategory) => {
    setFilters((prev) => ({
      ...prev,
      category,
    }));
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
    }));
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToBag = (
    product: JewelryProduct,
    quantity: number,
    selectedOption?: string
  ) => {
    const resolvedOption = selectedOption ?? product.options?.choices[0];
    dispatch(
      addToCart({
        productId: product.id,
        quantity,
        selectedOption: resolvedOption,
      })
    );
  };

  const handleQuickAdd = (product: JewelryProduct) => {
    handleAddToBag(product, 1, product.options?.choices[0]);
  };

  const handleUpdateQuantity = (
    productId: string,
    selectedOption: string | undefined,
    delta: number
  ) => {
    dispatch(updateQuantity({ productId, selectedOption, delta }));
  };

  const handleRemoveItem = (
    productId: string,
    selectedOption: string | undefined
  ) => {
    dispatch(removeFromCart({ productId, selectedOption }));
  };

  const handleUpdateOrderNote = (note: string) => {
    dispatch(setReduxOrderNote(note));
  };

  const handleSubmitOrder = (receipt: OrderReceipt) => {
    setLastOrderReceipt(receipt);
    dispatch(clearCart());
    setActivePage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#171717]">
      <Navbar
        activePage={activePage}
        bagCount={bagSummary.totalCount}
        searchQuery={filters.searchQuery}
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategory}
        onSearchSubmit={handleSearchSubmit}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            products={JEWELRY_CATALOG}
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
            onOpenProduct={handleOpenProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activePage === 'shop' && (
          <ShopView
            products={filteredProducts}
            totalCount={JEWELRY_CATALOG.length}
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={() => setFilters(INITIAL_FILTERS)}
            onOpenProduct={handleOpenProduct}
            onQuickAdd={handleQuickAdd}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'product' && (
          <ProductDetailView
            product={currentProduct}
            relatedProducts={relatedProducts}
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
            onOpenProduct={handleOpenProduct}
            onAddToBag={handleAddToBag}
          />
        )}

        {activePage === 'bag' && (
          <BagView
            bagItems={bagItems}
            catalog={JEWELRY_CATALOG}
            orderNote={orderNote}
            onUpdateOrderNote={handleUpdateOrderNote}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={handleNavigate}
            onOpenProduct={handleOpenProduct}
          />
        )}

        {(activePage === 'checkout' || activePage === 'confirmation') && (
          <CheckoutView
            bagItems={bagItems}
            catalog={JEWELRY_CATALOG}
            orderNote={orderNote}
            lastOrderReceipt={lastOrderReceipt}
            isConfirmationMode={activePage === 'confirmation'}
            onNavigate={handleNavigate}
            onSubmitOrder={handleSubmitOrder}
          />
        )}

        {(activePage === 'story' || activePage === 'contact') && (
          <StoryContactView
            initialSection={activePage === 'contact' ? 'contact' : 'story'}
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategory}
        hideTrustStrip={activePage === 'shop'}
      />
    </div>
  );
}
