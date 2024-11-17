import { FC, MouseEventHandler } from 'react';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AwesomeIconProps {
  icon: IconDefinition;
  className: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const AwesomeIcon: FC<AwesomeIconProps> = ({ icon, className, onClick }) => {
  return <FontAwesomeIcon onClick={onClick} icon={icon} className={className} />;
};

export default AwesomeIcon;
