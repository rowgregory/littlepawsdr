import { useLocation } from 'react-router-dom';
import { Menu, SingleLink } from '../styles/left-navigation/styles';
import { Flex } from '../styles/Styles';
import { singleLinkData } from '../../utils/leftNavigation';
import AccordionLinks from './AccordionLinks';
import { FC } from 'react';

type LinkContentProps = {
  closeMenu: () => void;
  error: any;
  campaignLinkKey: string;
};

const LinkContent: FC<LinkContentProps> = ({ closeMenu, error, campaignLinkKey }) => {
  const { pathname } = useLocation();

  return (
    <Menu>
      <SingleLink to='/' onClick={() => closeMenu()} highlight={(pathname === '/').toString()}>
        <i className='fas fa-home mr-2'></i>
        Home
      </SingleLink>
      <AccordionLinks closeMenu={closeMenu} pathname={pathname} />
      <div className='w-100' style={{ paddingInline: '22px' }}>
        <hr className='my-5' style={{ background: '#556a7f' }} />
      </div>
      <div className='mb-4'>
        {singleLinkData.map((link: any, i: number) => (
          <SingleLink
            key={i}
            to={link.linkText === 'Campaigns' ? campaignLinkKey : link.linkKey}
            onClick={() => closeMenu()}
            highlight={(pathname === link.linkKey).toString()}
          >
            <i className={link.icon}></i>
            {link.linkText}
          </SingleLink>
        ))}
      </div>
      {error && (
        <Flex alignItems='center' justifyContent='center' color='#FF6B6B' marginTop='32px'>
          Error loading search bar data
          <i className='fas fa-refresh ml-1'></i>
        </Flex>
      )}
    </Menu>
  );
};

export default LinkContent;
