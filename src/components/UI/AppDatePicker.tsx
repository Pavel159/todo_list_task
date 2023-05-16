import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { FC } from 'react';

interface IDatePickerProps {
  label: string;
  value?: string | null;
  onChange?: (newValue: any) => void;
}

const AppDatePicker: FC<IDatePickerProps> = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label={label} value={value} onChange={onChange} />
    </LocalizationProvider>
  );
};

export default AppDatePicker;
