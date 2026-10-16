import ReactMarkdown from "react-markdown";
import Link from "next/link";

/** Renders a short markdown FAQ answer with the site's card typography. */
export default function FaqAnswer({ children }: { children: string }) {
    return (
        <ReactMarkdown
            components={{
                p: ({ children }) => <p className="text-[#4B5563] leading-relaxed mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-[#1F2933]">{children}</strong>,
                ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 text-[#4B5563]">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 text-[#4B5563]">{children}</ol>,
                a: ({ href = "", children }) =>
                    href.startsWith("/") ? (
                        <Link href={href} className="text-primary underline underline-offset-4">{children}</Link>
                    ) : (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                            {children}
                        </a>
                    ),
            }}
        >
            {children}
        </ReactMarkdown>
    );
}
