import { RecordModel } from "pocketbase";


export enum Kind {
  Module = "module",
  Solution = "solution",
  Scenario = "scenario",
  Monitor = "monitor",
}

export enum NodeType {
  Module = "module",
}

export interface User extends RecordModel {
  username: string;
  my_team: string;
  email: string;
  expand?: {
    my_team: Team;
  };

}

export interface Team extends RecordModel {
  name: string;
  description: string;
  owner: string;
  expand?: {
    owner: User;
  };
}

export interface Member extends RecordModel {
  user: string;
  team: string;
  expand?: {
    user: User;
    team: Team;
  };
}

export interface Invite extends RecordModel {
  email: string;
  team: string;
}

export interface Project extends RecordModel {
  name: string;
  description: string;
  team: string;
  servers: string;
  expand?: {
    team: Team;
  };
}

export interface Document extends RecordModel {
  name: string;
  description: string;
  content: string;
  kind: string;
  project: string;
  expand?: {
    project: Project;
  };
}

export interface Chat extends RecordModel {
  name: string;
  description: string;
  project: string;
  content: object;
  expand?: {
    project: Project;
  };
}




