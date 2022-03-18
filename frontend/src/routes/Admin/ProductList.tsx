import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Col, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { listProducts, createProduct } from '../../actions/productActions';
import DeleteModal from '../../components/DeleteModal';
import { PRODUCT_CREATE_RESET } from '../../constants/productContstants';
import { StyledEditBtn, TableBody, Text } from '../../components/styles/Styles';
import { useHistory } from 'react-router-dom';
import {
  CreateBtn,
  SearchBar,
  TableHead,
  TableRow,
} from '../../components/styles/admin/Styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
    // loading: loadingProductList,
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

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const filteredProducts = productSet?.filter((product: any) =>
    product._id.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <DeleteModal
        actionFunc='Product'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />
      {(errorDelete || errorCreate) && (
        <Message variant='danger'>{errorDelete || errorCreate}</Message>
      )}
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
            <i className='fas fa-plus fa-2x'></i>
          )}
        </CreateBtn>
      </Col>

      {errorProductList ? (
        <Message variant='danger'>{errorProductList}</Message>
      ) : (
        <Col>
          <Table hover responsive className='table-md'>
            <TableHead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            {products?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Click the plus to create a product.</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : filteredProducts?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Sorry, no match!</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : (
              <TransitionGroup component='tbody'>
                {filteredProducts?.map((product: any) => (
                  <CSSTransition
                    key={product?._id}
                    timeout={500}
                    classNames='item'
                  >
                    <TableRow>
                      <td>
                        <Text>{product._id}</Text>
                      </td>
                      <td>
                        <Text>{product.name}</Text>
                      </td>
                      <td>
                        <Text>${product.price}</Text>
                      </td>
                      <td>
                        <Text>{product.category}</Text>
                      </td>
                      <td>
                        <Text>{product.brand}</Text>
                      </td>
                      <td>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <StyledEditBtn className='btn-lg'>
                            <i className='fas fa-edit'></i>
                          </StyledEditBtn>
                        </LinkContainer>
                      </td>
                      <td>
                        <Button
                          variant='danger'
                          className='btn-lg border-0'
                          onClick={() => {
                            setId(product._id);
                            setPublicId(product.publicId);
                            handleShow();
                          }}
                        >
                          {' '}
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
            )}
          </Table>
        </Col>
      )}
    </>
  );
};

export default ProductList;
