/**
 * Google Reviews data for the "Google Reviews" section.
 *
 * Rating, count, review texts and photos were pulled from the live Google
 * Business listing ("Physio At Your Doorstep - Bangalore") on 2026-07-11.
 * Update `rating` / `count` here whenever they change on Google.
 */
import { SITE } from "@/lib/seo";

export const GOOGLE_RATING = {
    rating: 4.9,
    count: 468,
    url: SITE.googleReviews,
} as const;

export interface GoogleReview {
    name: string;
    text: string;
}

/** Verbatim (lightly trimmed) 5-star reviews from the Google listing. */
export const GOOGLE_REVIEW_ITEMS: GoogleReview[] = [
    {
        name: "Yogendiran Rajshekharan",
        text: "I underwent meniscus surgery, and Dr. Deepika Patel has been instrumental in my recovery. She is patient, knowledgeable, and always takes the time to answer questions and clear doubts. Thanks to her expertise and support, I have had an excellent recovery. Highly recommended!",
    },
    {
        name: "Bharath Raghunath",
        text: "Dr. Ali has been my physiotherapist for about 1.5 months after my ACL surgery, and I'm really grateful for his support. He's patient, knowledgeable, and always made sure I was progressing at the right pace without pushing too hard.",
    },
    {
        name: "Deepa Nayak",
        text: "Kuldip from Physio At Your Doorstep has been helping me with my physiotherapy post meniscus surgery. Started with simple movements and now in 4 months almost healed. Thanks for patiently working and giving me the right kind of workouts to recover.",
    },
    {
        name: "Sunethra Emely",
        text: "I underwent ankle fracture surgery and got connected with Physio At Your Doorstep. Dr. Ali was very professional, patient and very punctual. Every session made me comfortable and gain confidence. Within 10 days I noticed a great improvement.",
    },
    {
        name: "Abhay Aggarwal",
        text: "I had a severe back muscle spasm and couldn't even get up from bed. Dr. Shehnaaz was assigned to me for home physiotherapy and I took a course of 10 days, and as of now I feel so much better.",
    },
    {
        name: "Ira Sahu",
        text: "I got my post-surgical physiotherapy from Dr. Assraf. Following my surgery, he guided me through the rehab process until I had full strength and range of motion back in my knee.",
    },
    {
        name: "Neha",
        text: "Tejaswini had come for my physiotherapy and I had a really rejuvenating time. She was very thorough about what she was going to do and made sure I knew how she will fix my shoulder pain.",
    },
    {
        name: "Ashi Gupta",
        text: "I'm very thankful for the physiotherapy sessions with Dr. Atharva Mishra. He helped my cousin recover after ACL avulsion surgery with clear guidance, patience, and effective exercises.",
    },
    {
        name: "Prayna Sharma",
        text: "Dr. Atharva is one of the best physiotherapists, whose expertise is commendable. His communication style and work techniques are best to cure a person's injury. Highly recommended.",
    },
];

/** Photos from the Google listing — real patients & sessions. */
export const REVIEW_PHOTOS: { src: string; alt: string }[] = [
    { src: "/images/reviews/patient-gym-rehab.webp", alt: "Patient doing balance and strength rehab under supervision" },
    { src: "/images/reviews/patient-post-surgery.webp", alt: "Post-surgery patient beginning recovery" },
    { src: "/images/reviews/patient-home-exercise.webp", alt: "Patient doing guided exercises at home" },
    { src: "/images/reviews/doctor-explaining.webp", alt: "Physiotherapist explaining a treatment plan" },
    { src: "/images/reviews/patient-strength-training.webp", alt: "Patient doing strength training during rehabilitation" },
    { src: "/images/reviews/patient-stretching.webp", alt: "Patient doing a guided quadriceps stretch" },
];
