"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MarkdownComponentsProps {
    children: string;
    className?: string;
}

export function MarkdownContent({ children, className }: MarkdownComponentsProps) {
    return (
        <div className={cn("prose prose-lg max-w-none", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-3xl font-bold mb-6 mt-12 text-foreground border-b pb-3">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-2xl font-semibold mb-4 mt-8 text-foreground">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-xl font-semibold mb-3 mt-6 text-foreground">
                            {children}
                        </h4>
                    ),
                    p: ({ children }) => (
                        <p className="text-base md:text-lg mb-6 leading-relaxed text-muted-foreground">
                            {children}
                        </p>
                    ),
                    ul: ({ children }) => (
                        <ul className="space-y-3 mb-6 ml-6">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="space-y-3 mb-6 ml-6 list-decimal">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="text-base md:text-lg text-muted-foreground flex items-start">
                            <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="flex-1">{children}</span>
                        </li>
                    ),
                    hr: () => (
                        <hr className="my-12 border-border" />
                    ),
                    a: ({ href, children }) => (
                        <Link
                            href={href || '#'}
                            className="text-primary hover:text-primary/80 underline underline-offset-4"
                        >
                            {children}
                        </Link>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground bg-muted/50 rounded-r">
                            {children}
                        </blockquote>
                    ),
                    code: ({ className, children }) => {
                        const isBlock = className?.includes('language-');
                        if (isBlock) {
                            return (
                                <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                                    <code className={className}>{children}</code>
                                </pre>
                            );
                        }
                        return (
                            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                                {children}
                            </code>
                        );
                    },
                    strong: ({ children }) => (
                        <strong className="font-semibold text-foreground">{children}</strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic">{children}</em>
                    ),
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
}
