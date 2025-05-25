import { renderHook, act } from '@testing-library/react-hooks';
import { useCategoryFilters } from '../useCategoryFilters'; // Adjust path as necessary
import { Product } from '../../data/productData'; // Adjust path

// Mock product data
const mockProducts: Product[] = [
    { id: '1', categoryId: 'cat1', title: 'Product A (New)', image: '', isNew: true, inStock: true, models: {}, description: 'Desc A', weight: '10g', purity: '22k' },
    { id: '2', categoryId: 'cat1', title: 'Product B', image: '', isNew: false, inStock: false, models: {}, description: 'Desc B', weight: '10g', purity: '22k' },
    { id: '3', categoryId: 'cat1', subcategoryId: 'sub1', title: 'Product C (Sub1, New, Stock)', image: '', isNew: true, inStock: true, models: {}, description: 'Desc C', weight: '10g', purity: '22k' },
    { id: '4', categoryId: 'cat1', subcategoryId: 'sub1', title: 'Product D (Sub1, Stock)', image: '', isNew: false, inStock: true, models: {}, description: 'Desc D', weight: '10g', purity: '22k' },
    { id: '5', categoryId: 'cat1', subcategoryId: 'sub2', title: 'Product E (Sub2)', image: '', isNew: false, inStock: true, models: {}, description: 'Desc E', weight: '10g', purity: '22k' },
    { id: '6', categoryId: 'cat2', title: 'Product F (Cat2)', image: '', isNew: true, inStock: true, models: {}, description: 'Desc F', weight: '10g', purity: '22k' },
];

// Mock the getProductsBySubcategory function
jest.mock('../../data/productData', () => ({
    ...jest.requireActual('../../data/productData'), // Import and retain default exports
    getProductsBySubcategory: jest.fn((categoryId: string, subcategoryId: string) => {
        return mockProducts.filter(p => p.categoryId === categoryId && p.subcategoryId === subcategoryId);
    }),
}));


