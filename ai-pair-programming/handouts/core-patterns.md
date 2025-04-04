# Core Patterns for AI Pair Programming

## Documentation Patterns

### 1. Project Structure Documentation

````markdown
# Project Overview

---

name: Project Name
status: Active | Maintenance | Legacy
primary_language: TypeScript/JavaScript/etc.
ai_tools: [Tool1, Tool2]

---

## Directory Structure

```bash
project/
├── src/           # Source code
├── docs/          # Documentation
├── tests/         # Test files
└── .cursor/       # AI-specific files
```
````

### 2. Component Documentation

```typescript
/**
 * @component UserProfile
 * @description Displays and manages user profile information
 *
 * @example
 * <UserProfile userId="123" editable={true} />
 *
 * @dependencies
 * - Authentication context
 * - User data service
 *
 * @ai-notes
 * - Handles both view and edit modes
 * - Implements form validation
 * - Uses optimistic updates
 */
```

### 3. Function Documentation

```typescript
/**
 * @function processUserData
 * @description Transforms raw user data into display format
 *
 * @param {UserData} raw - Raw user data from API
 * @returns {ProcessedUser} Formatted user data
 *
 * @ai-context This is part of the user data pipeline
 * @ai-invariants All fields must be sanitized
 */
```

## Communication Patterns

### 1. Feature Implementation Request

```markdown
# Feature Request Template

## Goal

[Clear, specific outcome needed]

## Context

- Current functionality
- Related components
- Business rules

## Constraints

- Performance requirements
- Security considerations
- Compatibility needs

## Examples

- Similar features
- Expected behavior
- Edge cases
```

### 2. Bug Fix Request

```markdown
# Bug Fix Template

## Issue

- Current behavior
- Expected behavior
- Error messages/logs

## Context

- Steps to reproduce
- Environment details
- Related code

## Validation

- Test cases
- Success criteria
- Edge cases
```

### 3. Code Review Request

```markdown
# Review Request Template

## Changes

- Files modified
- New functionality
- Refactoring details

## Focus Areas

- Performance concerns
- Security implications
- Edge cases

## Testing

- Test coverage
- Manual testing
- Integration points
```

## AI Interaction Patterns

### 1. Iterative Development

```markdown
1. Initial Request

   - Basic functionality
   - Core requirements
   - Example usage

2. Refinement

   - Review output
   - Clarify issues
   - Add constraints

3. Validation
   - Test cases
   - Edge cases
   - Integration
```

### 2. Knowledge Building

```markdown
1. Context Gathering

   - Relevant files
   - Dependencies
   - Business rules

2. Implementation

   - Start simple
   - Add complexity
   - Document changes

3. Verification
   - Code review
   - Testing
   - Documentation
```

## Best Practices

### Documentation

1. **Proximity Principle**

   - Keep documentation close to code
   - Update docs with code changes
   - Include AI-specific notes

2. **Context Preservation**

   - Document decision rationale
   - Note important constraints
   - Explain non-obvious choices

3. **AI Discoverability**
   - Use consistent formats
   - Include metadata
   - Cross-reference related items

### Communication

1. **Clear Intent**

   - State goals explicitly
   - Provide context upfront
   - Define success criteria

2. **Iterative Dialogue**

   - Start with basics
   - Build complexity gradually
   - Validate understanding

3. **Knowledge Sharing**
   - Document learnings
   - Share patterns
   - Update templates

## Anti-Patterns to Avoid

### Documentation

❌ **Don't**

- Write tool-specific documentation
- Over-document obvious patterns
- Create deep tool dependencies

✅ **Instead**

- Focus on intent and context
- Document core patterns
- Keep documentation flexible

### Communication

❌ **Don't**

- Assume tool knowledge
- Skip context setting
- Ignore error cases

✅ **Instead**

- Provide clear context
- Start with basics
- Plan for errors

## Maintenance Guidelines

1. **Regular Review**

   - Update patterns quarterly
   - Remove obsolete content
   - Add new learnings

2. **Version Control**

   - Track documentation changes
   - Note major updates
   - Maintain history

3. **Team Alignment**
   - Share best practices
   - Gather feedback
   - Iterate on patterns

---

Remember: These patterns should evolve with your team's needs and tool capabilities. Focus on patterns that enhance clarity and maintainability while staying tool-agnostic.
