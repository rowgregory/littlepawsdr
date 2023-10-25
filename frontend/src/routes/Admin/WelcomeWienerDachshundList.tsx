import { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import { Flex, Text } from '../../components/styles/Styles';
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
  CreateBtnV2,
  TableImg,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import Message from '../../components/Message';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import {
  listWelcomeWienerDachshunds,
  toggleWelcomeDachshund,
} from '../../actions/welcomeWienerDachshundActions';
import shortenText from '../../utils/shortenText';

const WelcomeWienerDachshundList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);

  let loadingLiveMode = state.welcomeWienerDachshundToggle.loading;
  let dachshundList = state.welcomeWienerDachshundList.dachshundList;
  let error = state.welcomeWienerDachshundList.error;
  let loadingDelete = state.welcomeWienerDachshundDelete.loadingDelete;
  let errorDelete = state.welcomeWienerDachshundDelete.errorDelete;

  useEffect(() => {
    dispatch(listWelcomeWienerDachshunds());
  }, [dispatch, loadingLiveMode]);

  dachshundList?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  const filteredWelcomeWienerDachshunds = dachshundList?.filter(
    (dachshund: any) =>
      dachshund?.name?.toLowerCase().includes(text.toLowerCase())
  );

  const welcomeWienerDachshund = {
    displayUrl: defaultImages.upload,
    name: '',
    bio: '',
    age: '',
    associatedProducts: [],
  };

  return (
    <Container>
      <WelcomeText>Welcome Wiener Dachshunds</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Welcome Wiener Dachshunds'
        url1='/'
        url2='/admin'
        url3='/admin/welcome-wiener/dachshund/list'
      />
      <DeleteModal
        actionFunc='Welcome Wiener Dachshund'
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

          <LinkContainer
            to={{
              pathname: '/admin/welcome-wiener/dachshund/create',
              state: { welcomeWienerDachshund },
            }}
          >
            <CreateBtnV2>
              <AddIcon />
              Create
            </CreateBtnV2>
          </LinkContainer>
        </TopRow>
        <TableAndPaginationContainer>
          <Table hover responsive>
            <TableHead>
              <tr>
                <th>NAME</th>
                <th>IS LIVE</th>
                <th>IMAGE</th>
                <th>BIO</th>
                <th>AGE</th>
                <th>ASSOCIATED PRODUCTS</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredWelcomeWienerDachshunds?.map((dachshund: any) => (
                <TableRow key={dachshund?._id}>
                  <td>
                    <Text>{dachshund?.name}</Text>
                  </td>
                  <td style={{ width: '75px' }}>
                    <Text
                      onClick={() => {
                        dispatch(
                          toggleWelcomeDachshund(
                            dachshund?.isLive,
                            dachshund?._id
                          )
                        );
                        setId(dachshund?._id);
                      }}
                      style={{
                        color: dachshund?.isLive ? '#00a40e' : '#c6c6c6',
                        fontWeight: dachshund?.isLive ? 600 : '',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {loadingLiveMode && dachshund?._id === id ? (
                        <Spinner animation='border' size='sm' />
                      ) : dachshund?.isLive ? (
                        'LIVE'
                      ) : (
                        'OFFLINE'
                      )}
                    </Text>
                  </td>
                  <td>
                    <TableImg
                      src={dachshund?.displayUrl ?? defaultImages.upload}
                      alt={dachshund?.name}
                    />
                  </td>
                  <td>
                    <Text>{shortenText(dachshund?.bio)}</Text>
                  </td>
                  <td>
                    <Text>{dachshund?.age}</Text>
                  </td>
                  <td>
                    <Flex flexDirection='column'>
                      <ol className='mb-0'>
                        {dachshund?.associatedProducts?.map(
                          (obj: any, i: number) => (
                            <li
                              key={i}
                              style={{
                                fontSize: '13px',
                                fontFamily: 'Roboto',
                                fontWeight: 300,
                              }}
                            >
                              <Text>{obj?.name}</Text>
                            </li>
                          )
                        )}
                      </ol>
                    </Flex>
                  </td>
                  <td>
                    <LinkContainer
                      to={{
                        pathname: `/admin/welcome-wiener/dachshund/${dachshund?._id}/edit`,
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
                        setId(dachshund?._id);

                        handleShow();
                      }}
                    >
                      {loadingDelete && id === dachshund?._id ? (
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

export default WelcomeWienerDachshundList;
