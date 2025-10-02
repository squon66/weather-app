import { Controller, useFormContext } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
import { FormInputContainer } from "./WeatherForm";
import { TIME_OF_DAY } from "../../constants";

function TimeOfDaySelect() {
    const { control } = useFormContext();
    
    return (
        <FormInputContainer>
            <Controller
                name="timeOfDay"
                control={control}
                rules={{ required: 'Time of day is required' }}
                render={({ field }) => (
                    <Select
                        {...field}
                        value={field.value || ''}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select time of day</MenuItem>
                        <MenuItem value={TIME_OF_DAY.DAY}>Day</MenuItem>
                        <MenuItem value={TIME_OF_DAY.NIGHT}>Night</MenuItem>
                    </Select>
                )}
            />
          </FormInputContainer>
    )
}

export default TimeOfDaySelect;