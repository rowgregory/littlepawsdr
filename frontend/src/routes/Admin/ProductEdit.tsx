import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, updateProduct } from '../../actions/productActions';
import { Text, UpdateBtn } from '../../components/styles/Styles';
import { removePhoto } from '../../utils/removePhoto';
import uploadFileHandler from '../../utils/uploadFileHandler';
import { useRouteMatch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  Quantity,
  SelectInputContainer,
  Size,
} from '../../components/styles/product-details/Styles';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import {
  Container,
  EditForm,
  FormFile,
  RemovePhoto,
  UploadImageSquare,
} from '../../components/styles/admin/Styles';
import { defaultImages } from '../../utils/defaultImages';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import PhotoUploadIcon from '../../components/svg/PhotoUploadIcon';
import RemovePhotoIcon from '../../components/svg/RemovePhotoIcon';
import { Accordion } from '../../components/styles/place-order/Styles';
import { categories } from '../../utils/shopCategories';
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from '../../constants/productContstants';

const SizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

const SelectInput = styled(Form.Control)`
  width: 100%;
  border: none;
  background: #fff !important;
  height: 3.75rem !important;
  cursor: pointer;
  margin: 0 auto !important;
  font-size: 1rem;
  color: #c4c4c4;
  :focus-visible {
    outline: none !important;
  }
  :hover {
    border: none !important;
  }
`;

const ProductEdit = () => {
  const match = useRouteMatch<{ id: string }>();
  const history = useHistory() as any;
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
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [productSizes, setProductSizes] = useState([]) as any;
  const [doesProductHaveSizes, setDoesProductHaveSizes] = useState(false);
  const [file, setFile] = useState({}) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;
  const [cloudinaryData, setClouadinaryData] = useState({}) as any;

  const { state } = history.location;

  const {
    productUpdate: {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    },
  } = useSelector((state: any) => state);

  console.log(state);

  useEffect(() => {
    dispatch({ type: PRODUCT_DETAILS_RESET });
    dispatch(getProductDetails(productId));
    dispatch({ type: PRODUCT_UPDATE_RESET });
  }, [dispatch, productId, successUpdate]);

  useEffect(() => {
    setCategory(state?.category);
    setImage(state?.image);
    setPrice(state?.price);
    setPublicId(state?.publicId);
    setName(state?.name);
    setisLimitedProduct(state?.isLimitedProduct);
    setCountInStock(state?.countInStock);
    setProductSizes(state?.sizes);
    setBrand(state?.brand);
    setDescription(state?.description);
    setDoesProductHaveSizes(state?.sizes?.length > 0 ? true : false);
  }, [state]);

  let weights = {
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    XXL: 6,
  } as any;

  useEffect(() => {
    if (successUpdate && submittedForm) {
      setSubmittedForm(false);
      history.push('/admin/productList');
    }
  }, [dispatch, history, submittedForm, successUpdate]);

  let sortedSizes = productSizes?.sort(
    (a: any, b: any) => weights[a?.size] - weights[b?.size]
  );

  useEffect(() => {
    if (Object.keys(cloudinaryData).length > 0) {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          brand,
          category,
          description,
          countInStock,
          image: cloudinaryData.secureUrl,
          publicId: cloudinaryData.publicId,
          isLimitedProduct,
          sizes: sortedSizes,
        })
      );
    }
  }, [
    brand,
    category,
    cloudinaryData,
    countInStock,
    description,
    dispatch,
    doesProductHaveSizes,
    isLimitedProduct,
    name,
    price,
    productId,
    sortedSizes,
  ]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    setSubmittedForm(true);
    if (file?.name) {
      setUploading(true);
      uploadFileHandler(
        file,
        setUploading,
        publicId,
        setImageUploadStatus,
        setClouadinaryData
      );
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          brand,
          category,
          description,
          countInStock,
          sizes: productSizes,
        })
      );
    }
  };

  const editPhotoHandler = (e: any) => setFile(e.target.files[0]);

  const removePhotoHandler = (e: any) => {
    e.preventDefault();
    removePhoto(
      state.publicId,
      () => {},
      dispatch,
      updateProduct,
      productId,
      setErrorMsg
    );
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

  return (
    <Container>
      <WelcomeText className='mb-1'>Product Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Products'
        step4={state?.name}
        step5='Edit'
        url1='/'
        url2='/admin'
        url3='/admin/productList'
      />
      {(loadingUpdate || submittedForm || uploading) && <HexagonLoader />}
      {(errorUpdate || errorMsg) && (
        <Message variant='danger'>{errorUpdate || errorMsg}</Message>
      )}
      <EditForm>
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

        <Form.Group controlId='countInStock'>
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            disabled={doesProductHaveSizes}
            min={0}
            type='number'
            placeholder='Enter count in stock'
            value={countInStock || 0}
            onChange={(e) => setCountInStock(parseInt(e.target.value))}
          ></Form.Control>
        </Form.Group>

        <Form.Group
          controlId='doesProductHaveSizes'
          className='d-flex align-items-center'
        >
          <Form.Check
            type='switch'
            checked={doesProductHaveSizes || false}
            onChange={(e: any) => {
              setDoesProductHaveSizes(e.target.checked);
              if (doesProductHaveSizes) {
                setProductSizes([]);
              } else {
                setCountInStock(0);
              }
            }}
          ></Form.Check>
          <Form.Label className='mb-0'>
            Does this product have sizes?
          </Form.Label>
        </Form.Group>

        <Accordion toggle={doesProductHaveSizes} maxheight='470px'>
          <Form.Group className='d-flex flex-column' controlId='chooseSizes'>
            <Form.Label>Choose which sizes you want.</Form.Label>
            <SizeContainer className='mb-0'>
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
                            (productSize: any) => productSize?.size === s?.size
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
        </Accordion>

        <Form.Group controlId='image' className='d-flex flex-column'>
          <Form.Label>Image</Form.Label>
          <Form.Control
            required={isLimitedProduct}
            className='img-link'
            type='text'
            value={image || ''}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <div className='d-flex'>
            <FormFile
              id='image-file'
              label={
                state?.image === defaultImages.upload || file?.name ? (
                  <UploadImageSquare className={uploading ? 'anim' : ''}>
                    <PhotoUploadIcon ready={file} imgStatus={imgUploadStatus} />
                  </UploadImageSquare>
                ) : (
                  <Image
                    src={state?.image}
                    width='200px'
                    height='200px'
                    style={{ objectFit: 'cover' }}
                  />
                )
              }
              onChange={(e: any) => editPhotoHandler(e)}
            ></FormFile>
            <RemovePhoto
              onClick={(e: any) =>
                image === defaultImages.upload ? {} : removePhotoHandler(e)
              }
            >
              <RemovePhotoIcon />
              <Text marginLeft='0.75rem' fontWeight='300' color='#c4c4c4'>
                Remove Photo
              </Text>
            </RemovePhoto>
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
            {categories().map((category: any, i: number) => (
              <option key={i}>{category}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Enter description separated by a pipe ( | )</Form.Label>
          <Form.Control
            as='textarea'
            rows={6}
            placeholder='i.e. Comfortable|Stylish|Attractive'
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <UpdateBtn onClick={(e: any) => submitHandler(e)}>
          Updat{submittedForm ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default ProductEdit;
