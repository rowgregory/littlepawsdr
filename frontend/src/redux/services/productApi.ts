import { api } from './api';

const BASE_URL = '/products';

export const productApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getProducts: build.query({
      query: () => BASE_URL,
      providesTags: ['Product'],
    }),
    getProduct: build.query({
      query: (productId: string) => `${BASE_URL}/${productId}`,
      providesTags: (result: any, error: any, arg: any) => [{ type: 'Product', id: arg }],
    }),
    createProduct: build.mutation({
      query: (product: any) => ({
        url: BASE_URL,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: build.mutation({
      query: (product: any) => ({
        url: `${BASE_URL}/${product.id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: build.mutation({
      query: (product: any) => ({
        url: `${BASE_URL}/${product.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProductPhoto: build.mutation({
      query: (product: any) => ({
        url: `${BASE_URL}/photo/${product.productId}/${product.photoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteProductPhotoMutation,
} = productApi;
