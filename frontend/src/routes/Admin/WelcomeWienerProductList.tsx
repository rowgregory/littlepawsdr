import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import {
  SearchInput,
  CreateLink,
  TableContainer,
  Row,
  OrangeEditPen,
  RedDeleteTrash,
  WelcomeWienerLink,
} from '../../components/styles/admin/Styles';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { listWelcomeWienerProducts } from '../../actions/welcomeWienerProductActions';
import shortenText from '../../utils/shortenText';
import { Link } from 'react-router-dom';
import { WELCOME_WIENER_PRODUCT_LIST_RESET } from '../../constants/welcomeWienerProductConstants';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';

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
      dispatch({ type: WELCOME_WIENER_PRODUCT_LIST_RESET });
    };
  }, [dispatch]);

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
    <DashboardLayout2024
      error={error || errorDelete}
      box1='Welcome Wiener Products'
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
          <Spinner animation='border' size='sm' style={{ color: '#fff' }} />
        ) : error || errorDelete ? (
          <Text fontFamily='Rust' fontSize='20px'>
            {error || errorDelete}
          </Text>
        ) : (
          <CreateLink to='/admin/welcome-wiener/product/id/edit' state={{ welcomeWienerProduct }}>
            <AddIcon loading={loading} />
            Create
          </CreateLink>
        )
      }
      box4={
        <>
          <DeleteModal actionFunc='Welcome Wiener Product' show={show} handleClose={handleClose} id={id} />
          <TableContainer>
            <WelcomeWienerLink to='/admin/welcome-wiener/dachshund/list'>
              Welcome Wiener Dachshund List <i className='fa-solid fa-angles-right ml-2'></i>
            </WelcomeWienerLink>
            <Table hover responsive size='sm'>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ICON</th>
                  <th>DESCRIPTION</th>
                  <th>PRICE</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {filteredWelcomeWienerProducts?.map((product: any, i: number) => (
                  <Row key={product?._id} i={i}>
                    <td>{product?.name}</td>
                    <td>
                      <i className={`${product?.icon} fa-lg`}></i>
                    </td>
                    <td>{shortenText(product?.description)}</td>
                    <td>{product?.price}</td>
                    <td>
                      <Link
                        to={`/admin/welcome-wiener/product/${product?._id}/edit`}
                        state={{ product, isEditMode: true }}
                      >
                        <OrangeEditPen className='fa-solid fa-pen'></OrangeEditPen>
                      </Link>
                    </td>
                    <td>
                      {loadingDelete && id === product?._id ? (
                        <Spinner size='sm' animation='border' style={{ color: 'red' }} />
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
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </>
      }
    />
  );
};

export default WelcomeWienerProductList;
