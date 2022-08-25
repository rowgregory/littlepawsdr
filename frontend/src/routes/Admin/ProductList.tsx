import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Col, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, createProduct } from '../../actions/productActions';
import DeleteModal from '../../components/DeleteModal';
import { PRODUCT_CREATE_RESET } from '../../constants/productContstants';
import {
  LoadingImg,
  StyledEditBtn,
  Text,
} from '../../components/styles/Styles';
import { useHistory } from 'react-router-dom';
import {
  CreateBtn,
  SearchBar,
  TableHead,
  TableRow,
} from '../../components/styles/admin/Styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import toaster from 'toasted-notes';
import { ToastAlert } from '..';

const ProductCountTD = styled.td<{ isProductLow?: boolean }>`
  color: ${({ theme, isProductLow }) =>
    isProductLow ? theme.colors.red : ''} !important;
  box-shadow: ${({ theme, isProductLow }) =>
    isProductLow ? `-3px 0 0 0 ${theme.colors.red} inset` : ''} !important;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [publicId, setPublicId] = useState('');
  const [text, setText] = useState('');
  const [productSet, setProduct] = useState([]) as any;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productList = useSelector((state: any) => state.productList);
  const {
    loading: loadingProductList,
    error: errorProductList,
    products,
  } = productList;

  const productDelete = useSelector((state: any) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state: any) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (products) {
      setProduct(products);
    }
  }, [products]);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, successDelete, successCreate, createdProduct]);

  useEffect(() => {
    if (errorProductList || errorCreate || errorDelete) {
      toaster.notify(
        ({ onClose }) =>
          ToastAlert(
            errorProductList || errorCreate || errorDelete,
            onClose,
            'error'
          ),
        {
          position: 'bottom',
          duration: 20000,
        }
      );
    }
  }, [errorProductList, errorCreate, errorDelete]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const filteredProducts = productSet?.filter((product: any) =>
    product._id.toLowerCase().includes(text.toLowerCase())
  );

  return errorProductList ? (
    <></>
  ) : (
    <>
      <DeleteModal
        actionFunc='Product'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />
      {loadingProductList ? (
        <Col className='mb-3 d-flex justify-content-between align-items-center'>
          <LoadingImg w='20rem' h='2.5rem' />
          <LoadingImg w='2.5rem' h='2.5rem' borderRadius='50%' />
        </Col>
      ) : (
        <Col className='d-flex align-items-center justify-content-between'>
          <SearchBar>
            <Form.Control
              as='input'
              type='text'
              placeholder='Search by ID'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            ></Form.Control>
          </SearchBar>
          <CreateBtn className='mb-3 border-0' onClick={createProductHandler}>
            {loadingCreate ? (
              <Spinner animation='border' size='sm' />
            ) : (
              <i className='fas fa-plus'></i>
            )}
          </CreateBtn>
        </Col>
      )}
      <Col>
        <Table hover responsive className='table-sm'>
          <TableHead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>QTYY</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </TableHead>
          <TransitionGroup component='tbody'>
            {filteredProducts?.map((product: any) => (
              <CSSTransition key={product?._id} timeout={500} classNames='item'>
                <TableRow>
                  <td>
                    <Text>{product?._id}</Text>
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
                    <LinkContainer to={`/admin/product/${product?._id}/edit`}>
                      <StyledEditBtn className='btn-lg'>
                        <i className='fas fa-edit'></i>
                      </StyledEditBtn>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      variant='danger'
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
                        <i className='fas fa-trash'></i>
                      )}
                    </Button>
                  </td>
                </TableRow>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Table>
      </Col>
    </>
  );
};

export default ProductList;
