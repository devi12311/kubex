import React, { useState } from 'react';
import {
    Navbar,
    Center,
    Tooltip,
    UnstyledButton,
    createStyles,
    Stack,
    rem,
    useMantineTheme, Container, Grid, Skeleton, SimpleGrid,
} from '@mantine/core';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconSettings,
    IconLogout,
    IconSwitchHorizontal,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';

const PRIMARY_COL_HEIGHT = rem(300);

const useStyles = createStyles((theme) => ({
    link: {
        width: rem(60),
        height: rem(60),
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.white,

        '&:hover': {
            backgroundColor: theme.colors.blue[6],
        },
    },

    active: {
        backgroundColor: theme.colors.blue[6],
    },
}));

const mockData = [
    { icon: IconHome2, label: 'Home', component: () => <div>Home Component</div> },
    { icon: IconGauge, label: 'Dashboard', component: () => <div>Dashboard Component</div> },
    {
        icon: IconDeviceDesktopAnalytics,
        label: 'Analytics',
        component: () => <div>Analytics Component</div>,
    },
    { icon: IconCalendarStats, label: 'Releases', component: () => <div>Releases Component</div> },
    { icon: IconUser, label: 'Account', component: () => <div>Account Component</div> },
    { icon: IconFingerprint, label: 'Security', component: () => <div>Security Component</div> },
    { icon: IconSettings, label: 'Settings', component: () => <div>Settings Component</div> },
];

interface NavbarLinkProps {
    icon: React.FC<any>;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                <Icon size="1.5rem" stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

export function Dashboard() {
    const [active, setActive] = useState(0);
    const {classes, cx} = useStyles();
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

    const handleNavItemClick = (index) => {
        setActive(index);
    };

    const links = mockData.map((link, index) => (
        <Tooltip label={link.label} position="right" key={link.label}>
            <UnstyledButton
                onClick={() => handleNavItemClick(index)}
                className={cx(classes.link, {[classes.active]: index === active})}
            >
                <link.icon size="1.5rem" stroke={1.5}/>
            </UnstyledButton>
        </Tooltip>
    ));

    const ActiveComponent = mockData[active].component;

    return (
        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Navbar
                style={{backgroundColor: theme.colors.blue[9]}}
                width={50}
                p="md"
                position="fixed"
                zIndex={999}
            >
                <MantineLogo type="mark" size={36}/>
                <Navbar.Section grow mt={50}>
                    <Stack justify="center" spacing={0}>
                        {links}
                    </Stack>
                </Navbar.Section>
                <Navbar.Section>
                    <Stack justify="center" spacing={0}>
                        <NavbarLink icon={IconSwitchHorizontal} label="Change account"/>
                        <NavbarLink icon={IconLogout} label="Logout"/>
                    </Stack>
                </Navbar.Section>
            </Navbar>
            <Grid gutter="md">
                <Grid.Col>
                    <ActiveComponent />
                </Grid.Col>
            </Grid>
        </SimpleGrid>
    )
}
export default Dashboard
