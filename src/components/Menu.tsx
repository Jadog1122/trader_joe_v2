import { useState } from 'react';
import { ArrowLeft, Search, Filter, Grid3X3, List, MoreHorizontal, Info, Hexagon, Star, Clock, TrendingUp, Heart, Plus, Minus, Globe, X, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from './CartContext';

type ViewMode = 'grid' | 'list' | 'bubble' | 'info';
type Category = 'all' | 'frequent' | 'popular' | 'new';
type Language = 'en' | 'es' | 'zh' | 'fr';

interface FilterOptions {
  dietary: string[];
  taste: string[];
  priceRange: [number, number];
  category: string[];
  allergenFree: string[];
}

const translations = {
  en: {
    products: 'Products',
    searchPlaceholder: 'Search products...',
    noProductsFound: 'No products found',
    tryAdjusting: 'Try adjusting your search or category filter',
    allItems: 'All Items',
    frequentlyBought: 'Frequently Bought',
    popular: 'Popular',
    new: 'New',
    addToCart: 'Add to Cart',
    add: 'Add',
    outOfStock: 'Out of Stock',
    out: 'Out',
    reviews: 'reviews',
    organic: 'Organic',
    glutenFree: 'Gluten-Free',
    vegan: 'Vegan',
    cal: 'cal',
    // Filter options
    filters: 'Filters',
    dietary: 'Dietary',
    taste: 'Taste Profile',
    priceRange: 'Price Range',
    categories: 'Categories',
    allergenFree: 'Allergen-Free',
    clearAll: 'Clear All',
    applyFilters: 'Apply Filters',
    showFilters: 'Show Filters',
    hideFilters: 'Hide Filters',
    // Product names
    everythingBagel: 'Everything But The Bagel Seasoning',
    mandarinChicken: 'Mandarin Orange Chicken',
    cookieButter: 'Cookie Butter',
    cauliflowerGnocchi: 'Cauliflower Gnocchi',
    unexpectedCheddar: 'Unexpected Cheddar',
    pumpkinSpice: 'Pumpkin Spiced Joe-Joe\'s',
    chocolateHummus: 'Dark Chocolate Hummus',
    eloteCornChips: 'Elote Corn Chip Dippers',
    everythingCrackers: 'Everything Crackers',
    garlicSpread: 'Garlic Spread Dip',
    hashbrownBowl: 'Riced Cauliflower Bowl',
    palakPaneer: 'Palak Paneer',
    pastaSauce: 'Organic Vodka Pasta Sauce',
    quinoaSalad: 'Quinoa Cowboy Veggie Burgers',
    spanakopita: 'Spinach & Artichoke Dip'
  },
  es: {
    products: 'Productos',
    searchPlaceholder: 'Buscar productos...',
    noProductsFound: 'No se encontraron productos',
    tryAdjusting: 'Intenta ajustar tu búsqueda o filtro de categoría',
    allItems: 'Todos los Artículos',
    frequentlyBought: 'Comprados Frecuentemente',
    popular: 'Popular',
    new: 'Nuevo',
    addToCart: 'Agregar al Carrito',
    add: 'Agregar',
    outOfStock: 'Agotado',
    out: 'Agotado',
    reviews: 'reseñas',
    organic: 'Orgánico',
    glutenFree: 'Sin Gluten',
    vegan: 'Vegano',
    cal: 'cal',
    // Filter options
    filters: 'Filtros',
    dietary: 'Dietético',
    taste: 'Perfil de Sabor',
    priceRange: 'Rango de Precio',
    categories: 'Categorías',
    allergenFree: 'Sin Alérgenos',
    clearAll: 'Limpiar Todo',
    applyFilters: 'Aplicar Filtros',
    showFilters: 'Mostrar Filtros',
    hideFilters: 'Ocultar Filtros',
    // Product names
    everythingBagel: 'Condimento Todo Menos El Bagel',
    mandarinChicken: 'Pollo de Mandarina',
    cookieButter: 'Mantequilla de Galleta',
    cauliflowerGnocchi: 'Ñoquis de Coliflor',
    unexpectedCheddar: 'Cheddar Inesperado',
    pumpkinSpice: 'Joe-Joe\'s de Especias de Calabaza',
    chocolateHummus: 'Hummus de Chocolate Negro',
    eloteCornChips: 'Chips de Maíz Elote',
    everythingCrackers: 'Galletas Everything',
    garlicSpread: 'Dip de Ajo',
    hashbrownBowl: 'Bowl de Coliflor Rallada',
    palakPaneer: 'Palak Paneer',
    pastaSauce: 'Salsa de Pasta con Vodka Orgánica',
    quinoaSalad: 'Hamburguesas Veggie de Quinoa',
    spanakopita: 'Dip de Espinaca y Alcachofa'
  },
  zh: {
    products: '产品',
    searchPlaceholder: '搜索产品...',
    noProductsFound: '未找到产品',
    tryAdjusting: '请尝试调整搜索或分类筛选',
    allItems: '所有商品',
    frequentlyBought: '经常购买',
    popular: '热门',
    new: '新品',
    addToCart: '加入购物车',
    add: '添加',
    outOfStock: '缺货',
    out: '缺货',
    reviews: '评论',
    organic: '有机',
    glutenFree: '无麸质',
    vegan: '素食',
    cal: '卡',
    // Filter options
    filters: '筛选器',
    dietary: '饮食',
    taste: '口味特征',
    priceRange: '价格范围',
    categories: '类别',
    allergenFree: '无过敏原',
    clearAll: '清除全部',
    applyFilters: '应用筛选器',
    showFilters: '显示筛选器',
    hideFilters: '隐藏筛选器',
    // Product names
    everythingBagel: '万能贝果调料',
    mandarinChicken: '橘子鸡',
    cookieButter: '饼干黄油',
    cauliflowerGnocchi: '花椰菜团子',
    unexpectedCheddar: '意外切达奶酪',
    pumpkinSpice: '南瓜香料饼干',
    chocolateHummus: '黑巧克力鹰嘴豆泥',
    eloteCornChips: '墨西哥玉米片',
    everythingCrackers: '万能饼干',
    garlicSpread: '蒜蓉酱',
    hashbrownBowl: '花椰菜米碗',
    palakPaneer: '菠菜芝士',
    pastaSauce: '有机伏特加番茄酱',
    quinoaSalad: '藜麦素食汉堡',
    spanakopita: '菠菜朝鲜蓟蘸酱'
  },
  fr: {
    products: 'Produits',
    searchPlaceholder: 'Rechercher des produits...',
    noProductsFound: 'Aucun produit trouvé',
    tryAdjusting: 'Essayez d\'ajuster votre recherche ou filtre de catégorie',
    allItems: 'Tous les Articles',
    frequentlyBought: 'Fréquemment Achetés',
    popular: 'Populaire',
    new: 'Nouveau',
    addToCart: 'Ajouter au Panier',
    add: 'Ajouter',
    outOfStock: 'Rupture de Stock',
    out: 'Rupture',
    reviews: 'avis',
    organic: 'Biologique',
    glutenFree: 'Sans Gluten',
    vegan: 'Végétalien',
    cal: 'cal',
    // Filter options
    filters: 'Filtres',
    dietary: 'Diététique',
    taste: 'Profil Gustatif',
    priceRange: 'Gamme de Prix',
    categories: 'Catégories',
    allergenFree: 'Sans Allergènes',
    clearAll: 'Effacer Tout',
    applyFilters: 'Appliquer les Filtres',
    showFilters: 'Afficher les Filtres',
    hideFilters: 'Masquer les Filtres',
    // Product names
    everythingBagel: 'Assaisonnement Tout Sauf Le Bagel',
    mandarinChicken: 'Poulet à la Mandarine',
    cookieButter: 'Beurre de Biscuit',
    cauliflowerGnocchi: 'Gnocchis de Chou-fleur',
    unexpectedCheddar: 'Cheddar Inattendu',
    pumpkinSpice: 'Biscuits aux Épices de Citrouille',
    chocolateHummus: 'Houmous au Chocolat Noir',
    eloteCornChips: 'Chips de Maïs Mexicain',
    everythingCrackers: 'Crackers Everything',
    garlicSpread: 'Tartinade à l\'Ail',
    hashbrownBowl: 'Bol de Chou-fleur Râpé',
    palakPaneer: 'Palak Paneer',
    pastaSauce: 'Sauce à Pâtes à la Vodka Bio',
    quinoaSalad: 'Burgers Végé au Quinoa',
    spanakopita: 'Trempette Épinards et Artichauts'
  }
};

const languageNames = {
  en: 'English',
  es: 'Español',
  zh: '中文',
  fr: 'Français'
};

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  description: string;
  isNew?: boolean;
  isPopular?: boolean;
  isFrequent?: boolean;
  inStock: boolean;
  ingredients: string[];
  allergens: string[];
  tasteProfile: string[];
  nutrition?: {
    calories: number;
    organic: boolean;
    glutenFree: boolean;
    vegan: boolean;
    servingSize: string;
    fat: number;
    sodium: number;
    protein: number;
  };
}



