export interface Product {
  id: string;
  title: string;
  isNew?: boolean;
  images?: string[]; // Common/default images
  commonImages?: string[]; // Explicit common images that show when no dimension-specific images
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
    images: ["/assets/images/products/kamakshi-deepam/1.jpg", "/assets/images/products/kamakshi-deepam/2.jpg"],
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
    category: "pooja-items",
    images: ["/assets/images/products/harathi stand/2.1.jpg","/assets/images/products/harathi stand/1.1.1.jpg"],
    subcategory: "harathi-stand",
    weight: "15g-55g",
    inStock: true,
    models: {
      "Model 1": {
        "dimensions1": {
          "length": "15cm",
          "height": "6cm",
          "weight": "55g",
          images: ["/assets/images/products/harathi stand/2.1.jpg","/assets/images/products/harathi stand/2.2.jpg"]
        }
      },
      "Model 2": {
        "dimensions1": {
          "length": "16.5cm",
          "height": "5cm",
          "weight": "41g",
          images : ["/assets/images/products/harathi stand/1.1.1.jpg","/assets/images/products/harathi stand/1.1.2.jpg","/assets/images/products/harathi stand/1.1.jpg","/assets/images/products/harathi stand/1.2.jpg"]
        },
        "dimensions2": {
          "length": "14cm",
          "height": "4.5cm",
          "weight": "35g",
          images : ["/assets/images/products/harathi stand/1.2.1.jpg","/assets/images/products/harathi stand/1.2.2.jpg","/assets/images/products/harathi stand/1.1.jpg","/assets/images/products/harathi stand/1.2.jpg"]
        },
        "dimensions3": {
          "length": "10.5cm",
          "height": "3.5cm",
          "weight": "21g",
          images : ["/assets/images/products/harathi stand/1.2.1.jpg","/assets/images/products/harathi stand/1.2.2.jpg","/assets/images/products/harathi stand/1.1.jpg","/assets/images/products/harathi stand/1.2.jpg"]
        },
        "dimensions4": {
          "length": "7.5cm",
          "height": "3.5cm",
          "weight": "15g",
          images : ["/assets/images/products/harathi stand/1.2.1.jpg","/assets/images/products/harathi stand/1.2.2.jpg","/assets/images/products/harathi stand/1.1.jpg","/assets/images/products/harathi stand/1.2.jpg"]
        }
      }
    }
  },
  {
    id: "1.3",
    title: "Agarbatti Stand",
    category: "pooja-items",
    images: ["/assets/images/products/agarbatti stand/1.1.jpg","/assets/images/products/agarbatti stand/3.jpg","/assets/images/products/agarbatti stand/5.jpg","/assets/images/products/agarbatti stand/7.jpg"],
    subcategory: "agarbatti-stand",
    weight: "10g-30g",
    inStock: true,
    models: {
      "Type 1 (Double Stand)": {
        "dimensions1": {
          "length": "4.5cm",
          "height": "4cm",
          "weight": "16g",
          "images": ["/assets/images/products/agarbatti stand/1.1.jpg", "/assets/images/products/agarbatti stand/1.2.jpg","/assets/images/products/agarbatti stand/1.jpg","/assets/images/products/agarbatti stand/2.jpg"]
        },
        "dimensions2": {
          "length": "3.5cm",
          "height": "4cm",
          "weight": "13g",
          "images": ["/assets/images/products/agarbatti stand/1.1.jpg", "/assets/images/products/agarbatti stand/1.2.jpg"]

        }
      },
      "Type 2 (Single Step)": {
        "dimensions1": {
          "height": "6cm",
          "weight": "20g",
          images: ["/assets/images/products/agarbatti stand/3.1.jpg","/assets/images/products/agarbatti stand/3.2.jpg","/assets/images/products/agarbatti stand/3.jpg","/assets/images/products/agarbatti stand/4.jpg"]
        },
        "dimensions2": {
          "height": "6.5cm",
          "weight": "15g",
          "images": ["/assets/images/products/agarbatti stand/3.3.jpg","/assets/images/products/agarbatti stand/3.4.jpg","/assets/images/products/agarbatti stand/3.jpg","/assets/images/products/agarbatti stand/4.jpg"]

        },
        "dimensions3": {
          "height": "7.5cm",
          "weight": "11g",
          images: ["/assets/images/products/agarbatti stand/3.5.jpg","/assets/images/products/agarbatti stand/3.6.jpg","/assets/images/products/agarbatti stand/3.jpg","/assets/images/products/agarbatti stand/4.jpg"]
        }
      },
      "Type 3 (Round Type)": {
        "dimensions1": {
          "height": "4cm",
          "weight": "30g",
          images: ["/assets/images/products/agarbatti stand/5.1.jpg","/assets/images/products/agarbatti stand/5.2.jpg","/assets/images/products/agarbatti stand/5.jpg","/assets/images/products/agarbatti stand/6.jpg"]
        },
        "dimensions2": {
          "height": "4.5cm",
          "weight": "20g",
          images: ["/assets/images/products/agarbatti stand/5.3.jpg","/assets/images/products/agarbatti stand/5.4.jpg","/assets/images/products/agarbatti stand/5.jpg","/assets/images/products/agarbatti stand/6.jpg"]
        },
        "dimensions3": {
          "height": "5cm",
          "weight": "15g",
          images: ["/assets/images/products/agarbatti stand/5.5.jpg","/assets/images/products/agarbatti stand/5.6.jpg","/assets/images/products/agarbatti stand/5.jpg","/assets/images/products/agarbatti stand/6.jpg"]

        }
      },
      "Type 4 (Height)": {
        "dimensions1": {
          "height": "6cm",
          "weight": "25g",
          images : ["/assets/images/products/agarbatti stand/7.1.jpg","/assets/images/products/agarbatti stand/7.2.jpg","/assets/images/products/agarbatti stand/7.jpg","/assets/images/products/agarbatti stand/8.jpg"]
        },
        "dimensions2": {
          "height": "7cm",
          "weight": "19g",
          images : ["/assets/images/products/agarbatti stand/7.3.jpg","/assets/images/products/agarbatti stand/7.4.jpg","/assets/images/products/agarbatti stand/7.jpg","/assets/images/products/agarbatti stand/8.jpg"]
        },
        "dimensions3": {
          "height": "8.5cm",
          "weight": "15g",
          images : ["/assets/images/products/agarbatti stand/7.5.jpg","/assets/images/products/agarbatti stand/7.6.jpg","/assets/images/products/agarbatti stand/7.jpg","/assets/images/products/agarbatti stand/8.jpg"]
        },
        "dimensions4": {
          "height": "9.5cm",
          "weight": "10g",
          images : ["/assets/images/products/agarbatti stand/7.7.jpg","/assets/images/products/agarbatti stand/7.8.jpg","/assets/images/products/agarbatti stand/7.jpg","/assets/images/products/agarbatti stand/8.jpg"]
        }
      }
    }
  },
  {
  id: "4",
  title: "Gantalu",
  images:  ["/assets/images/products/Gantalu/1.6.jpg","/assets/images/products/Gantalu/1.jpg"],
  isNew: true,
  category: "pooja-items",
  subcategory: "gantalu",
  inStock: true,
  models: {
    "Model 1": {
      dimensions1: { height: "5.5", weight: "30g" , images:["/assets/images/products/Gantalu/1.5.jpg","/assets/images/products/Gantalu/1.6.jpg","/assets/images/products/Gantalu/1.jpg"]},
      dimensions2: { height: "7.5", weight: "40g" , images:["/assets/images/products/Gantalu/1.3.jpg","/assets/images/products/Gantalu/1.4.jpg","/assets/images/products/Gantalu/1.jpg"]},
      dimensions3: { height: "8.5", weight: "50g" , images:["/assets/images/products/Gantalu/1.1.jpg","/assets/images/products/Gantalu/1.2.jpg","/assets/images/products/Gantalu/1.jpg"]}
    }
  }
},
{
  id: "5",
  title: "Uddharini",
  images: ["/assets/images/products/Uddharini/1.jpg","/assets/images/products/Uddharini/1.1.jpg"],
  isNew: true,
  category: "pooja-items",
  subcategory: "uddharini",
  inStock: true,
  models: {
    "Model 1": {
      dimensions1: { height: "12.5", weight: "12.3g", images:["/assets/images/products/Uddharini/1.1.jpg","/assets/images/products/Uddharini/1.jpg"] },
      dimensions2: { height: "11.0", weight: "11.5g", images:["/assets/images/products/Uddharini/1.2.jpg","/assets/images/products/Uddharini/1.jpg"] },
      dimensions3: { height: "10.0", weight: "8.6g", images:["/assets/images/products/Uddharini/1.3.jpg","/assets/images/products/Uddharini/1.jpg"] }
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
  id: "7",
  title: "Cups",
  isNew: true,
  images: ["/assets/images/products/Cups/1.jpg","/assets/images/products/Cups/3.jpg","/assets/images/products/Cups/6.jpg","/assets/images/products/Cups/7.jpg","/assets/images/products/Cups/9.jpg"],
  category: "pooja-items",
  subcategory: "cups",
  inStock: true,
  models: {
    "Type 1 - Round Design": {
      dimensions1: { length: "13.0", height: "5.5", weight: "106.5g", images:["/assets/images/products/Cups/1.1.jpg","/assets/images/products/Cups/1.2.jpg","/assets/images/products/Cups/1.jpg","/assets/images/products/Cups/2.jpg"] },
      dimensions2: { length: "12.0", height: "5.0", weight: "85.5g", images:["/assets/images/products/Cups/2.1.jpg","/assets/images/products/Cups/2.2.jpg","/assets/images/products/Cups/1.jpg","/assets/images/products/Cups/2.jpg"] },
      dimensions3: { length: "11.5", height: "4.8", weight: "67.6g", images:["/assets/images/products/Cups/2.3.jpg","/assets/images/products/Cups/2.4.jpg","/assets/images/products/Cups/1.jpg","/assets/images/products/Cups/2.jpg"] },
      dimensions4: { length: "10.5", height: "4.5", weight: "52.1g", images:["/assets/images/products/Cups/2.5.jpg","/assets/images/products/Cups/2.6.jpg","/assets/images/products/Cups/1.jpg","/assets/images/products/Cups/2.jpg"] },
      dimensions5: { length: "9.0", height: "4.0", weight: "42.7g", images:["/assets/images/products/Cups/2.7.jpg","/assets/images/products/Cups/2.8.jpg","/assets/images/products/Cups/1.jpg","/assets/images/products/Cups/2.jpg"] },
      dimensions6: { length: "8.5", height: "4.0", weight: "32.0g", images:["/assets/images/products/Cups/2.9.jpg","/assets/images/products/Cups/2.10.jpg","/assets/images/products/Cups/1.jpg","/assets/images/products/Cups/2.jpg"] },
      dimensions7: { length: "8.0", height: "3.0", weight: "25.8g", images:["/assets/images/products/Cups/2.11.jpg","/assets/images/products/Cups/2.12.jpg","/assets/images/products/Cups/1.jpg","/assets/images/products/Cups/2.jpg"] }
    },
    "Type 2 - Round Plain": {
      dimensions1: { length: "13.0", height: "5.5", weight: "106.1g",images:["/assets/images/products/Cups/3.1.jpg","/assets/images/products/Cups/3.2.jpg","/assets/images/products/Cups/3.jpg","/assets/images/products/Cups/4.jpg"] },
      dimensions2: { length: "12.0", height: "5.0", weight: "82.6g",images:["/assets/images/products/Cups/3.3.jpg","/assets/images/products/Cups/3.4.jpg","/assets/images/products/Cups/3.jpg","/assets/images/products/Cups/4.jpg"] },
      dimensions3: { length: "11.5", height: "4.8", weight: "60.0g",images:["/assets/images/products/Cups/3.5.jpg","/assets/images/products/Cups/3.6.jpg","/assets/images/products/Cups/3.jpg","/assets/images/products/Cups/4.jpg"] },
      dimensions4: { length: "10.5", height: "4.5", weight: "51.0g" ,images:["/assets/images/products/Cups/3.7.jpg","/assets/images/products/Cups/3.8.jpg","/assets/images/products/Cups/3.jpg","/assets/images/products/Cups/4.jpg"]},
      dimensions5: { length: "9.0", height: "4.0", weight: "38.9g" ,images:["/assets/images/products/Cups/3.9.jpg","/assets/images/products/Cups/3.10.jpg","/assets/images/products/Cups/3.jpg","/assets/images/products/Cups/4.jpg"]},
      dimensions6: { length: "8.5", height: "4.0", weight: "30.1g" ,images:["/assets/images/products/Cups/3.11.jpg","/assets/images/products/Cups/3.12.jpg","/assets/images/products/Cups/3.jpg","/assets/images/products/Cups/4.jpg"]},
      dimensions7: { length: "7.5", height: "3.0", weight: "22.0g" ,images:["/assets/images/products/Cups/3.13.jpg","/assets/images/products/Cups/3.14.jpg","/assets/images/products/Cups/3.jpg","/assets/images/products/Cups/4.jpg"]},
      dimensions8: { length: "6.5", height: "2.5", weight: "12.0g" ,images:["/assets/images/products/Cups/3.13.jpg","/assets/images/products/Cups/3.14.jpg","/assets/images/products/Cups/3.jpg","/assets/images/products/Cups/4.jpg"]}
    },
    "Type 3 - Square Round": {
      dimensions1: { length: "9.5", height: "4.0", weight: "47.7g" ,images:["/assets/images/products/Cups/5.5.jpg","/assets/images/products/Cups/5.6.jpg","/assets/images/products/Cups/5.jpg","/assets/images/products/Cups/6.jpg"] },
      dimensions2: { length: "8.5", height: "4.0", weight: "38.0g",images:["/assets/images/products/Cups/5.3.jpg","/assets/images/products/Cups/5.4.jpg","/assets/images/products/Cups/5.jpg","/assets/images/products/Cups/6.jpg"] },
      dimensions3: { length: "7.0", height: "3.0", weight: "26.2g" ,images:["/assets/images/products/Cups/5.1.jpg","/assets/images/products/Cups/5.2.jpg","/assets/images/products/Cups/5.jpg","/assets/images/products/Cups/6.jpg"]}
    },
    "Type 4 - Stand Design Edge": {
      dimensions1: { length: "11.0", height: "7.5", weight: "50.6g" ,images:["/assets/images/products/Cups/7.1.jpg","/assets/images/products/Cups/7.2.jpg","/assets/images/products/Cups/7.jpg","/assets/images/products/Cups/8.jpg"] },
      dimensions2: { length: "9.5", height: "6.5", weight: "43.0g",images:["/assets/images/products/Cups/7.3.jpg","/assets/images/products/Cups/7.4.jpg","/assets/images/products/Cups/7.jpg","/assets/images/products/Cups/8.jpg"] },
      dimensions3: { length: "8.5", height: "5.5", weight: "26.3g" ,images:["/assets/images/products/Cups/7.5.jpg","/assets/images/products/Cups/7.6.jpg","/assets/images/products/Cups/7.jpg","/assets/images/products/Cups/8.jpg"] },
      dimensions4: { length: "8.0", height: "5.0", weight: "20.3g" ,images:["/assets/images/products/Cups/7.7.jpg","/assets/images/products/Cups/7.8.jpg","/assets/images/products/Cups/7.jpg","/assets/images/products/Cups/8.jpg"] }
    },
    "Type 5 - Stand Normal Edge": {
      dimensions1: { length: "11.5", height: "8.5", weight: "101.8g" ,images:["/assets/images/products/Cups/9.1.jpg","/assets/images/products/Cups/9.2.jpg","/assets/images/products/Cups/9.jpg","/assets/images/products/Cups/9,10.jpg"]},
      dimensions2: { length: "11.0", height: "8.0", weight: "83.0g" ,images:["/assets/images/products/Cups/9.3.jpg","/assets/images/products/Cups/9.4.jpg","/assets/images/products/Cups/9.jpg","/assets/images/products/Cups/9,10.jpg"]},
      dimensions3: { length: "10.0", height: "7.5", weight: "64.7g" ,images:["/assets/images/products/Cups/9.5.jpg","/assets/images/products/Cups/9.6.jpg","/assets/images/products/Cups/9.jpg","/assets/images/products/Cups/9,10.jpg"]},
      dimensions4: { length: "9.5", height: "7.0", weight: "55.8g" ,images:["/assets/images/products/Cups/9.8.jpg","/assets/images/products/Cups/9.7.jpg","/assets/images/products/Cups/9.jpg","/assets/images/products/Cups/9,10.jpg"]},
      dimensions5: { length: "8.5", height: "7.0", weight: "41.9g" ,images:["/assets/images/products/Cups/9.10.jpg","/assets/images/products/Cups/9.9.jpg","/assets/images/products/Cups/9.jpg","/assets/images/products/Cups/9,10.jpg"]},
      dimensions6: { length: "7.5", height: "6.5", weight: "31.6g" ,images:["/assets/images/products/Cups/9.12.jpg","/assets/images/products/Cups/9.11.jpg","/assets/images/products/Cups/9.jpg","/assets/images/products/Cups/9,10.jpg"]},
      dimensions7: { length: "7.0", height: "5.5", weight: "27.3g" ,images:["/assets/images/products/Cups/9.14.jpg","/assets/images/products/Cups/9.13.jpg","/assets/images/products/Cups/9.jpg","/assets/images/products/Cups/9,10.jpg"]},
      dimensions8: { length: "6.2", height: "4.5", weight: "23.4g" ,images:["/assets/images/products/Cups/9.16.jpg","/assets/images/products/Cups/9.15.jpg","/assets/images/products/Cups/9.jpg","/assets/images/products/Cups/9,10.jpg"]},
      dimensions9: { length: "5.0", height: "2.0", weight: "12.2g" ,images:["/assets/images/products/Cups/9.16.jpg","/assets/images/products/Cups/9.15.jpg","/assets/images/products/Cups/9.jpg","/assets/images/products/Cups/9,10.jpg"]}
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
