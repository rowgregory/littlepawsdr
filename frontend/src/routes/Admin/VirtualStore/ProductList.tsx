import { Fragment, useCallback, useRef, useState } from 'react';
import DeleteModal, { useDeleteModal } from '../../../components/DeleteModal';
import { Link } from 'react-router-dom';
import { useDeleteProductMutation, useGetProductsQuery } from '../../../redux/services/productApi';
import GreenRotatingTransparentCircle from '../../../components/Loaders/GreenRotatingTransparentCircle';
import MagnifyingGlass from '../../../components/svg/MagnifyingGlass';
import useOutsideDetect from '../../../utils/useOutsideDetect';
import Pagination from '../../../components/common/Pagination';

const ProductList = () => {
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [productToBeEdited, setProductToBeEdited] = useState({
    open: false,
    product: { _id: null },
  });

  const productMenuRef = useRef(null) as any;
  const { openModal, show, closeModal } = useDeleteModal();

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const { data, isLoading } = useGetProductsQuery();
  const products = data?.products;
  const noProducts = products?.length === 0;

  const filteredProducts = data?.products?.filter((product: any) =>
    product?.name?.toLowerCase().includes(text.toLowerCase())
  );

  const closeActionMenu = useCallback(() => {
    setProductToBeEdited({ open: false, product: { _id: null } });
  }, []);

  useOutsideDetect(productMenuRef, closeActionMenu);

  return (
    <Fragment>
      <DeleteModal
        type='Product'
        id={id}
        deleteDocument={deleteProduct}
        loading={loadingDelete}
        hook={{ openModal, show, closeModal }}
      />
      {isLoading && <GreenRotatingTransparentCircle />}
      <div className='font-Matter-Medium text-2xl mb-3.5'>Products</div>
      <div className='grid grid-cols-12 gap-3.5'>
        <div className='col-span-12 sm:col-span-7 md:col-span-6 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-[16px]'>
          <MagnifyingGlass />
          <input
            onChange={(e: any) => setText(e.target.value)}
            className='w-full h-full focus:outline-0 rounded-lg ml-2'
            placeholder='Search'
          />
        </div>
        <Link
          to='/admin/virtual-store/products/create'
          className='col-span-12 sm:col-span-4 sm:col-start-9 whitespace-nowrap duration-200 text-center flex justify-center items-center font-Matter-Medium bg-blue-600 rounded-lg text-sm text-white py-2 hover:bg-blue-500 hover:no-underline'
          state={{ isEditMode: false }}
        >
          Add product
        </Link>
      </div>
      <div className='bg-white w-full mt-3 border border-slate-100 rounded-lg'>
        {noProducts ? (
          <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
            <div className='bg-gray-100 h-12 w-12 flex justify-center items-center rounded-lg'>
              <MagnifyingGlass />
            </div>
            <div className='font-Matter-Medium my-2'>You have no products</div>
            <Link
              className='px-4 text-center duration-200 font-Matter-Medium bg-blue-600 text-sm text-white py-2 hover:no-underline hover:bg-blue-500 h-10 flex items-center justify-center'
              to='/admin/virtual-store/products/create'
              state={{ isEditMode: false }}
            >
              Add product
            </Link>
          </div>
        ) : (
          <div className='rounded-lg bg-white overflow-x-hidden relative'>
            <Pagination
              render={(startIndex: number, endIndex: number) => (
                <table className='w-full'>
                  <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                    <tr className='bg-zinc-50'>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className='text-sm -mx-1.5 -my-1 w-fit px-1.5 py-1 flex flex-nowrap items-center gap-2'>
                          Item name
                        </div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>Price</div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>Category</div>
                      </th>
                      <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                        <div className=' text-sm flex flex-nowrap items-center gap-2'>Quantity</div>
                      </th>
                      <th>
                        <div className='flex flex-nowrap items-center gap-2 invisible'>
                          ghosthead
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts?.slice(startIndex, endIndex)?.map((product: any) => (
                      <tr
                        className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
                        key={product?._id}
                      >
                        <td>
                          <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                            <div className='max-w-[15rem]'>
                              <span className='text-sm font-Matter-Regular truncate'>
                                {product?.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            ${product?.price}
                          </p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {product?.category}
                          </p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            {product?.countInStock}
                          </p>
                        </td>
                        <td>
                          <div className=''>
                            {productToBeEdited.open &&
                              productToBeEdited.product?._id === product?._id && (
                                <div
                                  ref={productMenuRef}
                                  className='flex flex-col justify-center shadow-lg p-1.5 absolute z-40 w-28 h-fit border bg-white -top-[44px] right-24 rounded-lg'
                                >
                                  <Link
                                    to={`/admin/virtual-store/products/${productToBeEdited?.product?._id}`}
                                    state={{
                                      product: productToBeEdited.product,
                                      isEditMode: true,
                                    }}
                                    className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                  >
                                    Edit
                                  </Link>
                                  <Link
                                    to={`/merch/${productToBeEdited?.product?._id}`}
                                    state={{
                                      product: productToBeEdited.product,
                                      isEditMode: true,
                                    }}
                                    className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                  >
                                    View
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setId(product?._id);
                                      openModal();
                                    }}
                                    className='flex w-full text-sm text-gray-900 rounded-lg px-2 py-1 hover:no-underline hover:bg-gray-100 hover:text-gray-900'
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            <div
                              onClick={() => setProductToBeEdited({ open: true, product })}
                              className='m-0 w-full border-0 p-0 items-center px-4 relative flex justify-center'
                            >
                              <button className='flex h-7 cursor-pointer items-center justify-center rounded p-2 hover:bg-gray-300 text-gray-900'>
                                <i className='fa-solid fa-ellipsis-vertical'></i>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              totalItems={products?.length}
            ></Pagination>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProductList;
