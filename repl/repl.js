const PocketBase = require('pocketbase/cjs')
const pb = new PocketBase("http://localhost:8090")
const users = pb.collection("users")
const teams = pb.collection("teams")
const members = pb.collection("members")
const invites = pb.collection("invites")
const projects = pb.collection("projects")
const documents = pb.collection("documents")
const chats = pb.collection("chats")
const cards = pb.collection("cardentries")
const stacks = pb.collection("cardstacks")
const dossiers = pb.collection("carddossiers")
const admins = pb.admins
const password = "supersecret"
const adminEmail = "juergen@ryannel.org"
const mailDomain = "ryannel.org"


const documentContent = `
A heat pump works by moving heat from one place to another using a refrigeration cycle. Here's a basic explanation:

1. A fluid (refrigerant) absorbs heat from the outside air/ground/water source
2. This fluid is compressed, which increases its temperature significantly
3. The hot compressed fluid transfers its heat to the inside of your building through a heat exchanger
4. The fluid then expands, cooling down, and the cycle repeats

Think of it like an air conditioner that can run in reverse - instead of only moving heat from inside to outside (cooling), it can also move heat from outside to inside (heating), even when it's cold outside.
`

function name(type, id) {
    return `${type}${id}`
}

function email(name) {
    return `${name}@${mailDomain}`
}

async function getByName(collection, name) {
    return await collection.getFirstListItem(`name="${name}"`)
}


async function deleteAll(col) {
    const items = await col.getFullList()
    for (const item of items) {
        await col.delete(item.id)
    }
}

class Admins {
    static async login() {
        return admins.authWithPassword(adminEmail, password)
    }
}

class Users {
    static async create(name) {
        console.log(`creating user ${name}`)
        return await users.create({ username: name, email: email(name), password, passwordConfirm: password })
    }
    static name(id) {
        return name("user", id)
    }
    static async get(name) {
        return await users.getFirstListItem(`username="${name}"`)
    }
    static async getAll() {
        return await users.getFullList()
    }
    static async deleteAll() {
        return await deleteAll(users)
    }
    static async delete(name) {
        return await deleteByName(users, name)
    }
    static email(id) {
        return email(Users.name(id))
    }
}

class Teams {
    static async create(name, owner) {
        console.log(`creating team ${name} for user ${owner}`)
        const user = await Users.get(owner)
        return await teams.create({ name, owner: user.id, description: `team for ${owner}` })
    }
    static name(id) {
        return name("team", id)
    }
    static async get(name) {
        return await getByName(teams, name)
    }
    static async getAll() {
        return await teams.getFullList()
    }
    static async deleteAll() {
        return await deleteAll(teams)
    }
    static async delete(name) {
        return await deleteByName(teams, name)
    }
}


class Projects {
    static async create(team, name) {
        console.log(`creating project ${name} for team ${team}`)
        const t = await Teams.get(team)
        return await projects.create({ name, team: t.id, description: `project for ${team}` })
    }
    static name(id) {
        return name("project", id)
    }
    static async get(name) {
        return await getByName(projects, name)
    }
    static async getAll() {
        return await projects.getFullList()
    }
    static async deleteAll() {
        return await deleteAll(projects)
    }
    static async delete(name) {
        return await deleteByName(projects, name)
    }
}

class Members {
    static async create(team, user) {
        console.log(`creating member with user ${user} for team ${team}`)
        const t = await Teams.get(team)
        const usr = await Users.get(user)
        return await members.create({ team: t.id, user: usr.id })
    }
    static name(id) {
        return name("member", id)
    }
    static async get(name) {
        return await getByName(members, name)
    }
    static async getAll() {
        return await members.getFullList()
    }
    static async deleteAll() {
        return await deleteAll(members)
    }
    static async delete(name) {
        return await deleteByName(members, name)
    }
}

class Invites {
    static async create(team, email) {
        console.log(`creating invite for email ${email} for team ${team}`)
        const t = await Teams.get(team)
        return await invites.create({ team: t.id, email })
    }
    static name(id) {
        return name("invite", id)
    }
    static async get(name) {
        return await getByName(invites, name)
    }
    static async getAll() {
        return await invites.getFullList()
    }
    static async deleteAll() {
        return await deleteAll(invites)
    }
    static async delete(name) {
        return await deleteByName(invites, name)
    }
}

class Documents {
    static async create(project, name, content) {
        console.log(`creating document ${name} for project ${project}`)
        const p = await Projects.get(project)
        return await documents.create({ name, project: p.id, description: `document for ${project}`, content })
    }
    static name(id) {
        return name("document", id)
    }
    static async get(name) {
        return await getByName(documents, name)
    }
    static async getAll() {
        return await documents.getFullList()
    }
    static async deleteAll() {
        return await deleteAll(documents)
    }
    static async delete(name) {
        return await deleteByName(documents, name)
    }
}

