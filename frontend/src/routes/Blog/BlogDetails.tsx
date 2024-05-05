import { Row, Col } from 'react-bootstrap';
import { Text } from '../../components/styles/Styles';
import LeftArrow from '../../components/svg/LeftArrow';
import { useParams } from 'react-router-dom';
import { useGetBlogQuery } from '../../redux/services/blogApi';

const BlogDetails = () => {
  const { id } = useParams();
  const { data } = useGetBlogQuery(id)

  return (
    <>
      <div className='mb-3 bg-slate-100 mt-20'>
        <div className='relative mx-auto'

        >
          <img className='h-96 object-contain w-full'
            src={data?.blog?.image}
            alt='LPDR - blog'
          />
        </div>
      </div>
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        <LeftArrow text='Back to blogs' url='/about/blog' />
        <Row className='mt-5'>
          <Col md={2}>
            <img
              className='mb-3 w-32 rounded-full object-cover aspect-square'
              src={data?.blog?.user?.avatar}
              alt='blog-author'

            />
          </Col>
          <Col
            xl={8}
            lg={9}
            md={8}
            sm={12}
            className='d-flex align-items-center'
          >
            <Text fontSize='24px' fontWeight='400'>
              {data?.blog?.title}
            </Text>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col md={2}>
            <Text fontSize='14px' fontWeight={400} marginBottom='16px'>
              {data?.blog?.user?.name}
            </Text>
          </Col>
          <Col xl={8} lg={9} md={8} sm={12}>
            <Text style={{ whiteSpace: 'pre-line' }}>{data?.blog?.article}</Text>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </>
  );
};

export default BlogDetails;
