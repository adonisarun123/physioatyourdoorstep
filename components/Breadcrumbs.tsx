import Link from "next/link";
import { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { SITE } from "@/lib/seo";

// Canonical origin is www — sourced from SITE so breadcrumb JSON-LD never
// drifts back to the apex host (which would contradict the canonical signal).
const SITE_URL = SITE.url;

export interface Crumb {
    name: string;
    /** Absolute path (e.g. "/blogs"). Omit for the current page. */
    href?: string;
}

interface BreadcrumbsProps {
    items: Crumb[];
    className?: string;
}

/**
 * Accessible breadcrumb trail with BreadcrumbList JSON-LD for SEO.
 * A "Home" crumb is prepended automatically.
 */
export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    const trail: Crumb[] = [{ name: "Home", href: "/" }, ...items];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            ...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {}),
        })),
    };

    return (
        <>
            <Breadcrumb className={className}>
                <BreadcrumbList>
                    {trail.map((crumb, index) => {
                        const isLast = index === trail.length - 1;
                        return (
                            <Fragment key={`${crumb.name}-${index}`}>
                                <BreadcrumbItem>
                                    {isLast || !crumb.href ? (
                                        <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link href={crumb.href}>{crumb.name}</Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator />}
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </>
    );
}
