# AI Pair Programming Cheat Sheets

## Quick Reference Guide

### Essential Commands

```bash
# Documentation
ai explain <file>          # Get code explanation
ai document <function>     # Generate documentation
ai summarize <directory>   # Summarize codebase

# Development
ai implement <feature>     # Basic implementation
ai test <function>         # Generate tests
ai review <changes>        # Code review
ai refactor <code>         # Suggest improvements

# Debugging
ai debug <error>          # Analyze error
ai trace <bug>           # Trace bug source
ai fix <issue>           # Suggest fixes
```

### Communication Templates

#### 1. Feature Request

```markdown
TASK: Implement [feature]
CONTEXT: Current system [details]
REQUIREMENTS:

- Functional: [list]
- Non-functional: [list]
  CONSTRAINTS: [limitations]
  EXAMPLES: [similar features]
```

#### 2. Bug Report

```markdown
ISSUE: [problem]
STEPS:

1. [reproduction steps]
   EXPECTED: [behavior]
   ACTUAL: [behavior]
   CONTEXT: [relevant info]
```

#### 3. Code Review

```markdown
REVIEW: [changes]
FOCUS:

- Performance
- Security
- Maintainability
  QUESTIONS: [specific areas]
```

### Documentation Patterns

#### 1. Component Documentation

```typescript
/**
 * @component Name
 * @description Purpose
 * @usage Example
 * @dependencies List
 */
```

#### 2. Function Documentation

```typescript
/**
 * @function name
 * @param {type} name - description
 * @returns {type} description
 * @throws {Error} when/why
 */
```

#### 3. Architecture Decision

```markdown
# Decision: [title]

## Context

- Current situation
- Problem statement

## Decision

- Chosen approach
- Rationale

## Consequences

- Benefits
- Drawbacks
```

### Best Practices Checklist

#### Starting Work

- [ ] Clear task definition
- [ ] Necessary context gathered
- [ ] Related code identified
- [ ] Constraints understood

#### During Development

- [ ] Small, focused changes
- [ ] Regular documentation
- [ ] Test coverage
- [ ] Error handling

#### Before Completion

- [ ] Code review
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Changes documented

### Common Patterns

#### 1. Development Flow

```
Define → Implement → Test → Review → Refine
```

#### 2. Documentation Flow

```
Context → Structure → Details → Examples → Review
```

#### 3. Problem Solving

```
Understand → Break Down → Implement → Validate
```

### Error Recovery

#### Common Issues

1. Unclear requirements

   - Clarify scope
   - Get examples
   - Define constraints

2. Wrong implementation

   - Review requirements
   - Check assumptions
   - Test edge cases

3. Integration problems
   - Check dependencies
   - Verify interfaces
   - Test integration

### Tool-Agnostic Practices

#### 1. Documentation

- Keep it close to code
- Focus on intent
- Include examples
- Update regularly

#### 2. Communication

- Be specific
- Provide context
- Show examples
- Iterate feedback

#### 3. Development

- Start small
- Test early
- Document changes
- Review regularly

### Quick Tips

#### Effective Prompts

- Be specific
- Include context
- Show examples
- State constraints

#### Code Quality

- Clear intent
- Good naming
- Simple solutions
- Proper testing

#### Documentation

- Why over what
- Keep current
- Include examples
- Cross-reference

### Warning Signs

#### Code Smells

- Tool-specific patterns
- Complex workflows
- Missing documentation
- Tight coupling

#### Process Issues

- Skipped reviews
- Missing tests
- Poor documentation
- No error handling

### Emergency Procedures

#### When AI Fails

1. Document the issue
2. Use manual fallback
3. Note limitations
4. Share learnings

#### Recovery Steps

1. Save work
2. Document state
3. Try alternatives
4. Update practices

---

Remember:

- Keep it simple
- Stay tool-agnostic
- Document everything
- Learn from failures

```

```
