# Pocketbase SAAS Template

This is a Pocketbase SAAS template that can be used to create a Pocketbase instance that is ready to be deployed to the cloud.


## Technology Stack

- Application
    - Go as programming language (see [https://go.dev/](https://go.dev/))
    - Extended Pocketbase (see [https://github.com/pocketbase/pocketbase](https://github.com/pocketbase/pocketbase))

- User Interface
    - Vite/React/Typescript [https://vitejs.dev/](https://vitejs.dev/) (with SWC support)
    - UI using Mantine [https://mantine.dev/](https://mantine.dev/)
    - Tabler Icons [https://tabler-icons.io/](https://tabler-icons.io/)
    - Routing using Tanstack Router [https://tanstack.com/router](https://tanstack.com/router)
    - React Query [https://tanstack.com/query](https://tanstack.com/query)  

- Optional
    - Taskfile [https://taskfile.dev/](https://taskfile.dev/) for automation
    - Fly.io [https://fly.io/](https://fly.io/) for deployment
    - Docker [https://www.docker.com/](https://www.docker.com/) for deployment
    - Goreman [https://github.com/mattn/goreman](https://github.com/mattn/goreman) for development
    - Golangci-lint [https://golangci-lint.run/](https://golangci-lint.run/) for linting

## Features
- Authentication (email/password and google oauth)
- Teams (with invites / ownership / permissions)
- Collections (with permissions)
- Documents (with permissions)
- Hosting using fly.io


## Prerequisites
- [Task](https://taskfile.dev/) installed
- [Go](https://go.dev/) installed
- [Docker](https://www.docker.com/) installed
- [Fly.io](https://fly.io/) account

## Usage
1. Clone the repository
2. run `task --help` to see the available tasks
