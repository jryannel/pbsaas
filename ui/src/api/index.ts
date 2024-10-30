import { ListResult } from "pocketbase";
import { Crud } from "./crud";
import { Chat, Document, Invite, Member, Project, Team, User } from "./model";
import { pb } from "./pb";
import { Playground } from "./playground";

export { pb };
export type { Chat, Document, Invite, Member, Project, Team, User };

export const Users = new Crud<User>("users");
export const Teams = new Crud<Team>("teams");
export const Projects = new Crud<Project>("projects");
export const Documents = new Crud<Document>("documents");
export const Invites = new Crud<Invite>("invites");
export const Members = new Crud<Member>("members");
export const Chats = new Crud<Chat>("chats")
export type ProjectList = ListResult<Project>;
export type DocumentList = ListResult<Document>;
export type UserList = ListResult<User>;
export type TeamList = ListResult<Team>;
export type InviteList = ListResult<Invite>;
export type MemberList = ListResult<Member>;
export type ChatList = ListResult<Chat>

export { Playground };
