import { LoginForm } from '@/features/auth/components';
import { Box, Card, Container, createUseStyles, Text } from '@v-uik/base';
import loginCard from '@assets/loginCard.webp';

const useStyles = createUseStyles((theme) => ({
  loginFormWrapper: {
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
    gap: theme.spacing(2)
  },
  loginFormContainer: {
    padding: theme.spacing(6),
  },
  cardImage: {
    height: 400,
    pointerEvents: 'none'
  }
}));

export const Login = () => {
  const classes = useStyles();

  return (
    <Container as="main" maxWidth="sm">
      <Card
        classes={{
          card: classes.cardContainer,
          body: classes.cardBody
        }}
      >
        <Box className={classes.cardContent}>
          <Box className={classes.loginFormContainer}>
            <Box className={classes.loginFormWrapper}>
              <Text kind="headline4">
                Вход в систему
              </Text>
              <LoginForm />
            </Box>
          </Box>
          <img src={loginCard} className={classes.cardImage} />
        </Box>
      </Card>
    </Container>
  );
};
