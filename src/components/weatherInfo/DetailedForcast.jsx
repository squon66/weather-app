import { Box } from "@mui/material";

function DetailedForcast({ detailedForcast }) {
    return (
        <Box sx={{ mb: 2 }}>
            <div style={{ fontWeight: 'bold' }}>Detailed Forcast</div>
            <div>{detailedForcast}</div>
        </Box>
    );
}

export default DetailedForcast;