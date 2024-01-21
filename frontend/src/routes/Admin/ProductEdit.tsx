import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../actions/productActions';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from '../../constants/productContstants';
import { sortProductSizes } from '../../utils/sortProductSizes';
import ProductSizes from '../../components/admin/products/ProductSizes';
import ImagesSection from '../../components/admin/products/MultipleImages';
import { uploadMultipleFilesToFirebase } from '../../utils/uploadToFirebase';
import GoBackBtn from '../../utils/GoBackBtn';
import ProductEditCreateLayout from '../../components/dashboard/dashboard2024/layouts/ProductEditCreateLayout';
import { Form, Spinner } from 'react-bootstrap';
import { FormControl, FormGroup, FormLabel } from '../../components/styles/admin/Styles';
import { categories } from '../../utils/shopCategories';
import { useProductEditForm } from '../../utils/hooks/useProductEditForm';

const ProductCreate = () => {
  const {
    state: { product, isEditMode },
  } = useLocation() as any;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [productSizes, setProductSizes] = useState([]) as any;
  const [doesProductHaveSizes, setDoesProductHaveSizes] = useState(false);
  const [files, setFiles] = useState([]) as any;
  const state = useSelector((state: any) => state);
  const loadingCreate = state?.productCreate?.loading;
  const errorCreate = state?.productCreate?.error;
  const successCreate = state?.productCreate?.success;

  const loadingUpdate = state?.productUpdate?.loading;
  const errorUpdate = state?.productUpdate?.error;
  const successUpdate = state?.productUpdate?.success;

  const createProductCallback = async () => {
    setUploading(true);

    const imageUrls = await uploadMultipleFilesToFirebase(files);

    const sortedSizes = sortProductSizes(productSizes);

    const updatedImages = [...inputs.images, ...imageUrls.filter(Boolean)];

    if (isEditMode) {
      dispatch(
        updateProduct({
          _id: product?._id,
          name: inputs.name,
          price: inputs.price,
          shippingPrice: inputs.shippingPrice,
          brand: inputs.brand,
          category: inputs.category,
          description: inputs.description,
          countInStock: inputs.countInStock,
          image: updatedImages[0],
          images: updatedImages,
          sizes: sortedSizes,
          hasSizes: doesProductHaveSizes,
        })
      );
    } else {
      dispatch(
        createProduct({
          name: inputs.name,
          price: inputs.price,
          shippingPrice: inputs.shippingPrice,
          brand: inputs.brand,
          category: inputs.category,
          description: inputs.description,
          countInStock: inputs.countInStock,
          image: updatedImages[0],
          images: updatedImages,
          sizes: sortedSizes,
          hasSizes: doesProductHaveSizes,
        })
      );
    }
  };

  const { inputs, handleInput, setInputs, onSubmit } = useProductEditForm(
    createProductCallback,
    product,
    setDoesProductHaveSizes,
    setProductSizes
  );

  useEffect(() => {
    if (successUpdate || successCreate) {
      history('/admin/product/list');
      dispatch({ type: PRODUCT_CREATE_RESET });
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [dispatch, history, successUpdate, successCreate]);

  return (
    <ProductEditCreateLayout
      error={errorUpdate || errorCreate}
      box1={<Text fontFamily='Rust' fontSize='24px' color='#fc5b82' textAlign='center' width='100%'>
        Product {isEditMode ? 'Edit' : 'Create'}
      </Text>}
      box2={<GoBackBtn to='/admin/product/list' color='#121212' />

      }
      box3={
        loadingCreate || loadingUpdate ? (
          <Spinner animation='border' size='sm' />
        ) : (
          (errorUpdate || errorCreate) && (
            <Text fontFamily='Rust' fontSize='20px'>
              {errorUpdate || errorCreate}
            </Text>
          )
        )
      }
      box4={
        <ImagesSection
          handleInput={handleInput}
          setFiles={setFiles}
          files={files}
          uploading={uploading}
          inputs={inputs}
          setInputs={setInputs}
        />
      }
      box5={
        <FormGroup controlId='name'>
          <FormLabel>Name</FormLabel>
          <FormControl name='name' type='text' value={inputs.name || ''} onChange={handleInput}></FormControl>
        </FormGroup>
      }
      box6={
        <FormGroup controlId='brand'>
          <FormLabel>Brand</FormLabel>
          <FormControl
            name='brand'
            type='text'
            value={inputs.brand || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box7={
        <FormGroup controlId='price'>
          <FormLabel>Price</FormLabel>
          <FormControl
            name='price'
            type='number'
            step='any'
            min='0'
            value={inputs.price || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box8={
        <FormGroup controlId='shippingPrice'>
          <FormLabel>Shipping Price</FormLabel>
          <FormControl
            name='shippingPrice'
            type='number'
            value={inputs.shippingPrice || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box9={
        !doesProductHaveSizes && (
          <FormGroup controlId='countInStock'>
            <FormLabel>Count In Stock</FormLabel>
            <FormControl
              name='countInStock'
              disabled={doesProductHaveSizes}
              min={0}
              type='number'
              value={inputs.countInStock || 0}
              onChange={handleInput}
            ></FormControl>
          </FormGroup>
        )
      }
      box10={
        <FormGroup controlId='category'>
          <FormLabel>Category</FormLabel>
          <FormControl name='category' as='select' value={inputs.category || ''} onChange={handleInput}>
            {categories().map((category: any, i: number) => (
              <option key={i}>{category}</option>
            ))}
          </FormControl>
        </FormGroup>
      }
      box11={
        <FormGroup controlId='description'>
          <FormLabel>Enter description separated by a pipe ( | )</FormLabel>
          <FormControl
            name='description'
            as='textarea'
            rows={6}
            placeholder='i.e. Comfortable|Stylish|Attractive'
            value={inputs.description || ''}
            onChange={handleInput}
          ></FormControl>
        </FormGroup>
      }
      box12={
        <FormGroup controlId='doesProductHaveSizes' className='d-flex align-items-center mb-0'>
          <Form.Check
            type='switch'
            checked={doesProductHaveSizes || false}
            onChange={(e: any) => {
              setDoesProductHaveSizes(e.target.checked);
              if (doesProductHaveSizes) {
                setProductSizes([]);
              }
            }}
          ></Form.Check>
          <FormLabel className='mb-0'>Does this product have sizes?</FormLabel>
        </FormGroup>
      }
      box13={
        <ProductSizes
          doesProductHaveSizes={doesProductHaveSizes}
          productSizes={productSizes}
          setProductSizes={setProductSizes}
        />
      }
      box14={
        <UpdateBtn onClick={onSubmit}>
          {isEditMode ? 'Updat' : 'Creat'}
          {loadingUpdate || loadingCreate ? 'ing...' : 'e'}
        </UpdateBtn>
      }
    />
  );
};

export default ProductCreate;
