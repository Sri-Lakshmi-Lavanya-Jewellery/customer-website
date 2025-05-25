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
    purity: "92.5%",
    inStock: true,
    models: {
      "Model 1": {
        dimensions1: {
          length: "6.5cm",
          height: "11.5cm",
          breadth: "7cm",
          weight: "60g"
        },
        dimensions2: {
          length: "6cm",
          height: "11cm",
          breadth: "6.5cm",
          weight: "50g"
        },
        dimensions3: {
          length: "5.5cm",
          height: "10cm",
          breadth: "5.5cm",
          weight: "40g"
        },
        dimensions4: {
          length: "5cm",
          height: "9cm",
          breadth: "5cm",
          weight: "30g"
        },
        dimensions5: {
          length: "4.5cm",
          height: "8cm",
          breadth: "5cm",
          weight: "25g"
        },
      },
    }
  },
  {
    "id": "2",
    "title": "Harathi Stand",
    "category": "pooja-items",
    "subcategory": "harathi-stand",
    "weight": "15g-55g",
    "inStock": true,
    "models": {
      "Model 1": {
        "dimensions1": {
          "length": "15cm",
          "height": "6cm",
          "weight": "55g"
        }
      },
      "Model 2": {
        "dimensions1": {
          "length": "16.5cm",
          "height": "5cm",
          "weight": "41g"
        },
        "dimensions2": {
          "length": "14cm",
          "height": "4.5cm",
          "weight": "35g"
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
    "id": "1.3",
    "title": "Agarbatti Stand",
    "category": "pooja-items",
    "subcategory": "agarbatti-stand",
    "weight": "10g-30g",
    "inStock": true,
    "models": {
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
  }
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
