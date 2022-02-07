import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';

const createCustomeTheme = () => {
  let darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
      body0: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 500,
        fontSize: '1.1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em'
      }
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: '1rem',
            fontWeight: 400
          },
          head: {
            fontSize: '1.2rem'
          }
        }
      }
    }
  });
  return responsiveFontSizes(darkTheme);
};

export default createCustomeTheme;