import React, { useEffect, useState } from 'react';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  createEducationTip,
  listEducationTips,
} from '../../actions/educationTipActions';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import { EDUCATION_TIP_CREATE_RESET } from '../../constants/educationTipConstants';
import { useHistory } from 'react-router-dom';
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
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { rangeV2 } from '../../components/common/Pagination';
import { AddIcon } from '../../components/svg/AddIcon';

const RaffleWinnerList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [publicId, setPublicId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const {
    educationTipList: { loading, error, educationTips },
    educationTipCreate: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      educationTip,
    },
    educationTipDelete: {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: EDUCATION_TIP_CREATE_RESET });

    if (successCreate) {
      history.push(`/admin/education-tip/${educationTip?._id}/edit`);
    } else {
      dispatch(listEducationTips());
    }
  }, [dispatch, history, successCreate, educationTip, successDelete]);

  educationTips?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(educationTips?.slice(indexOfFirstItem, indexOfLastItem));
  }, [educationTips, paginatedPage]);

  const createEducationTipHandler = () => {
    dispatch(createEducationTip());
  };

  const filteredEducationTips =
    text !== ''
      ? educationTips?.filter((tip: any) =>
          tip?.title.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((tip: any) =>
          tip?.title.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Eduaction Tips</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Education Tips'
        url1='/'
        url2='/admin'
        url3=''
      />
      <DeleteModal
        actionFunc='Education Tip'
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
      {(loading || loadingCreate || loadingDelete) && <HexagonLoader />}
      <TableWrapper>
        <TopRow className='d-flex align-items-center'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Title'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          <CreateBtnV2 onClick={createEducationTipHandler}>
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
                <th>TITLE</th>
                <th>IMAGE</th>
                <th>LINK</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredEducationTips?.map((tip: any) => (
                <TableRow key={tip._id}>
                  <td>
                    <Text>{tip?.title}</Text>
                  </td>
                  <td>
                    <TableImg src={tip?.image} alt={tip?.title} />
                  </td>
                  <td>
                    <Text
                      style={{ cursor: 'pointer' }}
                      onClick={() => window.open(tip?.externalLink, '_target')}
                    >
                      {tip?.externalLink}
                    </Text>
                  </td>
                  <td>
                    <LinkContainer to={`/admin/education-tip/${tip?._id}/edit`}>
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
                        setId(tip?._id);
                        setPublicId(tip?.publicId);
                        handleShow();
                      }}
                    >
                      {loadingDelete && id === tip._id ? (
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
              {rangeV2(educationTips, paginatedPage, setPaginatedPage)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default RaffleWinnerList;