const products: Product[] = [
  {
    id: '1',
    name: 'everythingBagel',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1582587931228-ea9fc296ffb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVyeXRoaW5nJTIwYmFnZWwlMjBzZWFzb25pbmclMjBzcGljZXxlbnwxfHx8fDE3NTkzODgyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Seasonings',
    tags: ['Popular', 'Frequently Bought'],
    rating: 4.8,
    reviewCount: 2847,
    description: 'A perfect blend of sesame seeds, sea salt, dried garlic, dried onion, black sesame seeds, and poppy seeds.',
    isPopular: true,
    isFrequent: true,
    inStock: false,
    ingredients: ['Sesame Seeds', 'Sea Salt Flakes', 'Dried Garlic', 'Dried Onion', 'Black Sesame Seeds', 'Poppy Seeds'],
    allergens: ['Sesame'],
    tasteProfile: ['Savory', 'Garlic', 'Nutty'],
    nutrition: { calories: 5, organic: false, glutenFree: true, vegan: true, servingSize: '1/4 tsp', fat: 0.5, sodium: 35, protein: 0 }
  },
  {
    id: '2',
    name: 'mandarinChicken',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1738332739213-c917c40442c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcm96ZW4lMjBvcmFuZ2UlMjBjaGlja2VufGVufDF8fHx8MTc1OTM4ODIyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Frozen',
    tags: ['Bestseller', 'Frequently Bought'],
    rating: 4.7,
    reviewCount: 3201,
    description: 'Crispy chicken pieces in a sweet and tangy mandarin orange sauce. Customer favorite!',
    isPopular: true,
    isFrequent: true,
    inStock: true,
    ingredients: ['Chicken Breast', 'Mandarin Orange Puree', 'Sugar', 'Soy Sauce', 'Rice Vinegar', 'Ginger', 'Garlic', 'Cornstarch', 'Red Bell Pepper'],
    allergens: ['Soy', 'Wheat'],
    tasteProfile: ['Sweet', 'Tangy', 'Citrus'],
    nutrition: { calories: 320, organic: false, glutenFree: false, vegan: false, servingSize: '1 cup', fat: 13, sodium: 630, protein: 15 }
  },
  {
    id: '3',
    name: 'cookieButter',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1716483758479-de32a4e8b092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raWUlMjBidXR0ZXIlMjBzcHJlYWQlMjBqYXJ8ZW58MXx8fHwxNzU5Mzg4MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Spreads',
    tags: ['Cult Favorite', 'Frequently Bought'],
    rating: 4.9,
    reviewCount: 1876,
    description: 'Smooth and creamy spread made from crushed Belgian cookies.',
    isFrequent: true,
    inStock: true,
    ingredients: ['Belgian Cookies (Wheat Flour, Sugar, Vegetable Oils, Candy Sugar Syrup, Raising Agent, Soy Flour, Salt, Cinnamon)', 'Vegetable Oils (Rapeseed, Palm)', 'Sugar', 'Emulsifier (Lecithins)', 'Acid (Citric Acid)'],
    allergens: ['Wheat', 'Soy', 'May contain Milk, Nuts'],
    tasteProfile: ['Sweet', 'Spiced', 'Caramel'],
    nutrition: { calories: 180, organic: false, glutenFree: false, vegan: false, servingSize: '1 tbsp', fat: 11, sodium: 55, protein: 2 }
  },
  {
    id: '4',
    name: 'cauliflowerGnocchi',
    price: 2.69,
    image: 'https://images.unsplash.com/photo-1603729362753-f8162ac6c3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXVsaWZsb3dlciUyMGdub2NjaGklMjBwYXN0YXxlbnwxfHx8fDE3NTkzODgyMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Pasta',
    tags: ['Healthy', 'Gluten-Free'],
    rating: 4.3,
    reviewCount: 987,
    description: 'Made with 75% cauliflower, this gnocchi is a healthier alternative to traditional pasta.',
    isPopular: true,
    inStock: true,
    ingredients: ['Cauliflower', 'Cassava Flour', 'Potato Starch', 'Extra Virgin Olive Oil', 'Sea Salt'],
    allergens: [],
    tasteProfile: ['Mild', 'Neutral', 'Light'],
    nutrition: { calories: 140, organic: true, glutenFree: true, vegan: true, servingSize: '1 cup', fat: 3, sodium: 460, protein: 2 }
  },
  {
    id: '5',
    name: 'unexpectedCheddar',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1699551223039-4bf1c1e66d0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ2VkJTIwY2hlZGRhciUyMGNoZWVzZSUyMHdoZWVsfGVufDF8fHx8MTc1OTM4ODIzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Cheese',
    tags: ['Award Winner', 'Staff Pick'],
    rating: 4.6,
    reviewCount: 1543,
    description: 'A perfectly aged cheddar with crystalline texture and nutty flavor notes.',
    isPopular: true,
    inStock: true,
    ingredients: ['Pasteurized Milk', 'Cheese Cultures', 'Salt', 'Enzymes'],
    allergens: ['Milk'],
    tasteProfile: ['Sharp', 'Nutty', 'Aged'],
    nutrition: { calories: 110, organic: false, glutenFree: true, vegan: false, servingSize: '1 oz', fat: 9, sodium: 180, protein: 7 }
  },
  {
    id: '6',
    name: 'pumpkinSpice',
    price: 4.99,
    originalPrice: 5.99,
    image: 'https://images.unsplash.com/photo-1665355987262-8d596b4a1d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wa2luJTIwc3BpY2UlMjBjb29raWVzfGVufDF8fHx8MTc1OTM2MjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Cookies',
    tags: ['Limited Time', 'New'],
    rating: 4.4,
    reviewCount: 234,
    description: 'Seasonal Joe-Joe\'s cookies with warm pumpkin spice flavors and cream filling.',
    isNew: true,
    inStock: true,
    ingredients: ['Unbleached Enriched Flour', 'Cane Sugar', 'Palm Oil', 'Pumpkin Puree', 'Cocoa Powder', 'Invert Sugar', 'Pumpkin Pie Spice', 'Baking Soda', 'Salt', 'Natural Flavors'],
    allergens: ['Wheat', 'May contain Soy, Milk, Eggs'],
    tasteProfile: ['Sweet', 'Spiced', 'Pumpkin'],
    nutrition: { calories: 160, organic: true, glutenFree: false, vegan: true, servingSize: '2 cookies', fat: 7, sodium: 125, protein: 2 }
  },
  {
    id: '7',
    name: 'chocolateHummus',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1697755697486-9f8bb2ca9b1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2hvY29sYXRlJTIwaHVtbXVzfGVufDF8fHx8MTc1OTM4ODI0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Dips',
    tags: ['Healthy', 'Vegan'],
    rating: 4.2,
    reviewCount: 892,
    description: 'A sweet twist on classic hummus with rich dark chocolate flavor.',
    isNew: true,
    inStock: true,
    ingredients: ['Chickpeas', 'Cane Sugar', 'Tahini', 'Cocoa Powder', 'Coconut Oil', 'Vanilla Extract', 'Sea Salt'],
    allergens: ['Sesame', 'May contain Tree Nuts'],
    tasteProfile: ['Sweet', 'Chocolate', 'Rich'],
    nutrition: { calories: 60, organic: true, glutenFree: true, vegan: true, servingSize: '2 tbsp', fat: 3, sodium: 40, protein: 2 }
  },
  {
    id: '8',
    name: 'eloteCornChips',
    price: 2.79,
    image: 'https://images.unsplash.com/photo-1688940737480-bee66f221b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwY2hpcCUyMGRpcHBlcnMlMjBtZXhpY2FufGVufDF8fHx8MTc1OTM4ODI0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Snacks',
    tags: ['Mexican', 'Spicy'],
    rating: 4.5,
    reviewCount: 1244,
    description: 'Corn chip dippers inspired by Mexican street corn with chili, lime, and cheese flavors.',
    isPopular: true,
    inStock: true,
    ingredients: ['Ground Corn', 'Vegetable Oil', 'Elote Seasoning (Chili Pepper, Cheese Powder, Lime Juice Powder, Salt, Garlic Powder, Paprika)', 'Salt'],
    allergens: ['Milk'],
    tasteProfile: ['Spicy', 'Tangy', 'Cheesy'],
    nutrition: { calories: 150, organic: false, glutenFree: true, vegan: false, servingSize: '1 oz', fat: 8, sodium: 200, protein: 2 }
  },
  {
    id: '9',
    name: 'everythingCrackers',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1666014313959-348bf6f7b0a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVyeXRoaW5nJTIwY3JhY2tlcnMlMjBzbmFja3N8ZW58MXx8fHwxNzU5Mzg4MjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',  
    category: 'Crackers',
    tags: ['Popular', 'Snack'],
    rating: 4.4,
    reviewCount: 756,
    description: 'Crispy crackers topped with the iconic everything bagel seasoning blend.',
    isFrequent: true,
    inStock: true,
    ingredients: ['Wheat Flour', 'Vegetable Oil', 'Everything Seasoning (Sesame Seeds, Poppy Seeds, Dried Garlic, Dried Onion, Salt)', 'Yeast', 'Salt', 'Malt Extract'],
    allergens: ['Wheat', 'Sesame'],
    tasteProfile: ['Savory', 'Garlic', 'Seeded'],
    nutrition: { calories: 140, organic: false, glutenFree: false, vegan: true, servingSize: '16 crackers', fat: 7, sodium: 290, protein: 3 }
  },
  {
    id: '10',
    name: 'garlicSpread',
    price: 3.79,
    image: 'https://images.unsplash.com/photo-1641905777022-a2f31c030af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJsaWMlMjBzcHJlYWQlMjBkaXB8ZW58MXx8fHwxNzU5Mzg4MjU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Dips',
    tags: ['Garlic', 'Staff Pick'],
    rating: 4.3,
    reviewCount: 567,
    description: 'Creamy garlic spread perfect for bread, crackers, or cooking.',
    isPopular: true,
    inStock: true,
    ingredients: ['Cream Cheese', 'Roasted Garlic', 'Mayonnaise', 'Parmesan Cheese', 'Herbs', 'Salt', 'White Pepper'],
    allergens: ['Milk', 'Eggs'],
    tasteProfile: ['Garlic', 'Creamy', 'Herby'],
    nutrition: { calories: 80, organic: false, glutenFree: true, vegan: false, servingSize: '1 tbsp', fat: 8, sodium: 140, protein: 1 }
  }
];