class Chats {
    static async create(project, name) {
        console.log(`creating chat ${name} for project ${project}`)
        const p = await Projects.get(project)
        const message = {
            content: [
                {
                    text: "Hi! My name is Claude.",
                    type: "text"
                }
            ],
            id: "msg_013Zva2CMHLNnXjNJJKqJ2EF",
            model: "claude-3-5-sonnet-20241022",
            role: "assistant",
            stop_reason: "end_turn",
            stop_sequence: null,
            type: "message",
            usage: {
                input_tokens: 2095,
                output_tokens: 503
            }
        }
        return await chats.create({ name, project: p.id, description: `chat for ${project}`, content: message })
    }
    static name(id) {
        return name("chat", id)
    }
    static async get(name) {
        return await getByName(chats, name)
    }
    static async getAll() {
        return await chats.getFullList()
    }
    static async deleteAll() {
        return await deleteAll(chats)
    }
    static async delete(name) {
        return await deleteByName(chats, name)
    }
}

class Stacks {
    static async create(project, name) {
        console.log(`creating stack ${name} for project ${project}`)
        const p = await Projects.get(project)
        return await stacks.create({ name, project: p.id, description: `stack for ${project}` })
    }
    static name(id) {
        return name("stack", id)
    }
    static async get(name) {
        return await getByName(stacks, name)
    }
    static async getAll() {
        return await stacks.getFullList()
    }
    static async deleteAll() {
        return await deleteAll(stacks)
    }
    static async delete(name) {
        return await deleteByName(stacks, name)
    }
}

class Dossiers {
    static async create(stack, name) {
        console.log(`creating dossier ${name} for stack ${stack}`)
        const s = await Stacks.get(stack)
        return await dossiers.create({ name, stack: s.id, description: `dossier for ${stack}` })
    }
    static name(id) {
        return name("dossier", id)
    }
    static async get(name) {
        return await getByName(dossiers, name)
    }
    static async getAll() {
        return await dossiers.getFullList()
    }
    static async deleteAll() {
        return await deleteAll(dossiers)
    }
    static async delete(name) {
        return await deleteByName(dossiers, name)
    }
}

class Cards {
    static async create(stack, name, question, answer) {
        const s = await Stacks.get(stack)
        return await cards.create({ name, stack: s.id, description: `card for ${stack}`, question, answer })
    }
    static name(id) {
        return name("card", id)
    }
    static async get(name) {
        return await getByName(cards, name)
    }
    static async getAll() {
        return await cards.getFullList()
    }
    static async deleteAll() {
        return await deleteAll(cards)
    }
    static async delete(name) {
        return await deleteByName(cards, name)
    }
}

async function reset() {
    await Admins.login()
    await Users.deleteAll()
    await Documents.deleteAll()
    await Projects.deleteAll()
    await Invites.deleteAll()
    await Members.deleteAll()
    await Teams.deleteAll()
    await Chats.deleteAll()
    await Stacks.deleteAll()
    await Dossiers.deleteAll()
    await Cards.deleteAll()
}

async function setup01() {
    await reset()
    // create 10 users from user0 to user9
    for (let i = 0; i < 10; i++) {
        await Users.create(Users.name(i))
    }
    // create 2 teams from team0 to team1
    for (let i = 0; i < 2; i++) {
        await Teams.create(Teams.name(i), Users.name(i))
    }
    // create 10 members from user0 to user9 for team0/team1
    for (let i = 0; i < 10; i++) {
        await Members.create(Teams.name(i % 2), Users.name(i))
    }
    // create 2 invites for each team
    for (let i = 0; i < 2; i++) {
        await Invites.create(Teams.name(i), email(i))
    }
    // create 2 projects for each of the 2 teams
    for (let i = 0; i < 4; i++) {
        await Projects.create(Teams.name(i % 2), Projects.name(i))
        // create 2 documents for each project
        for (let j = 0; j < 2; j++) {
            await Documents.create(Projects.name(i), Documents.name(i), documentContent)
            await Chats.create(Projects.name(i), Chats.name(i))
        }
    }
    // create 2 stacks for each of the 2 teams
    for (let i = 0; i < 4; i++) {
        await Stacks.create(Projects.name(i % 2), Stacks.name(i))
        // create 2 cards for each stack
        for (let j = 0; j < 2; j++) {
            await Cards.create(Stacks.name(i), Cards.name(i), `card for ${Stacks.name(i)}`)
        }
    }
    // create 2 dossiers for each of the 2 teams
    for (let i = 0; i < 4; i++) {
        await Dossiers.create(Stacks.name(i % 2), Dossiers.name(i))
    }
}


async function setup02(count = 3) {
    await reset()
    for (let i = 0; i < count; i++) {
        await Users.create(Users.name(i))
    }
    for (let i = 0; i < count; i++) {
        if (i % 2 === 0) {
            await Teams.create(Teams.name(i), Users.name(i))
        } else {
            await Teams.create(Teams.name(i), Users.name(i % 2))
        }
    }
    for (let i = 0; i < count; i++) {
        await createMember(Teams.name(i), Users.name(i))
        await createInvite(Teams.name(i), Users.email(i))

    }
    for (let i = 0; i < count; i++) {
        await createProject(Teams.name(i), Projects.name(i))
    }
}



