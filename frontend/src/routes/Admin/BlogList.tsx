import React, { useEffect, useState } from 'react';
import { Table, Spinner, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listBlogs } from '../../actions/blogActions';
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
import Message from '../../components/Message';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import BreadCrumb from '../../components/common/BreadCrumb';
import { rangeV2 } from '../../components/common/Pagination';
import { AddIcon } from '../../components/svg/AddIcon';
import { defaultImages } from '../../utils/defaultImages';

const BlogList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [paginatedPage, setPaginatedPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState<{}[]>([]) as any;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const state = useSelector((state: any) => state);

  const loading = state.blogList.loading;
  const error = state.blogList.error;
  const blogs = state.blogList.blogs;

  const loadingDelete = state.blogDelete.loading;
  const errorDelete = state.blogDelete.error;
  const successDelete = state.blogDelete.success;

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch, successDelete]);

  blogs?.sort((a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt));

  useEffect(() => {
    const itemsPerPage = 10;
    const indexOfLastItem = paginatedPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setPaginatedItems(blogs?.slice(indexOfFirstItem, indexOfLastItem));
  }, [blogs, paginatedPage]);

  const filteredBlogs =
    text !== ''
      ? blogs?.filter((blog: any) =>
          blog._id.toLowerCase().includes(text.toLowerCase())
        )
      : paginatedItems?.filter((blog: any) =>
          blog._id.toLowerCase().includes(text.toLowerCase())
        );

  const blog = {
    title: '',
    article: '',
    image: defaultImages.upload,
  };

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
      {(error || errorDelete) && (
        <Message variant='danger'>{error || errorDelete}</Message>
      )}
      <DeleteModal
        actionFunc='Blog'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={imagePath}
      />
      <TableWrapper>
        <TopRow>
          <SearchBar>
            <SearchInput
              as='input'
              type='text'
              placeholder='Search by Category'
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
                pathname: '/admin/blog/id/edit',
                state: { blog },
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
                    <LinkContainer
                      to={{
                        pathname: `/admin/blog/${blog?._id}/edit`,
                        state: { blog, isEditMode: true },
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
                        setId(blog?._id);
                        setImagePath(blog?.image);
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
