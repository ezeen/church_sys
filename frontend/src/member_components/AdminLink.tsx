import { Link, Typography } from '@mui/material';

const AdminLink = () => {
    return (
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            <Link href="/stafflogin" variant="body2">
                Admin Login
            </Link>
        </Typography>
    );
};

export default AdminLink;