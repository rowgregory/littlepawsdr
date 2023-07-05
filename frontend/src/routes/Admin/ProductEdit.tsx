import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../actions/productActions';
import { UpdateBtn } from '../../components/styles/Styles';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  Quantity,
  SelectInputContainer,
  Size,
} from '../../components/styles/product-details/Styles';
import Message from '../../components/Message';
import {
  Container,
  EditForm,
  FormFile,
  UploadImageSquare,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import PhotoUploadIcon from '../../components/svg/PhotoUploadIcon';
import { Accordion } from '../../components/styles/place-order/Styles';
import { categories } from '../../utils/shopCategories';
import { PRODUCT_UPDATE_RESET } from '../../constants/productContstants';
import { uploadFilesToImgbb } from '../../utils/uploadFilesToImgBB';
import { sortProductSizes } from '../../utils/sortProductSizes';
import { defaultImages } from '../../utils/defaultImages';

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

const useProductEditForm = (
  callback?: any,
  data?: any,
  setDoesProductHaveSizes?: any,
  setProductSizes?: any
) => {
  const values = {
    name: '',
    price: 0,
    shippingPrice: 0,
    image: '',
    images: [],
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
    sizes: [],
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: data.name,
        price: data.price,
        shippingPrice: data.shippingPrice,
        image: data.image,
        images: data.images,
        brand: data.brand,
        category: data.category,
        countInStock: data.countInStock,
        description: data.description,
        sizes: data.sizes,
      }));
    }

    setDoesProductHaveSizes(data?.sizes?.length > 0 ? true : false);
    setProductSizes(data?.sizes);
  }, [data, setDoesProductHaveSizes, setProductSizes]);

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInput, setInputs, onSubmit };
};

const ProductEdit = () => {
  const {
    state: { product },
  } = useLocation() as any;
  const history = useHistory();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [productSizes, setProductSizes] = useState([]) as any;
  const [doesProductHaveSizes, setDoesProductHaveSizes] = useState(false);
  const [files, setFiles] = useState([]) as any;
  const [imgUploadStatus, setImageUploadStatus] = useState('') as any;

  const state = useSelector((state: any) => state);

  const loading = state?.productUpdate?.loading;
  const error = state?.productUpdate?.error;
  const success = state?.productUpdate?.success;

  const editProductCallback = async () => {
    setUploading(true);
    setImageUploadStatus('Uploading to Imgbb');

    const imageUrls = await uploadFilesToImgbb(files);
    setImageUploadStatus('Images uploaded!');

    const sortedSizes = sortProductSizes(productSizes);

    const updatedImages = [...inputs.images, ...imageUrls.filter(Boolean)];

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
        image: inputs.images[0],
        images: updatedImages,
        sizes: sortedSizes,
      })
    );
  };

  const { inputs, handleInput, setInputs, onSubmit } = useProductEditForm(
    editProductCallback,
    product,
    setDoesProductHaveSizes,
    setProductSizes
  );

  useEffect(() => {
    if (success) {
      history.push('/admin/product/list');
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [dispatch, history, success]);

  const editPhotoHandler = (e: any) => setFiles(e.target.files);

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
      productSizes?.some((productSize: any) => productSize?.size === obj?.size)
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
        step4={product?.name}
        step5='Edit'
        url1='/'
        url2='/admin'
        url3='/admin/product/list'
      />
      {error && <Message variant='danger'>{error}</Message>}
      <EditForm>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name='name'
            type='text'
            value={inputs.name || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            name='price'
            type='number'
            step='any'
            min='0'
            value={inputs.price || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='shippingPrice'>
          <Form.Label>Shipping Price</Form.Label>
          <Form.Control
            name='shippingPrice'
            type='number'
            value={inputs.shippingPrice || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        {!doesProductHaveSizes && (
          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              name='countInStock'
              disabled={doesProductHaveSizes}
              min={0}
              type='number'
              value={inputs.countInStock || 0}
              onChange={handleInput}
            ></Form.Control>
          </Form.Group>
        )}
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
            className='img-link'
            type='file'
            onChange={handleInput}
            multiple
          />
          <div className='d-flex' style={{ position: 'relative' }}>
            <FormFile
              type='file'
              multiple
              id='image-file'
              label={
                <Image
                  src={defaultImages.upload}
                  width='100px'
                  height='100px'
                  style={{ objectFit: 'cover' }}
                  alt='Product'
                  className='p-3'
                />
                // )
              }
              onChange={(e: any) => editPhotoHandler(e)}
            ></FormFile>
            {Array.from(files)?.map((file: any, i: number) => (
              <UploadImageSquare key={i} className={uploading ? 'anim' : ''}>
                <PhotoUploadIcon ready={file} imgStatus={imgUploadStatus} />
              </UploadImageSquare>
            ))}
          </div>
        </Form.Group>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 100px)',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          {Array.from(inputs.images)?.map((img: any, i: number) => (
            <Image
              onClick={() =>
                setInputs((inputs: any) => ({
                  ...inputs,
                  images: inputs.images.filter((image: any) => image !== img),
                }))
              }
              key={i}
              src={img}
              width='100px'
              style={{
                objectFit: 'cover',
                aspectRatio: '1/1',
              }}
              alt='Product'
            />
          ))}
        </div>
        <Form.Group controlId='brand'>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            name='brand'
            type='text'
            value={inputs.brand || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            name='category'
            as='select'
            value={inputs.category || ''}
            onChange={handleInput}
          >
            {categories().map((category: any, i: number) => (
              <option key={i}>{category}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Enter description separated by a pipe ( | )</Form.Label>
          <Form.Control
            name='description'
            as='textarea'
            rows={6}
            placeholder='i.e. Comfortable|Stylish|Attractive'
            value={inputs.description || ''}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
        <UpdateBtn onClick={onSubmit}>
          Updat
          {loading ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default ProductEdit;
