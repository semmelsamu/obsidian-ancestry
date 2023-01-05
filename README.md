# Ancestry

Obsidian plugin for family tree management

## How it works

- Ancestry automatically detects Parents and saves them automatically
- If you write a `ancestry` code tag, it will automatically look for any relatives and display them in your file.
- Currently supported are: Children, Siblings and Step Siblings

## Example
*Chris.md:*

```md
Eltern: [[Anna]]
```

*Anna.md:*
```md
Eltern: [[James]]

    ```ancestry
    ```

```

*Will be rendered as:*
```
Eltern: [[James]]

Kinder: [[Chris]]