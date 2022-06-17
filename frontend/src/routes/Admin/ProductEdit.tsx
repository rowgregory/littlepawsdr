import React, { useEffect, useMemo, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getProductDetails, updateProduct } from '../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../constants/productContstants';
import {
  StyledUloadedImg,
  Text,
  UpdateBtn,
} from '../../components/styles/Styles';
import GoBackBtn from '../../utils/GoBackBtn';
import { EditBtn } from './RaffleWinnerEdit';
import { FormFile } from './EventEdit';
import { removePhoto } from '../../utils/removePhoto';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { categories } from '../Shop/Shop';
import { useRouteMatch, useHistory } from 'react-router-dom';

const ProductEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const productId = match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [publicId, setPublicId] = useState('');
  const [isLimitedProduct, setisLimitedProduct] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);

  const productDetails = useSelector((state: any) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state: any) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const uploadDefaultImgUrl =
    'https://res.cloudinary.com/doyd0ewgk/image/upload/v1628374521/upload_2.png';

  useMemo(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (successUpdate) {
      if (submittedForm) {
        return history.push('/admin/productList');
      }
      dispatch(getProductDetails(productId));
      dispatch({ type: PRODUCT_UPDATE_RESET });
    } else {
      setName(product?.name);
      setPrice(product?.price);
      setImage(product?.image);
      setBrand(product?.brand);
      setCategory(product?.category);
      setCountInStock(product?.countInStock);
      setDescription(product?.description);
      setPublicId(product?.publicId);
      setisLimitedProduct(product?.isLimitedProduct);
    }
  }, [dispatch, history, product, productId, submittedForm, successUpdate]);

  const productDataToUploadWithImg = {
    name,
    price,
    brand,
    category,
    countInStock,
    description,
    isLimitedProduct,
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        category,
        description,
        countInStock,
        image,
        publicId,
        isLimitedProduct,
      })
    );
    setSubmittedForm(true);
  };

  return (
    <>
      <GoBackBtn to='/admin/productList' />
      {errorMsg && <Message variant='danger'>No photo to remove</Message>}
      <FormContainer>
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                step='any'
                min='1'
                placeholder='Enter price'
                value={price || ''}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isLimitedProduct'>
              <Form.Check
                type='switch'
                label='Is Limited Product'
                checked={isLimitedProduct || false}
                onChange={(e: any) => {
                  setisLimitedProduct(e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>
            {isLimitedProduct && (
              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  min={0}
                  type='number'
                  placeholder='Enter count in stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(parseInt(e.target.value))}
                ></Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId='image' className='d-flex flex-column'>
              <Form.Label>Product image</Form.Label>
              <div className='mx-auto'>
                <Form.Control
                  required={isLimitedProduct}
                  className='img-link'
                  type='text'
                  value={image || ''}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <StyledUloadedImg
                  src={image || ''}
                  alt='avatar'
                  onClick={() => setShowImageOptions(!showImageOptions)}
                />
                {uploading && (
                  <Loader
                    w='200px'
                    h='200px'
                    p='absolute'
                    z='1'
                    top='-200px'
                    left='0px'
                  />
                )}
                <div style={{ position: 'relative' }}>
                  <EditBtn
                    onClick={() => setShowImageOptions(!showImageOptions)}
                  >
                    <i className='fas fa-edit mr-2'></i>Edit
                  </EditBtn>
                  {showImageOptions && (
                    <EditBtn className='d-flex flex-column imgOptions'>
                      <FormFile
                        mb={(image !== uploadDefaultImgUrl).toString()}
                        id='image-file'
                        label='Upload a photo...'
                        onChange={(e: any) =>
                          uploadFileHandler(
                            e,
                            setUploading,
                            setShowImageOptions,
                            setErrorMsg,
                            setPublicId,
                            updateProduct,
                            dispatch,
                            publicId,
                            productId,
                            productDataToUploadWithImg,
                            '',
                            image,
                            () => {},
                            setImage,
                            'product'
                          )
                        }
                      ></FormFile>
                      {image !== uploadDefaultImgUrl && (
                        <div
                          className='remove-img'
                          onClick={() =>
                            removePhoto(
                              product.publicId,
                              setPublicId,
                              dispatch,
                              updateProduct,
                              productId,
                              setErrorMsg
                            )
                          }
                        >
                          Remove photo
                        </div>
                      )}
                    </EditBtn>
                  )}
                </div>
              </div>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand || ''}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                value={category || ''}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories().map((category, i) => (
                  <option key={i}>{category}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <UpdateBtn type='submit'>
              {loadingUpdate ? (
                <div className='d-flex align-items-center'>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  <Text className='text-white ml-2'>Updating...</Text>
                </div>
              ) : (
                <Text className='text-white'>Update</Text>
              )}
            </UpdateBtn>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEdit;
