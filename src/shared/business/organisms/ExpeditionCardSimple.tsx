import { ExpeditionCardBase } from './ExpeditionCardBase';
import { ExpeditionStatusResponseDTO } from '@/models/expeditions';

type Props = {
  expedition: ExpeditionStatusResponseDTO | null;
};

export const ExpeditionCardSimple = ({ expedition }: Props) => {
  return (
    <ExpeditionCardBase 
      expedition={expedition}
    />
  );
}; 