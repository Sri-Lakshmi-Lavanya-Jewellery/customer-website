export interface Product {
  id: string;
  title: string;
  isNew?: boolean;
  images?: string[];
  category: string;
  subcategory: string;
  weight?: string;
  purity?: string;
  inStock: boolean;
  models?: any;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
}

// Sample Categories with Subcategories
export const categories: Category[] = [
  {
    id: "pooja-items",
    title: "Pooja Items",
    image: "/assets/images/categories/silver-cover-1.png",
    description: "Silver pooja items for auspicious occasions",
    subcategories: [
      { id: "kamakshi-deepam", name: "Kamakshi Deepam" },
      { id: "harathi-stand", name: "Harathi Stand" },
      { id: "agarbatti-stand", name: "Agarabatti Stand" },
      { id: "gantalu", name: "Gantalu" },
      { id: "uddharini", name: "Uddharini" },
      { id: "panchapatra", name: "Panchapatra" },
      { id: "cups" , name: "Cups" },
    ]
  },
  {
    id: "gifts",
    title: "Gifts",
    image: "/assets/images/categories/silver-cover-1.png",
    description: "Silver pooja items for auspicious occasions",
    subcategories: [
    ]
  },
  {
    id: "dining-set",
    title: "Dining Set",
    image: "/assets/images/categories/silver-cover-1.png",
    description: "Silver pooja items for auspicious occasions",
    subcategories: [
    ]
  },
];

