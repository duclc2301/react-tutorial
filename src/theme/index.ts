import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
        color: 'primary',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiIcon: {
      defaultProps: {
        fontSize: 'small',
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'contained',
      },
    },
  },
});

export default theme;
