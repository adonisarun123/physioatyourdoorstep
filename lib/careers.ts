/**
 * Careers / hiring data for the /careers section.
 *
 * One entry per Bangalore area we actively serve — each drives a job page at
 * /careers/physiotherapist-jobs-in-<slug>. Candidates outside these areas
 * apply through the same form and pick "Other area in Bangalore".
 *
 * Keep `locationSlug` pointing at the matching patient-facing location page
 * (content/locations/*.md) so the two sections stay interlinked.
 */

import { SITE } from "@/lib/seo";

/** Date the current hiring round went live — drives JobPosting.datePosted. */
export const POSTED_ON = "2026-09-02";
/** JobPosting.validThrough. Bump this when the roles are still open. */
export const VALID_THROUGH = "2027-03-31";

export type Zone = "South Bangalore" | "East Bangalore" | "Central Bangalore";

export interface CareerArea {
    /** URL slug, without the /careers/ prefix. */
    slug: string;
    /** Area name as written on the page. */
    area: string;
    zone: Zone;
    /** Matching patient-facing location page slug (served at /<slug>). */
    locationSlug?: string;
    /** Micro-localities the physiotherapist would cover. */
    nearby: string[];
    /** 1–2 sentences of genuinely area-specific context. */
    hook: string;
    /** Case mix a physiotherapist should expect here. Framed as expectation, not measured data. */
    caseMix: string[];
}

