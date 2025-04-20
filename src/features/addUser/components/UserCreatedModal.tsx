import { ROUTER_PATHS } from "@shared/common/constants";
import { Box, Button, createUseStyles, Input, Modal, ModalBody, ModalFooter, ModalHeader, notification, Text } from "@v-uik/base";
import { Copy, UsersGroup } from "@v-uik/icons";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(4),
    },
    linkContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2),
    },
    linkInput: {
        flex: 1,
    },
    copyButton: {
        marginLeft: theme.spacing(1),
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

interface UserCreatedModalProps {
    isOpen: boolean;
    onClose: () => void;
    signupLink: string;
}

export const UserCreatedModal = ({ isOpen, onClose, signupLink }: UserCreatedModalProps) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(signupLink)
            .then(() => {
                notification.success('Ссылка скопирована в буфер обмена', {
                    title: 'Успешно'
                });
            })
            .catch(() => {
                notification.error('Не удалось скопировать ссылку', {
                    title: 'Ошибка'
                });
            });
    };

    const goToUsersList = () => {
        navigate(`/${ROUTER_PATHS.USERS}`);
    };

    return (
        <Modal open={isOpen} onClose={onClose} width={500}>
            <ModalHeader>Пользователь успешно создан</ModalHeader>
            <ModalBody>
                <Box className={classes.modalContent}>
                    <Text kind="bodyMd">
                        Пользователь успешно создан. Для установки пароля отправьте пользователю следующую ссылку:
                    </Text>
                    <Box className={classes.linkContainer}>
                        <Input 
                            className={classes.linkInput}
                            disabled
                            value={signupLink}
                        />
                        <Button 
                            kind="outlined" 
                            color="secondary"
                            onClick={handleCopyLink}
                            className={classes.copyButton}
                        >
                            <Copy width={16} height={16} />
                        </Button>
                    </Box>
                </Box>
            </ModalBody>
            <ModalFooter className={classes.modalFooter}>
                <Button kind="outlined" color="secondary" onClick={goToUsersList} prefixIcon={<UsersGroup width={16} height={16} />}>
                    К списку пользователей
                </Button>
                <Button onClick={onClose}>
                    Закрыть
                </Button>
            </ModalFooter>
        </Modal>
    );
}; 