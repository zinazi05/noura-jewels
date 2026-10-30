import test from 'node:test';
import assert from 'node:assert/strict';
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setOrderNote,
} from './cartSlice';

test('cartSlice: adds new item or increments existing quantity', () => {
  const initial = { items: [], orderNote: '' };
  const s1 = cartReducer(
    initial,
    addToCart({ productId: 'silver-heritage-earrings', quantity: 2, selectedOption: 'Hook' })
  );
  assert.equal(s1.items.length, 1);
  assert.equal(s1.items[0].quantity, 2);

  const s2 = cartReducer(
    s1,
    addToCart({ productId: 'silver-heritage-earrings', quantity: 1, selectedOption: 'Hook' })
  );
  assert.equal(s2.items.length, 1);
  assert.equal(s2.items[0].quantity, 3);
});

test('cartSlice: updates quantity or removes when reaches zero', () => {
  const initial = {
    items: [{ productId: 'item-1', quantity: 2, selectedOption: undefined }],
    orderNote: '',
  };

  const s1 = cartReducer(
    initial,
    updateQuantity({ productId: 'item-1', selectedOption: undefined, delta: 1 })
  );
  assert.equal(s1.items[0].quantity, 3);

  const s2 = cartReducer(
    s1,
    updateQuantity({ productId: 'item-1', selectedOption: undefined, delta: -3 })
  );
  assert.equal(s2.items.length, 0);
});

test('cartSlice: removes item and clears cart', () => {
  const initial = {
    items: [
      { productId: 'item-1', quantity: 1, selectedOption: undefined },
      { productId: 'item-2', quantity: 2, selectedOption: 'Gold' },
    ],
    orderNote: 'Gift wrap',
  };

  const s1 = cartReducer(
    initial,
    removeFromCart({ productId: 'item-1', selectedOption: undefined })
  );
  assert.equal(s1.items.length, 1);
  assert.equal(s1.items[0].productId, 'item-2');

  const s2 = cartReducer(s1, clearCart());
  assert.equal(s2.items.length, 0);
  assert.equal(s2.orderNote, '');
});

test('cartSlice: updates order note', () => {
  const initial = { items: [], orderNote: '' };
  const s1 = cartReducer(initial, setOrderNote('Please handle with care'));
  assert.equal(s1.orderNote, 'Please handle with care');
});
