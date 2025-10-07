import { ArrowLeft, Clock, Users, Heart, Bookmark, Star, ChefHat, Filter, Search, ShoppingCart, Plus, Shuffle, Sparkles, Share2, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { useCart } from './CartContext';

const featuredHacks = [
  {
    id: 1,
    title: "Everything Bagel Avocado Toast Upgrade",
    description: "Transform TJ's brioche into gourmet breakfast",
    image: "https://images.unsplash.com/photo-1641394535269-dbea1fa94ff1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkZXIlMjBqb2VzJTIwZXZlcnl0aGluZyUyMGJhZ2VsJTIwc2Vhc29uaW5nfGVufDF8fHx8MTc1OTI1NTUyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    time: "5 min",
    difficulty: "Easy",
    servings: 2,
    likes: 342,
    saved: true,
    products: ["Brioche Toast", "Everything Bagel Seasoning", "Avocados", "Chili Onion Crunch"],
    steps: [
      "Toast TJ's brioche until golden",
      "Mash avocado with a pinch of sea salt",
      "Spread avocado generously on toast",
      "Sprinkle Everything Bagel Seasoning",
      "Top with Chili Onion Crunch for extra kick"
    ],
    tags: ["Breakfast", "Quick", "Healthy"]
  },
  {
    id: 2,
    title: "Cauliflower Gnocchi Carbonara",
    description: "Italian comfort food, TJ style",
    image: "https://images.unsplash.com/photo-1708974138002-688a027a8c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjYXVsaWZsb3dlciUyMGdub2NjaGklMjBjb29raW5nfGVufDF8fHx8MTc1OTI1NTUzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    time: "15 min",
    difficulty: "Medium",
    servings: 4,
    likes: 567,
    saved: false,
    products: ["Cauliflower Gnocchi", "Uncured Bacon", "Unexpected Cheddar", "Organic Eggs"],
    steps: [
      "Cook bacon until crispy, reserve fat",
      "Sauté cauliflower gnocchi in bacon fat",
      "Whisk eggs with grated Unexpected Cheddar",
      "Toss hot gnocchi with egg mixture",
      "Top with bacon bits and extra cheese"
    ],
    tags: ["Dinner", "Comfort Food", "Low Carb"]
  },
  {
    id: 3,
    title: "Mandarin Orange Chicken Bowl",
    description: "Elevated frozen dinner hack",
    image: "https://images.unsplash.com/photo-1623024598990-75eefa29d739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYW5kYXJpbiUyMG9yYW5nZSUyMGNoaWNrZW4lMjBib3dsfGVufDF8fHx8MTc1OTI1NTUzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    time: "12 min",
    difficulty: "Easy",
    servings: 2,
    likes: 445,
    saved: true,
    products: ["Mandarin Orange Chicken", "Organic Brown Rice", "Asian Vegetable Medley", "Sesame Seeds"],
    steps: [
      "Cook Mandarin Orange Chicken per instructions",
      "Steam Asian Vegetable Medley",
      "Serve over warmed brown rice",
      "Garnish with sesame seeds",
      "Add sriracha for extra heat"
    ],
    tags: ["Asian", "Quick", "Family Friendly"]
  }
];

const quickHacks = [
  {
    title: "Cookie Butter French Toast",
    image: "https://images.unsplash.com/photo-1723475763043-6a2baa412011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb29raWUlMjBidXR0ZXIlMjB0b2FzdCUyMGJyZWFrZmFzdHxlbnwxfHx8fDE3NTkyNTU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    time: "8 min",
    products: ["Cookie Butter", "Brioche", "Eggs"],
    description: "Spread cookie butter between brioche slices before dipping in egg"
  },
  {
    title: "Everything Bagel Popcorn",
    image: "https://images.unsplash.com/photo-1641394535269-dbea1fa94ff1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkZXIlMjBqb2VzJTIwZXZlcnl0aGluZyUyMGJhZ2VsJTIwc2Vhc29uaW5nfGVufDF8fHx8MTc1OTI1NTUyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    time: "3 min",
    products: ["Organic Popcorn", "Everything Bagel Seasoning"],
    description: "Toss hot popcorn with melted butter and Everything Bagel Seasoning"
  },
  {
    title: "Unexpected Cheddar Mac",
    image: "https://images.unsplash.com/photo-1708974138002-688a027a8c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjYXVsaWZsb3dlciUyMGdub2NjaGklMjBjb29raW5nfGVufDF8fHx8MTc1OTI1NTUzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    time: "10 min",
    products: ["Shells Pasta", "Unexpected Cheddar", "Heavy Cream"],
    description: "Melt grated Unexpected Cheddar into cream for instant gourmet mac"
  }
];

const categories = [
  { name: "Breakfast", count: 23 },
  { name: "Quick Meals", count: 34 },
  { name: "Snack Upgrades", count: 18 },
  { name: "Dessert Hacks", count: 15 },
  { name: "Party Food", count: 12 },
  { name: "Healthy Swaps", count: 28 }
];

// Random Recipe Generation Data
const randomRecipeTemplates = [
  {
    type: "Bowl",
    bases: ["Cauliflower Gnocchi", "Organic Brown Rice", "Quinoa Trio", "Zucchini Spirals"],
    proteins: ["Mandarin Orange Chicken", "Chicken Shawarma", "Italian Sausage", "Unexpected Cheddar"],
    toppings: ["Everything Bagel Seasoning", "Chili Onion Crunch", "Pine Nuts", "Dried Cranberries"],
    sauces: ["Green Goddess Dressing", "Tahini Sauce", "Sriracha", "Balsamic Glaze"]
  },
  {
    type: "Toast",
    breads: ["Brioche", "Sourdough", "Everything Bagel", "Multigrain Bread"],
    spreads: ["Cookie Butter", "Almond Butter", "Avocado", "Hummus"],
    toppings: ["Everything Bagel Seasoning", "Hemp Seeds", "Sliced Almonds", "Fresh Berries"],
    extras: ["Honey", "Lemon Zest", "Sea Salt Flakes", "Chili Flakes"]
  },
  {
    type: "Pasta",
    pastas: ["Lemon Pepper Pappardelle", "Brown Rice Pasta", "Cauliflower Gnocchi", "Organic Shells"],
    sauces: ["Vodka Sauce", "Pesto", "Cacio e Pepe Sauce", "Arrabbiata Sauce"],
    additions: ["Unexpected Cheddar", "Italian Sausage", "Sun-dried Tomatoes", "Roasted Red Peppers"],
    garnishes: ["Fresh Basil", "Pine Nuts", "Lemon Zest", "Parmesan Cheese"]
  },
  {
    type: "Wrap",
    wraps: ["Lavash Bread", "Tortillas", "Naan", "Collard Greens"],
    fillings: ["Chicken Shawarma", "Falafel", "Turkey Meatballs", "Roasted Vegetables"],
    veggies: ["Cucumber", "Tomatoes", "Red Onion", "Sprouts"],
    sauces: ["Tzatziki", "Hummus", "Green Goddess", "Sriracha Mayo"]
  }
];

const cookingMethods = [
  "sauté until golden",
  "toss with olive oil and roast",
  "steam for 3 minutes",
  "pan-fry until crispy",
  "mix gently and serve",
  "warm and combine",
  "toast until fragrant"
];

interface RecipeHacksProps {
  onBack: () => void;
}

export function RecipeHacks({ onBack }: RecipeHacksProps) {
  const [savedRecipes, setSavedRecipes] = useState<number[]>([1, 3]);
  const [randomRecipe, setRandomRecipe] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const { dispatch } = useCart();

  const toggleSave = (id: number) => {
    setSavedRecipes(prev => 
      prev.includes(id) 
        ? prev.filter(recipeId => recipeId !== id)
        : [...prev, id]
    );
  };

  const addAllToCart = (products: string[], hackTitle: string) => {
    products.forEach((product, index) => {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: `${hackTitle.replace(/\s+/g, '-').toLowerCase()}-${product.replace(/\s+/g, '-').toLowerCase()}`,
          name: product,
          price: Math.floor(Math.random() * 8) + 2.99, // Random price between $2.99-$10.99
          image: 'https://images.unsplash.com/photo-1586779245509-5f429311242f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb29raW5nJTIwcGFzdGElMjBraXRjaGVuJTIwZm9vZHxlbnwxfHx8fDE3NTkxOTAwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
          description: `From ${hackTitle} recipe`,
          quantity: 1
        }
      });
    });
    setAddedToCart(true);
    setCartItemCount(prev => prev + products.length);
  };

  const generateRandomRecipe = () => {
    setIsGenerating(true);
    setAddedToCart(false); // Reset cart status when generating new recipe
    
    // Add a small delay for better UX
    setTimeout(() => {
      const template = randomRecipeTemplates[Math.floor(Math.random() * randomRecipeTemplates.length)];
      const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];
      
      let recipe;
      
      if (template.type === "Bowl") {
        recipe = {
          title: `Random TJ's ${template.type}`,
          description: `A delicious bowl featuring ${getRandomItem(template.proteins)}`,
          time: `${Math.floor(Math.random() * 20) + 10} min`,
          ingredients: [
            getRandomItem(template.bases),
            getRandomItem(template.proteins),
            getRandomItem(template.toppings),
            getRandomItem(template.sauces)
          ]
        };
      } else if (template.type === "Toast") {
        recipe = {
          title: `Random TJ's ${template.type}`,
          description: `Gourmet toast with ${getRandomItem(template.spreads)}`,
          time: `${Math.floor(Math.random() * 10) + 5} min`,
          ingredients: [
            getRandomItem(template.breads),
            getRandomItem(template.spreads),
            getRandomItem(template.toppings),
            getRandomItem(template.extras)
          ]
        };
      } else if (template.type === "Pasta") {
        recipe = {
          title: `Random TJ's ${template.type}`,
          description: `Comforting pasta with ${getRandomItem(template.sauces)}`,
          time: `${Math.floor(Math.random() * 15) + 15} min`,
          ingredients: [
            getRandomItem(template.pastas),
            getRandomItem(template.sauces),
            getRandomItem(template.additions),
            getRandomItem(template.garnishes)
          ]
        };
      } else {
        recipe = {
          title: `Random TJ's ${template.type}`,
          description: `Fresh wrap with ${getRandomItem(template.fillings)}`,
          time: `${Math.floor(Math.random() * 8) + 7} min`,
          ingredients: [
            getRandomItem(template.wraps),
            getRandomItem(template.fillings),
            getRandomItem(template.veggies),
            getRandomItem(template.sauces)
          ]
        };
      }
      
      setRandomRecipe(recipe);
      setIsGenerating(false);
    }, 800);
  };

  const addRecipeToCart = () => {
    if (!randomRecipe) return;
    
    // Add all recipe ingredients to cart
    randomRecipe.ingredients.forEach((ingredient: string, index: number) => {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: `random-recipe-${ingredient.replace(/\s+/g, '-').toLowerCase()}`,
          name: ingredient,
          price: Math.floor(Math.random() * 8) + 2.99,
          image: 'https://images.unsplash.com/photo-1586779245509-5f429311242f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb29raW5nJTIwcGFzdGElMjBraXRjaGVuJTIwZm9vZHxlbnwxfHx8fDE3NTkxOTAwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
          description: `From ${randomRecipe.title}`,
          quantity: 1
        }
      });
    });
    
    setCartItemCount(prev => prev + randomRecipe.ingredients.length);
    setAddedToCart(true);
    
    // Show success feedback for a few seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen gradient-tj-warm">
      <div className="max-w-md mx-auto bg-surface min-h-screen relative overflow-hidden" style={{ boxShadow: 'var(--shadow-xl)' }}>
        {/* Header */}
        <div className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-tj-amber-400 to-tj-red-500 rounded-full flex items-center justify-center">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-foreground">Recipe Hacks</h1>
            </div>
            
            {/* Cart Indicator */}
            <div className="relative">
              <button className="p-2 hover:bg-muted rounded-full transition-colors duration-200">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {cartItemCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-tj-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="pb-20">
          {/* Hero Section */}
          <div className="px-4 pt-6 pb-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Creative Recipes Using Only TJ's Products
              </h2>
              <p className="text-sm text-muted-foreground">
                Turn everyday TJ's items into extraordinary meals
              </p>
            </div>

            {/* Random Recipe Generator */}
            <div className="mb-6">
              <button
                onClick={generateRandomRecipe}
                disabled={isGenerating}
                className="w-full bg-tj-red-500 hover:bg-tj-red-600 text-white rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
              >
                <div className="flex items-center justify-center gap-3">
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-semibold">Generating Magic...</span>
                    </>
                  ) : (
                    <>
                      <Shuffle className="w-5 h-5" />
                      <span className="font-semibold">Generate Random Recipe</span>
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </div>
                <p className="text-xs opacity-90 mt-1">Let TJ's surprise you!</p>
              </button>
            </div>

            {/* Random Recipe Display */}
            {randomRecipe && (
              <div className="mb-6 bg-tj-red-50 rounded-xl p-4 border border-tj-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-tj-red-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <h4 className="font-semibold text-tj-red-700">{randomRecipe.title}</h4>
                </div>
                
                <p className="text-sm text-tj-red-600 mb-3">{randomRecipe.description}</p>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-xs text-tj-red-600">
                    <Clock className="w-3 h-3" />
                    {randomRecipe.time}
                  </div>
                  <div className="text-xs text-tj-red-600">
                    {randomRecipe.ingredients.length} ingredients
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-xs font-medium text-tj-red-700 mb-2">Ingredients:</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {randomRecipe.ingredients.map((ingredient: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-tj-red-400 rounded-full"></div>
                        <span className="text-tj-red-600">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={addRecipeToCart}
                  disabled={addedToCart}
                  className="w-full bg-tj-red-500 hover:bg-tj-red-600 disabled:bg-tj-red-300 text-white rounded-lg py-2 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {addedToCart ? (
                    <>
                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-tj-red-500 rounded-full"></div>
                      </div>
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add All to Cart ({randomRecipe.ingredients.length} items)
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Categories */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="group"
                >
                  <div className="bg-white hover:bg-tj-red-50 border border-neutral-200 hover:border-tj-red-200 rounded-xl p-4 transition-all duration-200 group-hover:scale-105 group-active:scale-95 shadow-sm hover:shadow-md">
                    <h3 className="font-semibold text-sm mb-1 text-neutral-800">{category.name}</h3>
                    <p className="text-xs text-neutral-500">{category.count} recipes</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Hacks */}
          <div className="px-4 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Featured Hacks</h3>
              <button className="text-sm text-primary hover:text-primary-hover transition-colors duration-200">
                See All
              </button>
            </div>

            <div className="space-y-6">
              {featuredHacks.map((hack) => (
                <div key={hack.id} className="card-elevated overflow-hidden">
                  {/* Recipe Image */}
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={hack.image}
                      alt={hack.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => toggleSave(hack.id)}
                        className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200"
                      >
                        <Bookmark className={`w-4 h-4 ${savedRecipes.includes(hack.id) ? 'text-tj-amber-400 fill-current' : 'text-white'}`} />
                      </button>
                      <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200">
                        <Share2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {hack.time}
                      </div>
                      <div className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {hack.servings}
                      </div>
                    </div>
                  </div>

                  {/* Recipe Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground flex-1">{hack.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
                        <Heart className="w-3 h-3" />
                        {hack.likes}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{hack.description}</p>

                    {/* Tags */}
                    <div className="flex gap-2 mb-3">
                      {hack.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-tj-cream-100 text-tj-red-600 text-xs rounded-full"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Products Used */}
                    <div className="mb-4">
                      <h5 className="text-xs font-medium text-foreground mb-2">TJ's Products:</h5>
                      <div className="flex flex-wrap gap-1">
                        {hack.products.map((product, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-tj-red-50 text-tj-red-700 text-xs rounded border border-tj-red-200"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Steps */}
                    <div className="space-y-2 mb-4">
                      <h5 className="text-xs font-medium text-foreground">Quick Steps:</h5>
                      {hack.steps.slice(0, 3).map((step, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="w-4 h-4 bg-tj-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                      {hack.steps.length > 3 && (
                        <button className="text-xs text-primary hover:text-primary-hover transition-colors duration-200">
                          +{hack.steps.length - 3} more steps
                        </button>
                      )}
                    </div>

                    {/* Add All to Cart Button */}
                    <button
                      onClick={() => addAllToCart(hack.products, hack.title)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D32F2F] hover:bg-[#B22222] text-white rounded-lg text-sm font-medium transition-all duration-200 haptic-feedback hover:scale-105 active:scale-95"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add All Ingredients ({hack.products.length} items)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Hacks */}
          <div className="px-4 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Quick Hacks</h3>
              <button className="text-sm text-primary hover:text-primary-hover transition-colors duration-200">
                See All
              </button>
            </div>

            <div className="grid gap-4">
              {quickHacks.map((hack, index) => (
                <div key={index} className="card-elevated overflow-hidden">
                  <div className="flex gap-3 p-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={hack.image}
                        alt={hack.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground mb-1">{hack.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{hack.description}</p>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {hack.time}
                        </div>
                        <div className="flex gap-1">
                          {hack.products.slice(0, 2).map((product, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-tj-cream-100 text-tj-red-600 text-xs rounded">
                              {product}
                            </span>
                          ))}
                          {hack.products.length > 2 && (
                            <span className="px-1.5 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded">
                              +{hack.products.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => addAllToCart(hack.products, hack.title)}
                        className="w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-[#D32F2F] hover:bg-[#B22222] text-white rounded text-xs font-medium transition-all duration-200 haptic-feedback"
                      >
                        <Plus className="w-3 h-3" />
                        Add {hack.products.length} items
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="px-4 mb-8">
            <div className="bg-gradient-to-r from-tj-red-50 to-tj-amber-50 rounded-xl p-4 border border-tj-red-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-tj-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
                <div>
                  <h4 className="font-semibold text-tj-red-700 mb-1">Pro Tip</h4>
                  <p className="text-sm text-tj-red-600">
                    Always taste as you go! TJ's products can vary in saltiness and flavor intensity. 
                    Start with less seasoning and add more to taste.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}