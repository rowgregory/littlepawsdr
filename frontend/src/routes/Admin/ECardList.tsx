import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from '../../components/DeleteModal';
import { listECards } from '../../actions/eCardActions';
import { Text } from '../../components/styles/Styles';
import { SearchInput, CreateLink, OrangeEditPen, RedDeleteTrash } from '../../components/styles/admin/Styles';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';
import { Link } from 'react-router-dom';
import { ECARD_LIST_RESET } from '../../constants/eCardConstants';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const EcardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 24px;
`;
const GridItem = styled.div<{ bg: string }>`
  background-image: ${({ bg }) => `url(${bg})`};

  position: relative;
  background-size: cover;
  background-position: center;
  height: 300px;

  span {
    padding: 24px;
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;

    a {
      cursor: pointer;
      z-index: 1;
    }
    i {
      cursor: pointer;
      z-index: 1;
    }
    section {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    h6 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      color: #fff;
      font-family: Rust;
      font-size: 20px;
      background: linear-gradient(90deg, rgba(102, 211, 72, 1) 0%, rgba(235, 216, 43, 1) 100%);
    }
  }
`;

const ECardList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);

  const loading = state.ecardList.loading;
  const error = state.ecardList.error;
  const ecards = state.ecardList.ecards;

  const successDelete = state.ecardDelete.success;
  const errorDelete = state.ecardDelete.error;
  const loadingDelete = state.ecardDelete.loading;

  useEffect(() => {
    dispatch(listECards());
    return () => {
      dispatch({ type: ECARD_LIST_RESET });
    };
  }, [dispatch, successDelete]);

  ecards?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt));

  let filteredECards = ecards?.filter((eCard: any) =>
    eCard?.category?.toLowerCase().includes(text.toLowerCase())
  );

  const eCard = {
    name: '',
    category: 'Anniversary',
    price: 20,
    image: defaultImages.upload,
  };

  return (
    <>
      <GreenRotatingTransparentCircle loading={loading} />
      <DashboardLayout2024
        error={error || errorDelete}
        box1='Ecards'
        box2={
          <SearchInput
            as='input'
            type='text'
            placeholder='Search by Category'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
          />
        }
        box3={
          error || errorDelete ? (
            <Text fontFamily='Rust' fontSize='20px'>
              {error || errorDelete}
            </Text>
          ) : (
            <CreateLink to='/admin/eCard/id/edit' state={{ eCard }}>
              <AddIcon loading={loading} />
              Create
            </CreateLink>
          )
        }
        box4={
          <>
            <DeleteModal actionFunc='ECard' show={show} handleClose={handleClose} id={id} publicId='' />
            <EcardContainer>
              {filteredECards?.map((ecard: any, i: number) => {
                return (
                  <GridItem key={i} bg={ecard?.image}>
                    <span>
                      <h6>${ecard?.price}</h6>
                      <section>
                        <Link
                          to={`/admin/eCard/${ecard._id}/edit`}
                          state={{ eCard: ecard, isEditMode: true }}
                        >
                          <OrangeEditPen
                            className='d-flex justify-content-center align-items-center fa-solid fa-pen fa-lg'
                            style={{
                              background: '#3498db',
                              height: '40px',
                              width: '40px',
                              borderRadius: '50%',
                            }}
                          ></OrangeEditPen>
                        </Link>
                        {loadingDelete && id === ecard?._id ? (
                          <Spinner size='sm' animation='border' />
                        ) : (
                          <RedDeleteTrash
                            onClick={() => {
                              setId(ecard._id);
                              handleShow();
                            }}
                            className='d-flex justify-content-center align-items-center fas fa-trash fa-lg'
                            style={{
                              background: '#66b2ff',
                              height: '40px',
                              width: '40px',
                              borderRadius: '50%',
                            }}
                          ></RedDeleteTrash>
                        )}
                      </section>
                    </span>
                  </GridItem>
                );
              })}
            </EcardContainer>
          </>
        }
      />
    </>
  );
};

export default ECardList;
