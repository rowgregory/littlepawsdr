import React, { useEffect, useRef, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import { getProductDetails, updateProduct } from '../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../constants/productContstants';
import {
  LoadingImg,
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
import styled from 'styled-components';
import {
  Quantity,
  SelectInput,
  SelectInputContainer,
  Size,
} from '../../components/styles/product-details/Styles';
import toaster from 'toasted-notes';
import { ToastAlert } from '..';

const SizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

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
  const [productSizes, setProductSizes] = useState([]) as any;
  const [doesProductHaveSizes, setDoesProductHaveSizes] = useState(false);

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

  useEffect(() => {
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
      setProductSizes(product?.sizes);
    }
  }, [dispatch, history, product, productId, submittedForm, successUpdate]);

  useEffect(() => {
    product?.sizes?.length >= 1 && setDoesProductHaveSizes(true);
    product?.sizes?.length === 0 && setDoesProductHaveSizes(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  let sizeIsGone = useRef(null) as any;

  useEffect(() => {
    if (product) {
      sizeIsGone.current = product?.sizes?.every(
        (obj: any) => obj.amount === 0
      );
      if (sizeIsGone.current) {
        setDoesProductHaveSizes(false);
        setProductSizes([]);
      }
    }
  }, [product]);

  useEffect(() => {
    if (error || errorUpdate || errorMsg) {
      toaster.notify(
        ({ onClose }) =>
          ToastAlert(error || errorUpdate || errorMsg, onClose, 'error'),
        {
          position: 'bottom',
          duration: 20000,
        }
      );
    }
  }, [errorUpdate, errorMsg, error]);

  const productDataToUploadWithImg = {
    name,
    price,
    brand,
    category,
    countInStock: productSizes?.length > 0 ? 0 : countInStock,
    description,
    isLimitedProduct,
    sizes: productSizes,
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    let weights = {
      XS: 1,
      S: 2,
      M: 3,
      L: 4,
      XL: 5,
      XXL: 6,
    } as any;

    let sortedSizes = productSizes?.sort(
      (a: any, b: any) => weights[a?.size] - weights[b?.size]
    );

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        category,
        description,
        countInStock: doesProductHaveSizes ? 0 : countInStock,
        image,
        publicId,
        isLimitedProduct,
        sizes: sortedSizes,
      })
    );
    setSubmittedForm(true);
  };

  const sizes_v2 = () => [
    { size: 'XS', amount: 1 },
    { size: 'S', amount: 1 },
    { size: 'M', amount: 1 },
    { size: 'L', amount: 1 },
    { size: 'XL', amount: 1 },
    { size: 'XXL', amount: 1 },
  ];

  const chooseSizes = (obj: any) => {
    if (
      productSizes?.some((productSize: any) => productSize.size === obj?.size)
    ) {
      setProductSizes(productSizes?.filter((s: any) => s?.size !== obj?.size));
    } else
      setProductSizes((prev: any) => [
        ...prev,
        { size: obj.size, amount: obj?.amount },
      ]);
  };

  return error ? (
    <></>
  ) : (
    <>
      <div onClick={() => setDoesProductHaveSizes(false)}>
        <GoBackBtn to='/admin/productList' />
      </div>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          {loading ? (
            <div className='mb-5 mt-4'>
              <LoadingImg h='2.5rem' w='100%' />
            </div>
          ) : (
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-5'>
              <LoadingImg h='2.5rem' w='100%' />
            </div>
          ) : (
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
          )}
          {loading ? (
            <div className='mb-5'>
              <LoadingImg h='2.5rem' w='100%' />
            </div>
          ) : (
            !doesProductHaveSizes && (
              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  min={0}
                  type='number'
                  placeholder='Enter count in stock'
                  value={countInStock || 0}
                  onChange={(e) => setCountInStock(parseInt(e.target.value))}
                ></Form.Control>
              </Form.Group>
            )
          )}
          {loading ? (
            <div className='mb-5'>
              <LoadingImg h='2.5rem' w='3rem' />
            </div>
          ) : (
            <Form.Group
              controlId='doesProductHaveSizes'
              className='d-flex align-items-center'
            >
              <Form.Check
                type='switch'
                checked={doesProductHaveSizes || false}
                onChange={(e: any) => {
                  setDoesProductHaveSizes(e.target.checked);
                }}
              ></Form.Check>
              <Form.Label className='mb-0'>
                Does this product have sizes?
              </Form.Label>
            </Form.Group>
          )}
          {doesProductHaveSizes && (
            <Form.Group className='d-flex flex-column' controlId='chooseSizes'>
              <Form.Label>Choose which sizes you want.</Form.Label>
              <SizeContainer>
                {sizes_v2().map((s, i) => (
                  <div key={i} className='d-flex'>
                    <Size
                      style={{
                        height: '3.75rem',
                        width: '81.77px',
                        margin: '0 1rem 0.5rem 0',
                      }}
                      active={productSizes?.some(
                        (productSize: any) => productSize?.size === s?.size
                      )}
                      onClick={() => chooseSizes(s)}
                      key={i}
                    >
                      {s?.size}
                    </Size>
                    {productSizes?.some(
                      (productSize: any) => productSize?.size === s?.size
                    ) && (
                      <SelectInputContainer
                        style={{
                          width: '84px',
                          border: 0,
                        }}
                      >
                        <Quantity>QTY</Quantity>

                        <SelectInput
                          value={
                            productSizes?.filter(
                              (productSize: any) =>
                                productSize?.size === s?.size
                            )[0].amount
                          }
                          as='select'
                          onChange={(e: any) => {
                            setProductSizes(
                              productSizes?.map((item: any) =>
                                item?.size === s?.size
                                  ? { ...item, amount: +e.target.value }
                                  : item
                              )
                            );
                          }}
                        >
                          {[...Array(20).keys()].map((x, i) => (
                            <option key={i} value={x + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </SelectInput>
                      </SelectInputContainer>
                    )}
                  </div>
                ))}
              </SizeContainer>
            </Form.Group>
          )}
          {loading ? (
            <div className='mb-5 d-flex justify-content-center'>
              <LoadingImg h='200px' w='200px' borderRadius='50%' />
            </div>
          ) : (
            <Form.Group controlId='image' className='d-flex flex-column'>
              <Form.Label>Product image</Form.Label>
              <div className='mx-auto' style={{ position: 'relative' }}>
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
                    top='0px'
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
          )}
          {loading ? (
            <div className='mb-5'>
              <LoadingImg h='2.5rem' w='100%' />
            </div>
          ) : (
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand || ''}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}

          {loading ? (
            <div className='mb-5'>
              <LoadingImg h='2.5rem' w='100%' />
            </div>
          ) : (
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
          )}
          {loading ? (
            <div className='mb-5'>
              <LoadingImg h='7rem' w='100%' />
            </div>
          ) : (
            <Form.Group controlId='description'>
              <Form.Label>
                Enter description separated by a pipe ( | )
              </Form.Label>
              <Form.Control
                as='textarea'
                rows={6}
                placeholder='i.e. Comfortable|Stylish|Attractive'
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          {loading ? (
            <LoadingImg h='2.5rem' w='5rem' borderRadius='0.5rem' />
          ) : (
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
          )}
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEdit;
