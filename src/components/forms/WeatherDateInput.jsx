import { Controller, useFormContext } from "react-hook-form";
import { FormInputContainer } from "./WeatherForm";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function WeatherDateInput() {
    const { control } = useFormContext();
    const today = dayjs();
    const nextFiveDays = today.add(5, 'day');

    return (
        <FormInputContainer>
          <Controller
              name="selectedDate"
              control={control}
              rules={{ required: 'Date is required' }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date ? date.toDate() : null)}
                    minDate={today}
                    maxDate={nextFiveDays}
                    slotProps={{
                      textField: {
                        readOnly: true,
                      }
                    }}
                  />
                </LocalizationProvider>
            )}
          />
        </FormInputContainer>
        
    )
}

export default WeatherDateInput;