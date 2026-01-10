
'use client';

interface CodeBlockProps {
    code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
    return (
        <pre className="bg-muted p-4 rounded-md text-xs text-muted-foreground overflow-x-auto">
            <code>{code}</code>
        </pre>
    );
}

    