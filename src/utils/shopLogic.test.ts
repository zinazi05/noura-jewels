import test from 'node:test';
import assert from 'node:assert/strict';
import { JEWELRY_CATALOG } from '../data/catalog';
import {
  calculateBagSummary,
  filterAndSortProducts,
  formatDZD,
  validateCheckoutForm,
} from './shopLogic';
import { ShopFilterState } from '../types/jewelry';

const baseFilters: ShopFilterState = {
  category: 'All Jewelry',
  materials: [],
  occasions: [],
  minPrice: '',
  maxPrice: '',
  searchQuery: '',
  sortBy: 'featured',
};

test('formatDZD formats Algerian Dinar amounts with tabular commas', () => {
  assert.equal(formatDZD(18500), '18,500 DZD');
  assert.equal(formatDZD(42000), '42,000 DZD');
});

test('filterAndSortProducts filters by category, material, occasion, and price range together', () => {
  // Filter by Silver and Wedding & Bridal
  const silverWedding = filterAndSortProducts(JEWELRY_CATALOG, {
    ...baseFilters,
    materials: ['Silver'],
    occasions: ['Wedding & Bridal'],
  });

  assert.ok(silverWedding.length > 0);
  for (const item of silverWedding) {
    assert.ok(item.materials.includes('Silver'));
    assert.ok(item.occasions.includes('Wedding & Bridal'));
  }

  // Filter by maxPrice 25000 DZD
  const under25k = filterAndSortProducts(JEWELRY_CATALOG, {
    ...baseFilters,
    maxPrice: '25000',
    sortBy: 'price-asc',
  });
  assert.ok(under25k.length >= 3);
  for (let i = 1; i < under25k.length; i++) {
    assert.ok(under25k[i].priceDZD >= under25k[i - 1].priceDZD);
    assert.ok(under25k[i].priceDZD <= 25000);
  }
});

test('calculateBagSummary computes accurate line totals, subtotal, and Wilaya delivery fee', () => {
  const summary = calculateBagSummary(
    [
      { productId: 'silver-heritage-earrings', quantity: 2 },
      { productId: 'golden-heritage-pendant', quantity: 1 },
    ],
    JEWELRY_CATALOG,
    '16',
    'home_delivery'
  );

  assert.equal(summary.totalCount, 3);
  // 2 * 18,500 + 1 * 34,000 = 71,000 DZD
  assert.equal(summary.subtotalDZD, 71000);
  // Wilaya 16 (Alger) home delivery = 600 DZD
  assert.equal(summary.deliveryFeeDZD, 600);
  assert.equal(summary.totalDZD, 71600);
});

test('validateCheckoutForm catches missing required fields and validates Algerian phone numbers', () => {
  const invalidErrors = validateCheckoutForm({
    fullName: '',
    phone: '1234',
    email: 'invalid-email',
    wilayaCode: '16',
    commune: '',
    streetAddress: '',
    deliveryNotes: '',
    deliveryMethod: 'home_delivery',
    paymentMethod: 'cod',
  });

  assert.ok(invalidErrors.fullName);
  assert.ok(invalidErrors.phone);
  assert.ok(invalidErrors.email);
  assert.ok(invalidErrors.commune);
  assert.ok(invalidErrors.streetAddress);

  const validErrors = validateCheckoutForm({
    fullName: 'Amira Benali',
    phone: '0550 12 34 56',
    email: 'amira@example.dz',
    wilayaCode: '16',
    commune: 'Hydra',
    streetAddress: '14 Rue des Frères Bouadou',
    deliveryNotes: '',
    deliveryMethod: 'home_delivery',
    paymentMethod: 'cod',
  });

  assert.equal(Object.keys(validErrors).length, 0);
});
