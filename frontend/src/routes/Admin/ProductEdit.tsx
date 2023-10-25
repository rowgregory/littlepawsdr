import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../actions/productActions';
import { UpdateBtn } from '../../components/styles/Styles';
import { useHistory, useLocation } from 'react-router-dom';
import Message from '../../components/Message';
import { Container, EditForm } from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { PRODUCT_UPDATE_RESET } from '../../constants/productContstants';
import { uploadFilesToImgbb } from '../../utils/uploadFilesToImgBB';
import { sortProductSizes } from '../../utils/sortProductSizes';
import { useProductEditForm } from '../../utils/hooks/useProductEditForm';
import FirstFiveFields from '../../components/admin/products/FirstFiveFields';
import ProductSizes from '../../components/admin/products/ProductSizes';
import ImagesSection from '../../components/admin/products/ImagesSection';
import LastThreeFields from '../../components/admin/products/LastThreeFields';

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
  const state = useSelector((state: any) => state);
  const loading = state?.productUpdate?.loading;
  const error = state?.productUpdate?.error;
  const success = state?.productUpdate?.success;

  const editProductCallback = async () => {
    setUploading(true);

    const imageUrls = await uploadFilesToImgbb(files);

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
        image: updatedImages[0],
        images: updatedImages,
        sizes: sortedSizes,
        hasSizes: doesProductHaveSizes,
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
          Updat
          {loading ? 'ing...' : 'e'}
        </UpdateBtn>
      </EditForm>
    </Container>
  );
};

export default ProductEdit;
