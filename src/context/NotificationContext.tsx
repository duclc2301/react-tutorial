import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {
  ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { FCC } from 'types/react';
import { sleep } from 'utils/misc';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type NotificationContextValue = (option: Option) => void;

const NotificationContext = createContext<NotificationContextValue | null>(
  null
);

NotificationContext.displayName = 'Notification';

interface Option {
  content: ReactNode;
  severity?: AlertProps['severity'];
}

export const NotificationProvider: FCC = (props) => {
  const { children } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [option, setOption] = useState<Option>({
    content: null,
    severity: 'success',
  });

  const handleSetNotification = useCallback((option: Option) => {
    setOption(option);
    setOpen(true);
  }, []);

  const handleClose = async () => {
    setOpen(false);
    await sleep(350);
    setOption({
      content: null,
      severity: 'success',
    });
  };

  const { content, severity } = option;

  return (
    <NotificationContext.Provider value={handleSetNotification}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {content}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
