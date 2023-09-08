import { clsx } from 'clsx';
import { Tag } from 'src/types/TagInterface';

const PublicationTag = ({ types, type, className, children }: Tag) => {
  let tagColor = '';
  if (type === types[0]) {
    tagColor =
      'text-mblack-700 hover:text-mturquoise-700 hover:dark:text-mturquoise-500 border-mturquoise-700 dark:border-mturquoise-500 bg-mturquoise-500 hover:bg-transparent focus:bg-transparent  focus:text-mturquoise-700 dark:text-mblack-500 duration-300';
  } else if (type === types[1]) {
    tagColor =
      'text-mblack-700 border-mpurple-500 bg-mpurple-500 hover:bg-transparent focus:bg-transparent hover:text-mpurple-700 hover:dark:text-mpurple-500  focus:text-mpurple-700 dark:text-black-500  duration-300';
  } else if (type === types[2]) {
    tagColor =
      'text-mblack-700 border-mblue-500 bg-mblue-500 hover:bg-transparent hover:text-mblue-700 hover:dark:text-mblue-500  focus:bg-transparent focus:text-mblue-700  duration-300';
  } else {
    tagColor =
      'text-mblack-700 dark:border-mgray-500 border-mblack-500 bg-mgray-500 hover:bg-mblack-500 hover:dark:bg-transparent hover:dark:text-mgray-500 hover:text-mgray-500 text-mblack-500 focus:bg-transparent focus:dark:text-mgray-500 text-mblack-500 duration-300';
  }

  return (
    <div className={clsx('flex', className)}>
      <div className={clsx('rounded-xl border', tagColor, className)}>
        <div className='py-1 px-2 text-xs lg:px-4 lg:text-sm'>{children}</div>
      </div>
    </div>
  );
};

export default PublicationTag;
