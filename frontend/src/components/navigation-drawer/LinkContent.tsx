import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LinkContentProps } from '../../types/navigation-drawer-types';
import navigationDrawerLinks from '../../utils/navigation-utils/navigationDrawerLinks';
import NavigationDrawerAccordion from './NavigationDrawerAccordion';
import NavigationLinkBtn from './NavigationLinkBtn';
import { useSelector } from 'react-redux';
import { useGetCustomCampaignLinkQuery } from '../../redux/services/campaignApi';

const LinkContent: FC<LinkContentProps> = ({ closeMenu }) => {
  const { pathname } = useLocation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { campaignStatus, customCampaignLink } = useSelector((state: any) => state.campaign);
  useGetCustomCampaignLinkQuery();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const campaignLinkKey =
    campaignStatus === 'Active Campaign' && customCampaignLink
      ? `/campaigns/${customCampaignLink}/auction`
      : '/campaigns';

  return (
    <div className='list-none w-full overflow-y-scroll flex flex-col no-scrollbar gap-y-2.5'>
      {navigationDrawerLinks(campaignLinkKey).map((item, index) => {
        if (item?.links) {
          return (
            <NavigationDrawerAccordion
              key={index}
              item={item}
              isOpen={openIndex === index}
              toggleAccordion={() => toggleAccordion(index)}
              closeMenu={closeMenu}
            />
          );
        } else {
          return (
            <NavigationLinkBtn
              key={index}
              closeMenu={closeMenu}
              item={item}
              isActive={pathname === item?.link}
              setOpenIndex={setOpenIndex}
              campaignLinkKey={campaignLinkKey}
            />
          );
        }
      })}
    </div>
  );
};

export default LinkContent;
