import React, { useEffect, useState } from 'react';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { createBlog, listBlogs } from '../../actions/blogActions';
import DeleteModal from '../../components/DeleteModal';
import { Text } from '../../components/styles/Styles';
import { BLOG_CREATE_RESET } from '../../constants/blogConstants';
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

const BlogList = () => {
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
    blogList: { loading, error, blogs },
    blogCreate: {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      blog,
    },
    blogDelete: {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch({ type: BLOG_CREATE_RESET });
    if (successCreate) {
      history.push(`/admin/blog/${blog?._id}/edit`);
    } else {
      dispatch(listBlogs());
    }
  }, [blog?._id, dispatch, history, successCreate, successDelete]);

  blogs?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt));

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(blogs?.slice(indexOfFirstItem, indexOfLastItem));
  }, [blogs, paginatedPage]);

  const createBlogHandler = () => {
    dispatch(createBlog());
  };

  const filteredBlogs =
    text !== ''
      ? blogs?.filter((blog: any) =>
          blog._id.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((blog: any) =>
          blog._id.toLowerCase().includes(text.toLowerCase())
        );

  return (
    <Container>
      <WelcomeText className='mb-1'>Blogs</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3=''
        step4='Blogs'
        url1='/'
        url2='/admin'
        url3='/admin/blogList'
      />
      {(error || errorCreate || errorDelete) && (
        <Message variant='danger'>
          {error || errorCreate || errorDelete}
        </Message>
      )}

      {(loading || loadingCreate || loadingDelete) && <HexagonLoader />}
      <DeleteModal
        actionFunc='Blog'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />
      <TableWrapper>
        <TopRow className='d-flex align-items-center'>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Category'
              value={text || ''}
              onChange={(e: any) => setText(e.target.value)}
            />
          </SearchBar>
          <CreateBtnV2 onClick={createBlogHandler}>
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
                <th>ID</th>
                <th>TITLE</th>
                <th>IMAGE</th>
                <th>ARTICLE</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </TableHead>
            <tbody>
              {filteredBlogs?.map((blog: any) => (
                <TableRow key={blog?._id}>
                  <td>
                    <Text>{blog?._id}</Text>
                  </td>
                  <td>
                    <Text>{blog?.title}</Text>
                  </td>
                  <td>
                    <TableImg src={blog?.image} alt={blog?.title} />
                  </td>
                  <td>
                    <Text>{blog?.article.substring(0, 200)}</Text>
                  </td>
                  <td>
                    <LinkContainer to={`/admin/blog/${blog?._id}/edit`}>
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
                        setId(blog?._id);
                        setPublicId(blog?.publicId);
                        handleShow();
                      }}
                    >
                      {loadingDelete && id === blog?._id ? (
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
              {rangeV2(blogs, paginatedPage, setPaginatedPage)}
            </Pagination>
          </PaginationContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default BlogList;
