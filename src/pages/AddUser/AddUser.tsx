import { AddUserFormData, addUserSchema } from "@/features/addUser/schemas/addUserSchema";
import { LabelValue } from "@/models/common";
import { useGetCheckpointsQuery } from "@api/checkpoints/checkpointsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboBoxField, InputField } from "@shared/common/atoms";
import { getDefaultValues, getNameInitials } from "@shared/common/utils";
import { Avatar, Box, Button, CircularProgress, Container, createUseStyles, Divider, Dropzone, Text } from "@v-uik/base";
import { Paperclip, Plus } from "@v-uik/icons";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

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
    }
}));

const ROLES_OPTIONS: LabelValue[] = [
    { label: 'Админ', value: 'admin' },
    { label: 'Оператор', value: 'operator' },
    { label: 'Логист', value: 'logistician' },
];

export const AddUser = () => {
    const form = useForm<AddUserFormData>({
        resolver: zodResolver(addUserSchema),
        defaultValues: getDefaultValues(addUserSchema),
    });
    const { watch } = form;
    const watchFullName = watch('fullName', '');
    const watchRole = watch('role', '');
    const classes = useStyles();
    const { data: checkpoints, isSuccess: isCheckpointsLoaded } = useGetCheckpointsQuery();
    const [isOperator, setIsOperator] = useState(false);

    const checkpointOptions: LabelValue[] | null = useMemo(() => {
        if (isCheckpointsLoaded) {
            return checkpoints.data.map((checkpoint) => {
                return ({
                    label: checkpoint.name,
                    value: checkpoint.id?.toString() ?? ''
                });
            });
        }

        return null;
    }, [isCheckpointsLoaded]);

    const handleRoleChange = (value: string) => {
        setIsOperator(value === 'operator')
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
                <Button><Plus className={classes.uploadIcon} /> Добавить</Button>
            </Box>
        </>
    );
};
