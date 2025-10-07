import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from './CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartProps {
  language?: 'en' | 'es' | 'zh' | 'fr';
}

const translations = {
  en: {
    cart: 'Shopping Cart',
    empty: 'Your cart is empty',
    emptyDescription: 'Add some delicious Trader Joe\'s products to get started!',
    continueShopping: 'Continue Shopping',
    total: 'Total',
    checkout: 'Checkout',
    remove: 'Remove',
    quantity: 'Qty',
    item: 'item',
    items: 'items',
    subtotal: 'Subtotal',
    tax: 'Tax (estimated)',
    shipping: 'Shipping',
    free: 'Free',
    clearCart: 'Clear Cart'
  },
  es: {
    cart: 'Carrito de Compras',
    empty: 'Tu carrito está vacío',
    emptyDescription: '¡Agrega algunos deliciosos productos de Trader Joe\'s para comenzar!',
    continueShopping: 'Continuar Comprando',
    total: 'Total',
    checkout: 'Pagar',
    remove: 'Eliminar',
    quantity: 'Cant.',
    item: 'artículo',
    items: 'artículos',
    subtotal: 'Subtotal',
    tax: 'Impuesto (estimado)',
    shipping: 'Envío',
    free: 'Gratis',
    clearCart: 'Vaciar Carrito'
  },
  zh: {
    cart: '购物车',
    empty: '您的购物车是空的',
    emptyDescription: '添加一些美味的Trader Joe\'s产品开始购物吧！',
    continueShopping: '继续购物',
    total: '总计',
    checkout: '结账',
    remove: '移除',
    quantity: '数量',
    item: '件',
    items: '件',
    subtotal: '小计',
    tax: '税费（预估）',
    shipping: '运费',
    free: '免费',
    clearCart: '清空购物车'
  },
  fr: {
    cart: 'Panier',
    empty: 'Votre panier est vide',
    emptyDescription: 'Ajoutez des délicieux produits Trader Joe\'s pour commencer !',
    continueShopping: 'Continuer les Achats',
    total: 'Total',
    checkout: 'Commander',
    remove: 'Supprimer',
    quantity: 'Qté',
    item: 'article',
    items: 'articles',
    subtotal: 'Sous-total',
    tax: 'Taxe (estimée)',
    shipping: 'Expédition',
    free: 'Gratuit',
    clearCart: 'Vider le Panier'
  }
};

export function Cart({ language = 'en' }: CartProps) {
  const { state, removeItem, updateQuantity, clearCart, setCartOpen } = useCart();
  const t = translations[language];

  const estimatedTax = state.totalPrice * 0.08; // 8% tax rate
  const finalTotal = state.totalPrice + estimatedTax;

  if (!state.isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setCartOpen(false)}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-tj-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tj-red-500 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-gray-900">{t.cart}</h2>
              <p className="text-sm text-gray-600">
                {state.totalItems} {state.totalItems === 1 ? t.item : t.items}
              </p>
            </div>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Content */}
        {state.items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{t.empty}</h3>
              <p className="text-gray-600 text-sm mb-6">{t.emptyDescription}</p>
              <button
                onClick={() => setCartOpen(false)}
                className="btn-primary"
              >
                {t.continueShopping}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{item.category}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-tj-red-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {state.items.length > 1 && (
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-sm text-red-600 hover:text-red-700 transition-colors font-medium"
                >
                  {t.clearCart}
                </button>
              )}
            </div>

            {/* Footer with Totals */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.subtotal}</span>
                  <span className="font-medium">${state.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.tax}</span>
                  <span className="font-medium">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.shipping}</span>
                  <span className="font-medium text-green-600">{t.free}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>{t.total}</span>
                  <span className="text-tj-red-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <button className="w-full bg-tj-red-500 hover:bg-tj-red-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                {t.checkout}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}