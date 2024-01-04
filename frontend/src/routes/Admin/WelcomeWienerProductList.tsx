import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import {
  SearchBar,
  TableHead,
  TableRow,
  StyledEditBtn,
  TopRow,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
  CreateLink,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import Message from '../../components/Message';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { listWelcomeWienerProducts } from '../../actions/welcomeWienerProductActions';
import shortenText from '../../utils/shortenText';
import { Link } from 'react-router-dom';
import { WELCOME_WIENER_PRODUCT_LIST_RESET } from '../../constants/welcomeWienerProductConstants';

const WelcomeWienerProductList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);
  const loading = state.welcomeWienerProductList.loading;
  const error = state.welcomeWienerProductList.error;
  const productList = state.welcomeWienerProductList.productList;
  const loadingDelete = state.welcomeWienerProductDelete.loading;
  const errorDelete = state.welcomeWienerProductDelete.error;

  useEffect(() => {
    dispatch(listWelcomeWienerProducts());
    return () => {
      dispatch({ type: WELCOME_WIENER_PRODUCT_LIST_RESET })
    }
  }, [dispatch]);

  productList?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  const filteredWelcomeWienerProducts = productList?.filter((product: any) =>
    product?.name?.toLowerCase().includes(text.toLowerCase())
  );

  const welcomeWienerProduct = {
    name: '',
    price: 0,
    displayUrl: defaultImages.upload,
    description: '',
  };

  return (
    <Container>
      <WelcomeText>Welcome Wiener Products</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Welcome Wiener Products'
        url1='/'
        url2='/admin'
        url3='/admin/welcomeWeinerProductList'
      />
      <DeleteModal
        actionFunc='Welcome Wiener Product'
        show={show}
        handleClose={handleClose}
        id={id}
      />
      {(error || errorDelete) && (
        <Message variant='danger'>{error || errorDelete}</Message>
      )}
      <TableWrapper>
        <TopRow>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by name'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          <CreateLink
            to='/admin/welcome-wiener/product/create'
            state={{ welcomeWienerProduct }}
          >
            <AddIcon loading={loading} />
            Create
          </CreateLink>
        </TopRow>
        <TableAndPaginationContainer>
          <Table hover responsive>
            <TableHead>
              <tr>
                <th>NAME</th>
                <th>ICON</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredWelcomeWienerProducts?.map((product: any) => (
                <TableRow key={product?._id}>
                  <td>
                    <Text>{product?.name}</Text>
                  </td>
                  <td>
                    <i className={`${product?.icon} fa-2x`}></i>
                  </td>
                  <td>
                    <Text>{shortenText(product?.description)}</Text>
                  </td>
                  <td>
                    <Text>{product?.price}</Text>
                  </td>
                  <td>
                    <Link
                      to={`/admin/welcome-wiener/product/${product?._id}/edit`}
                      state={{ isEditMode: true }}
                    >
                      <StyledEditBtn>
                        <i
                          style={{ color: '#9761aa' }}
                          className='fas fa-edit'
                        ></i>
                      </StyledEditBtn>
                    </Link>
                  </td>
                  <td>
                    <StyledEditBtn
                      className='border-0'
                      onClick={() => {
                        setId(product?._id);

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
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default WelcomeWienerProductList;
