import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ServiceContent {
    title: string;
    content: string;
    faqs: Array<{ question: string; answer: string }>;
    schema?: any;
}

export async function getServiceMarkdown(slug: string): Promise<ServiceContent | null> {
    try {
        const markdownPath = path.join(process.cwd(), 'markdown', `${slug}.md`);

        if (!fs.existsSync(markdownPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(markdownPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Extract title from first H1
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ');

        // Extract FAQs section
        const faqSection = content.match(/##\s+Frequently Asked Questions.*?\n([\s\S]*?)(?=\n##|\n```|$)/i);
        const faqs: Array<{ question: string; answer: string }> = [];

        if (faqSection) {
            const faqContent = faqSection[1];
            const faqMatches = faqContent.matchAll(/###\s+(.+?)\n(.+?)(?=\n###|\n\n##|$)/gs);

            for (const match of faqMatches) {
                faqs.push({
                    question: match[1].trim(),
                    answer: match[2].trim()
                });
            }
        }

        // Extract schema markup
        const schemaMatch = content.match(/```json\n([\s\S]*?)\n```/);
        let schema = null;
        if (schemaMatch) {
            try {
                schema = JSON.parse(schemaMatch[1]);
            } catch (e) {
                console.warn('Failed to parse schema markup:', e);
            }
        }

        // Remove FAQ section and schema from main content
        let mainContent = content
            .replace(/##\s+Frequently Asked Questions.*?\n[\s\S]*?(?=\n##\s+Schema|$)/i, '')
            .replace(/##\s+Schema Markup.*?\n[\s\S]*$/i, '')
            .trim();

        return {
            title,
            content: mainContent,
            faqs,
            schema
        };
    } catch (error) {
        console.error('Error reading markdown file:', error);
        return null;
    }
}

export function getAllServiceSlugs(): string[] {
    const markdownDir = path.join(process.cwd(), 'markdown');

    if (!fs.existsSync(markdownDir)) {
        return [];
    }

    const files = fs.readdirSync(markdownDir);
    return files
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));
}
