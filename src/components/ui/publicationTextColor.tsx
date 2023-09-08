import { clsx } from 'clsx';
import { Props } from 'src/types/PropsInterface';

interface PublicationTextColor extends Props {
  types: string[];
  type: string;
}

const PublicationTextColor = ({
  types,
  type,
  className,
  children,
}: PublicationTextColor) => {
  let textColor = '';
  if (type === types[0]) {
    textColor =
      'text-mturquoise-700 dark:text-mturquoise-500 accent-mturquoise-500';
  } else if (type === types[1]) {
    textColor = 'text-mpurple-700 dark:text-mpurple-500 accent-mpurple-500';
  } else if (type === types[2]) {
    textColor = 'text-mblue-700 dark:text-mblue-500 accent-mblue-500';
  } else {
    textColor = 'text-morange-700 dark:text-morange-500 accent-mgray-500';
  }

  return <div className={clsx(textColor, className)}>{children}</div>;
};

export default PublicationTextColor;
