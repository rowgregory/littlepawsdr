import { ComponentType, ReactNode } from 'react';

interface LayoutWithHeaderProps {
  header: ReactNode;
  children: ReactNode;
}

interface LayoutWithSidebarProps {
  sidebar: ReactNode;
  children: ReactNode;
}

type LazyModulePromise<T = {}> = Promise<{ default: ComponentType<T> }>;

export type { LayoutWithHeaderProps, LayoutWithSidebarProps, LazyModulePromise };
