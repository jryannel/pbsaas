import { TitleHeader } from '@/comps/TitleHeader'
import AccountInfoForm from '@/forms/AccountInfoForm'
import ChangePasswordForm from '@/forms/ChangePasswordForm'
import { Box, Tabs } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/settings')({
    component: SettingsPage,
})

function SettingsPage() {
    return (
        <Box>
            <TitleHeader title="Account Settings" />
            <Tabs defaultValue="info" orientation='vertical' variant='pills' m="md">
                <Tabs.List>
                    <Tabs.Tab value="info">Account Info</Tabs.Tab>
                    <Tabs.Tab value="password">Change Password</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="info">
                    <AccountInfoForm />
                </Tabs.Panel>
                <Tabs.Panel value="password">
                    <ChangePasswordForm />
                </Tabs.Panel>
            </Tabs>
        </Box>
    )
}