/**
 * Renders one or more JSON-LD structured-data blocks.
 * Server component — safe to drop anywhere in a page tree.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
    const items = Array.isArray(data) ? data : [data];
    return (
        <>
            {items.map((item, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
                />
            ))}
        </>
    );
}
