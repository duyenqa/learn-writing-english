import Typography from '@mui/material/Typography';

export default function Footer() {
 return (
   <footer className="footer">
    <div className="shapeFooter">
      <Typography variant="subtitle2" gutterBottom>
          2025 - {new Date().getFullYear()}
      </Typography>
    </div>
   </footer>
 );
}
