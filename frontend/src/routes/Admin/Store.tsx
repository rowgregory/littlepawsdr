import { motion } from 'framer-motion';
import { Trophy, Package, Dog, Trash2 } from 'lucide-react';
import { ActionsMenu } from '../../components/admin/store/ActionsMenu';
import {
  useAppDispatch,
  useEcardSelector,
  useProductSelector,
  useWelcomeWienerSelector,
} from '../../redux/toolkitStore';
import { setOpenWelcomeWienerDrawer } from '../../redux/features/welcomeWienerSlice';
import { resetForm, setInputs } from '../../redux/features/form/formSlice';
import { useDeleteWelcomeWienerMutation } from '../../redux/services/welcomeWienerApi';
import { showToast } from '../../redux/features/toastSlice';
import { setOpenProductDrawer } from '../../redux/features/productSlice';
import { setOpenEcardDrawer } from '../../redux/features/ecardSlice';
import { useDeleteProductMutation } from '../../redux/services/productApi';
import { useDeleteEcardMutation } from '../../redux/services/ecardApi';
import ToolTip from '../../components/common/ToolTip';

const Store = () => {
  const { welcomeWieners } = useWelcomeWienerSelector();
  const { ecards } = useEcardSelector();
  const { products } = useProductSelector();
  const dispatch = useAppDispatch();
  const [deleteWelcomeWiener] = useDeleteWelcomeWienerMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [deleteEcard] = useDeleteEcardMutation();

  const handleDeleteEcard = async (id: string) => {
    try {
      await deleteEcard({ id }).unwrap;
      dispatch(showToast({ message: 'Ecard deleted!', type: 'success' }));
    } catch {
      dispatch(showToast({ message: 'Failed to delete ecard', type: 'error' }));
    }
  };

  const handleDeleteWelcomeWiener = async (id: string) => {
    try {
      await deleteWelcomeWiener({ id }).unwrap;
      dispatch(showToast({ message: 'Welcome wiener deleted!', type: 'success' }));
    } catch {
      dispatch(showToast({ message: 'Failed to delete welcome wiener', type: 'error' }));
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct({ id }).unwrap;
      dispatch(showToast({ message: 'Product deleted!', type: 'success' }));
    } catch {
      dispatch(showToast({ message: 'Failed to delete product', type: 'error' }));
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white border-b border-gray-200'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
          <div>
            <h1 className='text-lg sm:text-2xl font-bold text-gray-900'>Store</h1>
            <p className='text-xs sm:text-sm text-gray-600 mt-0.5'>
              {welcomeWieners?.length + ecards?.length + products?.length} store items total
            </p>
          </div>
          <ActionsMenu />
        </div>
      </motion.div>

      <div className='flex h-[calc(100vh-72px)] bg-gray-50'>
        <div className='flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-12 gap-6'>
              {/* Settings Section */}
              <div className='col-span-12 lg:col-span-6 space-y-6'>
                {/* Ecards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className='bg-white border border-gray-200 rounded-lg p-6'
                >
                  <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-fuchsia-50 rounded-lg'>
                        <Trophy className='w-4 h-4 text-fuchsia-600' />
                      </div>
                      <div>
                        <h3 className='text-sm font-semibold text-gray-900'>Ecards</h3>
                        <p className='text-xs text-gray-600'>{ecards?.length || 0} items</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        dispatch(setOpenEcardDrawer());
                        dispatch(resetForm('ecardForm'));
                      }}
                      className='px-3 py-1.5 text-xs font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
                    >
                      Add
                    </motion.button>
                  </div>

                  {!ecards || ecards.length === 0 ? (
                    <p className='text-sm text-gray-500 text-center py-4'>No ecards yet</p>
                  ) : (
                    <div className='space-y-2'>
                      {ecards?.map((ecard, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => {
                            dispatch(setOpenEcardDrawer());
                            dispatch(
                              setInputs({
                                formName: 'ecardForm',
                                data: { ...ecard, isUpdating: true },
                              })
                            );
                          }}
                          className='flex items-center gap-2 justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors'
                        >
                          <div className='flex items-center gap-3 flex-1 min-w-0'>
                            {ecard.thumb && (
                              <img
                                src={ecard.thumb}
                                alt={ecard.name}
                                className='w-8 h-8 rounded object-cover flex-shrink-0'
                              />
                            )}
                            <div className='min-w-0 flex-1'>
                              <p className='text-sm font-semibold text-gray-900 truncate'>
                                {ecard.name}
                              </p>
                              <p className='text-xs text-gray-600'>{ecard.category}</p>
                            </div>
                          </div>

                          <div className='flex items-center gap-2 ml-2'>
                            <span className='text-sm font-semibold text-gray-900'>
                              ${ecard.price}
                            </span>
                            <span className='text-xs text-gray-500'>
                              {new Date(ecard.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEcard(ecard._id);
                            }}
                            className='p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors'
                          >
                            <Trash2 className='w-4 h-4' />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Products */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className='bg-white border border-gray-200 rounded-lg p-6'
                >
                  <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-blue-50 rounded-lg'>
                        <Package className='w-4 h-4 text-blue-600' />
                      </div>
                      <div>
                        <h3 className='text-sm font-semibold text-gray-900'>Products</h3>
                        <p className='text-xs text-gray-600'>{products?.length || 0} items</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        dispatch(setOpenProductDrawer());
                        dispatch(resetForm('productForm'));
                      }}
                      className='px-3 py-1.5 text-xs font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
                    >
                      Add
                    </motion.button>
                  </div>

                  {!products || products.length === 0 ? (
                    <p className='text-sm text-gray-500 text-center py-4'>No products yet</p>
                  ) : (
                    <div className='space-y-2'>
                      {products?.map((product, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group transition-colors'
                        >
                          <div
                            onClick={() => {
                              dispatch(setOpenProductDrawer());
                              dispatch(
                                setInputs({
                                  formName: 'productForm',
                                  data: { ...product, isUpdating: true },
                                })
                              );
                            }}
                            className='flex items-center gap-3 flex-1 min-w-0 cursor-pointer'
                          >
                            <img
                              src={product.image || product.images?.[0]}
                              alt={product.name}
                              className='w-8 h-8 rounded object-cover flex-shrink-0'
                            />
                            <div className='min-w-0 flex-1'>
                              <p className='text-sm font-semibold text-gray-900 truncate'>
                                {product.name}
                              </p>
                              <p className='text-xs text-gray-600'>
                                ${product.price}
                                {product.isPhysicalProduct && product.shippingPrice > 0 && (
                                  <span> +${product.shippingPrice} shipping</span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center gap-2 ml-2'>
                            <ToolTip tooltip={`${product.countInStock} in stock`}>
                              <span
                                className={`text-xs font-semibold px-2 py-1 rounded ${
                                  product.isOutofStock || product.countInStock === 0
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-green-100 text-green-700'
                                }`}
                              >
                                {product.countInStock || 0}
                              </span>
                            </ToolTip>

                            <ToolTip
                              tooltip={
                                product.isPhysicalProduct ? 'Physical Product' : 'Digital Product'
                              }
                            >
                              <span
                                className={`text-xs font-semibold px-2 py-1 rounded ${
                                  product.isPhysicalProduct
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-purple-100 text-purple-700'
                                }`}
                              >
                                {product.isPhysicalProduct ? 'P' : 'D'}
                              </span>
                            </ToolTip>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProduct(product._id);
                              }}
                              className='p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors'
                            >
                              <Trash2 className='w-4 h-4' />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Welcome Wieners */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='col-span-12 lg:col-span-6 bg-white border border-gray-200 rounded-lg p-6 h-fit'
              >
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 bg-rose-50 rounded-lg'>
                      <Dog className='w-4 h-4 text-rose-600' />
                    </div>
                    <div>
                      <h3 className='text-sm font-semibold text-gray-900'>Welcome Wieners</h3>
                      <p className='text-xs text-gray-600'>{welcomeWieners?.length || 0} items</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      dispatch(setOpenWelcomeWienerDrawer());
                      dispatch(resetForm('welcomeWienerForm'));
                    }}
                    className='px-3 py-1.5 text-xs font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
                  >
                    Add
                  </motion.button>
                </div>

                {!welcomeWieners || welcomeWieners.length === 0 ? (
                  <p className='text-sm text-gray-500 text-center py-4'>No Welcome Wieners yet</p>
                ) : (
                  <div className='space-y-2'>
                    {welcomeWieners?.map((dog, i) => (
                      <motion.div
                        key={dog._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => {
                          dispatch(setOpenWelcomeWienerDrawer());
                          dispatch(
                            setInputs({
                              formName: 'welcomeWienerForm',
                              data: { ...dog, isUpdating: true },
                            })
                          );
                        }}
                        className='flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors'
                      >
                        <div className='flex items-center gap-3 flex-1 min-w-0'>
                          <img
                            src={dog.displayUrl || dog.images?.[0]}
                            alt={dog.name}
                            className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                          />
                          <div className='min-w-0 flex-1'>
                            <p className='text-sm font-semibold text-gray-900 truncate'>
                              {dog.name}
                            </p>
                            <p className='text-xs text-gray-600 truncate'>{dog.age}</p>
                          </div>
                        </div>

                        <div className='flex items-center gap-2 ml-2'>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${
                              dog.isLive
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {dog.isLive ? 'Live' : 'Not Live'}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteWelcomeWiener(dog._id);
                            }}
                            className='p-1 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded transition-colors'
                          >
                            <Trash2 className='w-4 h-4' />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
