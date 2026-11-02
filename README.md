# TELOS

A local studio workspace built with React, TypeScript, Tailwind CSS v4, free [Board UI](https://www.boardui.com) components, and original TELOS features.

Includes a landing page, about and pricing pages, project board, calendar, insights, team view, notifications, command search, and a simulated studio assistant. No backend or API keys are needed.

## Run locally

Install **Node.js 22.12 or newer** and Git, then:

```sh
git clone https://github.com/yousuf-shahzad/telos-boardui.git
cd telos-boardui
npm ci
npm run dev
```

Open the local URL printed by Vite. To check and preview a production build:

```sh
npm run build
npm run preview
```

Start at `#/dashboard/board`, or use **Ctrl+K / Cmd+K** to find pages and projects. Changes are saved in your browser. The assistant uses scripted responses based on local project data; it does not call an AI service or analyse file contents.

## Board UI MCP quickstart (optional)

The MCP server lets a coding agent browse and install Board UI components while developing. **It is not required to run TELOS.** Board UI provides a local stdio server launched through `npx`. See the [official Board UI setup guide](https://www.boardui.com/mcp).

### Codex

With the Codex CLI installed, run:

```sh
codex mcp add boardui -- npx -y boardui@latest mcp
codex mcp list
```

Restart your client or open a fresh chat so the tools load. The command format is documented in [Codex MCP setup](https://developers.openai.com/codex/mcp/).

### Claude Code

```sh
claude mcp add boardui -- npx -y boardui@latest mcp
```

Restart Claude Code after adding it.

### Other MCP clients

For clients that use an `mcpServers` configuration, add:

```json
{
  "mcpServers": {
    "boardui": {
      "command": "npx",
      "args": ["-y", "boardui@latest", "mcp"]
    }
  }
}
```

Use your client's MCP settings to register this command, then restart the client.

### Try it

Open this repository in your coding agent and ask:

> List the free Board UI components, then show the button's usage examples. Use this repository's absolute path as projectDir when reading or installing components.

TELOS is already initialized with Board UI, so there is no need to run `init_boardui` again. If tools are missing, start a fresh chat; if files go to the wrong location, check `projectDir`. The included demo does not need a Pro license.

## Project layout

- `main.tsx` — marketing pages
- `suite/` — original board, calendar, insights, assistant, and workspace logic
- `components/` — free Board UI component source
- `styles/` — Board UI theme and typography

See [feature and data notes](docs/FEATURES.md) for the full page list and local-storage behaviour. This is a fictional prototype; its plans, people, and figures are illustrative.
