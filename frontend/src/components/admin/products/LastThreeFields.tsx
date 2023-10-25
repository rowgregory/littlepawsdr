import { Form } from 'react-bootstrap';
import { categories } from '../../../utils/shopCategories';

const LastThreeFields = ({ inputs, handleInput }: any) => {
  return (
    <>
      <Form.Group controlId='brand'>
        <Form.Label>Brand</Form.Label>
        <Form.Control
          name='brand'
          type='text'
          value={inputs.brand || ''}
          onChange={handleInput}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='category'>
        <Form.Label>Category</Form.Label>
        <Form.Control
          name='category'
          as='select'
          value={inputs.category || ''}
          onChange={handleInput}
        >
          {categories().map((category: any, i: number) => (
            <option key={i}>{category}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId='description'>
        <Form.Label>Enter description separated by a pipe ( | )</Form.Label>
        <Form.Control
          name='description'
          as='textarea'
          rows={6}
          placeholder='i.e. Comfortable|Stylish|Attractive'
          value={inputs.description || ''}
          onChange={handleInput}
        ></Form.Control>
      </Form.Group>
    </>
  );
};

export default LastThreeFields;
