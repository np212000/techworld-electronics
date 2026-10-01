import { createContext, useContext, useEffect,useState  } from "react";

//Create the global shopping context.
//This allows cart and wishlist data to be accessed from any component in the application.
const ShopContext = createContext();

//ShopProvider is the main global state provider.
function ShopProvider({children})
{
  /* Read cart data from localstorage when the application starts. 

  localStorage stores data as strings, so JSON.parse()
  converts the stored string back into a javascript array.
  
  If there is no saved cart, we start with an empty array.*/
  const [cart, setCart] = useState(()=>
  {
    const savedCart = localStorage.getItem("techworld-cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  /* Read wishlist data from localstorage.
  This makes wishlist items survive:
  -page refresh
  -browser restart
  -navigation between pages*/
  const [wishlist, setWishlist] = useState(()=>
  {
    const savedWishlist = localStorage.getItem("techworld-wishlist");
    
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  /* Whenever cart changes, save the latest cart to localstorage. 
  
  JSON.stringify() converts the javascript array into 
  a string because localstorage stores strings.*/
  useEffect(()=>
  {
    localStorage.setItem("techworld-cart",JSON.stringify(cart));
  },[cart]);

  /* Whenever wishlist changes, save the latest wishlist to localstorage */
  useEffect(()=>
  {
    localStorage.setItem("techworld-wishlist",JSON.stringify(wishlist));
  },[wishlist]);


  //CART FUNCTIONS
  /* Add a product to cart.

  if the product already exists in the cart,
  increase itsquantity instead of creating
  another cart item. */
  const addToCart = (product, quantity = 1) =>
  {
    setCart((currentCart)=>
    {
      //check whether this product already exists.
      const existingProduct = currentCart.find((item)=>item.id === product.id);

      //Product already exists.
      if(existingProduct)
      {
        return currentCart.map((item)=>
        {
          if(item.id === product.id)
          {
            return {...item, 
              //increase existing quantity
              quantity: item.quantity + quantity,
            };
          }

          return item;
        });
      }

      //Product doesn't exist yet.
      //And it as a new cart item.
      return [
        ...currentCart,
        {
          ...product,quantity
        },
      ];
    });
  };
  
  /*Remove an entire product from the cart.*/ 
  const removeFromCart = (productId) =>
  {
    setCart((currentCart)=> currentCart.filter((item)=> item.id !== productId));
  };

  /* Change the quantity of an item.

  quantity must always be at least 
  1. If the quantity becomes 0,
  we remove the product from the cart. */
  const updateCartQuantity = (productId,quantity) =>
  {
    if(quantity <= 0)
    {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart)=> currentCart.map((item)=>
    {
      if(item.id === productId)
      {
        return {...item,quantity};
      }
      return item;
    }));
  };

  /* Clear the complete cart. */
  const clearCart = () =>
  {
    setCart([]);
  };

  
  //WISHLIST FUNCTIONS
  /*Check whether a product is already present in the wishlist .*/
  const isInWishlist = (productId) =>
  {
    return wishlist.some((item) => item.id === productId);
  };

  /* Add or remove a product from the wishlist.
  This works as a toggle:
  -Not in wishlist -> add it
  -Already in wishlist -> remove it */
  const toggleWishlist = (product) =>
  {
    setWishlist((currentWishlist) => 
    {
      const exists = currentWishlist.some((item) => item.id === product.id);

      //Remove if already present.
      if(exists)
      {
        return currentWishlist.filter((item) => item.id !== product.id);
      }

      //otherwise add the product
      return [...currentWishlist,product];
    });
  };

  /* Remove one product directly from wishlist. */
  const removeFromWishlist = (productId) =>
  {
    setWishlist((currentWishlist) => currentWishlist.filter((item)=> item.id !== productId));
  };

  /* Calculate total number of products in cart.
  Example :
    Phone quantity = 2
    Laptop quantity = 1
    cart count = 3 */
  const cartCount = cart.reduce((total,item) => total + item.quantity, 0);

  /* Calculate total price of the cart.
    Example: product price x quantity */
  const cartTotal = cart.reduce((total,item)=> total+item.price * item.quantity, 0);

  /* Everything inside this object becomes available to components using UseShop(). */
  const value = {
    //Data 
    cart,wishlist,

    //cart Functions
    addToCart,removeFromCart,updateCartQuantity,clearCart,

    //Wishlist functions
    toggleWishlist,isInWishlist,removeFromWishlist,

    //Calculated values
    cartCount,cartTotal
  };

  return(
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

//Custom hook for rasier access to ShopContext.
export function UseShop()
{
  return useContext(ShopContext);
}

//Export Provider
export default ShopProvider;