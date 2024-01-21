import { useEffect, useState } from 'react';
import { Table, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listEducationTips } from '../../actions/educationTipActions';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import {
  SearchInput,
  CreateLink,
  TableContainer,
  Row,
  OrangeEditPen,
  RedDeleteTrash,
} from '../../components/styles/admin/Styles';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { Link } from 'react-router-dom';
import { EDUCATION_TIP_LIST_RESET } from '../../constants/educationTipConstants';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';

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

  const filteredEducationTips = educationTips?.filter((tip: any) =>
    tip?.title.toLowerCase().includes(text.toLowerCase())
  );

  const eTip = {
    title: '',
    externalLink: '',
    image: defaultImages.upload,
  };

  return (
    <DashboardLayout2024
      error={error || errorDelete}
      box1='Education Tips'
      box2={
        <SearchInput
          as='input'
          type='text'
          placeholder='Search by Title'
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
          <CreateLink to='/admin/education-tip/id/edit' state={{ eTip }}>
            <AddIcon loading={loading} />
            Create
          </CreateLink>
        )
      }
      box4={
        <>
          <DeleteModal
            actionFunc='Education Tip'
            show={show}
            handleClose={handleClose}
            id={id}
            publicId={imagePath}
          />
          <TableContainer>
            <Table hover responsive size='sm'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Link</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredEducationTips?.map((tip: any, i: number) => (
                  <Row key={tip._id} i={i}>
                    <td>{tip?.title}</td>
                    <td>
                      <Image src={tip?.image ?? defaultImages.upload} alt={tip?.title} />
                    </td>
                    <td
                      style={{ cursor: 'pointer' }}
                      onClick={() => window.open(tip?.externalLink, '_target')}
                    >
                      {tip?.externalLink}
                    </td>
                    <td>
                      <Link
                        to={`/admin/education-tip/${tip?._id}/edit`}
                        state={{ eTip: tip, isEditMode: true }}
                      >
                        <OrangeEditPen className='fa-solid fa-pen'></OrangeEditPen>
                      </Link>
                    </td>
                    <td>
                      {loadingDelete && id === tip._id ? (
                        <Spinner size='sm' animation='border' />
                      ) : (
                        <RedDeleteTrash
                          onClick={() => {
                            setId(tip?._id);
                            setImagePath(tip?.image);
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

export default EducationTipList;
