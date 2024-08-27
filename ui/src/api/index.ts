import { ListResult } from "pocketbase";
import { Crud } from "./crud";
import { Document, Invite, Job, Member, Project, Team, Template, User } from "./model";
import { pb } from "./pb";
import { Playground } from "./playground";

export { pb };
export type { Document, Invite, Job, Member, Project, Team, Template, User };

export const Users = new Crud<User>("users");
export const Teams = new Crud<Team>("teams");
export const Projects = new Crud<Project>("projects");
export const Documents = new Crud<Document>("documents");
export const Jobs = new Crud<Job>("jobs");
export const Templates = new Crud<Template>("templates");
export const Invites = new Crud<Invite>("invites");
export const Members = new Crud<Member>("members");
export type ProjectList = ListResult<Project>;
export type DocumentList = ListResult<Document>;
export type JobList = ListResult<Job>;
export type TemplateList = ListResult<Template>;
export type UserList = ListResult<User>;
export type TeamList = ListResult<Team>;
export type InviteList = ListResult<Invite>;
export type MemberList = ListResult<Member>;

export { Playground };
