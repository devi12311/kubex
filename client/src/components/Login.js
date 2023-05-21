import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/styles.css';
import service from '../apis/apis';

import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    rem,
} from '@mantine/core';
import {useForm} from "@mantine/form";
import { notifications } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: rem(900),
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },

    form: {
        borderRight: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
        minHeight: rem(900),
        maxWidth: rem(450),
        paddingTop: rem(80),

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

const Login = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: (value) => (value ? null : 'Invalid username'),
            password: (value) => (value ? null : 'Invalid password'),
        },
    });

    const makeLoginCall = async (e) => {
        e.preventDefault();
        const { username, password } = form.values;

        service.login({ username, password }).then(result => {
            const { auth: { accessToken: token }} = result;
            localStorage.setItem('token', token);
            notifications.show({ message: 'Login successful', color: 'green' });
            navigate('/');
        }).catch(err => {
            console.log(err)
            notifications.show({ message: err.response.data.message, color: 'red' });
        });
    }

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                    Welcome back to Mantine!
                </Title>

                <TextInput label="Username" placeholder="Username" size="md"  {...form.getInputProps('username')}/>
                <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"  {...form.getInputProps('password')}/>
                {/*<Checkbox label="Keep me logged in" mt="xl" size="md"/>*/}
                <Button fullWidth mt="xl" size="md" onClick={makeLoginCall}>
                    Login
                </Button>
            </Paper>
        </div>
    )
    ;
}

export default Login;
