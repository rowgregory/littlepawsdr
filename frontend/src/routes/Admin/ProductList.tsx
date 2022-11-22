import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, createProduct } from '../../actions/productActions';
import DeleteModal from '../../components/DeleteModal';
import { PRODUCT_CREATE_RESET } from '../../constants/productContstants';
import { Text } from '../../components/styles/Styles';
import { useHistory } from 'react-router-dom';
import {
  SearchBar,
  TableHead,
  TableImg,
  TableRow,
  StyledEditBtn,
  CreateBtnV2,
  TopRow,
  PaginationContainer,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
} from '../../components/styles/admin/Styles';
import styled from 'styled-components';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { AddIcon } from '../../components/svg/AddIcon';
import { rangeV2 } from '../../components/common/Pagination';

const ProductCountTD = styled.td<{ isProductLow?: boolean }>`
  color: ${({ theme, isProductLow }) =>
    isProductLow ? theme.colors.red : ''} !important;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [publicId, setPublicId] = useState('');
  const [text, setText] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let {
    productList: { loading, error, products },
    productCreate: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      product,
    },
    productDelete: {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (successCreate) {
      history.push({
        pathname: `/admin/product/${product._id}/edit`,
        state: product,
      });
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, successCreate, successDelete, product]);

  products?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(products?.slice(indexOfFirstItem, indexOfLastItem));
  }, [products, paginatedPage]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const filteredProducts =
    text !== ''
      ? products?.filter((product: any) =>
          product?.name?.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((product: any) =>
          product?.name?.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Products</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Products'
        url1='/'
        url2='/admin'
        url3='/admin/productList'
      />
      {(loading || loadingCreate || loadingDelete) && <HexagonLoader />}
      <DeleteModal
        actionFunc='Product'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />
      {(error || errorCreate || errorDelete) && (
        <Message variant='danger'>
          {error || errorCreate || errorDelete}
        </Message>
      )}
      <TableWrapper>
        <TopRow className='d-flex align-items-center'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Name'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          <CreateBtnV2 onClick={createProductHandler}>
            <AddIcon />
            {loadingCreate ? (
              <Spinner animation='border' size='sm' />
            ) : (
              'Create'
            )}
          </CreateBtnV2>
        </TopRow>
        <TableAndPaginationContainer>
          <Table hover responsive>
            <TableHead>
              <tr>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>QTYY</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredProducts?.map((product: any) => (
                <TableRow key={product._id}>
                  <td>
                    <TableImg src={product?.image} alt='avatar' />
                  </td>
                  <td>
                    <Text>{product?.name}</Text>
                  </td>
                  <td>
                    <Text>${product?.price}</Text>
                  </td>
                  <td>
                    <Text>{product?.category}</Text>
                  </td>
                  <td>
                    <Text>{product?.brand}</Text>
                  </td>
                  <ProductCountTD
                    isProductLow={
                      product?.sizes?.length > 0
                        ? product?.sizes?.reduce(
                            (acc: any, item: any) => acc + item.amount,
                            0
                          ) <= 4 &&
                          product?.sizes?.reduce(
                            (acc: any, item: any) => acc + item.amount,
                            0
                          )
                        : product?.countInStock <= 3
                    }
                  >
                    {product?.sizes?.length > 0
                      ? product?.sizes?.reduce(
                          (acc: any, item: any) => acc + item.amount,
                          0
                        )
                      : product?.countInStock}
                  </ProductCountTD>
                  <td>
                    <LinkContainer
                      to={{
                        pathname: `/admin/product/${product._id}/edit`,
                        state: product,
                      }}
                    >
                      <StyledEditBtn>
                        <i
                          style={{ color: '#9761aa' }}
                          className='fas fa-edit'
                        ></i>
                      </StyledEditBtn>
                    </LinkContainer>
                  </td>
                  <td>
                    <StyledEditBtn
                      className='border-0'
                      onClick={() => {
                        setId(product?._id);
                        setPublicId(product?.publicId);
                        handleShow();
                      }}
                    >
                      {loadingDelete && id === product?._id ? (
                        <Spinner size='sm' animation='border' />
                      ) : (
                        <i
                          style={{ color: '#cc0000' }}
                          className='fas fa-trash'
                        ></i>
                      )}
                    </StyledEditBtn>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <PaginationContainer>
            <Pagination className='my-3'>
              {rangeV2(products, paginatedPage, setPaginatedPage)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default ProductList;
