import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../actions/productActions';
import { UpdateBtn } from '../../components/styles/Styles';
import { useNavigate, useLocation } from 'react-router-dom';
import Message from '../../components/Message';
import { Container, EditForm } from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { PRODUCT_CREATE_RESET } from '../../constants/productContstants';
import { sortProductSizes } from '../../utils/sortProductSizes';
import { useProductCreateForm } from '../../utils/hooks/useProductCreateForm';
import FirstFiveFields from '../../components/admin/products/FirstFiveFields';
import ProductSizes from '../../components/admin/products/ProductSizes';
import ImagesSection from '../../components/admin/products/ImagesSection';
import LastThreeFields from '../../components/admin/products/LastThreeFields';
import { uploadMultipleFilesToFirebase } from '../../utils/uploadToFirebase';

const ProductCreate = () => {
  const {
    state: { product },
  } = useLocation() as any;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [productSizes, setProductSizes] = useState([]) as any;
  const [doesProductHaveSizes, setDoesProductHaveSizes] = useState(false);
  const [files, setFiles] = useState([]) as any;
  const state = useSelector((state: any) => state);
  const loading = state?.productCreate?.loading;
  const error = state?.productCreate?.error;
  const success = state?.productCreate?.success;

  const createProductCallback = async () => {
    setUploading(true);

    const imageUrls = await uploadMultipleFilesToFirebase(files);

    const sortedSizes = sortProductSizes(productSizes);

    dispatch(
      createProduct({
        name: inputs.name,
        price: inputs.price,
        shippingPrice: inputs.shippingPrice,
        brand: inputs.brand,
        category: inputs.category,
        description: inputs.description,
        countInStock: inputs.countInStock,
        image: imageUrls[0],
        images: imageUrls.filter(Boolean),
        sizes: sortedSizes,
        hasSizes: doesProductHaveSizes,
      })
    );
  };

  const { inputs, handleInput, setInputs, onSubmit } = useProductCreateForm(
    createProductCallback
  );

  useEffect(() => {
    if (success) {
      history('/admin/product/list');
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
  }, [dispatch, history, success]);

  return (
    <Container>
      <WelcomeText className='mb-1'>Product Create</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Products'
        step4={product?.name}
        step5='Create'
        url1='/'
        url2='/admin'
        url3='/admin/product/list'
      />
      {error && <Message variant='danger'>{error}</Message>}
      <EditForm>
        <FirstFiveFields
          inputs={inputs}
          handleInput={handleInput}
          doesProductHaveSizes={doesProductHaveSizes}
          setDoesProductHaveSizes={setDoesProductHaveSizes}
          setProductSizes={setProductSizes}
        />
        <ProductSizes
          doesProductHaveSizes={doesProductHaveSizes}
          productSizes={productSizes}
          setProductSizes={setProductSizes}
        />
        <ImagesSection
          handleInput={handleInput}
          setFiles={setFiles}
          files={files}
          uploading={uploading}
          inputs={inputs}
          setInputs={setInputs}
        />
        <LastThreeFields inputs={inputs} handleInput={handleInput} />
        <UpdateBtn onClick={onSubmit}>
          Creat
          {loading ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default ProductCreate;
