import Typography from '@mui/material/Typography';

export default function Footer() {
 return (
   <footer className="footer">
      <Typography variant="subtitle2" gutterBottom>
          Ngô Thị Kim Duyên
          2025 - {new Date().getFullYear()}
      </Typography>
   </footer>
 );
}