export const CAREER_AREAS: CareerArea[] = [
    // ---------------------------------------------------------------- South
    {
        slug: "koramangala",
        area: "Koramangala",
        zone: "South Bangalore",
        locationSlug: "physiotherapist-in-koramangala",
        nearby: ["1st to 8th Block", "Ejipura", "Adugodi", "Jakkasandra", "St. John's Road"],
        hook: "Koramangala mixes startup offices and gyms with the older independent houses of 1st and 4th Block, so your day can move from a 28-year-old's shoulder impingement to an 80-year-old's post-fracture mobility work within the same two blocks.",
        caseMix: ["Desk-job neck and lower-back pain", "Gym and running injuries", "Post-operative knee and shoulder rehab", "Geriatric mobility in the older blocks"],
    },
    {
        slug: "hsr-layout",
        area: "HSR Layout",
        zone: "South Bangalore",
        locationSlug: "physiotherapist-in-hsr-layout",
        nearby: ["Sectors 1–7", "Agara", "Somasundarapalya", "27th Main", "Parangi Palya"],
        hook: "HSR has one of the city's most active running and cycling communities alongside young families in the sector apartments — and a steady stream of parents visiting from out of town who need rehab while they are here.",
        caseMix: ["Running injuries, plantar fasciitis, ITB pain", "Ante-natal and post-natal physiotherapy", "Post-operative orthopaedic rehab", "Short-course care for visiting elderly parents"],
    },
    {
        slug: "btm-layout",
        area: "BTM Layout",
        zone: "South Bangalore",
        locationSlug: "physiotherapist-in-btm-layout",
        nearby: ["1st & 2nd Stage", "Silk Board", "Madiwala", "Tavarekere", "Mico Layout"],
        hook: "BTM packs young working professionals in shared flats next to long-settled families, and the Silk Board commute itself produces a steady stream of neck, shoulder and low-back complaints.",
        caseMix: ["Commute-related neck and back pain", "Two-wheeler accident rehab", "Knee osteoarthritis in resident families", "Post-surgical follow-through"],
    },
    {
        slug: "jp-nagar",
        area: "JP Nagar",
        zone: "South Bangalore",
        locationSlug: "physiotherapist-in-jp-nagar",
        nearby: ["Phases 1–9", "Sarakki", "Puttenahalli", "Brigade Millennium", "Marenahalli"],
        hook: "JP Nagar's phases hold a large settled population that has aged in place, so a good part of the work is long-arc: knee osteoarthritis, joint replacement rehab and keeping people independent at home.",
        caseMix: ["Knee OA and post-replacement rehab", "Geriatric balance and fall prevention", "Frozen shoulder", "Post-stroke home programmes"],
    },
    {
        slug: "jayanagar",
        area: "Jayanagar",
        zone: "South Bangalore",
        locationSlug: "home-physiotherapist-in-jayanagar",
        nearby: ["3rd, 4th & 9th Block", "South End Circle", "Tilak Nagar", "Byrasandra", "Basavanagudi edge"],
        hook: "Old Bangalore at its most residential — Jayanagar has a high density of senior citizens living in family homes, and much of the caseload is neurological and geriatric rather than sports.",
        caseMix: ["Post-stroke and Parkinson's rehab", "Post total-knee-replacement programmes", "Gait and balance training", "Chronic low-back and cervical pain"],
    },
    {
        slug: "banashankari",
        area: "Banashankari",
        zone: "South Bangalore",
        locationSlug: "best-physiotherapist-in-banashankari",
        nearby: ["BSK 2nd & 3rd Stage", "Padmanabhanagar", "Kathriguppe", "Girinagar", "Uttarahalli Road"],
        hook: "Banashankari's stages are largely independent houses with multi-generational families, which means home visits often involve coaching a family member to continue the programme between sessions.",
        caseMix: ["Geriatric rehab and fall prevention", "Post-fracture mobilisation", "Knee and hip osteoarthritis", "Cervical spondylosis"],
    },
    {
        slug: "arekere",
        area: "Arekere",
        zone: "South Bangalore",
        locationSlug: "best-physiotherapist-in-arekere",
        nearby: ["Bannerghatta Road", "Omkar Nagar", "Meenakshi Temple", "Bilekahalli", "Hulimavu edge"],
        hook: "Arekere sits on the Bannerghatta Road hospital corridor, so a large share of referrals are post-discharge patients who need structured rehab continued at home in the weeks after surgery.",
        caseMix: ["Post-discharge orthopaedic rehab", "Post-operative knee and hip", "Neuro rehab continuation", "Deconditioning after long admissions"],
    },
    {
        slug: "hulimavu",
        area: "Hulimavu",
        zone: "South Bangalore",
        locationSlug: "home-physiotherapist-in-hulimavu",
        nearby: ["Bannerghatta Road", "Gottigere", "Kalena Agrahara", "Vijaya Bank Layout", "Royal Residency"],
        hook: "Gated communities along Bannerghatta Road with a mix of retired residents and IT families — visits cluster well here, so a part-time physiotherapist can see several patients in one apartment complex.",
        caseMix: ["Geriatric mobility and balance", "Desk-posture cervical pain", "Post-operative rehab", "Paediatric developmental therapy"],
    },
    {
        slug: "begur",
        area: "Begur",
        zone: "South Bangalore",
        locationSlug: "best-physiotherapist-in-begur",
        nearby: ["Begur Road", "Hongasandra", "Bommanahalli", "Yelenahalli", "Akshayanagar"],
        hook: "Begur has grown fast around the Hosur Road corridor, and the mix of new apartments and older village-side homes gives a genuinely broad caseload for a physiotherapist building experience.",
        caseMix: ["Low-back pain in commuting workers", "Post-operative orthopaedic rehab", "Geriatric home care", "Sports and gym injuries"],
    },
    {
        slug: "kudlu",
        area: "Kudlu",
        zone: "South Bangalore",
        locationSlug: "best-physiotherapist-in-kudlu",
        nearby: ["Kudlu Gate", "Singasandra", "Hosa Road", "Parappana Agrahara", "HSR fringe"],
        hook: "Kudlu Gate's apartment belt houses IT workers on the Electronic City run — evening and early-morning slots are what patients here actually ask for, which suits candidates wanting flexible hours.",
        caseMix: ["Sedentary posture and neck pain", "Post-surgical knee rehab", "Sciatica and disc-related pain", "Elderly parents in joint families"],
    },
    {
        slug: "ejipura",
        area: "Ejipura",
        zone: "South Bangalore",
        locationSlug: "physiotherapist-in-ejipura",
        nearby: ["Viveknagar", "Koramangala 6th Block", "Austin Town", "Neelasandra", "Sarjapur Road start"],
        hook: "Ejipura sits between Koramangala and the Inner Ring Road, so travel time between patients is short — useful for a freelancer who wants to fit three or four visits into a half-day.",
        caseMix: ["Musculoskeletal back and knee pain", "Post-fracture rehab", "Work-injury recovery", "Geriatric home visits"],
    },
    {
        slug: "electronic-city",
        area: "Electronic City",
        zone: "South Bangalore",
        locationSlug: "best-physiotherapist-in-electronic-city",
        nearby: ["Phase 1 & 2", "Neeladri Nagar", "Konappana Agrahara", "Hebbagodi", "Chandapura"],
        hook: "A tech township with large residential blocks attached — patients here are overwhelmingly desk workers whose complaints start postural, plus their parents living with them.",
        caseMix: ["Cervical and thoracic postural pain", "Carpal tunnel and repetitive strain", "Post-operative rehab", "Geriatric care in family homes"],
    },

    // ----------------------------------------------------------------- East
    {
        slug: "indiranagar",
        area: "Indiranagar",
        zone: "East Bangalore",
        locationSlug: "physiotherapist-in-indiranagar",
        nearby: ["100 Ft Road", "Defence Colony", "Jeevan Bhima Nagar", "Ulsoor", "CV Raman Nagar"],
        hook: "Indiranagar's older independent houses hold a lot of long-term senior residents, while the newer apartments bring in young professionals — expect to switch registers between the two in the same day.",
        caseMix: ["Geriatric home rehabilitation", "Frozen shoulder and rotator cuff", "Post-fracture and post-operative care", "Sports and fitness injuries"],
    },
    {
        slug: "domlur",
        area: "Domlur",
        zone: "East Bangalore",
        locationSlug: "physiotherapist-in-domlur",
        nearby: ["Amarjyoti Layout", "Old Airport Road", "Indiranagar edge", "Ejipura", "Konena Agrahara"],
        hook: "Compact and central-east, Domlur is well placed for a physiotherapist who also covers Indiranagar or Koramangala — the three sit within a short ride of each other.",
        caseMix: ["Office-related neck and back pain", "Post-operative orthopaedic rehab", "Geriatric mobility", "Sports injuries"],
    },
    {
        slug: "whitefield",
        area: "Whitefield",
        zone: "East Bangalore",
        locationSlug: "best-physiotherapist-in-whitefield",
        nearby: ["ITPL", "Brookefield", "Kadugodi", "Hoodi", "Varthur Road"],
        hook: "Whitefield's villa communities and large gated townships include a substantial retired population living close to the tech parks — the case mix here leans more towards post-surgical and neurological rehab than it does elsewhere in the east.",
        caseMix: ["Post-operative joint replacement rehab", "Stroke and neuro rehabilitation", "Geriatric strength and balance", "Corporate posture-related pain"],
    },
    {
        slug: "marathahalli",
        area: "Marathahalli",
        zone: "East Bangalore",
        locationSlug: "best-physiotherapist-in-marathahalli",
        nearby: ["AECS Layout", "Kundalahalli", "Munnekollal", "Outer Ring Road", "Doddanekkundi"],
        hook: "Sitting on the Outer Ring Road, Marathahalli is dense with working professionals in rented apartments — appointments concentrate in the early morning and after 7 PM, which is ideal for part-time candidates.",
        caseMix: ["ORR commute-related back and neck pain", "Two-wheeler injury rehab", "Post-surgical knee and shoulder", "Elderly home care"],
    },
    {
        slug: "bellandur",
        area: "Bellandur",
        zone: "East Bangalore",
        locationSlug: "best-physiotherapist-in-bellandur",
        nearby: ["Ecospace", "Devarabisanahalli", "Kaikondrahalli", "Green Glen Layout", "Kadubeesanahalli"],
        hook: "High-rise apartment living around the Ecospace corridor means several patients often live in the same tower cluster — good for building a compact, repeatable visit route.",
        caseMix: ["Work-from-home posture pain", "Knee and lower-back complaints", "Ante-natal and post-natal care", "Post-operative rehab"],
    },
    {
        slug: "sarjapur-road",
        area: "Sarjapur Road",
        zone: "East Bangalore",
        locationSlug: "physiotherapist-in-sarjapur-road",
        nearby: ["Kaikondrahalli", "Dommasandra", "Carmelaram", "Harlur", "Ambalipura"],
        hook: "The Sarjapur corridor is one of the fastest-growing young-family belts in the city, so paediatric and post-natal work sits alongside the usual musculoskeletal caseload.",
        caseMix: ["Paediatric and developmental therapy", "Post-natal recovery", "Sports and fitness injuries", "Post-operative orthopaedic rehab"],
    },
    {
        slug: "haralur",
        area: "Haralur",
        zone: "East Bangalore",
        locationSlug: "physiotherapist-in-haralur",
        nearby: ["Haralur Road", "Ambalipura", "HSR Sector 6", "Kudlu Gate", "Somasundarapalya"],
        hook: "Haralur Road's apartment belt sits between HSR and Sarjapur Road, so a physiotherapist based here can realistically cover three high-demand areas without long travel.",
        caseMix: ["Musculoskeletal back and knee pain", "Post-surgical rehab", "Geriatric home programmes", "Sports injuries"],
    },
    {
        slug: "varthur",
        area: "Varthur",
        zone: "East Bangalore",
        locationSlug: "best-physiotherapist-in-varthur",
        nearby: ["Varthur Kodi", "Gunjur", "Panathur", "Whitefield edge", "Siddapura"],
        hook: "Varthur has shifted quickly from village-side housing to large apartment projects, and the patient mix reflects both — older residents with chronic joint problems and younger families with acute injuries.",
        caseMix: ["Chronic knee and hip osteoarthritis", "Post-fracture mobilisation", "Desk-work postural pain", "Home-based neuro rehab"],
    },
    {
        slug: "gunjur",
        area: "Gunjur",
        zone: "East Bangalore",
        locationSlug: "best-physiotherapist-in-gunjur",
        nearby: ["Gunjur Palya", "Panathur", "Balagere", "Varthur", "Whitefield edge"],
        hook: "Villa and township living off Varthur Road, where families often want a physiotherapist who can commit to a fixed weekly slot rather than one-off visits.",
        caseMix: ["Post-operative rehab", "Geriatric mobility", "Paediatric therapy", "Sports and recreational injuries"],
    },
    {
        slug: "kadubeesanahalli",
        area: "Kadubeesanahalli",
        zone: "East Bangalore",
        locationSlug: "best-physiotherapist-in-kadubeesanahalli",
        nearby: ["Panathur", "Devarabisanahalli", "Bellandur", "Marathahalli bridge", "Green Glen"],
        hook: "Right on the ORR tech corridor — patients are mostly IT professionals and their families, and evening slots fill first.",
        caseMix: ["Postural neck and back pain", "Repetitive strain", "Post-surgical knee rehab", "Ante-natal and post-natal physiotherapy"],
    },

    // -------------------------------------------------------------- Central
    {
        slug: "shivajinagar",
        area: "Shivajinagar",
        zone: "Central Bangalore",
        locationSlug: "physiotherapist-in-shivajinagar",
        nearby: ["Commercial Street", "Cantonment", "Vasanth Nagar", "Frazer Town edge", "Cunningham Road"],
        hook: "Central Bangalore's older housing stock and the concentration of hospitals nearby mean a good share of the work is post-discharge rehabilitation for patients who cannot easily travel back to a clinic.",
        caseMix: ["Post-discharge and post-operative rehab", "Geriatric home care", "Neurological rehabilitation", "Chronic pain management"],
    },
    {
        slug: "ashok-nagar",
        area: "Ashok Nagar",
        zone: "Central Bangalore",
        locationSlug: "physiotherapist-in-ashok-nagar",
        nearby: ["Richmond Town", "Residency Road", "MG Road", "Shanthala Nagar", "Langford Town"],
        hook: "A compact central pocket with older residential buildings and easy access across the city centre — visits are short-distance, which suits a freelancer stacking several appointments in a morning.",
        caseMix: ["Geriatric rehabilitation", "Post-operative orthopaedic care", "Chronic back and neck pain", "Post-stroke home programmes"],
    },
];