interface MenuProps {
  onBack: () => void;
  onProductDetail: (productId: string) => void;
}

export function Menu({ onBack, onProductDetail }: MenuProps) {
  const { state, addItem, updateQuantity, toggleCart } = useCart();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    dietary: [],
    taste: [],
    priceRange: [0, 10],
    category: [],
    allergenFree: []
  });

  const t = translations[currentLanguage];

  const getProductName = (nameKey: string) => {
    return t[nameKey as keyof typeof t] || nameKey;
  };

  const filterOptions = {
    dietary: ['Organic', 'Vegan', 'Gluten-Free'],
    taste: ['Sweet', 'Savory', 'Spicy', 'Tangy', 'Garlic', 'Nutty', 'Rich', 'Mild'],
    categories: ['Seasonings', 'Frozen', 'Spreads', 'Pasta', 'Cheese', 'Cookies', 'Dips', 'Snacks', 'Crackers'],
    allergenFree: ['Dairy-Free', 'Nut-Free', 'Soy-Free', 'Wheat-Free', 'Sesame-Free']
  };

  const filteredProducts = products.filter(product => {
    const translatedName = getProductName(product.name);
    const matchesSearch = translatedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         product.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || 
                           (activeCategory === 'frequent' && product.isFrequent) ||
                           (activeCategory === 'popular' && product.isPopular) ||
                           (activeCategory === 'new' && product.isNew);
    
    // Dietary filters
    const matchesDietary = filters.dietary.length === 0 || filters.dietary.every(filter => {
      switch(filter) {
        case 'Organic': return product.nutrition?.organic;
        case 'Vegan': return product.nutrition?.vegan;
        case 'Gluten-Free': return product.nutrition?.glutenFree;
        default: return true;
      }
    });

    // Taste profile filters
    const matchesTaste = filters.taste.length === 0 || 
                        filters.taste.some(taste => product.tasteProfile.includes(taste));

    // Price range filter
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

    // Category filter
    const matchesCategoryFilter = filters.category.length === 0 || 
                                 filters.category.includes(product.category);

    // Allergen-free filters
    const matchesAllergenFree = filters.allergenFree.length === 0 || filters.allergenFree.every(allergen => {
      switch(allergen) {
        case 'Dairy-Free': return !product.allergens.includes('Milk');
        case 'Nut-Free': return !product.allergens.some(a => a.includes('Nuts') || a.includes('Tree Nuts'));
        case 'Soy-Free': return !product.allergens.includes('Soy');
        case 'Wheat-Free': return !product.allergens.includes('Wheat');
        case 'Sesame-Free': return !product.allergens.includes('Sesame');
        default: return true;
      }
    });
    
    return matchesSearch && matchesCategory && matchesDietary && matchesTaste && 
           matchesPrice && matchesCategoryFilter && matchesAllergenFree;
  });

  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: getProductName(product.name),
        price: product.price,
        image: product.image,
        category: product.category,
        inStock: product.inStock
      });
    }
  };

  const removeFromCart = (productId: string) => {
    const currentItem = state.items.find(item => item.id === productId);
    if (currentItem) {
      updateQuantity(productId, currentItem.quantity - 1);
    }
  };

  const getCartItemCount = (productId: string) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const toggleFilter = (type: keyof FilterOptions, value: string) => {
    setFilters(prev => {
      const currentFilters = prev[type] as string[];
      const isSelected = currentFilters.includes(value);
      
      return {
        ...prev,
        [type]: isSelected 
          ? currentFilters.filter(item => item !== value)
          : [...currentFilters, value]
      };
    });
  };

  const updatePriceRange = (range: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const clearAllFilters = () => {
    setFilters({
      dietary: [],
      taste: [],
      priceRange: [0, 10],
      category: [],
      allergenFree: []
    });
  };

  const getActiveFilterCount = () => {
    return filters.dietary.length + filters.taste.length + filters.category.length + filters.allergenFree.length;
  };

  const renderFilterPanel = () => (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${showFilters ? 'visible' : 'invisible'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${showFilters ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setShowFilters(false)}
      />
      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white rounded-t-xl transition-transform duration-300 ${showFilters ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{t.filters}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={clearAllFilters}
                className="text-sm text-tj-red-500 hover:text-tj-red-600 font-medium"
              >
                {t.clearAll}
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Dietary Filters */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">{t.dietary}</h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions.dietary.map(diet => (
                <button
                  key={diet}
                  onClick={() => toggleFilter('dietary', diet)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    filters.dietary.includes(diet)
                      ? 'bg-tj-red-500 text-white border-tj-red-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-tj-red-300'
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          {/* Taste Profile */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">{t.taste}</h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions.taste.map(taste => (
                <button
                  key={taste}
                  onClick={() => toggleFilter('taste', taste)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    filters.taste.includes(taste)
                      ? 'bg-tj-red-500 text-white border-tj-red-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-tj-red-300'
                  }`}
                >
                  {taste}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">{t.priceRange}</h3>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={filters.priceRange[1]}
                onChange={(e) => updatePriceRange([0, parseFloat(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>$0</span>
                <span>${filters.priceRange[1]}</span>
                <span>$10+</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">{t.categories}</h3>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.categories.map(category => (
                <button
                  key={category}
                  onClick={() => toggleFilter('category', category)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    filters.category.includes(category)
                      ? 'bg-tj-red-500 text-white border-tj-red-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-tj-red-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Allergen-Free */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">{t.allergenFree}</h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions.allergenFree.map(allergen => (
                <button
                  key={allergen}
                  onClick={() => toggleFilter('allergenFree', allergen)}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    filters.allergenFree.includes(allergen)
                      ? 'bg-tj-red-500 text-white border-tj-red-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-tj-red-300'
                  }`}
                >
                  {allergen}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => setShowFilters(false)}
            className="w-full bg-tj-red-500 hover:bg-tj-red-600 text-white py-3 rounded-lg font-medium transition-colors duration-200"
          >
            {t.applyFilters} ({filteredProducts.length})
          </button>
        </div>
      </div>
    </div>
  );

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

  const renderViewModeToggle = () => (
    <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-md transition-colors duration-200 ${
          viewMode === 'grid' ? 'bg-white text-tj-red-500 shadow-sm' : 'text-neutral-500'
        }`}
      >
        <Grid3X3 className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-md transition-colors duration-200 ${
          viewMode === 'list' ? 'bg-white text-tj-red-500 shadow-sm' : 'text-neutral-500'
        }`}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode('bubble')}
        className={`p-2 rounded-md transition-colors duration-200 ${
          viewMode === 'bubble' ? 'bg-white text-tj-red-500 shadow-sm' : 'text-neutral-500'
        }`}
      >
        <Hexagon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode('info')}
        className={`p-2 rounded-md transition-colors duration-200 ${
          viewMode === 'info' ? 'bg-white text-tj-red-500 shadow-sm' : 'text-neutral-500'
        }`}
      >
        <Info className="w-4 h-4" />
      </button>
    </div>
  );

  const renderCategoryTabs = () => (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
      {[
        { key: 'all', label: t.allItems, icon: MoreHorizontal },
        { key: 'frequent', label: t.frequentlyBought, icon: Clock },
        { key: 'popular', label: t.popular, icon: TrendingUp },
        { key: 'new', label: t.new, icon: Star }
      ].map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setActiveCategory(key as Category)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap ${
            activeCategory === key
              ? 'bg-[#D32F2F] text-white border-[#D32F2F]'
              : 'bg-white text-gray-600 border-gray-200 hover:border-[#D32F2F]/30'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-2 gap-4">
      {filteredProducts.map(product => (
        <div key={product.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
          <div className="relative aspect-square">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[1px] flex items-center justify-center">
                <span className="bg-gray-800/90 text-white px-2 py-1 rounded-md text-xs font-medium">
                  {t.outOfStock}
                </span>
              </div>
            )}
            {product.isNew && (
              <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                New
              </div>
            )}
            <div className="absolute top-2 right-2 flex gap-1">
              <button 
                onClick={() => onProductDetail(product.id)}
                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
              >
                <Info className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="p-3">
            <h3 className="font-medium text-gray-900 text-sm leading-tight mb-2 line-clamp-2 h-10">
              {getProductName(product.name)}
            </h3>
            
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviewCount})</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            {getCartItemCount(product.id) > 0 ? (
              <div className="flex items-center justify-between bg-[#D32F2F] text-white rounded-lg p-2">
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition-colors duration-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium">{getCartItemCount(product.id)}</span>
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product.id)}
                disabled={!product.inStock}
                className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  product.inStock
                    ? 'bg-[#D32F2F] hover:bg-[#B22222] text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {product.inStock ? t.addToCart : t.outOfStock}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-3">
      {filteredProducts.map(product => (
        <div key={product.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                  <span className="bg-gray-800/90 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                    {t.out}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900 leading-tight line-clamp-2">
                  {getProductName(product.name)}
                </h3>
                <div className="flex-shrink-0 ml-2 flex gap-1">
                  <button 
                    onClick={() => onProductDetail(product.id)}
                    className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Info className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.reviewCount})</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{product.category}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                
                {getCartItemCount(product.id) > 0 ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-8 h-8 bg-[#D32F2F] text-white rounded-full flex items-center justify-center hover:bg-[#B22222] transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium text-gray-900 min-w-[20px] text-center">
                      {getCartItemCount(product.id)}
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-8 h-8 bg-[#D32F2F] text-white rounded-full flex items-center justify-center hover:bg-[#B22222] transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      product.inStock
                        ? 'bg-[#D32F2F] hover:bg-[#B22222] text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? t.add : t.out}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBubbleView = () => (
    <div className="grid grid-cols-3 gap-3">
      {filteredProducts.map(product => (
        <div key={product.id} className="flex flex-col items-center group">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-white border-2 border-gray-200 group-hover:border-[#D32F2F] transition-all duration-200 shadow-lg">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            {!product.inStock && (
              <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[1px] rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              </div>
            )}
            <button
              onClick={() => onProductDetail(product.id)}
              className="absolute -top-1 -left-1 w-6 h-6 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors duration-200"
            >
              <Info className="w-3 h-3 text-neutral-600" />
            </button>
            {getCartItemCount(product.id) > 0 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#D32F2F] text-white rounded-full flex items-center justify-center text-xs font-medium">
                {getCartItemCount(product.id)}
              </div>
            )}
          </div>
          
          <div className="mt-2 text-center">
            <h3 className="text-xs font-medium text-gray-900 leading-tight line-clamp-2 mb-1">
              {getProductName(product.name)}
            </h3>
            <span className="text-xs font-semibold text-gray-700">${product.price}</span>
          </div>
          
          <button
            onClick={() => product.inStock && addToCart(product.id)}
            disabled={!product.inStock}
            className={`mt-2 w-16 h-6 rounded-full text-xs font-medium transition-colors duration-200 ${
              product.inStock
                ? 'bg-[#D32F2F] hover:bg-[#B22222] text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {product.inStock ? t.add : t.out}
          </button>
        </div>
      ))}
    </div>
  );

  const renderInfoView = () => (
    <div className="space-y-4">
      {filteredProducts.map(product => (
        <div key={product.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                  <span className="bg-gray-800/90 text-white px-2 py-1 rounded text-xs font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-gray-900 leading-tight mb-1">
                    {getProductName(product.name)}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-2 flex gap-1">
                  <button 
                    onClick={() => onProductDetail(product.id)}
                    className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Info className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.rating}</span>
                <span className="text-xs text-gray-500">({product.reviewCount} {t.reviews})</span>
              </div>

              {product.nutrition && (
                <div className="flex gap-2 mb-3">
                  {product.nutrition.organic && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{t.organic}</span>
                  )}
                  {product.nutrition.glutenFree && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{t.glutenFree}</span>
                  )}
                  {product.nutrition.vegan && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">{t.vegan}</span>
                  )}
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {product.nutrition.calories} {t.cal}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                  <span className="text-xs text-gray-500">• {product.category}</span>
                </div>
                
                {getCartItemCount(product.id) > 0 ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-8 h-8 bg-[#D32F2F] text-white rounded-full flex items-center justify-center hover:bg-[#B22222] transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium text-gray-900 min-w-[20px] text-center">
                      {getCartItemCount(product.id)}
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-8 h-8 bg-[#D32F2F] text-white rounded-full flex items-center justify-center hover:bg-[#B22222] transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      product.inStock
                        ? 'bg-[#D32F2F] hover:bg-[#B22222] text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? t.addToCart : t.outOfStock}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProducts = () => {
    switch (viewMode) {
      case 'list':
        return renderListView();
      case 'bubble':
        return renderBubbleView();
      case 'info':
        return renderInfoView();
      default:
        return renderGridView();
    }
  };

  return (
    <div className="min-h-screen gradient-tj-warm">
      <div className="max-w-md mx-auto bg-surface min-h-screen" style={{ boxShadow: 'var(--shadow-xl)' }}>
        {/* Header */}
        <header className="sticky top-0 z-50 glass-effect border-b border-border">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={onBack}
                className="w-10 h-10 bg-neutral-50 hover:bg-neutral-100 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <h1 className="font-semibold text-foreground">{t.products}</h1>
              
              <div className="flex items-center gap-2">
                {renderLanguageSwitcher()}
                {renderViewModeToggle()}
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-all duration-200"
                />
              </div>
              <button
                onClick={() => setShowFilters(true)}
                className={`relative px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  getActiveFilterCount() > 0
                    ? 'bg-tj-red-500 text-white border-tj-red-500'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-tj-red-300'
                }`}
              >
                <Filter className="w-4 h-4" />
                {getActiveFilterCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-tj-amber-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Category Tabs */}
            {renderCategoryTabs()}
          </div>
        </header>

        {/* Content */}
        <div className="px-4 py-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{t.noProductsFound}</h3>
              <p className="text-gray-600 text-sm">
                {t.tryAdjusting}
              </p>
            </div>
          ) : (
            renderProducts()
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {renderFilterPanel()}
    </div>
  );
}