import { Form } from 'react-bootstrap';

const FirstFiveFields = ({
  inputs,
  handleInput,
  doesProductHaveSizes,
  setDoesProductHaveSizes,
  setProductSizes,
}: any) => {
  return (
    <div>
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          name='name'
          type='text'
          value={inputs.name || ''}
          onChange={handleInput}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='price'>
        <Form.Label>Price</Form.Label>
        <Form.Control
          name='price'
          type='number'
          step='any'
          min='0'
          value={inputs.price || ''}
          onChange={handleInput}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='shippingPrice'>
        <Form.Label>Shipping Price</Form.Label>
        <Form.Control
          name='shippingPrice'
          type='number'
          value={inputs.shippingPrice || ''}
          onChange={handleInput}
        ></Form.Control>
      </Form.Group>
      {!doesProductHaveSizes && (
        <Form.Group controlId='countInStock'>
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            name='countInStock'
            disabled={doesProductHaveSizes}
            min={0}
            type='number'
            value={inputs.countInStock || 0}
            onChange={handleInput}
          ></Form.Control>
        </Form.Group>
      )}
      <Form.Group
        controlId='doesProductHaveSizes'
        className='d-flex align-items-center'
      >
        <Form.Check
          type='switch'
          checked={doesProductHaveSizes || false}
          onChange={(e: any) => {
            setDoesProductHaveSizes(e.target.checked);
            if (doesProductHaveSizes) {
              setProductSizes([]);
            }
          }}
        ></Form.Check>
        <Form.Label className='mb-0'>Does this product have sizes?</Form.Label>
      </Form.Group>
    </div>
  );
};

export default FirstFiveFields;
