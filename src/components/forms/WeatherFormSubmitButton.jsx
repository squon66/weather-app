import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

function WeatherFormSubmitButton({ loading = false }) {
    const { formState: { isValid } } = useFormContext();
    
    return (
        <div>
            <Button 
                variant="contained" 
                type="submit" 
                disabled={!isValid || loading}
            >
                Get Weather
            </Button>
        </div>
    )
}

export default WeatherFormSubmitButton;