export const ZONES: Zone[] = ["South Bangalore", "East Bangalore", "Central Bangalore"];

export function getAllCareerAreas(): CareerArea[] {
    return CAREER_AREAS;
}

export function getCareerArea(slug: string): CareerArea | undefined {
    return CAREER_AREAS.find((a) => a.slug === slug);
}

export function areasByZone(zone: Zone): CareerArea[] {
    return CAREER_AREAS.filter((a) => a.zone === zone);
}

/** Full page path for an area's job posting. */
export function careerPath(slug: string): string {
    return `/careers/physiotherapist-jobs-in-${slug}`;
}

/* ------------------------------------------------------------------ Role */

export const EMPLOYMENT_TYPES = [
    {
        id: "full-time",
        label: "Full-time",
        schemaType: "FULL_TIME",
        summary: "A fixed patient load in one area, with a predictable weekly schedule and the team behind you.",
        points: [
            "Assigned to a home area so travel stays short",
            "Consistent caseload across ortho, neuro and geriatric rehab",
            "Clinical support from senior physiotherapists",
        ],
    },
    {
        id: "part-time",
        label: "Part-time",
        schemaType: "PART_TIME",
        summary: "Fixed slots that fit around clinic hours, academics or family — mornings or evenings, you choose.",
        points: [
            "Choose your available days and time bands",
            "Ideal alongside a clinic job or MPT studies",
            "Same clinical support and protocols as full-time",
        ],
    },
    {
        id: "freelance",
        label: "Freelance / Visiting",
        schemaType: "CONTRACTOR",
        summary: "Take cases as they come, in the areas you already travel through. Paid per visit.",
        points: [
            "Accept or decline each case",
            "Work the areas closest to you",
            "No exclusivity — keep your own practice running",
        ],
    },
] as const;

