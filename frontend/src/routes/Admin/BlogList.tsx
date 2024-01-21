import { useEffect, useState } from 'react';
import { Table, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listBlogs } from '../../actions/blogActions';
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
import { NavLink } from 'react-router-dom';
import { BLOG_LIST_RESET } from '../../constants/blogConstants';
import DashboardLayout2024 from '../../components/dashboard/dashboard2024/layouts/DashboardLayout2024';

const BlogList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [imagePath, setImagePath] = useState('');

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
    return () => {
      dispatch({ type: BLOG_LIST_RESET });
    };
  }, [dispatch, successDelete]);

  const filteredBlogs = blogs?.filter((blog: any) => blog.title.toLowerCase().includes(text.toLowerCase()));

  const blog = {
    title: '',
    article: '',
    image: defaultImages.upload,
  };

  return (
    <DashboardLayout2024
      error={error || errorDelete}
      box1='Blogs'
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
          <CreateLink to={'/admin/blog/id/edit'} state={{ blog }}>
            <AddIcon loading={loading} />
            Create
          </CreateLink>
        )
      }
      box4={
        <>
          <DeleteModal actionFunc='Blog' show={show} handleClose={handleClose} id={id} publicId={imagePath} />
          <TableContainer>
            <Table hover responsive size='sm'>
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>IMAGE</th>
                  <th>ARTICLE</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs?.map((blog: any, i: number) => (
                  <Row key={blog?._id} i={i}>
                    <td>{blog?.title}</td>
                    <td>
                      <Image src={blog?.image ?? defaultImages.upload} alt={blog?.title} />
                    </td>
                    <td>{blog?.article.substring(0, 200)}</td>
                    <td>
                      <NavLink to={`/admin/blog/${blog?._id}/edit`} state={{ blog, isEditMode: true }}>
                        <OrangeEditPen className='fa-solid fa-pen'></OrangeEditPen>
                      </NavLink>
                    </td>
                    <td>
                      {loadingDelete && id === blog?._id ? (
                        <Spinner size='sm' animation='border' />
                      ) : (
                        <RedDeleteTrash
                          onClick={() => {
                            setId(blog?._id);
                            setImagePath(blog?.image);
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

export default BlogList;
