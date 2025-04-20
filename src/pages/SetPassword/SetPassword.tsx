import { SetPasswordForm } from '@/features/auth/components';
import { Box, Card, Container, createUseStyles, Text } from '@v-uik/base';
import loginCard from '@assets/loginCard.webp';
import { useParams } from 'react-router-dom';

const useStyles = createUseStyles((theme) => ({
  formWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cardContainer: {
    padding: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '15vh'
  },
  cardBody: {
    display: 'flex',
    background: theme.sys.color.backgroundBeta
  },
  cardContent: {
    display: 'flex',
    gap: theme.spacing(2),
    flexDirection: 'row-reverse'
  },
  formContainer: {
    padding: theme.spacing(6),
    minWidth: 320
  },
  cardImage: {
    height: 400,
    pointerEvents: 'none',
    width: '100%'
  },
  cardHeadline: {
    flex: 1,
    paddingTop: theme.spacing(8)
  },
  errorGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2)
  }
}));

export const SetPassword = () => {
  const classes = useStyles();
  const { token } = useParams<{ token: string }>();

  if (!token) {
    return (
      <Container as="main" maxWidth="sm">
        <Card
          classes={{
            card: classes.cardContainer,
            body: classes.cardBody
          }}
        >
          <Box className={classes.cardContent}>
            <Box className={classes.formContainer}>
              <Box className={classes.formWrapper}>
                <Box className={classes.errorGroup}>
                  <Text kind="headline4">
                    Ошибка
                  </Text>
                  <Text>Отсутствует токен для установки пароля</Text>
                </Box>
              </Box>
            </Box>
            <img src={loginCard} className={classes.cardImage} />
          </Box>
        </Card>
      </Container>
    );
  }

  return (
    <Container as="main" maxWidth="sm">
      <Card
        classes={{
          card: classes.cardContainer,
          body: classes.cardBody
        }}
      >
        <Box className={classes.cardContent}>
          <Box className={classes.formContainer}>
            <Box className={classes.formWrapper}>
              <Text kind="headline4" className={classes.cardHeadline}>
                Установка пароля
              </Text>
              <SetPasswordForm token={token} />
            </Box>
          </Box>
          <img src={loginCard} className={classes.cardImage} />
        </Box>
      </Card>
    </Container>
  );
}; 