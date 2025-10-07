import { useState } from 'react';
import { ArrowLeft, Heart, Share2, ShoppingCart, Plus, Minus, Star, Globe, Clock, Users, Leaf, ShieldCheck, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Language = 'en' | 'es' | 'zh' | 'fr';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

interface NutritionInfo {
  calories: number;
  totalFat: string;
  saturatedFat: string;
  cholesterol: string;
  sodium: string;
  totalCarbs: string;
  dietaryFiber: string;
  sugars: string;
  protein: string;
  organic: boolean;
  glutenFree: boolean;
  vegan: boolean;
}

interface ProductInfo {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  ingredients: string[];
  servingSize: string;
  servingsPerContainer: number;
  nutrition: NutritionInfo;
  allergens: string[];
  benefits: string[];
  cookingInstructions?: string[];
  storageInstructions: string;
  origin: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  inStock: boolean;
}

const productTranslations = {
  en: {
    backToProducts: 'Back to Products',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    ingredients: 'Ingredients',
    nutritionFacts: 'Nutrition Facts',
    servingSize: 'Serving Size',
    servingsPerContainer: 'Servings Per Container',
    amountPerServing: 'Amount Per Serving',
    calories: 'Calories',
    totalFat: 'Total Fat',
    saturatedFat: 'Saturated Fat',
    cholesterol: 'Cholesterol',
    sodium: 'Sodium',
    totalCarbs: 'Total Carbohydrates',
    dietaryFiber: 'Dietary Fiber',
    sugars: 'Sugars',
    protein: 'Protein',
    allergens: 'Allergens',
    benefits: 'Key Benefits',
    cookingInstructions: 'Cooking Instructions',
    storage: 'Storage',
    origin: 'Origin',
    reviews: 'reviews',
    organic: 'Organic',
    glutenFree: 'Gluten-Free',
    vegan: 'Vegan',
    none: 'None',
    refrigerate: 'Keep refrigerated',
    freezer: 'Keep frozen',
    pantry: 'Store in cool, dry place'
  },
  es: {
    backToProducts: 'Volver a Productos',
    addToCart: 'Agregar al Carrito',
    outOfStock: 'Agotado',
    ingredients: 'Ingredientes',
    nutritionFacts: 'Información Nutricional',
    servingSize: 'Tamaño de Porción',
    servingsPerContainer: 'Porciones por Envase',
    amountPerServing: 'Cantidad por Porción',
    calories: 'Calorías',
    totalFat: 'Grasa Total',
    saturatedFat: 'Grasa Saturada',
    cholesterol: 'Colesterol',
    sodium: 'Sodio',
    totalCarbs: 'Carbohidratos Totales',
    dietaryFiber: 'Fibra Dietética',
    sugars: 'Azúcares',
    protein: 'Proteína',
    allergens: 'Alérgenos',
    benefits: 'Beneficios Clave',
    cookingInstructions: 'Instrucciones de Cocción',
    storage: 'Almacenamiento',
    origin: 'Origen',
    reviews: 'reseñas',
    organic: 'Orgánico',
    glutenFree: 'Sin Gluten',
    vegan: 'Vegano',
    none: 'Ninguno',
    refrigerate: 'Mantener refrigerado',
    freezer: 'Mantener congelado',
    pantry: 'Almacenar en lugar fresco y seco'
  },
  zh: {
    backToProducts: '返回产品',
    addToCart: '加入购物车',
    outOfStock: '缺货',
    ingredients: '配料',
    nutritionFacts: '营养成分',
    servingSize: '每份大小',
    servingsPerContainer: '每包装份数',
    amountPerServing: '每份含量',
    calories: '卡路里',
    totalFat: '总脂肪',
    saturatedFat: '饱和脂肪',
    cholesterol: '胆固醇',
    sodium: '钠',
    totalCarbs: '总碳水化合物',
    dietaryFiber: '膳食纤维',
    sugars: '糖',
    protein: '蛋白质',
    allergens: '过敏原',
    benefits: '主要益处',
    cookingInstructions: '烹饪说明',
    storage: '储存',
    origin: '产地',
    reviews: '评论',
    organic: '有机',
    glutenFree: '无麸质',
    vegan: '素食',
    none: '无',
    refrigerate: '冷藏保存',
    freezer: '冷冻保存',
    pantry: '存放在阴凉干燥处'
  },
  fr: {
    backToProducts: 'Retour aux Produits',
    addToCart: 'Ajouter au Panier',
    outOfStock: 'Rupture de Stock',
    ingredients: 'Ingrédients',
    nutritionFacts: 'Valeurs Nutritionnelles',
    servingSize: 'Taille de Portion',
    servingsPerContainer: 'Portions par Contenant',
    amountPerServing: 'Quantité par Portion',
    calories: 'Calories',
    totalFat: 'Matières Grasses Totales',
    saturatedFat: 'Graisses Saturées',
    cholesterol: 'Cholestérol',
    sodium: 'Sodium',
    totalCarbs: 'Glucides Totaux',
    dietaryFiber: 'Fibres Alimentaires',
    sugars: 'Sucres',
    protein: 'Protéines',
    allergens: 'Allergènes',
    benefits: 'Avantages Clés',
    cookingInstructions: 'Instructions de Cuisson',
    storage: 'Conservation',
    origin: 'Origine',
    reviews: 'avis',
    organic: 'Biologique',
    glutenFree: 'Sans Gluten',
    vegan: 'Végétalien',
    none: 'Aucun',
    refrigerate: 'Conserver au réfrigérateur',
    freezer: 'Conserver au congélateur',
    pantry: 'Conserver dans un endroit frais et sec'
  }
};

const languageNames = {
  en: 'English',
  es: 'Español',
  zh: '中文',
  fr: 'Français'
};

// Detailed product data
const productDetails: Record<string, ProductInfo> = {
  '1': {
    id: '1',
    name: 'Everything But The Bagel Seasoning',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1727055235447-58481d84ba5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkZXIlMjBqb2VzJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzU5MjExNzk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Seasonings',
    description: 'A perfect blend of sesame seeds, sea salt, dried garlic, dried onion, black sesame seeds, and poppy seeds that adds the perfect "everything bagel" flavor to any dish.',
    ingredients: [
      'Sesame Seeds',
      'Sea Salt Flakes',
      'Dried Garlic',
      'Dried Onion',
      'Black Sesame Seeds',
      'Poppy Seeds'
    ],
    servingSize: '1/4 tsp (1g)',
    servingsPerContainer: 71,
    nutrition: {
      calories: 5,
      totalFat: '0g',
      saturatedFat: '0g',
      cholesterol: '0mg',
      sodium: '65mg',
      totalCarbs: '0g',
      dietaryFiber: '0g',
      sugars: '0g',
      protein: '0g',
      organic: false,
      glutenFree: true,
      vegan: true
    },
    allergens: ['Sesame'],
    benefits: [
      'Adds flavor without extra calories',
      'Perfect for avocado toast',
      'Great on salads and roasted vegetables',
      'Versatile seasoning for any meal'
    ],
    storageInstructions: 'pantry',
    origin: 'Made in USA',
    rating: 4.8,
    reviewCount: 2847,
    tags: ['Popular', 'Frequently Bought'],
    inStock: false
  },
  '2': {
    id: '2',
    name: 'Mandarin Orange Chicken',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1758866558460-21b1dafe44f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcm96ZW4lMjBmb29kJTIwcGFja2FnZXN8ZW58MXx8fHwxNzU5MTI1MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Frozen',
    description: 'Crispy chicken pieces in a sweet and tangy mandarin orange sauce. Customer favorite that\'s ready in minutes!',
    ingredients: [
      'Chicken Thigh Meat',
      'Wheat Flour',
      'Mandarin Orange Puree',
      'Sugar',
      'Soy Sauce',
      'Rice Vinegar',
      'Ginger',
      'Garlic',
      'Sesame Oil',
      'Cornstarch'
    ],
    servingSize: '1 cup (140g)',
    servingsPerContainer: 3,
    nutrition: {
      calories: 320,
      totalFat: '14g',
      saturatedFat: '3g',
      cholesterol: '65mg',
      sodium: '650mg',
      totalCarbs: '35g',
      dietaryFiber: '2g',
      sugars: '18g',
      protein: '18g',
      organic: false,
      glutenFree: false,
      vegan: false
    },
    allergens: ['Wheat', 'Soy', 'Sesame'],
    benefits: [
      'Ready in 10 minutes',
      'Restaurant-quality flavor at home',
      'No artificial preservatives',
      'Good source of protein'
    ],
    cookingInstructions: [
      'Preheat oven to 400°F',
      'Place frozen chicken on baking sheet',
      'Bake for 18-20 minutes until heated through',
      'Serve immediately over rice or vegetables'
    ],
    storageInstructions: 'freezer',
    origin: 'Made in USA',
    rating: 4.7,
    reviewCount: 3201,
    tags: ['Bestseller', 'Frequently Bought'],
    inStock: true
  },
  '3': {
    id: '3',
    name: 'Cookie Butter',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1722895001799-2cdd038737ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZm9vZCUyMHByb2R1Y3RzfGVufDF8fHx8MTc1OTEzNzQyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Spreads',
    description: 'Smooth and creamy spread made from crushed Belgian cookies. Perfect for toast, fruit, or eating straight from the jar!',
    ingredients: [
      'Crushed Belgian Cookies (Wheat Flour, Sugar, Vegetable Oil, Baking Soda, Cinnamon, Salt)',
      'Vegetable Oil (Rapeseed, Palm, Sunflower)',
      'Sugar',
      'Soy Flour',
      'Salt'
    ],
    servingSize: '1 tbsp (15g)',
    servingsPerContainer: 25,
    nutrition: {
      calories: 90,
      totalFat: '5.5g',
      saturatedFat: '2g',
      cholesterol: '0mg',
      sodium: '45mg',
      totalCarbs: '9g',
      dietaryFiber: '0g',
      sugars: '5g',
      protein: '1g',
      organic: false,
      glutenFree: false,
      vegan: true
    },
    allergens: ['Wheat', 'Soy'],
    benefits: [
      'Made with real Belgian cookies',
      'Smooth and spreadable texture',
      'Great for desserts and snacks',
      'No artificial flavors'
    ],
    storageInstructions: 'pantry',
    origin: 'Made in Belgium',
    rating: 4.9,
    reviewCount: 1876,
    tags: ['Cult Favorite', 'Frequently Bought'],
    inStock: true
  },
  '4': {
    id: '4',
    name: 'Cauliflower Gnocchi',
    price: 2.69,
    image: 'https://images.unsplash.com/photo-1617912760139-86a1766ed1f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVjaWFsdHklMjBzbmFja3MlMjBwYWNrYWdpbmd8ZW58MXx8fHwxNzU5MjExODAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Pasta',
    description: 'Made with 75% cauliflower, this gnocchi is a healthier alternative to traditional pasta. Light, fluffy, and delicious!',
    ingredients: [
      'Cauliflower',
      'Cassava Flour',
      'Potato Starch',
      'Extra Virgin Olive Oil',
      'Sea Salt'
    ],
    servingSize: '1 cup (140g)',
    servingsPerContainer: 2.5,
    nutrition: {
      calories: 140,
      totalFat: '3g',
      saturatedFat: '0.5g',
      cholesterol: '0mg',
      sodium: '460mg',
      totalCarbs: '22g',
      dietaryFiber: '6g',
      sugars: '2g',
      protein: '2g',
      organic: true,
      glutenFree: true,
      vegan: true
    },
    allergens: [],
    benefits: [
      '75% cauliflower - more vegetables!',
      'Gluten-free alternative to regular pasta',
      'High in fiber',
      'Made with simple ingredients',
      'Cooks in just 3-4 minutes'
    ],
    cookingInstructions: [
      'Heat 1 tablespoon oil in non-stick pan over medium-high heat',
      'Add frozen gnocchi directly to pan (do not thaw)',
      'Cook 5-7 minutes, tossing frequently until golden brown',
      'Season and serve with your favorite sauce'
    ],
    storageInstructions: 'freezer',
    origin: 'Made in Italy',
    rating: 4.3,
    reviewCount: 987,
    tags: ['Healthy', 'Gluten-Free'],
    inStock: true
  },
  '5': {
    id: '5',
    name: 'Unexpected Cheddar',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1757857755327-5b38c51a0302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwY2hlZXNlJTIwZGFpcnl8ZW58MXx8fHwxNzU5MjExODA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Cheese',
    description: 'A perfectly aged cheddar with crystalline texture and nutty flavor notes. Winner of multiple awards!',
    ingredients: [
      'Pasteurized Milk',
      'Cheese Cultures',
      'Salt',
      'Enzymes'
    ],
    servingSize: '1 oz (28g)',
    servingsPerContainer: 16,
    nutrition: {
      calories: 110,
      totalFat: '9g',
      saturatedFat: '6g',
      cholesterol: '30mg',
      sodium: '180mg',
      totalCarbs: '0g',
      dietaryFiber: '0g',
      sugars: '0g',
      protein: '7g',
      organic: false,
      glutenFree: true,
      vegan: false
    },
    allergens: ['Milk'],
    benefits: [
      'Award-winning flavor',
      'Aged to perfection',
      'Natural crystalline texture',
      'Good source of protein and calcium',
      'Perfect for cheese boards'
    ],
    storageInstructions: 'refrigerate',
    origin: 'Made in Vermont, USA',
    rating: 4.6,
    reviewCount: 1543,
    tags: ['Award Winner', 'Staff Pick'],
    inStock: true
  },
  '6': {
    id: '6',
    name: 'Pumpkin Spice Everything',
    price: 4.99,
    originalPrice: 5.99,
    image: 'https://images.unsplash.com/photo-1727055235447-58481d84ba5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wa2luJTIwc3BpY2UlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTkyMTE4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Seasonal',
    description: 'Seasonal favorite featuring warm pumpkin spice flavors perfect for fall. Limited time only!',
    ingredients: [
      'Organic Pumpkin Puree',
      'Organic Coconut Milk',
      'Organic Cane Sugar',
      'Cinnamon',
      'Nutmeg',
      'Ginger',
      'Allspice',
      'Natural Flavors'
    ],
    servingSize: '2 tbsp (30g)',
    servingsPerContainer: 8,
    nutrition: {
      calories: 60,
      totalFat: '2g',
      saturatedFat: '2g',
      cholesterol: '0mg',
      sodium: '25mg',
      totalCarbs: '11g',
      dietaryFiber: '1g',
      sugars: '9g',
      protein: '1g',
      organic: true,
      glutenFree: false,
      vegan: true
    },
    allergens: [],
    benefits: [
      'Made with organic pumpkin',
      'Perfect fall flavors',
      'Limited seasonal item',
      'Great for baking and cooking',
      'Warm spice blend'
    ],
    storageInstructions: 'refrigerate',
    origin: 'Made in USA',
    rating: 4.4,
    reviewCount: 234,
    tags: ['Limited Time', 'New'],
    inStock: true
  }
};

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const t = productTranslations[currentLanguage];
  const product = productDetails[productId];

  if (!product) {
    return (
      <div className="min-h-screen gradient-tj-warm flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Product not found</h2>
          <button
            onClick={onBack}
            className="btn-primary"
          >
            {t.backToProducts}
          </button>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    if (product.inStock) {
      setCartQuantity(prev => prev + 1);
    }
  };

  const removeFromCart = () => {
    setCartQuantity(prev => Math.max(0, prev - 1));
  };

  const renderLanguageSwitcher = () => (
    <div className="relative">
      <button
        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
        className="flex items-center gap-2 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors duration-200"
      >
        <Globe className="w-4 h-4 text-neutral-600" />
        <span className="text-sm font-medium text-neutral-700">
          {languageNames[currentLanguage]}
        </span>
      </button>
      
      {showLanguageMenu && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50 min-w-[140px]">
          {(Object.keys(languageNames) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setCurrentLanguage(lang);
                setShowLanguageMenu(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-tj-red-50 transition-colors duration-200 ${
                currentLanguage === lang ? 'text-tj-red-600 bg-tj-red-50' : 'text-neutral-700'
              }`}
            >
              {languageNames[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen gradient-tj-warm">
      <div className="max-w-md mx-auto bg-surface min-h-screen" style={{ boxShadow: 'var(--shadow-xl)' }}>
        {/* Header */}
        <header className="sticky top-0 z-50 glass-effect border-b border-border">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">{t.backToProducts}</span>
              </button>
              
              {renderLanguageSwitcher()}
            </div>
          </div>
        </header>

        {/* Product Image */}
        <div className="relative h-80">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-gray-800/90 text-white px-4 py-2 rounded-lg font-medium">
                {t.outOfStock}
              </span>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'text-tj-red-500 fill-current' : 'text-neutral-600'}`} />
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
              <Share2 className="w-5 h-5 text-neutral-600" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="px-4 py-6 space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-neutral-500">{product.category}</span>
              {product.nutrition.organic && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <Leaf className="w-3 h-3" />
                  {t.organic}
                </span>
              )}
              {product.nutrition.glutenFree && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {t.glutenFree}
                </span>
              )}
              {product.nutrition.vegan && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {t.vegan}
                </span>
              )}
            </div>
            
            <h1 className="text-2xl font-semibold text-neutral-900 mb-3">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-neutral-700">{product.rating}</span>
              <span className="text-sm text-neutral-500">({product.reviewCount} {t.reviews})</span>
            </div>

            <p className="text-neutral-600 leading-relaxed mb-4">{product.description}</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-neutral-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-500 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Add to Cart */}
            {cartQuantity > 0 ? (
              <div className="flex items-center justify-between bg-tj-red-500 text-white rounded-xl p-4">
                <button
                  onClick={removeFromCart}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-lg font-semibold">{cartQuantity}</span>
                <button
                  onClick={addToCart}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-tj-red-500 hover:bg-tj-red-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.inStock ? t.addToCart : t.outOfStock}
              </button>
            )}
          </div>

          {/* Ingredients */}
          <div className="bg-neutral-50 rounded-xl p-4">
            <h3 className="font-semibold text-neutral-900 mb-3">{t.ingredients}</h3>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {product.ingredients.join(', ')}
            </p>
          </div>

          {/* Nutrition Facts */}
          <div className="bg-white border border-neutral-200 rounded-xl p-4">
            <h3 className="font-semibold text-neutral-900 mb-4 text-center border-b border-neutral-200 pb-2">
              {t.nutritionFacts}
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium">{t.servingSize}</span>
                <span>{product.servingSize}</span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-200 pb-2 mb-2">
                <span className="font-medium">{t.servingsPerContainer}</span>
                <span>{product.servingsPerContainer}</span>
              </div>
              
              <div className="font-medium text-base mb-2">{t.amountPerServing}</div>
              
              <div className="flex justify-between items-center text-lg font-bold border-b-4 border-neutral-800 pb-1">
                <span>{t.calories}</span>
                <span>{product.nutrition.calories}</span>
              </div>
              
              <div className="space-y-1 pt-2">
                <div className="flex justify-between">
                  <span className="font-medium">{t.totalFat}</span>
                  <span>{product.nutrition.totalFat}</span>
                </div>
                <div className="flex justify-between pl-4">
                  <span>{t.saturatedFat}</span>
                  <span>{product.nutrition.saturatedFat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t.cholesterol}</span>
                  <span>{product.nutrition.cholesterol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t.sodium}</span>
                  <span>{product.nutrition.sodium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t.totalCarbs}</span>
                  <span>{product.nutrition.totalCarbs}</span>
                </div>
                <div className="flex justify-between pl-4">
                  <span>{t.dietaryFiber}</span>
                  <span>{product.nutrition.dietaryFiber}</span>
                </div>
                <div className="flex justify-between pl-4">
                  <span>{t.sugars}</span>
                  <span>{product.nutrition.sugars}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t.protein}</span>
                  <span>{product.nutrition.protein}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Allergens */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-semibold text-neutral-900 mb-2">{t.allergens}</h3>
            <p className="text-sm text-neutral-700">
              {product.allergens.length > 0 ? product.allergens.join(', ') : t.none}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">{t.benefits}</h3>
            <div className="grid grid-cols-1 gap-2">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-tj-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-neutral-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cooking Instructions */}
          {product.cookingInstructions && (
            <div className="bg-tj-red-50 border border-tj-red-200 rounded-xl p-4">
              <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-tj-red-600" />
                {t.cookingInstructions}
              </h3>
              <ol className="space-y-2">
                {product.cookingInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-tj-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm text-neutral-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Storage & Origin */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between py-3 border-b border-neutral-200">
              <span className="font-medium text-neutral-900">{t.storage}</span>
              <span className="text-sm text-neutral-600">{t[product.storageInstructions as keyof typeof t]}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="font-medium text-neutral-900">{t.origin}</span>
              <span className="text-sm text-neutral-600">{product.origin}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}