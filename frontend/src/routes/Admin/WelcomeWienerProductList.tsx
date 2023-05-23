import { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import {
  SearchBar,
  TableHead,
  TableRow,
  StyledEditBtn,
  TopRow,
  PaginationContainer,
  TableAndPaginationContainer,
  Container,
  SearchInput,
  TableWrapper,
  CreateBtnV2,
  TableImg,
  SpinnerContainer,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { rangeV2 } from '../../components/common/Pagination';
import Message from '../../components/Message';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { listWelcomeWienerProducts } from '../../actions/welcomeWienerProductActions';
import shortenText from '../../utils/shortenText';

const WelcomeWienerProductList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

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
  }, [dispatch]);

  productList?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(productList?.slice(indexOfFirstItem, indexOfLastItem));
  }, [productList, paginatedPage]);

  const filteredWelcomeWienerProducts =
    text !== ''
      ? productList?.filter((product: any) =>
          product?.name?.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((product: any) =>
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
          {loading ? (
            <SpinnerContainer>
              <Spinner animation='border' size='sm' />
            </SpinnerContainer>
          ) : (
            <LinkContainer
              to={{
                pathname: '/admin/welcome-wiener/product/create',
                state: { welcomeWienerProduct },
              }}
            >
              <CreateBtnV2>
                <AddIcon />
                Create
              </CreateBtnV2>
            </LinkContainer>
          )}
        </TopRow>
        <TableAndPaginationContainer>
          <Table hover responsive>
            <TableHead>
              <tr>
                <th>NAME</th>
                <th>IMAGE</th>
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
                    <TableImg src={product?.displayUrl} alt={product?.name} />
                  </td>
                  <td>
                    <Text>{shortenText(product?.description)}</Text>
                  </td>
                  <td>
                    <Text>{product?.price}</Text>
                  </td>
                  <td>
                    <LinkContainer
                      to={{
                        pathname: `/admin/welcome-wiener/product/${product?._id}/edit`,
                        state: { isEditMode: true },
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
              {rangeV2(productList, paginatedPage, setPaginatedPage)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default WelcomeWienerProductList;
