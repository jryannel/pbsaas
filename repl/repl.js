const PocketBase = require('pocketbase/cjs')
const pb = new PocketBase("http://localhost:8090")
const users = pb.collection("users")
const teams = pb.collection("teams")
const members = pb.collection("members")
const invites = pb.collection("invites")
const projects = pb.collection("projects")
const documents = pb.collection("documents")
const chats = pb.collection("chats")
const admins = pb.admins
const password = "supersecret"

function userName(id) {
    return `user${id}`
}

function teamName(id) {
    return `team${id}`
}

function projectName(id) {
    return `project${id}`
}

function documentName(id) {
    return `document${id}`
}


function chatName(id) {
    return `chat${id}`
}

function userEMail(id) {
    return `${userName(id)}@ryannel.org`
}

async function authUser(name) {
    console.log(`authenticating user ${name}`)
    return await users.authWithPassword(name, password)
}

async function authAdmin() {
    console.log(`authenticating admin`)
    return await admins.authWithPassword("juergen@ryannel.org", password)
}

async function createUser(username) {
    console.log(`creating user ${username}`)
    return await users.create({ username, email: `${username}@ryannel.org`, password, passwordConfirm: password })
}

async function getUser(username) {
    return await users.getFirstListItem(`username="${username}"`)
}

async function getTeam(name) {
    return await teams.getFirstListItem(`name="${name}"`)
}

async function createTeam(name, owner) {
    console.log(`creating team ${name} for user ${owner}`)
    const user = await getUser(owner)
    return await teams.create({ name, owner: user.id, description: `team for ${owner}` })
}

async function createMember(team, user) {
    console.log(`creating member with user ${user} for team ${team}`)
    const t = await getTeam(team)
    const usr = await getUser(user)
    return await members.create({ team: t.id, user: usr.id })
}

async function createInvite(team, email) {
    console.log(`creating invite for email ${email} for team ${team}`)
    const t = await getTeam(team)
    return await invites.create({ team: t.id, email })
}


async function createProject(team, name) {
    console.log(`creating project ${name} for team ${team}`)
    const t = await getTeam(team)
    return await projects.create({ name, team: t.id, description: `project for ${team}` })
}

async function getProject(name) {
    return await projects.getFirstListItem(`name="${name}"`)
}

async function getProjects(user) {
    return await projects.getList(0, 10, { filter: `team.members=${user}` })
}


async function createDocument(project, name) {
    console.log(`creating document ${name} for project ${project}`)
    const p = await getProject(project)
    return await documents.create({ name, project: p.id, description: `document for ${project}` })
}


async function getDocument(name) {
    return await documents.getFirstListItem(`name="${name}"`)
}

async function createChat(project, name) {
    console.log(`creating chat ${name} for project ${project}`)
    const p = await getProject(project)
    return await chats.create({ name, project: p.id, description: `chat for ${project}` })
}

async function getChat(name) {
    return await chats.getFirstListItem(`name="${name}"`)
}

async function deleteAllDocuments() {
    console.log("deleting documents")
    return await deleteAll(documents)
}

async function deleteAllProjects() {
    console.log("deleting projects")
    return await deleteAll(projects)
}

async function deleteAllTeams() {
    console.log("deleting teams")
    return await deleteAll(teams)
}

async function deleteAllUsers() {
    console.log("deleting users")
    return await deleteAll(users)
}

async function deleteAllMembers() {
    console.log("deleting members")
    return await deleteAll(members)
}

async function deleteAllInvites() {
    console.log("deleting invites")
    return await deleteAll(invites)
}

async function deleteAll(col) {
    const items = await col.getFullList()
    for (const item of items) {
        await col.delete(item.id)
    }
}


async function reset() {
    await authAdmin()
    await deleteAllDocuments()
    await deleteAllProjects()
    await deleteAllInvites()
    await deleteAllMembers()
    await deleteAllTeams()
    await deleteAllUsers()
}

async function setup01() {
    await reset()
    // create 10 users from user0 to user9
    for (let i = 0; i < 10; i++) {
        await createUser(userName(i))
    }
    // create 2 teams from team0 to team1
    for (let i = 0; i < 2; i++) {
        await createTeam(teamName(i), userName(i))
    }
    // create 10 members from user0 to user9 for team0/team1
    for (let i = 0; i < 10; i++) {
        await createMember(teamName(i % 2), userName(i))
    }
    // create 2 invites for each team
    for (let i = 0; i < 2; i++) {
        await createInvite(teamName(i), userEMail(i))
    }
    // create 2 projects for each of the 2 teams
    for (let i = 0; i < 4; i++) {
        await createProject(teamName(i % 2), projectName(i))
        // create 2 documents for each project
        for (let j = 0; j < 2; j++) {
            await createDocument(projectName(i), documentName(i))
            await createChat(projectName(i), chatName(i))
        }
    }
}


async function setup02(count = 3) {
    await reset()
    for (let i = 0; i < count; i++) {
        await createUser(userName(i))
    }
    for (let i = 0; i < count; i++) {
        if (i % 2 === 0) {
            await createTeam(teamName(i), userName(i))
        } else {
            await createTeam(teamName(i), userName(i % 2))
        }
    }
    for (let i = 0; i < count; i++) {
        const user = userName(i)
        const team = teamName(i)
        await createMember(team, user)
        await createInvite(team, `${user}@ryannel.org`)

    }
    for (let i = 0; i < count; i++) {
        await createProject(teamName(i), projectName(i))
    }
}



