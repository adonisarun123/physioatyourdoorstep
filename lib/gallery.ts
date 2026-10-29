/**
 * Event gallery data for /gallery.
 *
 * To add an event: drop its photos in public/images/gallery/<event-slug>/
 * (webp, descriptive kebab-case filenames) and prepend one object to
 * GALLERY_EVENTS. The page, lightbox, counts and JSON-LD all derive from here.
 */

export type GalleryPhoto = {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
};

export type GalleryVideo = {
    src: string;
    poster: string;
    title: string;
    description: string;
    /** ISO 8601 duration, e.g. PT2M2S */
    duration: string;
    durationLabel: string;
};

export type GalleryEvent = {
    slug: string;
    title: string;
    client: string;
    kind: string;
    dateISO: string;
    dateLabel: string;
    location: string;
    summary: string;
    highlights: string[];
    video?: GalleryVideo;
    photos: GalleryPhoto[];
};

const QUESS = "/images/gallery/quess-corp-ergonomic-session";

export const GALLERY_EVENTS: GalleryEvent[] = [
    {
        slug: "quess-corp-ergonomic-session",
        title: "Quess Corp : Ergonomic Session",
        client: "Quess Corp",
        kind: "Corporate Wellness",
        dateISO: "2026-10-13",
        dateLabel: "October 2026",
        location: "Bengaluru",
        summary:
            "An on-site workplace ergonomics session for the Quess Corp team — practical posture correction, desk-friendly stretch breaks and an interactive Q&A on preventing the neck, shoulder and back pain that long hours at a screen bring on.",
        highlights: [
            "Posture & workstation set-up",
            "Desk stretch break",
            "Interactive Q&A",
            "Wellness giveaways",
        ],
        video: {
            src: `${QUESS}/quess-corp-ergonomic-session-video.mp4`,
            poster: `${QUESS}/quess-corp-ergonomic-session-video-poster.webp`,
            title: "Quess Corp : Ergonomic Session — highlights",
            description:
                "Highlights from the Physio At Your Doorstep ergonomic session at Quess Corp: the team joins an interactive posture and workplace-wellness Q&A on the office floor.",
            duration: "PT2M2S",
            durationLabel: "2:02",
        },
        photos: [
            {
                src: `${QUESS}/quess-corp-ergonomic-session-team-photo.webp`,
                alt: "Quess Corp employees smiling together after the Physio At Your Doorstep ergonomic session",
                caption: "The Quess Corp team after the session",
                width: 1600,
                height: 900,
            },
            {
                src: `${QUESS}/quess-corp-ergonomic-session-interactive-q-and-a.webp`,
                alt: "Interactive Q&A on posture and workplace ergonomics on the Quess Corp office floor",
                caption: "Interactive Q&A on the office floor",
                width: 1600,
                height: 900,
            },
            {
                src: `${QUESS}/quess-corp-ergonomic-session-desk-stretch-break.webp`,
                alt: "Quess Corp employees doing a guided desk stretch break at their workstations",
                caption: "A guided stretch break, right at the desk",
                width: 1600,
                height: 900,
            },
            {
                src: `${QUESS}/quess-corp-ergonomic-session-posture-talk.webp`,
                alt: "Posture and ergonomics talk for Quess Corp employees at their workstations",
                caption: "Posture talk across the workstations",
                width: 1600,
                height: 900,
            },
            {
                src: `${QUESS}/quess-corp-ergonomic-session-participants-with-giveaways.webp`,
                alt: "Quess Corp participants holding wellness giveaways at the ergonomic session",
                caption: "Participants with their wellness giveaways",
                width: 1600,
                height: 900,
            },
            {
                src: `${QUESS}/quess-corp-ergonomic-session-group-selfie.webp`,
                alt: "Group selfie of Quess Corp employees at the ergonomic session",
                caption: "One last group selfie",
                width: 1600,
                height: 900,
            },
        ],
    },
];

export const GALLERY_TOTALS = {
    events: GALLERY_EVENTS.length,
    photos: GALLERY_EVENTS.reduce((n, e) => n + e.photos.length, 0),
    videos: GALLERY_EVENTS.filter((e) => e.video).length,
};

/** On-site watch page for an event's video (only events with a video have one). */
export function galleryVideoPath(slug: string): string {
    return `/gallery/${slug}/video`;
}

export function getGalleryEvent(slug: string): GalleryEvent | undefined {
    return GALLERY_EVENTS.find((e) => e.slug === slug);
}
