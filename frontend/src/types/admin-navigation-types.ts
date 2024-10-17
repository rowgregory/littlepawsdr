interface AdminNavigationLinkProps {
    link: {
      active: boolean;
      linkKey: string | null;
      icon: string;
      textKey: string;
      isLogout?: boolean;
    };
  }

export type { AdminNavigationLinkProps };