/** Shared across every job page — one definition, so the roles never drift. */
export const RESPONSIBILITIES = [
    "Assess patients at home and build an individualised treatment plan",
    "Deliver hands-on physiotherapy — manual therapy, exercise prescription, mobilisation and modalities as indicated",
    "Track progress across sessions and adjust the programme as the patient improves",
    "Teach patients and their families the home exercise programme so gains hold between visits",
    "Coordinate with referring doctors and the clinical team where a case needs escalation",
    "Keep clear, timely session notes for every patient",
];

export const REQUIREMENTS = [
    "BPT (Bachelor of Physiotherapy) minimum — MPT preferred",
    "1–2 years of hands-on clinical experience",
    "Own two-wheeler and a smartphone — home visits mean travelling within your area",
    "Comfortable working independently in a patient's home, without a clinic setup around you",
    "Professional, punctual and able to communicate a treatment plan in plain language",
];

export const WHAT_WE_OFFER = [
    "Patients brought to you — no cold outreach, no marketing spend of your own",
    "Work in your own area, so travel time stays low",
    "Clinical mentoring from senior physiotherapists and structured treatment protocols",
    "Exposure across sports, post-operative, orthopaedic, neurological, geriatric and paediatric rehab",
    "Flexible schedules — full-time, part-time or per-visit freelance",
    "A team of 300+ physiotherapists across Bangalore and Pune to learn from",
];

/** Shared job description used in JobPosting schema. */
export function jobDescriptionHtml(area: string): string {
    return [
        `<p>${SITE.name} is hiring qualified physiotherapists for home-visit rehabilitation in ${area}, Bangalore. Full-time, part-time and freelance (per-visit) engagements are available.</p>`,
        `<p><strong>Responsibilities:</strong></p><ul>${RESPONSIBILITIES.map((r) => `<li>${r}</li>`).join("")}</ul>`,
        `<p><strong>Requirements:</strong></p><ul>${REQUIREMENTS.map((r) => `<li>${r}</li>`).join("")}</ul>`,
        `<p><strong>What we offer:</strong></p><ul>${WHAT_WE_OFFER.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    ].join("");
}
