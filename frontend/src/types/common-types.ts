import { ComponentType, ReactNode } from 'react';

interface LayoutWithHeaderProps {
  header: ReactNode;
  children: ReactNode;
}

interface LayoutWithSidebarProps {
  sidebar: ReactNode;
  children: ReactNode | any;
}

type LazyModulePromise<T = {}> = Promise<{ default: ComponentType<T> }>;

interface ChildrenProps {
  children: ReactNode;
}

export type { LayoutWithHeaderProps, LayoutWithSidebarProps, LazyModulePromise, ChildrenProps };
