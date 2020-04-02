```js
import Button from '@Components/button/Button';
import { NotificationContainer, NotificationManager } from '@Components/notifications'

const Example = () => {
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message',{
            // title: 'Title here'
          });
          break;
        case 'warning':
          NotificationManager.warning('Warning message', {
            // title: 'Close after 3000ms',
            timeOut: 3000
          });
          break;
        case 'error':
          NotificationManager.error('Error message', {
            // title: 'Click me!',
            timeOut: 5000,
            onClick: () => {
              alert('callback');
            }
          });
          break;
      }
    };
  };

  return (
    <>
      <Button variant="primary" onClick={createNotification('info')}>
        Info
      </Button>
      <Button variant="primary" onClick={createNotification('success')}>
        Success
      </Button>
      <Button variant="primary" onClick={createNotification('warning')}>
        Warning
      </Button>
      <Button variant="primary" onClick={createNotification('error')}>
        Error
      </Button>
      <section>
        <NotificationContainer />
      </section>
    </>
  );
}

Example()
```