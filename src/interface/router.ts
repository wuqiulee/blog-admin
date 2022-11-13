import React from 'react';

export interface Router {
  name?: string;
  path: string;
  children?: Router[];
  element: React.ReactNode;
  icon?: React.ReactNode;
}
