interface LinkContentProps {
  closeMenu: () => void;
}

interface LinkItem {
  linkKey: string;
  linkText: string;
}

interface AccordionItem {
  title: string;
  icon: string;
  links?: LinkItem[];
}

interface AccordionProps {
  items: AccordionItem[];
  openIndex: string | null;
  setOpenIndex: any;
  groupIndex: number;
}

interface NavigationLinkProps {
  close: any;
  linkKey: string;
  textKey: string;
  active: boolean;
}
interface NavigationLinkBtnProps {
  closeMenu: () => void;
  item: any;
  isActive: boolean;
}

interface NavigationDrawerAccordionProps {
  item: { title: string; icon: string; links: { linkKey: string; linkText: string }[] };
  isOpen: boolean;
  toggleAccordion: () => void;
  closeMenu: () => void;
}

export type { LinkContentProps, AccordionProps, NavigationLinkProps, NavigationLinkBtnProps, NavigationDrawerAccordionProps };
