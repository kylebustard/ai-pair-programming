# Cursor vs Windsurf IDE Development Cheatsheet

## Foundation

Both Cursor and Windsurf are built on top of Visual Studio Code, making them familiar to VS Code users while adding AI-powered features to enhance the development experience.

## Context Management and Memory Features

### Cursor Context Management

- **Manual Context Addition**: Typically requires manually adding files to context with commands like `@file`, `@codebase`, or `@files`
- **Model Domain Context (MDC)**: Uses `.mdc` files in `.cursor/rules/` directory to provide persistent project context
- **Cursor Rules**: Configuration files that define how AI should interact with your codebase
- **Context Tagging**: Tag specific parts of the codebase for AI reference

### Windsurf Context Management

- **Automatic Context Analysis**: Automatically indexes codebase to find relevant files
- **Memory Feature**: Can generate and store "memories" to retain context between conversations
- **Context Pinning**: Pin specific contexts for future reference
- **Context Tagging**: Tag and reference specific contexts

## High-Level Concepts

### Cursor

- **Core Philosophy**: Full-featured AI IDE focused on deep integration of AI capabilities within a complete development environment
- **Architecture**: Complete VS Code fork with built-in AI features
- **Primary Feature**: Composer - AI assistant for code generation and modification
- **Target Users**: Developers looking for a standalone IDE with comprehensive AI integration

### Windsurf

- **Core Philosophy**: Flexible AI-powered coding assistant that can work across different development environments
- **Architecture**: Primarily built by Codeium, available both as an IDE and as plugins for other environments
- **Primary Feature**: Cascade - agentic AI assistant for understanding codebases and generating code
- **Target Users**: Developers who want flexibility across different IDEs or a cleaner UI experience

## Key Features Comparison

| Feature                  | Cursor                                                            | Windsurf                                                    |
| ------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| **AI Chat**              | Composer - context-aware code discussions with multiple AI models | Cascade - has distinct "Write" and "Chat" modes             |
| **Code Context**         | Requires manual context addition in many cases                    | Automatically analyzes codebase to provide relevant context |
| **Context Rules**        | MDC rules in `.cursor/rules/` directory                           | Built-in memory system                                      |
| **Memory System**        | Less automated, relies on rules                                   | Automatic memory generation between conversations           |
| **Terminal Integration** | Available but less intuitive                                      | More seamless terminal command integration                  |
| **Web Search**           | Available for up-to-date information                              | Available via `@web` command in Cascade                     |
| **User Interface**       | Functional but sometimes described as less polished               | Cleaner UI with more intuitive workflow                     |
| **Bug Finding**          | Experimental bug finder feature                                   | Standard error detection                                    |
| **Multi-file Editing**   | Strong support through agent mode                                 | Excellent support through Cascade                           |
| **AI Models**            | Claude 3.5 Sonnet and others                                      | Claude 3.5 Sonnet, Claude 3.7, and others                   |

## Workflow Differences

### Cursor Workflow

1. Open project in Cursor IDE
2. Set up MDC rules in `.cursor/rules/` directory for project context
3. Manually add relevant files to context (often) using `@file` or `@codebase`
4. Use Composer to generate or modify code
5. Apply changes to codebase
6. Debug using integrated tools
7. Consider creating new MDC rules to capture learned context

### Windsurf Workflow

1. Open project in Windsurf or use Windsurf plugin in your preferred IDE
2. Let Cascade automatically analyze the codebase
3. Toggle between "Write" and "Chat" modes as needed
4. Leverage step-by-step guided workflow for changes
5. See changes with clear visual diffs
6. Use automatic memory generation to maintain context
7. Access saved memories from the Memories Panel

## Strengths and Weaknesses

### Cursor Strengths

- More comprehensive debugging support
- Web search capability for up-to-date information
- Potentially higher quality code output for complex projects
- Better for experienced developers who want fine-grained control

### Cursor Gotchas

- UI sometimes crashes or feels less polished
- Requires more manual context management
- Steeper learning curve for beginners
- More expensive pricing ($20/month vs $15/month for Windsurf)
- Limited to 500 premium AI requests per month

### Windsurf Strengths

- Cleaner, more intuitive UI
- Automatic context understanding
- Clear mode separation between writing and chatting
- Can be used as a plugin across different IDEs
- Better for beginners due to guided workflow
- More competitive pricing

### Windsurf Gotchas

- May not provide as much fine-grained control for complex projects
- Still in public beta (as of early 2025)
- May have limited web search capabilities

