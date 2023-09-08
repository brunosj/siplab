import { ReactNode } from "react";

export interface Button {
  path: string;
  children?: ReactNode;
  className?: string;
}

export interface Crumb {
  label: string;
  url: string;
}
export interface Props {
  children?: ReactNode;
  className?: string;
  crumbs?: Crumb[];
}

export interface MenuItem {
  name: string;
  path: string;
  lang: string;
  color: string;
}

export type MenuType = MenuItem[];
