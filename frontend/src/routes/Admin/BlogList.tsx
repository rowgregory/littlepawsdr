import React, { useEffect, useState } from 'react';
import { Col, Form, Table, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { createBlog, listBlogs } from '../../actions/blogActions';
import DeleteModal from '../../components/DeleteModal';
import Message from '../../components/Message';
import { TableBody, Text, StyledEditBtn } from '../../components/styles/Styles';
import { BLOG_CREATE_RESET } from '../../constants/blogConstants';
import {
  CreateBtn,
  SearchBar,
  TableHead,
  TableImg,
  TableRow,
} from '../../components/styles/admin/Styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const BlogList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [publicId, setPublicId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [listOfBlogs, setListOfBlogs] = useState([]) as any;

  const blogList = useSelector((state: any) => state.blogList);
  const {
    // loading: loadingBlogs,
    error: errorBlogs,
    blogs,
  } = blogList;

  const blogCreate = useSelector((state: any) => state.blogCreate);
  const {
    loading: loadingBlogCreate,
    error: errorBlogCreate,
    success: successBlogCreate,
    blog,
  } = blogCreate;

  const blogDelete = useSelector((state: any) => state.blogDelete);
  const {
    loading: loadingBlogDelete,
    error: errorBlogDelete,
    success: successBlogDelete,
  } = blogDelete;

  useEffect(() => {
    if (blogs) {
      setListOfBlogs(blogs);
    }
  }, [blogs]);

  useEffect(() => {
    dispatch({ type: BLOG_CREATE_RESET });
    if (successBlogCreate) {
      history.push(`/admin/blog/${blog._id}/edit`);
    } else {
      dispatch(listBlogs());
    }
  }, [dispatch, history, successBlogCreate, successBlogDelete, blog]);

  const filteredBlogs = listOfBlogs?.filter((blog: any) =>
    blog._id.toLowerCase().includes(text.toLowerCase())
  );
  return (
    <>
      <DeleteModal
        actionFunc='Blog'
        show={show}
        handleClose={handleClose}
        id={id}
        publicId={publicId}
      />
      {(errorBlogDelete || errorBlogCreate) && (
        <Message variant='danger'>{errorBlogDelete || errorBlogCreate}</Message>
      )}
      <Col className='d-flex align-items-center justify-content-between'>
        <SearchBar>
          <Form.Control
            as='input'
            type='text'
            placeholder='Search by ID'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
          ></Form.Control>
        </SearchBar>
        <CreateBtn onClick={() => dispatch(createBlog())}>
          {loadingBlogCreate ? (
            <Spinner animation='border' size='sm' />
          ) : (
            <i className='fas fa-plus fa-2x'></i>
          )}
        </CreateBtn>
      </Col>

      {errorBlogs ? (
        <Message variant='danger'>{errorBlogs}</Message>
      ) : (
        <Col>
          <Table hover responsive className='table-md'>
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
            {blogs?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Click the plus to create a blog.</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : filteredBlogs?.length === 0 ? (
              <TableBody>
                <tr>
                  <td>Sorry, no match!</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </TableBody>
            ) : (
              <TransitionGroup component='tbody'>
                {filteredBlogs?.map((blog: any) => (
                  <CSSTransition
                    key={blog?._id}
                    timeout={500}
                    classNames='item'
                  >
                    <TableRow>
                      <td>
                        <Text>{blog._id}</Text>
                      </td>
                      <td>
                        <Text>{blog.title}</Text>
                      </td>
                      <td>
                        <TableImg src={blog?.image} alt={blog?.title} />
                      </td>
                      <td>
                        <Text>{blog.article.substring(0, 200)}</Text>
                      </td>
                      <td>
                        <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
                          <StyledEditBtn className='btn-lg'>
                            <i className='fas fa-edit'></i>
                          </StyledEditBtn>
                        </LinkContainer>
                      </td>
                      <td>
                        <Button
                          variant='danger'
                          className='btn-lg border-0'
                          onClick={() => {
                            setId(blog?._id);
                            setPublicId(blog?.publicId);
                            handleShow();
                          }}
                        >
                          {loadingBlogDelete && id === blog?._id ? (
                            <Spinner size='sm' animation='border' />
                          ) : (
                            <i className='fas fa-trash'></i>
                          )}
                        </Button>
                      </td>
                    </TableRow>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            )}
          </Table>
        </Col>
      )}
    </>
  );
};

export default BlogList;
