const BASE_URL = import.meta.env.BASE_URL;

const categories = 
[
  {
    id : 1,
    name : "Smartphones",
    icon : "bi-phone",
    description : "Powerful phones for every lifestyle.",
    image : `${BASE_URL}images/categories/smartphone-category.jpg`,
    slug : "smartphones",
  },

  {
    id : 2,
    name : "Laptops",
    icon : "bi-laptop",
    description : "Work, create and paly anywhere",
    image : `${BASE_URL}images/categories/laptop-category.jpg`,
    slug : "laptops",
  },

  {
    id : 3,
    name : "Audio",
    icon : "bi-headphones",
    description : "Immersive sound wherever you go",
    image : `${BASE_URL}images/categories/headphone-category.jpg`,
    slug : "audio",
  },

  {
    id : 4,
    name : "Wearables",
    icon : "bi-smartwatch",
    description : "Smart technology on your wrist",
    image : `${BASE_URL}images/categories/smartwatch-category.jpg`,
    slug : "wearables",
  },

  {
    id : 5,
    name : "Gaming",
    icon : "bi-controller",
    description : "Level up your gming experience",
    image : `${BASE_URL}/images/categories/gaming-category.jpg`,
    slug : "gaming",
  },

  {
    id : 6,
    name : "Cameras",
    icon : "bi-camera",
    description : "Capture every moment in details",
    image : `${BASE_URL}images/categories/camera-category.jpg`,
    slug : "cameras",
  },

  {
    id : 7,
    name : "Monitors",
    icon : "bi-display",
    description : "Sharper visuals for work and play",
    image : `${BASE_URL}images/categories/monitor-category.jpg`,
    slug : "monitors",
  },

  {
    id : 8,
    name : "Accessories",
    icon : "bi-usb-plug",
    description : "Essential tech for everyday life.",
    image : `${BASE_URL}/images/categories/keyboard-category.jpg`,
    slug : "accessories",
  },
];

export default categories;