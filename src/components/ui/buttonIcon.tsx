import PublicationTag from './publicationTag';
import Link from 'next/link';

interface ButtonIconTypes {
  types: string[];
  type: string;
  url: string;
  label: string;
  icon: {};
  tagColor?: string;
}

interface IconTypes {
  label: string;
  icon: any;
}

const ButtonIcon = ({
  types,
  type,
  url,
  label,
  icon,
  tagColor,
}: ButtonIconTypes) => {
  const Icon = ({ label, icon: Icon }: IconTypes) => {
    return (
      <div className='flex items-center '>
        <Icon className='h-6 w-6 flex-shrink-0' />
        <div className='pl-2'>{label}</div>
      </div>
    );
  };

  return (
    <PublicationTag type={type} types={types} className='group mt-2 flex '>
      <Link
        href={url}
        rel='noopener noreferrer'
        target='_blank'
        className={tagColor}
      >
        <Icon icon={icon} label={label} />
      </Link>
    </PublicationTag>
  );
};

export default ButtonIcon;
