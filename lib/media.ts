/**
 * Press / media coverage of Physio At Your Doorstep.
 *
 * Newest first — the /media-coverage page renders this list in order.
 * To add a new mention, prepend an entry; nothing else needs to change.
 */

export interface MediaMention {
    /** Full publication name, as it should be printed. */
    outlet: string;
    /** 1–2 letter monogram shown in the card badge. */
    initials: string;
    /** Bare domain, shown under the outlet name. */
    domain: string;
    /** Canonical URL of the article on that outlet. */
    url: string;
    /** Article headline as published. */
    headline: string;
    /** ISO date of publication. */
    datePublished: string;
    /** Human-readable date for the card. */
    dateLabel: string;
    /** Byline, where the outlet credits one. */
    author?: string;
    /** Short summary shown on the card — the article's meta description or lede. */
    excerpt: string;
    /** Optional note, e.g. syndication source. */
    note?: string;
}

export const MEDIA_MENTIONS: MediaMention[] = [
    {
        outlet: "The Hindustan Wires",
        initials: "HW",
        domain: "thehindustanwires.com",
        url: "https://thehindustanwires.com/from-pain-to-progress-how-physio-at-your-doorstep-is-changing-the-way-patients-experience-rehabilitation/",
        headline:
            "From Pain to Progress: How Physio At Your Doorstep Is Changing the Way Patients Experience Rehabilitation",
        datePublished: "2026-08-25",
        dateLabel: "25 August 2026",
        author: "Puneet Yadav",
        excerpt:
            "For many people, physiotherapy begins with a simple goal: to get their life back. The Hindustan Wires looks at how home-based rehabilitation is helping patients across Bangalore and Pune reach that goal without travelling to a clinic.",
    },
    {
        outlet: "The Entrepreneur Stories",
        initials: "ES",
        domain: "theentrepreneurstories.com",
        url: "https://theentrepreneurstories.com/from-pain-to-progress-how-physio-at-your-doorstep-is-changing-the-way-patients-experience-rehabilitation/",
        headline:
            "From Pain to Progress: How Physio At Your Doorstep Is Changing the Way Patients Experience Rehabilitation",
        datePublished: "2026-08-25",
        dateLabel: "25 August 2026",
        author: "Puneet Yadav",
        excerpt:
            "The founder story behind Physio At Your Doorstep — from a small initiative in 2021 to a rehabilitation network of more than 300 physiotherapists, and the trust that had to be built patient by patient along the way.",
    },
    {
        outlet: "The Business Stories",
        initials: "BS",
        domain: "thebusinessstories.com",
        url: "https://thebusinessstories.com/from-pain-to-progress-how-physio-at-your-doorstep-is-changing-the-way-patients-experience-rehabilitation/",
        headline:
            "From Pain to Progress: How Physio At Your Doorstep Is Changing the Way Patients Experience Rehabilitation",
        datePublished: "2026-08-25",
        dateLabel: "25 August 2026",
        author: "Puneet Yadav",
        excerpt:
            "A look at the model itself: same-day appointments, physiotherapist allocation and treatment at a time and place that suits the patient — across sports, post-operative, orthopaedic and neurological rehabilitation.",
    },
    {
        outlet: "DailyHunt",
        initials: "DH",
        domain: "dailyhunt.in",
        url: "https://dailyhunt.in/news/india/english/thebusinessstories-epaper-dhcac9158d64b443d4846bd81a66beca12/-newsid-dhcac9158d64b443d4846bd81a66beca12_d611dd8e5f844fcaafa351dd1ca137d8?sm=Y",
        headline:
            "From Pain to Progress: How Physio At Your Doorstep Is Changing the Way Patients Experience Rehabilitation",
        datePublished: "2026-08-25",
        dateLabel: "25 August 2026",
        author: "Puneet Yadav",
        excerpt:
            "The same story carried to DailyHunt's national English news readership, where the patient — not the therapist — is framed as the one who earns the recovery.",
        note: "Syndicated from The Business Stories",
    },
];
