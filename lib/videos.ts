/**
 * Every public video on the Physio At Your Doorstep YouTube channel
 * (https://www.youtube.com/@physioatyourdoorstep), newest first.
 *
 * Source of truth for /videos. To add a video: prepend one object.
 * Counts, filters, the featured slot and the VideoObject schema all derive
 * from this array — nothing else needs editing.
 *
 * `format: "short"` = uploaded as a YouTube Short (vertical, 9:16 player).
 * Last synced from the channel's uploads playlist: 2026-09-27 (23 public videos).
 */

export type VideoCategory = "recovery" | "exercises" | "sports";
export type VideoFormat = "video" | "short";

export interface ChannelVideo {
    id: string;
    title: string;
    description: string;
    category: VideoCategory;
    format: VideoFormat;
    /** ISO date the video was published on YouTube. */
    uploadDate: string;
    /** Length in seconds. */
    seconds: number;
}

/** The video shown large at the top of /videos. Change this to re-feature. */
export const FEATURED_VIDEO_ID = "-WmHuuOEkcY";

export const VIDEO_CATEGORIES: { key: VideoCategory; label: string; blurb: string }[] = [
    {
        key: "recovery",
        label: "Recovery Stories",
        blurb: "Real patients, real progress — from surgery or injury back to everyday life.",
    },
    {
        key: "exercises",
        label: "Exercises & Tips",
        blurb: "Simple routines and advice you can use at home for posture, pain and mobility.",
    },
    {
        key: "sports",
        label: "Sports Physio",
        blurb: "On-field care, taping and return-to-sport training for athletes.",
    },
];