## Installation and Setup

### Cursor

```bash
# macOS
brew install --cask cursor

# Windows
# Download from cursor.sh and follow installation wizard

# Linux
# Download AppImage, .deb or .rpm package from cursor.sh
```

### Windsurf

```bash
# Install as standalone IDE
# Download from codeium.com/windsurf

# Or install Codeium extension in your preferred IDE
# VS Code: Install "Codeium" extension from marketplace
# JetBrains IDEs: Install "Codeium" plugin
```

## Command Reference

### Cursor Common Commands

- `Cmd/Ctrl + K` - Open Command Palette
- `Cmd/Ctrl + I` - Open Cursor Composer
- `Cmd/Ctrl + Shift + L` - Add file to context
- `Cmd/Ctrl + →` - Partially accept suggestions

### Windsurf Common Commands

- `Cmd/Ctrl + K` - Open Command Palette
- `Cmd/Ctrl + I` - Open Cascade
- `Tab` - Toggle between "Write" and "Chat" modes
- `Shift + Tab` - View step-by-step changes

## Configuration Tips

### Cursor

```json
// settings.json configuration example
{
  "cursor.showSuggestions": true,
  "cursor.suggestionDebounce": 300,
  "cursor.suggestCompletions": "always",
  "cursor.composer.model": "claude-3-5-sonnet"
}
```

### Cursor MDC Rules Structure

```
// Basic MDC rule file structure (.cursor/rules/example.mdc)
<rule>
name: rule_name
description: Detailed description of the rule
filters:
  - type: content
    pattern: "pattern_to_match"
  - type: file_extension
    pattern: "\\.ext$"
actions:
  - type: suggest
    message: "Suggestion to display when rule matches"
</rule>
```

### Windsurf

```json
// settings.json configuration example
{
  "windsurf.cascade.enableWriteMode": true,
  "windsurf.autoAnalyzeCodebase": true,
  "windsurf.cascade.model": "claude-3-5-sonnet"
}
```

### Windsurf Memory Commands

```
// Commands to work with Windsurf memories
@web - Ask Cascade to search the web
@docs - Search through documentation
// URL Input - Paste a URL to use as context
```

## Best Practices

### For Cursor

1. Be explicit about context by selecting relevant files
2. Use composer for complex tasks spanning multiple files
3. Leverage web search for up-to-date library documentation
4. Use agent mode for automated context filling
5. Create structured MDC rule files in `.cursor/rules/` directory
6. Use naming conventions for MDC files (e.g., `NNN_name.mdc` format)
7. Restart Cursor after making changes to MDC rules for them to take effect

### For Windsurf

1. Trust the automatic context filling but verify when needed
2. Use "Write" mode for code generation and "Chat" mode for explanations
3. Take advantage of the step-by-step visualization for complex changes
4. Consider using Codeium extension in other IDEs for flexibility
5. Leverage automatic memory generation for maintaining context
6. Use `@web` for web searches when needed
7. Try the URL input feature to use web content as context

## Context and Memory Comparison

### Cursor's MDC System

- Uses `.mdc` files stored in the `.cursor/rules/` directory
- Provides persistent project context and code conventions
- Requires manual creation and maintenance
- Supports various rule structures with filters and actions
- Rules can be organized by naming conventions (e.g., `NNN_name.mdc`)
- Changes to rules require IDE restart to take effect
- Great for projects with well-defined standards and patterns

### Windsurf's Memory System

- Automatically generates "memories" to retain context between conversations
- Memories are accessible through a dedicated Memories Panel
- Can prompt Cascade to create a memory at any time
- More dynamic and user-friendly approach to context management
- Integrates terminal commands as context for Cascade
- Provides web search capabilities via `@web` command
- Ideal for developers who prefer automatic context handling

## Which One Should You Choose?

- **Choose Cursor if:**

  - You need fine-grained control over context through rules
  - You're working on complex, production-ready applications
  - You want to define explicit project standards through MDC rules
  - You prefer a comprehensive debugging experience
  - You're willing to invest time in setting up detailed context rules

- **Choose Windsurf if:**
  - You want a cleaner, more intuitive UI
  - You prefer automatic context and memory handling
  - You need flexibility across different IDEs
  - You're a beginner or value guided workflows
  - You appreciate the clear separation between chat and code writing modes
  - You're on a tighter budget

Both tools use similar AI models under the hood, so the choice primarily depends on your workflow preferences, UI expectations, and how you prefer to manage context in your development process.
