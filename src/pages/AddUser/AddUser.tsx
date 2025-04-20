import { AddUserFormData, addUserBaseSchema, addUserSchema } from "@/features/addUser/schemas/addUserSchema";
import { UserCreatedModal } from "@/features/addUser/components";
import { LabelValue } from "@/models/common";
import { useGetCheckpointsQuery } from "@api/checkpoints/checkpointsApi";
import { useSignupUserMutation } from "@api/users/usersApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboBoxField, InputField } from "@shared/common/atoms";
import { ROUTER_PATHS } from "@shared/common/constants";
import { getDefaultValues, getNameInitials, isErrorResponse } from "@shared/common/utils";
import { Avatar, Box, Button, CircularProgress, Container, createUseStyles, Divider, Dropzone, Input, Modal, ModalBody, ModalFooter, ModalHeader, notification, Text } from "@v-uik/base";
import { Copy, Paperclip, Plus, UsersGroup } from "@v-uik/icons";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
    container: {
        display: 'flex',
        gap: theme.spacing(4),
        justifyContent: 'flex-start'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        width: 350,
    },
    preview: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: theme.spacing(2),
        width: 250,
    },
    dividerVertical: {
        padding: [theme.spacing(2), 0],
        paddingRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        borderBottom: 0,
    },
    dividerHorizontal: {
        paddingTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    centerProgress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        marginBottom: theme.spacing(2)
    },
    roleCaption: {
        alignSelf: 'flex-end',
        color: theme.sys.color.neutralAlpha
    },
    dropZone: {
        padding: theme.spacing(4)
    },
    uploadContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadButton: {
        marginBottom: theme.spacing(1),
    },
    uploadIcon: {
        marginRight: theme.spacing(2),
    },
    actions: {
        display: 'flex',
        width: 664,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: theme.spacing(4)
    },
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

const ROLES_OPTIONS: LabelValue[] = [
    { label: 'Админ', value: 'admin' },
    { label: 'Оператор', value: 'operator' },
    { label: 'Логист', value: 'logistician' },
];

export const AddUser = () => {
    const form = useForm<AddUserFormData>({
        resolver: zodResolver(addUserSchema),
        defaultValues: getDefaultValues(addUserBaseSchema),
    });
    const { watch, reset } = form;
    const watchFullName = watch('fullName', '');
    const watchRole = watch('role', '');
    const classes = useStyles();
    const navigate = useNavigate();
    const { data: checkpoints, isSuccess: isCheckpointsLoaded } = useGetCheckpointsQuery();
    const [signupUser, { isLoading }] = useSignupUserMutation();
    const [isOperator, setIsOperator] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [signupLink, setSignupLink] = useState('');

    const checkpointOptions: LabelValue[] | null = useMemo(() => {
        if (isCheckpointsLoaded) {
            return checkpoints.map((checkpoint) => {
                return ({
                    label: checkpoint.name,
                    value: checkpoint.id?.toString() ?? ''
                });
            });
        }

        return null;
    }, [isCheckpointsLoaded, checkpoints]);

    const handleRoleChange = (value: string) => {
        setIsOperator(value === 'operator')
    };

    const handleModalClose = () => {
        setIsSuccessModalOpen(false);
        reset();
    };

    const handleAddUser = useCallback(() => {
        form.handleSubmit((data) => {
            const userData = {
                username: data.username,
                role: data.role,
                ...(isOperator && data.checkpoint_id ? { checkpoint_id: parseInt(data.checkpoint_id) } : {})
            };

            signupUser(userData)
                .unwrap()
                .then((response) => {
                    setSignupLink(response.signup_link);
                    setIsSuccessModalOpen(true);
                })
                .catch((error) => {
                    if (isErrorResponse(error)) {
                        notification.error(error.data.message || 'Произошла ошибка при создании пользователя', {
                            title: 'Ошибка создания пользователя'
                        });
                    } else {
                        notification.error('Произошла ошибка при создании пользователя', {
                            title: 'Ошибка'
                        });
                    }
                });
        })();
    }, [form, isOperator, signupUser]);

    const goToUsersList = () => {
        navigate(ROUTER_PATHS.USERS);
    };

    return (
        <>
            <Text kind="h4" gutterBottom>
                Добавить пользователя
            </Text>
            <Box className={classes.container}>
                <Box className={classes.form}>
                    <FormProvider {...form}>
                        <InputField
                            label="Логин"
                            placeholder="Введите логин"
                            name="username"
                        />
                        <InputField
                            label="Имя пользователя"
                            placeholder="Введите имя"
                            name="fullName"
                        />
                        <ComboBoxField
                            label="Роль в системе"
                            name="role"
                            options={ROLES_OPTIONS}
                            onChange={handleRoleChange}
                        />
                        {isOperator ? (
                                <>
                                    <Divider className={classes.dividerHorizontal} />
                                    {isCheckpointsLoaded && checkpointOptions != null ? (
                                        <ComboBoxField
                                            label="КПП"
                                            name="checkpoint_id"
                                            options={checkpointOptions}
                                        />
                                    ) : (
                                        <Container className={classes.centerProgress}>
                                            <CircularProgress />
                                        </Container>
                                    )}
                                </>
                            ) : null
                        }
                    </FormProvider>
                </Box> 
                <Divider direction="vertical" className={classes.dividerVertical} />
                <Box className={classes.preview}>
                    <Box className={classes.avatarGroup}>
                        <Avatar className={classes.avatar} color="linear-gradient(227deg, #053DA3 13.15%, #0796F5 84.48%)" size="sm"><Text kind="titleSm">{getNameInitials(watchFullName)}</Text></Avatar>
                        <Text kind="subtitle1">{watchFullName}</Text>
                        <Text className={classes.roleCaption} kind="caption">{watchRole}</Text>
                    </Box>

                    <Dropzone
                        accept="image/png, image/jpg, image/jpeg"
                        onUpload={() => {}}
                        className={classes.dropZone}
                    >
                        <div className={classes.uploadContent}>
                            <Button
                                kind="ghost"
                                color="secondary"
                                tabIndex={-1}
                                className={classes.uploadButton}
                            >
                                <Paperclip className={classes.uploadIcon} />
                                Выберите
                            </Button>
                            <span>или перетащите изображение</span>
                        </div>
                    </Dropzone>
                </Box>
            </Box>
            <Box className={classes.actions}>
                <Button onClick={handleAddUser} disabled={isLoading}>
                    {isLoading ? <CircularProgress size="sm" color="white" /> : <Plus className={classes.uploadIcon} />}
                    Добавить
                </Button>
            </Box>

            <UserCreatedModal 
                isOpen={isSuccessModalOpen}
                onClose={handleModalClose}
                signupLink={signupLink}
            />
        </>
    );
};