describe('useCategoryFilters Hook', () => {
    const categoryId = 'cat1';

    it('should return initial products if no filters are applied', () => {
        const { result } = renderHook(() => useCategoryFilters(mockProducts.filter(p => p.categoryId === categoryId), categoryId));
        expect(result.current.filteredProducts.length).toBe(5); // Products for cat1
        expect(result.current.filteredProducts.map(p=>p.id).sort()).toEqual(['1','2','3','4','5'].sort());
    });

    it('should filter by subcategory', () => {
        const { result } = renderHook(() => useCategoryFilters(mockProducts.filter(p => p.categoryId === categoryId), categoryId));
        
        act(() => {
            result.current.filterSetters.setSelectedSubcategory('sub1');
        });
        
        expect(result.current.filteredProducts.length).toBe(2);
        expect(result.current.filteredProducts.every(p => p.subcategoryId === 'sub1')).toBe(true);
        expect(result.current.filteredProducts.map(p=>p.id).sort()).toEqual(['3','4'].sort());
    });

    it('should filter by inStock status', () => {
        const { result } = renderHook(() => useCategoryFilters(mockProducts.filter(p => p.categoryId === categoryId), categoryId));

        act(() => {
            result.current.filterSetters.handleFilterChange('inStock', true);
        });

        expect(result.current.filteredProducts.length).toBe(4); // 1, 3, 4, 5 are in stock for cat1
        expect(result.current.filteredProducts.every(p => p.inStock)).toBe(true);
    });

    it('should sort by newest first', () => {
        const testProducts = [
            { id: 'p1', title: 'Old Product A', isNew: false, inStock: true, categoryId: 'cat1', models: {}, description: '', image: '', weight: '', purity: '' },
            { id: 'p2', title: 'New Product B', isNew: true, inStock: true, categoryId: 'cat1', models: {}, description: '', image: '', weight: '', purity: ''  },
            { id: 'p3', title: 'Old Product C', isNew: false, inStock: true, categoryId: 'cat1', models: {}, description: '', image: '', weight: '', purity: ''  },
            { id: 'p4', title: 'New Product D', isNew: true, inStock: true, categoryId: 'cat1', models: {}, description: '', image: '', weight: '', purity: ''  },
        ];
        const { result } = renderHook(() => useCategoryFilters(testProducts, 'cat1'));

        act(() => {
            result.current.filterSetters.handleFilterChange('sortBy', 'newest');
        });
        
        expect(result.current.filteredProducts.map(p => p.id)).toEqual(['p2', 'p4', 'p1', 'p3']);
    });
    
    it('should sort by name alphabetically (name-asc)', () => {
        const testProducts = [
            { id: 'pZ', title: 'Zulu', isNew: false, inStock: true, categoryId: 'cat1', models: {}, description: '', image: '', weight: '', purity: ''  },
            { id: 'pA', title: 'Alpha', isNew: true, inStock: true, categoryId: 'cat1', models: {}, description: '', image: '', weight: '', purity: ''  },
            { id: 'pM', title: 'Mike', isNew: false, inStock: true, categoryId: 'cat1', models: {}, description: '', image: '', weight: '', purity: ''  },
        ];
        const { result } = renderHook(() => useCategoryFilters(testProducts, 'cat1'));

        act(() => {
            result.current.filterSetters.handleFilterChange('sortBy', 'name-asc');
        });
        
        expect(result.current.filteredProducts.map(p => p.title)).toEqual(['Alpha', 'Mike', 'Zulu']);
    });

    it('should sort by name reverse alphabetically (name-desc)', () => {
         const testProducts = [
            { id: 'pZ', title: 'Zulu', isNew: false, inStock: true, categoryId: 'cat1', models: {}, description: '', image: '', weight: '', purity: ''  },
            { id: 'pA', title: 'Alpha', isNew: true, inStock: true, categoryId: 'cat1', models: {}, description: '', image: '', weight: '', purity: ''  },
            { id: 'pM', title: 'Mike', isNew: false, inStock: true, categoryId: 'cat1', models: {}, description: '', image: '', weight: '', purity: ''  },
        ];
        const { result } = renderHook(() => useCategoryFilters(testProducts, 'cat1'));

        act(() => {
            result.current.filterSetters.handleFilterChange('sortBy', 'name-desc');
        });
        
        expect(result.current.filteredProducts.map(p => p.title)).toEqual(['Zulu', 'Mike', 'Alpha']);
    });

    it('should handle combined filters: subcategory, inStock, and sorted by newest', () => {
        // initialProducts for cat1: 1(new,stock), 2(old,nostock), 3(sub1,new,stock), 4(sub1,old,stock), 5(sub2,old,stock)
        const { result } = renderHook(() => useCategoryFilters(mockProducts.filter(p => p.categoryId === categoryId), categoryId));

        act(() => {
            result.current.filterSetters.setSelectedSubcategory('sub1'); // Products 3, 4
        });
        act(() => {
            result.current.filterSetters.handleFilterChange('inStock', true); // Products 3 (sub1,new,stock), 4 (sub1,old,stock)
        });
        act(() => {
            result.current.filterSetters.handleFilterChange('sortBy', 'newest'); // Should be [3, 4]
        });
        
        expect(result.current.filteredProducts.length).toBe(2);
        expect(result.current.filteredProducts.map(p => p.id)).toEqual(['3', '4']);
        expect(result.current.filteredProducts[0].isNew).toBe(true);
        expect(result.current.filteredProducts[1].isNew).toBe(false);
        expect(result.current.filteredProducts.every(p => p.inStock && p.subcategoryId === 'sub1')).toBe(true);
    });


    it('should return all products for the category if subcategory is set then cleared', () => {
        const { result } = renderHook(() => useCategoryFilters(mockProducts.filter(p => p.categoryId === categoryId), categoryId));
        
        act(() => {
            result.current.filterSetters.setSelectedSubcategory('sub1');
        });
        expect(result.current.filteredProducts.length).toBe(2); // Products 3, 4
        
        act(() => {
            result.current.filterSetters.setSelectedSubcategory(null); // Clear subcategory filter
        });
        
        // Default sort is 'newest'
        // cat1 products: 1(new,stock), 2(old,nostock), 3(sub1,new,stock), 4(sub1,old,stock), 5(sub2,old,stock)
        // New: 1, 3. Old: 2, 4, 5
        // Expected default order (newest): 1, 3, then 2, 4, 5 (original order among old)
        expect(result.current.filteredProducts.length).toBe(5);
        expect(result.current.filteredProducts.map(p => p.id)).toEqual(['1', '3', '2', '4', '5']);
    });
});
