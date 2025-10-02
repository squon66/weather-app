import { InputLabel, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { styled } from '@mui/material/styles';

const VALIDATION_PATTERN = /^-?\d+(\.\d{1,4})?$/;

export const ErrorMessage = styled('div')(({ theme, large }) => ({
  color: theme.palette.error.main,
  fontSize: large ? null : '0.875rem',
}));

const DecimalInputContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '16px',
}));

export function LatitudeInput() {
  const validation = {
    required: "Latitude is required",
    min: { value: -90, message: "Latitude must be at least -90" },
    max: { value: 90, message: "Latitude must be at most 90" }
  };

  return (
    <DecimalInput name="latitude" label="Latitude:" validation={validation} />
  )
}

export function LongitudeInput() {
  const validation = {
    required: "Longitude is required",
    min: { value: -180, message: "Longitude must be at least -180" },
    max: { value: 180, message: "Longitude must be at most 180" },
  };

  return (
    <DecimalInput name="longitude" label="Longitude:" validation={validation}/>
  )
}

function DecimalInput({ name, validation, label }) {
    const { register, formState: { errors }  } = useFormContext();
    const errorMessage = errors?.[name]?.message;
    const error = !!errorMessage;
    const errorId = error ? `${name}-error` : undefined;

    const finalValidation = {
      ...validation,
      pattern: { value: VALIDATION_PATTERN, message: "Please enter a valid decimal number with up to 4 decimal places" },
    };
    
  return (
    <>
        <DecimalInputContainer>
            <InputLabel 
                htmlFor={name}
                sx={{ fontWeight: 600 }}
            >
                {label}
            </InputLabel>
            <TextField 
                {...register(name, finalValidation)} 
                id={name}
                size="small"
                error={!!error}
                aria-describedby={errorId}
                aria-invalid={!!error}
            />
      </DecimalInputContainer>
      {error && (
            <ErrorMessage 
                id={errorId}
                role="alert"
                aria-live="polite"
            >
                {errorMessage}
            </ErrorMessage>
        )}
    </>
  )
}