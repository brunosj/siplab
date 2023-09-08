import PublicationTextColor from '../ui/publicationTextColor';
import { Tag } from '@/types/TagInterface';

interface PublicationDetails extends Tag {
  label: string;
  value: string;
}
const PublicationDetails = ({
  type,
  label,
  value,
  types,
}: PublicationDetails) => {
  return (
    <div className='mt-1 grid-cols-7 lg:grid'>
      <PublicationTextColor type={type} types={types} className='col-span-1'>
        {label}
      </PublicationTextColor>
      <p className='col-span-6'>{value}</p>
    </div>
  );
};
export default PublicationDetails;
