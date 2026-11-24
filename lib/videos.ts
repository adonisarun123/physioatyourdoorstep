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
    /**
     * Optional longer write-up (key points / transcript summary) shown under the
     * player. Watch pages are thin without it — add 150–300 words per video.
     */
    summary?: string;
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

/** On-site watch page for a video — the URL Google indexes the video on. */
export function videoPagePath(id: string): string {
    return `/videos/${id}`;
}

export function getVideo(id: string): ChannelVideo | undefined {
    return CHANNEL_VIDEOS.find((v) => v.id === id);
}

/**
 * Topical cross-links for each video watch page: the closest service and
 * three articles on the same subject, so thin watch pages connect to the
 * content that answers the viewer’s next question.
 */
export const VIDEO_TOPICS: Record<string, { service: string; blogs: string[] }> = {
    "V1-EHfdn148": { service: "orthopaedic-physiotherapy", blogs: ["tennis-elbow-physiotherapy-treatment", "desk-job-syndrome-physiotherapy", "taping"] },
    "G3pr4mo7Esw": { service: "orthopaedic-physiotherapy", blogs: ["physiotherapy-for-shoulder-blade-pain", "cervical-spondylitis-physiotherapy-treatment", "orthopaedic-conditions-in-physiotherapy"] },
    "jB_UHoNLDe0": { service: "orthopaedic-physiotherapy", blogs: ["desk-job-syndrome-physiotherapy", "back-ache", "cervicogenic-headache"] },
    "y9OUgw_i54I": { service: "post-surgical-physiotherapy", blogs: ["post-operative-stiffness", "physiotherapy-in-post-surgical-rehabilitation", "adhesion-in-physiotherapy"] },
    "2oOc-DDpMj0": { service: "orthopaedic-physiotherapy", blogs: ["back-ache", "knee-pain", "musculoskeletal-and-orthopedic-physiotherapy"] },
    "lGaRJnj129Y": { service: "post-surgical-physiotherapy", blogs: ["physiotherapy-in-post-surgical-rehabilitation", "physiotherapy-exercises-after-knee-surgery", "post-operative-stiffness"] },
    "5hGblRy2VuM": { service: "orthopaedic-physiotherapy", blogs: ["back-ache", "physiotherapy-for-shoulder-blade-pain", "desk-job-syndrome-physiotherapy"] },
    "PEh9GZVKLow": { service: "orthopaedic-physiotherapy", blogs: ["plantar-fascitis", "types-of-active-and-passive-movement-in-physio", "orthopaedic-conditions-in-physiotherapy"] },
    "3Irvx-DUlnE": { service: "orthopaedic-physiotherapy", blogs: ["back-ache", "sciatica-physiotherapy", "lumbar-spondylosis-physiotherapy"] },
    "j3arQeCZBUA": { service: "sports-physiotherapy", blogs: ["sports-assessment-in-physiotherapy", "taping", "physiotherapy-for-pcl-injury"] },
    "u_5-pklRvzc": { service: "sports-physiotherapy", blogs: ["acl-reconstruction-rehabilitation", "physiotherapy-for-knee-surgery", "sports-assessment-in-physiotherapy"] },
    "O5RL77T3ZC0": { service: "post-surgical-physiotherapy", blogs: ["physiotherapy-in-post-surgical-rehabilitation", "types-of-aerobic-training-in-physiotherapy", "agonist-and-antagonist-in-physiotherapy"] },
    "-WmHuuOEkcY": { service: "orthopaedic-physiotherapy", blogs: ["cervical-spondylitis-physiotherapy-treatment", "cervicogenic-headache", "desk-job-syndrome-physiotherapy"] },
    "WXGBgUfUJkk": { service: "sports-physiotherapy", blogs: ["taping", "sports-assessment-in-physiotherapy", "physiotherapy-for-pcl-injury"] },
    "TMfLfDtduRM": { service: "orthopaedic-physiotherapy", blogs: ["musculoskeletal-and-orthopedic-physiotherapy", "back-ache", "knee-pain"] },
    "OaEMS4wKABI": { service: "post-surgical-physiotherapy", blogs: ["physiotherapy-in-post-surgical-rehabilitation", "post-operative-stiffness", "sports-assessment-in-physiotherapy"] },
    "5-Lr_rtMZcA": { service: "sports-physiotherapy", blogs: ["acl-reconstruction-rehabilitation", "physiotherapy-for-knee-surgery", "physiotherapy-exercises-after-knee-surgery"] },
    "L9o-a4K9OUc": { service: "post-surgical-physiotherapy", blogs: ["physiotherapy-after-total-knee-replacement", "physiotherapy-exercises-after-knee-surgery", "physiotherapy-for-osteoarthritis"] },
    "vrkXkR6DKFM": { service: "orthopaedic-physiotherapy", blogs: ["back-ache", "desk-job-syndrome-physiotherapy", "cervicogenic-headache"] },
    "TdazeAX58yE": { service: "sports-physiotherapy", blogs: ["acl-reconstruction-rehabilitation", "physiotherapy-for-knee-surgery", "sports-assessment-in-physiotherapy"] },
    "DesVjQESo5Q": { service: "sports-physiotherapy", blogs: ["acl-reconstruction-rehabilitation", "physiotherapy-exercises-after-knee-surgery", "physiotherapy-for-knee-surgery"] },
    "MAU3m_YMZns": { service: "orthopaedic-physiotherapy", blogs: ["physiotherapy-for-shoulder-blade-pain", "orthopaedic-conditions-in-physiotherapy", "musculoskeletal-and-orthopedic-physiotherapy"] },
    "wD6MtOPWPfY": { service: "post-surgical-physiotherapy", blogs: ["acl-reconstruction-rehabilitation", "physiotherapy-for-knee-surgery", "physiotherapy-in-post-surgical-rehabilitation"] },
};