export const CHANNEL_VIDEOS: ChannelVideo[] = [
    {
        id: "V1-EHfdn148",
        title: "You Don't Need to Play Tennis to Get Tennis Elbow",
        description: "Why office workers, gym-goers, cooks and parents get tennis elbow — and what actually helps it settle.",
        category: "exercises",
        format: "short",
        uploadDate: "2026-07-12",
        seconds: 76,
    },
    {
        id: "G3pr4mo7Esw",
        title: "5 Shoulder Pain Warning Signs You Shouldn't Ignore",
        description: "How to tell shoulder pain that will ease with rest from pain that needs a proper medical assessment.",
        category: "exercises",
        format: "short",
        uploadDate: "2026-06-29",
        seconds: 98,
    },
    {
        id: "jB_UHoNLDe0",
        title: "Posture Belts Don't Fix Posture",
        description: "Posture correctors only give temporary support. Strong muscles, movement and daily habits are what last.",
        category: "exercises",
        format: "short",
        uploadDate: "2026-05-23",
        seconds: 52,
    },
    {
        id: "y9OUgw_i54I",
        title: "1 Habit That Delays Recovery After Surgery",
        description: "A common mistake patients make after an operation — and how to avoid slowing down your rehab.",
        category: "exercises",
        format: "short",
        uploadDate: "2026-05-13",
        seconds: 32,
    },
    {
        id: "2oOc-DDpMj0",
        title: "Pain Isn't Normal — Fix It Early With Physiotherapy",
        description: "Why living with everyday aches is a mistake, and how early physiotherapy keeps you moving pain-free.",
        category: "exercises",
        format: "short",
        uploadDate: "2026-05-05",
        seconds: 57,
    },
    {
        id: "lGaRJnj129Y",
        title: "From Surgery to Strength in Just 8 Weeks",
        description: "An eight-week post-surgical rehabilitation journey, from the first careful steps to real strength.",
        category: "recovery",
        format: "short",
        uploadDate: "2026-03-22",
        seconds: 29,
    },
    {
        id: "5hGblRy2VuM",
        title: "8 Back & Shoulder Exercises to Improve Posture at Home",
        description: "Eight simple moves you can do at home to ease back and shoulder pain and stand taller.",
        category: "exercises",
        format: "short",
        uploadDate: "2026-03-15",
        seconds: 47,
    },
    {
        id: "PEh9GZVKLow",
        title: "10 Exercises for Strong Feet",
        description: "Build foot strength and balance — helpful for flat feet and plantar fasciitis.",
        category: "exercises",
        format: "short",
        uploadDate: "2026-03-02",
        seconds: 47,
    },
    {
        id: "3Irvx-DUlnE",
        title: "6 Powerful Exercises to Correct Hip Imbalance",
        description: "Targeted exercises to rebalance the hips and relieve the back pain and poor posture that come with it.",
        category: "exercises",
        format: "short",
        uploadDate: "2026-02-24",
        seconds: 26,
    },
    {
        id: "j3arQeCZBUA",
        title: "On-Field Sports Physiotherapy",
        description: "Our physiotherapists at work pitch-side — immediate injury care during a football match.",
        category: "sports",
        format: "short",
        uploadDate: "2025-11-02",
        seconds: 44,
    },
    {
        id: "u_5-pklRvzc",
        title: "Single-Leg Squat Training After ACL Reconstruction",
        description: "A key return-to-sport drill for rebuilding knee control and strength after ACL surgery.",
        category: "sports",
        format: "short",
        uploadDate: "2025-10-28",
        seconds: 28,
    },
    {
        id: "O5RL77T3ZC0",
        title: "Rebuilding Strength Through Smart Rehab",
        description: "Progressive, well-planned strengthening that gets patients stronger without setbacks.",
        category: "recovery",
        format: "short",
        uploadDate: "2025-10-28",
        seconds: 21,
    },
    {
        id: "-WmHuuOEkcY",
        title: "CEO of WorkIndia Shares His Recovery Story",
        description: "Kunal Patil, CEO of WorkIndia, on recovering from neck pain with Dr. Atharva Mishra and structured home physiotherapy.",
        category: "recovery",
        format: "video",
        uploadDate: "2025-10-16",
        seconds: 69,
    },
    {
        id: "WXGBgUfUJkk",
        title: "Passion Meets Performance: Sports Taping",
        description: "Kinesiology taping and sports physiotherapy that help athletes perform and recover.",
        category: "sports",
        format: "short",
        uploadDate: "2025-10-12",
        seconds: 25,
    },
    {
        id: "TMfLfDtduRM",
        title: "From Pain to Progress",
        description: "A patient's journey from persistent pain to confident movement with home physiotherapy.",
        category: "recovery",
        format: "short",
        uploadDate: "2025-10-05",
        seconds: 145,
    },
    {
        id: "OaEMS4wKABI",
        title: "Achilles Tendon Repair: First Sessions vs Final Session",
        description: "Side-by-side progress of a tendo-Achilles repair patient, from the first sessions to discharge.",
        category: "recovery",
        format: "video",
        uploadDate: "2025-10-01",
        seconds: 97,
    },
    {
        id: "5-Lr_rtMZcA",
        title: "Mohit Singh's ACL Reconstruction Journey",
        description: "From post-surgery to confident movement — an ACL rehabilitation story from Bangalore.",
        category: "recovery",
        format: "video",
        uploadDate: "2025-07-18",
        seconds: 41,
    },
    {
        id: "L9o-a4K9OUc",
        title: "From Crutches to Comeback After Knee Replacement",
        description: "A patient climbing stairs just 20 sessions after a knee replacement.",
        category: "recovery",
        format: "short",
        uploadDate: "2025-04-14",
        seconds: 52,
    },
    {
        id: "vrkXkR6DKFM",
        title: "Fix Your Posture: Simple Tips for a Pain-Free Back",
        description: "Easy, effective posture tips for back pain and neck stiffness — no equipment needed.",
        category: "exercises",
        format: "short",
        uploadDate: "2025-03-10",
        seconds: 236,
    },
    {
        id: "TdazeAX58yE",
        title: "Back to Sports After ACL Reconstruction & Meniscal Repair",
        description: "Sonali Jairath's rehabilitation from ACL reconstruction and meniscal repair back to sport.",
        category: "recovery",
        format: "short",
        uploadDate: "2025-02-03",
        seconds: 101,
    },
    {
        id: "DesVjQESo5Q",
        title: "ACL Recovery: Journey From Bed to Sports",
        description: "Rakshit Tiwari's ACL recovery, from the first days in bed after surgery to playing sport again.",
        category: "recovery",
        format: "short",
        uploadDate: "2024-12-11",
        seconds: 97,
    },
    {
        id: "MAU3m_YMZns",
        title: "Treating Rotator Cuff Injury & Frozen Shoulder",
        description: "Velprakash's rehabilitation from a rotator cuff injury and frozen shoulder to full, pain-free movement.",
        category: "recovery",
        format: "short",
        uploadDate: "2024-11-04",
        seconds: 222,
    },
    {
        id: "wD6MtOPWPfY",
        title: "ACL Recovery Journey After Surgery",
        description: "Lloyd Soans' post-operative ACL rehabilitation with home physiotherapy in Bangalore.",
        category: "recovery",
        format: "short",
        uploadDate: "2024-10-28",
        seconds: 231,
    },
];

/** "1:09" style label. */
export function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
}

/** ISO-8601 duration for schema.org, e.g. "PT1M9S". */
export function isoDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `PT${m ? `${m}M` : ""}${s}S`;
}

export function thumbnailUrl(id: string): string {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function watchUrl(v: Pick<ChannelVideo, "id" | "format">): string {
    return v.format === "short"
        ? `https://www.youtube.com/shorts/${v.id}`
        : `https://www.youtube.com/watch?v=${v.id}`;
}
