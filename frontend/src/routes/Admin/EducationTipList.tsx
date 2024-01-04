import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listEducationTips } from '../../actions/educationTipActions';
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
  TableImg,
  CreateLink,
} from '../../components/styles/admin/Styles';
import Message from '../../components/Message';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { Link } from 'react-router-dom';
import { EDUCATION_TIP_LIST_RESET } from '../../constants/educationTipConstants';

const EducationTipList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [imagePath, setImagePath] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);
  const loading = state.educationTipList.loading;
  const error = state.educationTipList.error;
  const educationTips = state.educationTipList.educationTips;
  const loadingDelete = state.educationTipDelete.loading;
  const errorDelete = state.educationTipDelete.error;
  const successDelete = state.educationTipDelete.success;

  useEffect(() => {
    dispatch(listEducationTips());
    return () => {
      dispatch({ type: EDUCATION_TIP_LIST_RESET });
    };
  }, [dispatch, successDelete]);

  educationTips?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  const filteredEducationTips = educationTips?.filter((tip: any) =>
    tip?.title.toLowerCase().includes(text.toLowerCase())
  );

  const eTip = {
    title: '',
    externalLink: '',
    image: defaultImages.upload,
  };

  return (
    <Container>
      <WelcomeText>Eduaction Tips</WelcomeText>
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
        publicId={imagePath}
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
              placeholder='Search by Title'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          <CreateLink to='/admin/education-tip/id/edit' state={{ eTip }}>
            <AddIcon loading={loading} />
            Create
          </CreateLink>
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
                    <TableImg
                      src={tip?.image ?? defaultImages.upload}
                      alt={tip?.title}
                    />
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
                    <Link
                      to={`/admin/education-tip/${tip?._id}/edit`}
                      state={{ eTip: tip, isEditMode: true }}
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
                      onClick={() => {
                        setId(tip?._id);
                        setImagePath(tip?.image);
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
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default EducationTipList;
