import React from 'react';
import { Modal } from 'react-bootstrap';
import {
  Body,
  Content,
  Footer,
  Header,
  LeftBtn,
  Title,
} from '../../components/ContinueSessionModal';
import { categories } from '../../utils/shopCategories';
import {
  Category,
  CategoryContainer,
  ClearFilter,
} from '../styles/shop/Styles';

const ShopFilterModal = ({
  show,
  close,
  currentCategory,
  setCurrentCategory,
}: any) => {
  return (
    <Modal show={show} onHide={close} centered>
      <Content>
        <Header closeButton>
          <Title>Choose a filter below</Title>
        </Header>
        <Body>
          <CategoryContainer className='d-flex flex-column'>
            {categories().map((category: string, i: number) => (
              <Category
                active={category === currentCategory}
                key={i}
                onClick={() => {
                  close();
                  setCurrentCategory(category);
                }}
              >
                {category}
              </Category>
            ))}
          </CategoryContainer>
          <ClearFilter onClick={() => setCurrentCategory('')}>
            Clear filter
          </ClearFilter>
        </Body>
        <Footer>
          <LeftBtn onClick={close}>Close</LeftBtn>
        </Footer>
      </Content>
    </Modal>
  );
};

export default ShopFilterModal;
