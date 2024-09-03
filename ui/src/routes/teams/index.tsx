import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { pb } from '../../api'
import { notifyInfo } from '../../helper/notify'


function isAuth() {
    return pb.authStore.isValid
}




export const Route = createFileRoute('/teams/')({
    component: TeamsPage,
})

function TeamsPage() {
    const nav = useNavigate()
    if (!isAuth()) {
        notifyInfo("Please login")
        nav({ to: '/auth/login' })
    }
    return <div>Hello /teams/!</div>
}