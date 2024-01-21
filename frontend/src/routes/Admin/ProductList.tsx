import { useEffect, useState } from 'react';
import { Table, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import {
  SearchInput,
  CreateLink,
  TableContainer,
  Row,
  RedDeleteTrash,
  OrangeEditPen,
} from '../../components/styles/admin/Styles';
import styled from 'styled-components';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { Link } from 'react-router-dom';
import { PRODUCT_LIST_RESET } from '../../constants/productContstants';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';

const ProductCountTD = styled.td<{ isProductLow?: boolean }>`
  color: ${({ theme, isProductLow }) => (isProductLow ? theme.colors.red : '')} !important;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);

  let loading = state.productList.loading;
  const error = state.productList.error;
  const products = state.productList.products;

  const loadingDelete = state.productDelete.loading;
  const errorDelete = state.productDelete.error;
  const successDelete = state.productDelete.success;

  useEffect(() => {
    dispatch(listProducts());
    return () => {
      dispatch({ type: PRODUCT_LIST_RESET });
    };
  }, [dispatch, successDelete]);

  const filteredProducts = products?.filter((product: any) =>
    product?.name?.toLowerCase().includes(text.toLowerCase())
  );

  const product = {
    name: '',
    price: 0,
    shippingPrice: 0,
    image: '',
    brand: '',
    category: 'Clothing',
    countInStock: 0,
    description: '',
    sizes: [],
    images: [],
    hasSizes: false,
  };

  return (
    <DashboardLayout2024
      error={error || errorDelete}
      box1='Products'
      box2={
        <SearchInput
          as='input'
          type='text'
          placeholder='Search by Name'
          value={text || ''}
          onChange={(e: any) => setText(e.target.value)}
        />
      }
      box3={
        loading ? (
          <Spinner animation='border' size='sm' />
        ) : error || errorDelete ? (
          <Text fontFamily='Rust' fontSize='20px'>
            {error || errorDelete}
          </Text>
        ) : (
          <CreateLink to={'/admin/product/id/edit'} state={{ product }}>
            <AddIcon loading={loading} />
            Create
          </CreateLink>
        )
      }
      box4={
        <>
          <DeleteModal actionFunc='Product' show={show} handleClose={handleClose} id={id} />
          <TableContainer>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Qty</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts
                  ?.map((product: any, i: number) => (
                    <Row key={product?._id} i={i}>
                      <td>
                        <Image src={product?.image ?? defaultImages.upload} alt='LPDR' />
                      </td>
                      <td>{product?.name}</td>
                      <td>${product?.price}</td>
                      <td>{product?.category}</td>
                      <td>{product?.brand}</td>
                      <ProductCountTD
                        isProductLow={
                          product?.sizes?.length > 0
                            ? product?.sizes?.reduce((acc: any, item: any) => acc + item.amount, 0) <= 3 &&
                            product?.sizes?.reduce((acc: any, item: any) => acc + item.amount, 0)
                            : product?.countInStock <= 3
                        }
                      >
                        {product?.sizes?.length > 0
                          ? product?.sizes?.reduce((acc: any, item: any) => acc + item.amount, 0)
                          : product?.countInStock}
                      </ProductCountTD>
                      <td>
                        <Link
                          to={`/admin/product/${product?._id}/edit`}
                          state={{ product, isEditMode: true }}
                        >
                          <OrangeEditPen className='fa-solid fa-pen'></OrangeEditPen>
                        </Link>
                      </td>
                      <td>
                        {loadingDelete && id === product?._id ? (
                          <Spinner size='sm' animation='border' />
                        ) : (
                          <RedDeleteTrash
                            onClick={() => {
                              setId(product?._id);
                              handleShow();
                            }}
                            className='fas fa-trash'
                          ></RedDeleteTrash>
                        )}
                      </td>
                    </Row>
                  ))
                  ?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt))}
              </tbody>
            </Table>
          </TableContainer>
        </>
      }
    />
  );
};

export default ProductList;