// Sample Products Data
export const products: Product[] = [
  {
    id: "1",
    title: "Silver Kamakshi Deepam",
    images: ["/assets/images/products/kamakshi-deepam/1.jpg", "/assets/images/products/kamakshi-deepam/2.jpg","/assets/images/products/kamakshi-deepam/1.1.jpg","/assets/images/products/kamakshi-deepam/1.2.jpg","/assets/images/products/kamakshi-deepam/2.1.jpg","/assets/images/products/kamakshi-deepam/2.2.jpg","/assets/images/products/kamakshi-deepam/3.1.jpg","/assets/images/products/kamakshi-deepam/3.2.jpg","/assets/images/products/kamakshi-deepam/4.1.jpg","/assets/images/products/kamakshi-deepam/4.2.jpg"],
    isNew: true,
    category: "pooja-items",
    subcategory: "kamakshi-deepam",
    weight: "20g-60g",
    inStock: true,
    models: {
      "Model 1": {
        dimensions1: {
          length: "6.5cm",
          height: "11.5cm",
          breadth: "7cm",
          weight: "60g",
          images: ["/assets/images/products/kamakshi-deepam/1.1.jpg", "/assets/images/products/kamakshi-deepam/1.2.jpg"]
        },
        dimensions2: {
          length: "6cm",
          height: "11cm",
          breadth: "6.5cm",
          weight: "50g",
          images: ["/assets/images/products/kamakshi-deepam/2.1.jpg", "/assets/images/products/kamakshi-deepam/2.2.jpg"]
        },
        dimensions3: {
          length: "5.5cm",
          height: "10cm",
          breadth: "5.5cm",
          weight: "40g",
          images: ["/assets/images/products/kamakshi-deepam/3.1.jpg", "/assets/images/products/kamakshi-deepam/3.2.jpg"]
        },
        dimensions4: {
          length: "5cm",
          height: "9cm",
          breadth: "5cm",
          weight: "30g",
          images: ["/assets/images/products/kamakshi-deepam/4.1.jpg", "/assets/images/products/kamakshi-deepam/4.2.jpg"]
        },
        dimensions5: {
          length: "4.5cm",
          height: "8cm",
          breadth: "5cm",
          weight: "25g",
          images: ["/assets/images/products/kamakshi-deepam/4.1.jpg", "/assets/images/products/kamakshi-deepam/4.2.jpg"]
        },
      },
    }
  },
  {
    id: "2",
    title: "Harathi Stand",
    images: ["/assets/images/products/harathi stand/1.1.1.jpg","/assets/images/products/harathi stand/1.1.2.jpg","/assets/images/products/harathi stand/1.1.jpg","/assets/images/products/harathi stand/1.2.1.jpg","/assets/images/products/harathi stand/1.2.2.jpg","/assets/images/products/harathi stand/1.2.jpg","/assets/images/products/harathi stand/2.1.jpg","/assets/images/products/harathi stand/2.2.jpg"],
    category: "pooja-items",
    subcategory: "harathi-stand",
    weight: "15g-55g",
    inStock: true,
    models: {
      "Model 1": {
        "dimensions1": {
          "length": "15cm",
          "height": "6cm",
          "weight": "55g",
          images: ["public/assets/images/products/harathi stand/2.1.jpg","public/assets/images/products/harathi stand/2.2.jpg"]
        }
      },
      "Model 2": {
        "dimensions1": {
          "length": "16.5cm",
          "height": "5cm",
          "weight": "41g",
          images : ["public/assets/images/products/harathi stand/1.1.1.jpg","public/assets/images/products/harathi stand/1.1.2.jpg"]
        },
        "dimensions2": {
          "length": "14cm",
          "height": "4.5cm",
          "weight": "35g",
          images: ["public/assets/images/products/harathi stand/1.2.1.jpg","public/assets/images/products/harathi stand/1.2.2.jpg"]
        },
        "dimensions3": {
          "length": "10.5cm",
          "height": "3.5cm",
          "weight": "21g"
        },
        "dimensions4": {
          "length": "7.5cm",
          "height": "3.5cm",
          "weight": "15g"
        }
      }
    }
  },
  {
    id: "1.3",
    title: "Agarbatti Stand",
    category: "pooja-items",
    images: ["/assets/images/products/agarbatti-stand/1.jpg", "/assets/images/products/agarbatti-stand/2.jpg", "/assets/images/products/agarbatti-stand/3.jpg", "/assets/images/products/agarbatti-stand/4.jpg", "/assets/images/products/agarbatti-stand/5.jpg", "/assets/images/products/agarbatti-stand/6.jpg", "/assets/images/products/agarbatti-stand/7.jpg", "/assets/images/products/agarbatti-stand/8.jpg", "/assets/images/products/agarbatti-stand/1.1.jpg", "/assets/images/products/agarbatti-stand/1.2.jpg", "/assets/images/products/agarbatti-stand/2.1.jpg", "/assets/images/products/agarbatti-stand/2.2.jpg", "/assets/images/products/agarbatti-stand/3.1.jpg", "/assets/images/products/agarbatti-stand/3.2.jpg", "/assets/images/products/agarbatti-stand/3.3.jpg","/assets/images/products/agarbatti-stand/3.4.jpg","/assets/images/products/agarbatti-stand/3.5.jpg","/assets/images/products/agarbatti-stand/3.6.jpg","/assets/images/products/agarbatti-stand/5.1.jpg","/assets/images/products/agarbatti-stand/5.2.jpg","/assets/images/products/agarbatti-stand/5.3.jpg","/assets/images/products/agarbatti-stand/5.4.jpg","/assets/images/products/agarbatti-stand/5.5.jpg","/assets/images/products/agarbatti-stand/5.6.jpg","/assets/images/products/agarbatti-stand/7.1.jpg", "/assets/images/products/agarbatti-stand/7.2.jpg", "/assets/images/products/agarbatti-stand/7.3.jpg", "/assets/images/products/agarbatti-stand/7.4.jpg", "/assets/images/products/agarbatti-stand/7.5.jpg", "/assets/images/products/agarbatti-stand/7.6.jpg","/assets/images/products/agarbatti-stand/7.7.jpg","/assets/images/products/agarbatti-stand/7.8.jpg"],
    subcategory: "agarbatti-stand",
    weight: "10g-30g",
    inStock: true,
    models: {
      "Type 1 (Double Stand)": {
        "dimensions1": {
          "length": "4.5cm",
          "height": "4cm",
          "weight": "16g"
        },
        "dimensions2": {
          "length": "3.5cm",
          "height": "4cm",
          "weight": "13g"
        }
      },
      "Type 2 (Single Step)": {
        "dimensions1": {
          "height": "6cm",
          "weight": "20g"
        },
        "dimensions2": {
          "height": "6.5cm",
          "weight": "15g"
        },
        "dimensions3": {
          "height": "7.5cm",
          "weight": "11g"
        }
      },
      "Type 3 (Round Type)": {
        "dimensions1": {
          "height": "4cm",
          "weight": "30g"
        },
        "dimensions2": {
          "height": "4.5cm",
          "weight": "20g"
        },
        "dimensions3": {
          "height": "5cm",
          "weight": "15g"
        }
      },
      "Type 4 (Height)": {
        "dimensions1": {
          "height": "6cm",
          "weight": "25g"
        },
        "dimensions2": {
          "height": "7cm",
          "weight": "19g"
        },
        "dimensions3": {
          "height": "8.5cm",
          "weight": "15g"
        },
        "dimensions4": {
          "height": "9.5cm",
          "weight": "10g"
        }
      }
    }
  },
  {
  id: "4",
  title: "Gantalu",
  isNew: true,
  category: "pooja-items",
  subcategory: "gantalu",
  inStock: true,
  models: {
    "Model 1": {
      dimensions1: { height: "5.5", weight: "30g" },
      dimensions2: { height: "7.5", weight: "40g" },
      dimensions3: { height: "8.5", weight: "50g" }
    }
  }
},
{
  id: "5",
  title: "Uddharini",
  isNew: true,
  category: "pooja-items",
  subcategory: "uddharini",
  inStock: true,
  models: {
    "Model 1": {
      dimensions1: { height: "12.5", weight: "12.3g" },
      dimensions2: { height: "11.0", weight: "11.5g" },
      dimensions3: { height: "10.0", weight: "8.6g" }
    }
  }
},
{
  id: "6",
  title: "Panchapatra",
  isNew: true,
  category: "pooja-items",
  subcategory: "panchapatra",
  inStock: true,
  models: {
    "Type 1": {
      dimensions1: { height: "8.0", breadth: "7.0", weight: "57.3g" },
      dimensions2: { height: "7.0", breadth: "6.0", weight: "49.4g" },
      dimensions3: { height: "6.5", breadth: "6.0", weight: "41.9g" }
    },
    "Type 2": {
      dimensions1: { height: "6.5", breadth: "6.5", weight: "50.1g" },
      dimensions2: { height: "6.0", breadth: "6.0", weight: "40.8g" },
      dimensions3: { height: "5.0", breadth: "5.0", weight: "29.7g" }
    }
  }
},
{
  id: "cups",
  title: "Cups",
  isNew: true,
  category: "pooja-items",
  subcategory: "cups",
  inStock: true,
  models: {
    "Type 1 - Round Design": {
      dimensions1: { length: "13.0", height: "5.5", weight: "106.5g" },
      dimensions2: { length: "12.0", height: "5.0", weight: "85.5g" },
      dimensions3: { length: "11.5", height: "4.8", weight: "67.6g" },
      dimensions4: { length: "10.5", height: "4.5", weight: "52.1g" },
      dimensions5: { length: "9.0", height: "4.0", weight: "42.7g" },
      dimensions6: { length: "8.5", height: "4.0", weight: "32.0g" },
      dimensions7: { length: "8.0", height: "3.0", weight: "25.8g" }
    },
    "Type 2 - Round Plain": {
      dimensions1: { length: "13.0", height: "5.5", weight: "106.1g" },
      dimensions2: { length: "12.0", height: "5.0", weight: "82.6g" },
      dimensions3: { length: "11.5", height: "4.8", weight: "60.0g" },
      dimensions4: { length: "10.5", height: "4.5", weight: "51.0g" },
      dimensions5: { length: "9.0", height: "4.0", weight: "38.9g" },
      dimensions6: { length: "8.5", height: "4.0", weight: "30.1g" },
      dimensions7: { length: "7.5", height: "3.0", weight: "22.0g" },
      dimensions8: { length: "6.5", height: "2.5", weight: "12.0g" }
    },
    "Type 3 - Square Round": {
      dimensions1: { length: "9.5", height: "4.0", weight: "47.7g" },
      dimensions2: { length: "8.5", height: "4.0", weight: "38.0g" },
      dimensions3: { length: "7.0", height: "3.0", weight: "26.2g" }
    },
    "Type 4 - Stand Design Edge": {
      dimensions1: { length: "11.0", height: "7.5", weight: "50.6g" },
      dimensions2: { length: "9.5", height: "6.5", weight: "43.0g" },
      dimensions3: { length: "8.5", height: "5.5", weight: "26.3g" },
      dimensions4: { length: "8.0", height: "5.0", weight: "20.3g" }
    },
    "Type 5 - Stand Normal Edge": {
      dimensions1: { length: "11.5", height: "8.5", weight: "101.8g" },
      dimensions2: { length: "11.0", height: "8.0", weight: "83.0g" },
      dimensions3: { length: "10.0", height: "7.5", weight: "64.7g" },
      dimensions4: { length: "9.5", height: "7.0", weight: "55.8g" },
      dimensions5: { length: "8.5", height: "7.0", weight: "41.9g" },
      dimensions6: { length: "7.5", height: "6.5", weight: "31.6g" },
      dimensions7: { length: "7.0", height: "5.5", weight: "27.3g" },
      dimensions8: { length: "6.2", height: "4.5", weight: "23.4g" },
      dimensions9: { length: "5.0", height: "2.0", weight: "12.2g" }
    }
  }
},  
];

// Helper function to get a category by ID
export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find(category => category.id === categoryId);
};

// Helper function to get products by category ID
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

// Helper function to get products by subcategory
export const getProductsBySubcategory = (categoryId: string, subcategoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId && product.subcategory === subcategoryId);
};
