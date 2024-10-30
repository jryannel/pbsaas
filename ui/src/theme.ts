import { ActionIcon, Button, createTheme, NavLink, ThemeIcon } from "@mantine/core";

export const theme = createTheme({
    components: {
        Button: Button.extend({
            defaultProps: {
                variant: 'subtle',
            },
        }),
        ActionIcon: ActionIcon.extend({
            defaultProps: {
                variant: 'subtle',
            },
        }),
        ThemeIcon: ThemeIcon.extend({
            defaultProps: {
                variant: 'light',
            },
        }),
        NavLink: NavLink.extend({
            defaultProps: {
                variant: 'subtle',
            },
        }),
    },
});