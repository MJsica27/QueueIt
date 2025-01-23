import { Typography } from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import { useEffect, useState } from "react";
import { BASE_URL } from "../../Global_vars/Urls";
import CircularProgress from '@mui/material/CircularProgress';

export default function AdviserClassroomCardButton({ classID }) {
    const [headCount, setHeadCount] = useState(undefined);

    useEffect(() => {
        const fetchHeadCount = async () => {
            try {
                const response = await fetch(`${BASE_URL}/classroom/getStudentHeadCount?classID=${classID}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched headcount:', data);
                    setHeadCount(data);
                } else {
                    console.error('Failed to fetch head count: ', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching head count:', error);
            }
        };

        fetchHeadCount(); // Call the async function

    }, [classID]); // Dependency array to run effect when classID changes

    return (
        <div style={{ display: 'flex', flex: 1, zIndex: 1 }}>
            <div className="d-flex align-items-center" style={{ marginTop: 'auto' }}>
                <GroupIcon fontSize="large" />
                <Typography style={{ marginLeft: '5px', color: '#333' }}>
                    {headCount !== undefined ? headCount : <CircularProgress/>} {headCount < 2? <>Enrollee</>:<>Enrollees</>}
                </Typography>
            </div>
        </div>
    );
}