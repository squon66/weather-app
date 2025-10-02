import './WeatherGraphs.css';
import { Box } from '@mui/material';

function SingleBarChart({ max, min, value, label, unit = '', color = 'blue' }) {
    // Calculate the percentage position of the value between min and max
    const range = max - min;
    const valuePercentage = range > 0 ? ((value - min) / range) * 100 : 0;
    
    // Ensure percentage is between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, valuePercentage));
    
    return (
        <Box>
            {label && <BarTitle>{label}</BarTitle>}
            
            <Box>
                <BarTrack percentage={clampedPercentage} color={color} />
                <BarLabels min={min} max={max} value={value} unit={unit} />
            </Box>
        </Box>
    );
}

function TemperatureBarGraph({ temperature }) {
    return (
        <SingleBarChart 
            max={150}
            min={-50}
            value={temperature}
            label="Temperature"
            unit="°F"
        />
    );
}

function ChanceOfRainBarGraph({ probabilityOfPrecipitation }) {
    return (
        <SingleBarChart 
            max={100}
            min={0}
            value={probabilityOfPrecipitation}
            label="Chance of Rain"
            unit="%"
            color="red"
        />
    );
}

export default function WeatherGraphs({ temperature, probabilityOfPrecipitation }) {
    return (
        <Box className="weather-graphs">
            <Box sx={{ marginBottom: '20px' }}>
                <TemperatureBarGraph 
                    temperature={temperature}
                />
            </Box>
            <ChanceOfRainBarGraph 
                probabilityOfPrecipitation={probabilityOfPrecipitation}
            />
        </Box>
    );
}

function BarTitle({ children }) {
    return (
        <Box className="chart-label">
            {children}
        </Box>
    );
}

function BarTrack({ percentage, color }) {
    return (
        <Box className="bar-track">
            <BarFill percentage={percentage} color={color} />
        </Box>
    );
}

function BarFill({ percentage, color }) {
    return (
        <Box className="bar-fill" sx={{ width: `${percentage}%`, backgroundColor: color }} />
    );
}

function BarLabels({ min, max, value, unit }) {
    return (
        <Box className="bar-labels">
            <span>{min}{unit}</span>
            <span className="value-label">{value}{unit}</span>
            <span>{max}{unit}</span>
        </Box>
    );
}