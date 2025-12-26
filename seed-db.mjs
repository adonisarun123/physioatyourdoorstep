import { drizzle } from 'drizzle-orm/mysql2';
import { services, locations, blogs, categories } from './drizzle/schema.js';
import 'dotenv/config';

const db = drizzle(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Starting database seeding...');

  // Seed categories
  console.log('📁 Seeding categories...');
  const categoryData = [
    { slug: 'physiotherapy', name: 'Physiotherapy', description: 'General physiotherapy articles and information' },
    { slug: 'neurological-physiotherapy', name: 'Neurological Physiotherapy', description: 'Neurological conditions and treatments' },
    { slug: 'geriatric-physiotherapy', name: 'Geriatric Physiotherapy', description: 'Physiotherapy for elderly patients' },
    { slug: 'pediatric-physiotherapy', name: 'Pediatric Physiotherapy', description: 'Physiotherapy for children' },
    { slug: 'pulmonary-physiotherapy', name: 'Pulmonary Physiotherapy', description: 'Respiratory and lung-related physiotherapy' },
    { slug: 'post-surgical-physiotherapy', name: 'Post-Surgical Physiotherapy', description: 'Rehabilitation after surgery' },
    { slug: 'physiotherapy-at-pregnancy', name: 'Physiotherapy at Pregnancy', description: 'Physiotherapy during pregnancy' },
    { slug: 'orthopaedic-physiotheraphy', name: 'Orthopaedic Physiotherapy', description: 'Musculoskeletal and bone-related physiotherapy' },
    { slug: 'sports-physiotherapy', name: 'Sports Physiotherapy', description: 'Sports injuries and athletic performance' },
  ];
  
  for (const cat of categoryData) {
    await db.insert(categories).values(cat).onDuplicateKeyUpdate({ set: { name: cat.name } });
  }

  // Seed services
  console.log('💼 Seeding services...');
  const serviceData = [
    {
      slug: 'sports-physiotherapy',
      title: 'Sports Physiotherapy',
      metaTitle: 'Sports Physiotherapy at Home | Physio At Your Doorstep',
      metaDescription: 'Professional sports physiotherapy services at your doorstep. Expert treatment for sports injuries, performance enhancement, and injury prevention.',
      heroHeadline: 'Sports Physiotherapy',
      heroSubheadline: 'Expert care for athletes and sports enthusiasts to recover from injuries and enhance performance',
      content: '<h2>What is Sports Physiotherapy?</h2><p>Sports physiotherapy is a specialized branch of physiotherapy that focuses on the prevention, treatment, and rehabilitation of sports-related injuries. Our expert therapists work with athletes of all levels to optimize performance and ensure safe return to sport.</p><h2>Who Benefits?</h2><ul><li>Professional and amateur athletes</li><li>Weekend warriors and fitness enthusiasts</li><li>Individuals recovering from sports injuries</li><li>Those looking to prevent future injuries</li></ul><h2>Our Approach</h2><p>We provide comprehensive assessment, personalized treatment plans, and ongoing support to help you achieve your athletic goals safely and effectively.</p>',
      faqs: [
        { q: 'How soon can I return to sports after an injury?', a: 'Return to sport timing varies based on injury severity and type. Our physiotherapists will create a progressive rehabilitation program and guide you through each phase safely.' },
        { q: 'Can sports physiotherapy help prevent injuries?', a: 'Yes! We provide injury prevention programs including strength training, flexibility exercises, and biomechanical assessments to reduce injury risk.' },
      ],
    },
    {
      slug: 'pulmonary-physiotherapy',
      title: 'Pulmonary Physiotherapy',
      metaTitle: 'Pulmonary Physiotherapy at Home | Respiratory Care',
      metaDescription: 'Expert pulmonary physiotherapy services for respiratory conditions. Breathing exercises, chest physiotherapy, and lung rehabilitation at your doorstep.',
      heroHeadline: 'Pulmonary Physiotherapy',
      heroSubheadline: 'Specialized respiratory care to improve breathing and lung function',
      content: '<h2>Pulmonary Rehabilitation</h2><p>Pulmonary physiotherapy focuses on improving respiratory function and managing breathing difficulties. Our therapists use evidence-based techniques to help patients with various lung conditions breathe easier and improve quality of life.</p><h2>Conditions We Treat</h2><ul><li>Chronic Obstructive Pulmonary Disease (COPD)</li><li>Asthma</li><li>Post-COVID respiratory issues</li><li>Pneumonia recovery</li><li>Bronchitis</li></ul><h2>Treatment Techniques</h2><p>We employ breathing exercises, chest physiotherapy, postural drainage, and airway clearance techniques tailored to your specific needs.</p>',
      faqs: [
        { q: 'How does pulmonary physiotherapy help?', a: 'It helps clear mucus from lungs, improves breathing efficiency, strengthens respiratory muscles, and enhances overall lung capacity.' },
        { q: 'Is it suitable for COVID recovery?', a: 'Yes, pulmonary physiotherapy is highly effective for post-COVID respiratory rehabilitation and recovery.' },
      ],
    },
    {
      slug: 'post-surgical-physiotherapy',
      title: 'Post-Surgical Physiotherapy',
      metaTitle: 'Post-Surgical Physiotherapy | Rehabilitation After Surgery',
      metaDescription: 'Professional post-surgical physiotherapy and rehabilitation services at home. Expert care for faster recovery after surgery.',
      heroHeadline: 'Post-Surgical Physiotherapy',
      heroSubheadline: 'Comprehensive rehabilitation to ensure optimal recovery after surgery',
      content: '<h2>Post-Surgical Rehabilitation</h2><p>Post-surgical physiotherapy is crucial for optimal recovery after any surgical procedure. Our specialized programs help restore function, reduce pain, prevent complications, and accelerate healing.</p><h2>Surgeries We Support</h2><ul><li>Orthopedic surgeries (joint replacements, ACL repair)</li><li>Cardiac surgeries</li><li>Abdominal surgeries</li><li>Spinal surgeries</li><li>Sports-related surgeries</li></ul><h2>Recovery Benefits</h2><p>Early mobilization, pain management, scar tissue prevention, strength restoration, and functional independence.</p>',
      faqs: [
        { q: 'When should I start physiotherapy after surgery?', a: 'Timing depends on the surgery type. Generally, physiotherapy can begin within 24-48 hours post-surgery with gentle exercises, progressing as healing occurs.' },
        { q: 'Will physiotherapy be painful?', a: 'Some discomfort is normal, but treatment should not cause severe pain. We work within your comfort levels and adjust intensity accordingly.' },
      ],
    },
    {
      slug: 'physiotherapy-in-pregnancy',
      title: 'Physiotherapy in Pregnancy',
      metaTitle: 'Pregnancy Physiotherapy | Prenatal & Postnatal Care',
      metaDescription: 'Safe and effective physiotherapy for pregnancy-related issues. Expert prenatal and postnatal care at your home.',
      heroHeadline: 'Physiotherapy in Pregnancy',
      heroSubheadline: 'Safe, effective care for expectant and new mothers',
      content: '<h2>Prenatal & Postnatal Care</h2><p>Pregnancy physiotherapy helps manage common pregnancy-related discomforts and prepares your body for childbirth. Our gentle, evidence-based approach ensures safety for both mother and baby.</p><h2>Common Issues We Address</h2><ul><li>Lower back pain and pelvic pain</li><li>Sciatica</li><li>Carpal tunnel syndrome</li><li>Diastasis recti</li><li>Pelvic floor dysfunction</li></ul><h2>Postnatal Recovery</h2><p>We provide specialized postnatal physiotherapy to help restore core strength, pelvic floor function, and overall fitness after delivery.</p>',
      faqs: [
        { q: 'Is physiotherapy safe during pregnancy?', a: 'Yes, pregnancy physiotherapy is completely safe when performed by trained professionals. We use gentle techniques specifically designed for expectant mothers.' },
        { q: 'When can I start postnatal physiotherapy?', a: 'You can begin gentle exercises within days of delivery, with more intensive rehabilitation starting after your 6-week checkup.' },
      ],
    },
    {
      slug: 'pediatric-physiotherapy',
      title: 'Pediatric Physiotherapy',
      metaTitle: 'Pediatric Physiotherapy | Child Physiotherapy at Home',
      metaDescription: 'Specialized pediatric physiotherapy services for children. Expert developmental care and rehabilitation at your doorstep.',
      heroHeadline: 'Pediatric Physiotherapy',
      heroSubheadline: 'Specialized care for children with developmental and physical challenges',
      content: '<h2>Child-Centered Care</h2><p>Pediatric physiotherapy focuses on helping children achieve their maximum physical potential. Our therapists use play-based approaches to make therapy engaging and effective.</p><h2>Conditions We Treat</h2><ul><li>Cerebral palsy</li><li>Developmental delays</li><li>Muscular dystrophy</li><li>Down syndrome</li><li>Sports injuries in children</li><li>Postural issues</li></ul><h2>Our Approach</h2><p>We work closely with families to create fun, effective treatment programs that promote independence and confidence in children.</p>',
      faqs: [
        { q: 'At what age can children start physiotherapy?', a: 'Physiotherapy can begin from infancy. Early intervention often leads to better outcomes for developmental conditions.' },
        { q: 'How long does pediatric physiotherapy take?', a: 'Duration varies based on the condition and goals. Some children need short-term intervention, while others benefit from ongoing support.' },
      ],
    },
    {
      slug: 'orthopaedic-physiotherapy',
      title: 'Orthopaedic Physiotherapy',
      metaTitle: 'Orthopaedic Physiotherapy | Musculoskeletal Treatment',
      metaDescription: 'Expert orthopaedic physiotherapy for bone, joint, and muscle conditions. Professional treatment at your home.',
      heroHeadline: 'Orthopaedic Physiotherapy',
      heroSubheadline: 'Comprehensive care for musculoskeletal conditions and injuries',
      content: '<h2>Musculoskeletal Expertise</h2><p>Orthopaedic physiotherapy addresses conditions affecting bones, joints, muscles, ligaments, and tendons. Our evidence-based treatments help restore function and reduce pain.</p><h2>Common Conditions</h2><ul><li>Arthritis</li><li>Back and neck pain</li><li>Joint replacements</li><li>Fractures</li><li>Tendonitis</li><li>Ligament injuries</li></ul><h2>Treatment Methods</h2><p>Manual therapy, therapeutic exercises, pain management techniques, and functional rehabilitation tailored to your specific needs.</p>',
      faqs: [
        { q: 'How many sessions will I need?', a: 'This depends on your condition severity and goals. Most patients see improvement within 4-6 weeks, though some conditions require longer treatment.' },
        { q: 'Can physiotherapy help avoid surgery?', a: 'In many cases, yes. Physiotherapy can effectively manage conditions that might otherwise require surgery, though this depends on individual circumstances.' },
      ],
    },
    {
      slug: 'online-physiotherapy-consultation-india',
      title: 'Online Physiotherapy Consultation',
      metaTitle: 'Online Physiotherapy Consultation India | Virtual Physio',
      metaDescription: 'Professional online physiotherapy consultations across India. Expert virtual assessment and treatment guidance from home.',
      heroHeadline: 'Online Physiotherapy Consultation',
      heroSubheadline: 'Expert physiotherapy guidance from the comfort of your home',
      content: '<h2>Virtual Physiotherapy</h2><p>Our online physiotherapy consultations provide expert assessment, treatment guidance, and exercise programs through secure video calls. Access professional care from anywhere in India.</p><h2>What We Offer</h2><ul><li>Initial assessment and diagnosis</li><li>Personalized exercise programs</li><li>Progress monitoring</li><li>Treatment advice</li><li>Injury prevention guidance</li></ul><h2>How It Works</h2><p>Book a session, connect via video call, receive your personalized treatment plan, and follow up as needed. Simple, convenient, and effective.</p>',
      faqs: [
        { q: 'Is online physiotherapy as effective as in-person?', a: 'For many conditions, yes. Online consultations are particularly effective for exercise prescription, education, and ongoing management.' },
        { q: 'What equipment do I need?', a: 'Just a smartphone, tablet, or computer with internet connection and camera. We will guide you through exercises using items you have at home.' },
      ],
    },
    {
      slug: 'neurological-physiotherapy',
      title: 'Neurological Physiotherapy',
      metaTitle: 'Neurological Physiotherapy | Neuro Rehabilitation at Home',
      metaDescription: 'Specialized neurological physiotherapy for stroke, Parkinson\'s, and other neurological conditions. Expert neuro rehab at your doorstep.',
      heroHeadline: 'Neurological Physiotherapy',
      heroSubheadline: 'Specialized rehabilitation for neurological conditions',
      content: '<h2>Neuro Rehabilitation</h2><p>Neurological physiotherapy helps individuals with nervous system disorders improve movement, function, and independence. Our specialized therapists use advanced techniques for optimal recovery.</p><h2>Conditions We Treat</h2><ul><li>Stroke recovery</li><li>Parkinson\'s disease</li><li>Multiple sclerosis</li><li>Spinal cord injuries</li><li>Traumatic brain injury</li><li>Peripheral neuropathy</li></ul><h2>Treatment Focus</h2><p>Improving mobility, balance, coordination, strength, and functional independence through evidence-based neurological rehabilitation techniques.</p>',
      faqs: [
        { q: 'How soon after stroke should physiotherapy start?', a: 'As soon as medically stable, often within 24-48 hours. Early intervention significantly improves recovery outcomes.' },
        { q: 'Can neurological conditions be fully recovered?', a: 'Recovery varies by condition and severity. While some achieve full recovery, others see significant functional improvements that enhance quality of life.' },
      ],
    },
    {
      slug: 'geriatric-physiotherapy',
      title: 'Geriatric Physiotherapy',
      metaTitle: 'Geriatric Physiotherapy | Elderly Care at Home',
      metaDescription: 'Specialized physiotherapy for elderly patients. Expert geriatric care focusing on mobility, balance, and independence at home.',
      heroHeadline: 'Geriatric Physiotherapy',
      heroSubheadline: 'Compassionate care to help seniors maintain independence and quality of life',
      content: '<h2>Senior Care Expertise</h2><p>Geriatric physiotherapy addresses the unique needs of older adults, focusing on maintaining mobility, preventing falls, managing chronic conditions, and promoting independence.</p><h2>Common Issues</h2><ul><li>Balance and fall prevention</li><li>Arthritis management</li><li>Osteoporosis</li><li>Post-stroke rehabilitation</li><li>General weakness and deconditioning</li><li>Joint replacements</li></ul><h2>Our Approach</h2><p>Gentle, respectful care that considers individual capabilities and goals. We work to improve strength, balance, and confidence for better quality of life.</p>',
      faqs: [
        { q: 'Is physiotherapy safe for elderly patients?', a: 'Yes, geriatric physiotherapy is specifically designed for older adults with appropriate exercises and safety precautions.' },
        { q: 'Can it help prevent falls?', a: 'Absolutely. Balance training and strength exercises significantly reduce fall risk in elderly individuals.' },
      ],
    },
    {
      slug: 'corporate-wellness-physiotherapy-program',
      title: 'Corporate Wellness Physiotherapy Program',
      metaTitle: 'Corporate Wellness Physiotherapy | Workplace Health Programs',
      metaDescription: 'Comprehensive corporate wellness physiotherapy programs. Improve employee health, reduce workplace injuries, and boost productivity.',
      heroHeadline: 'Corporate Wellness Physiotherapy',
      heroSubheadline: 'Comprehensive workplace health programs for healthier, more productive teams',
      content: '<h2>Workplace Wellness</h2><p>Our corporate wellness programs help organizations create healthier work environments, reduce absenteeism, prevent workplace injuries, and improve employee wellbeing.</p><h2>Program Components</h2><ul><li>Ergonomic assessments</li><li>Workstation setup optimization</li><li>Group exercise sessions</li><li>Injury prevention workshops</li><li>Stress management techniques</li><li>Individual consultations</li></ul><h2>Benefits</h2><p>Reduced workplace injuries, improved productivity, lower healthcare costs, enhanced employee morale, and decreased absenteeism.</p>',
      faqs: [
        { q: 'How is the program delivered?', a: 'We offer on-site visits, virtual sessions, or hybrid programs tailored to your organization\'s needs and schedule.' },
        { q: 'What size companies do you work with?', a: 'We work with organizations of all sizes, from small startups to large corporations, customizing programs to fit your needs.' },
      ],
    },
  ];

  for (const service of serviceData) {
    await db.insert(services).values(service).onDuplicateKeyUpdate({ set: { title: service.title } });
  }

  // Seed locations
  console.log('📍 Seeding locations...');
  const locationData = [
    {
      slug: 'best-physiotherapist-in-laxmi-chowk',
      title: 'Best Physiotherapist in Laxmi Chowk',
      city: 'Pune',
      area: 'Laxmi Chowk',
      metaTitle: 'Best Physiotherapist in Laxmi Chowk | Home Visit Physio',
      metaDescription: 'Find the best physiotherapist in Laxmi Chowk, Pune. Professional home visit physiotherapy services with experienced therapists.',
      content: '<p>Looking for expert physiotherapy services in Laxmi Chowk? Our qualified physiotherapists provide comprehensive treatment at your doorstep, ensuring convenient and effective care for all your rehabilitation needs.</p>',
    },
    {
      slug: 'best-physiotherapist-in-baner',
      title: 'Best Physiotherapist in Baner',
      city: 'Pune',
      area: 'Baner',
      metaTitle: 'Best Physiotherapist in Baner | Home Physiotherapy Pune',
      metaDescription: 'Professional physiotherapy services in Baner, Pune. Expert home visit physiotherapists for all your rehabilitation needs.',
      content: '<p>Get expert physiotherapy care in Baner with our professional home visit services. Our experienced therapists provide personalized treatment plans for faster recovery.</p>',
    },
    {
      slug: 'best-physiotherapist-in-bellandur',
      title: 'Best Physiotherapist in Bellandur',
      city: 'Bangalore',
      area: 'Bellandur',
      metaTitle: 'Best Physiotherapist in Bellandur | Home Visit Physio Bangalore',
      metaDescription: 'Expert physiotherapy services in Bellandur, Bangalore. Professional home visit physiotherapists for comprehensive rehabilitation care.',
      content: '<p>Experience professional physiotherapy services in Bellandur with our qualified therapists. We bring expert care to your home for convenient and effective treatment.</p>',
    },
    {
      slug: 'best-physiotherapist-in-whitefield',
      title: 'Best Physiotherapist in Whitefield',
      city: 'Bangalore',
      area: 'Whitefield',
      metaTitle: 'Best Physiotherapist in Whitefield | Home Physiotherapy',
      metaDescription: 'Professional physiotherapy services in Whitefield, Bangalore. Expert home visit care for all rehabilitation needs.',
      content: '<p>Our expert physiotherapists in Whitefield provide comprehensive home visit services for all your rehabilitation needs. Convenient, professional, and effective care.</p>',
    },
    {
      slug: 'best-physiotherapist-in-kudlu-2',
      title: 'Best Physiotherapist in Kudlu',
      city: 'Bangalore',
      area: 'Kudlu',
      metaTitle: 'Best Physiotherapist in Kudlu | Home Visit Physio',
      metaDescription: 'Expert physiotherapy services in Kudlu, Bangalore. Professional home visit physiotherapists for effective rehabilitation.',
      content: '<p>Get professional physiotherapy care in Kudlu with our experienced home visit therapists. Personalized treatment plans for optimal recovery.</p>',
    },
    {
      slug: 'best-physiotherapist-in-hinjewadi',
      title: 'Best Physiotherapist in Hinjewadi',
      city: 'Pune',
      area: 'Hinjewadi',
      metaTitle: 'Best Physiotherapist in Hinjewadi | Home Physiotherapy Pune',
      metaDescription: 'Professional physiotherapy services in Hinjewadi, Pune. Expert home visit care for comprehensive rehabilitation.',
      content: '<p>Professional physiotherapy services in Hinjewadi with experienced therapists providing home visit care. Convenient and effective treatment for all conditions.</p>',
    },
    {
      slug: 'best-physiotherapist-in-balewadi',
      title: 'Best Physiotherapist in Balewadi',
      city: 'Pune',
      area: 'Balewadi',
      metaTitle: 'Best Physiotherapist in Balewadi | Home Visit Physio Pune',
      metaDescription: 'Expert physiotherapy services in Balewadi, Pune. Professional home visit physiotherapists for all rehabilitation needs.',
      content: '<p>Experience expert physiotherapy care in Balewadi with our professional home visit services. Personalized treatment for faster recovery.</p>',
    },
    {
      slug: 'best-physiotherapist-in-vishal-nagar',
      title: 'Best Physiotherapist in Vishal Nagar',
      city: 'Pune',
      area: 'Vishal Nagar',
      metaTitle: 'Best Physiotherapist in Vishal Nagar | Home Physiotherapy',
      metaDescription: 'Professional physiotherapy services in Vishal Nagar, Pune. Expert home visit care for effective rehabilitation.',
      content: '<p>Get professional physiotherapy services in Vishal Nagar with our qualified home visit therapists. Comprehensive care at your doorstep.</p>',
    },
    {
      slug: 'best-physiotherapist-in-wakad',
      title: 'Best Physiotherapist in Wakad',
      city: 'Pune',
      area: 'Wakad',
      metaTitle: 'Best Physiotherapist in Wakad | Home Visit Physio Pune',
      metaDescription: 'Expert physiotherapy services in Wakad, Pune. Professional home visit physiotherapists for comprehensive rehabilitation care.',
      content: '<p>Professional physiotherapy care in Wakad with experienced home visit therapists. Personalized treatment plans for optimal recovery.</p>',
    },
    {
      slug: 'best-physiotherapist-in-electronic-city',
      title: 'Best Physiotherapist in Electronic City',
      city: 'Bangalore',
      area: 'Electronic City',
      metaTitle: 'Best Physiotherapist in Electronic City | Home Physio Bangalore',
      metaDescription: 'Professional physiotherapy services in Electronic City, Bangalore. Expert home visit care for all rehabilitation needs.',
      content: '<p>Expert physiotherapy services in Electronic City with professional home visit therapists. Convenient and effective care for all conditions.</p>',
    },
    {
      slug: 'best-physiotherapist-in-banashankari',
      title: 'Best Physiotherapist in Banashankari',
      city: 'Bangalore',
      area: 'Banashankari',
      metaTitle: 'Best Physiotherapist in Banashankari | Home Visit Physio',
      metaDescription: 'Expert physiotherapy services in Banashankari, Bangalore. Professional home visit physiotherapists for comprehensive care.',
      content: '<p>Get professional physiotherapy care in Banashankari with our experienced home visit therapists. Personalized treatment for faster recovery.</p>',
    },
    {
      slug: 'home-physiotherapist-in-hulimavu',
      title: 'Home Physiotherapist in Hulimavu',
      city: 'Bangalore',
      area: 'Hulimavu',
      metaTitle: 'Home Physiotherapist in Hulimavu | Physiotherapy at Home',
      metaDescription: 'Professional home physiotherapy services in Hulimavu, Bangalore. Expert care delivered to your doorstep.',
      content: '<p>Professional home physiotherapy services in Hulimavu with qualified therapists. Comprehensive care in the comfort of your home.</p>',
    },
    {
      slug: 'best-physiotherapist-in-marathahalli',
      title: 'Best Physiotherapist in Marathahalli',
      city: 'Bangalore',
      area: 'Marathahalli',
      metaTitle: 'Best Physiotherapist in Marathahalli | Home Visit Physio',
      metaDescription: 'Expert physiotherapy services in Marathahalli, Bangalore. Professional home visit care for effective rehabilitation.',
      content: '<p>Expert physiotherapy services in Marathahalli with professional home visit therapists. Personalized treatment plans for optimal recovery.</p>',
    },
    {
      slug: 'best-physiotherapist-in-arekere',
      title: 'Best Physiotherapist in Arekere',
      city: 'Bangalore',
      area: 'Arekere',
      metaTitle: 'Best Physiotherapist in Arekere | Home Physiotherapy Bangalore',
      metaDescription: 'Professional physiotherapy services in Arekere, Bangalore. Expert home visit care for all rehabilitation needs.',
      content: '<p>Professional physiotherapy care in Arekere with experienced home visit therapists. Convenient and effective treatment at your doorstep.</p>',
    },
    {
      slug: 'physiotherapist-in-btm-layout',
      title: 'Physiotherapist in BTM Layout',
      city: 'Bangalore',
      area: 'BTM Layout',
      metaTitle: 'Physiotherapist in BTM Layout | Home Visit Physio Bangalore',
      metaDescription: 'Expert physiotherapy services in BTM Layout, Bangalore. Professional home visit physiotherapists for comprehensive care.',
      content: '<p>Get expert physiotherapy services in BTM Layout with our professional home visit therapists. Personalized care for faster recovery.</p>',
    },
    {
      slug: 'physiotherapist-in-ejipura',
      title: 'Physiotherapist in Ejipura',
      city: 'Bangalore',
      area: 'Ejipura',
      metaTitle: 'Physiotherapist in Ejipura | Home Physiotherapy Bangalore',
      metaDescription: 'Professional physiotherapy services in Ejipura, Bangalore. Expert home visit care for effective rehabilitation.',
      content: '<p>Professional physiotherapy services in Ejipura with qualified home visit therapists. Comprehensive care at your convenience.</p>',
    },
    {
      slug: 'physiotherapist-in-indiranagar',
      title: 'Physiotherapist in Indiranagar',
      city: 'Bangalore',
      area: 'Indiranagar',
      metaTitle: 'Physiotherapist in Indiranagar | Home Visit Physio',
      metaDescription: 'Expert physiotherapy services in Indiranagar, Bangalore. Professional home visit physiotherapists for all needs.',
      content: '<p>Expert physiotherapy care in Indiranagar with professional home visit services. Personalized treatment plans for optimal results.</p>',
    },
    {
      slug: 'physiotherapist-in-koramangala',
      title: 'Physiotherapist in Koramangala',
      city: 'Bangalore',
      area: 'Koramangala',
      metaTitle: 'Physiotherapist in Koramangala | Home Physiotherapy',
      metaDescription: 'Professional physiotherapy services in Koramangala, Bangalore. Expert home visit care for comprehensive rehabilitation.',
      content: '<p>Professional physiotherapy services in Koramangala with experienced home visit therapists. Convenient and effective care at your doorstep.</p>',
    },
    {
      slug: 'physiotherapist-in-hsr-layout',
      title: 'Physiotherapist in HSR Layout',
      city: 'Bangalore',
      area: 'HSR Layout',
      metaTitle: 'Physiotherapist in HSR Layout | Home Visit Physio Bangalore',
      metaDescription: 'Expert physiotherapy services in HSR Layout, Bangalore. Professional home visit physiotherapists for all rehabilitation needs.',
      content: '<p>Get expert physiotherapy care in HSR Layout with our professional home visit therapists. Personalized treatment for faster recovery.</p>',
    },
    {
      slug: 'physiotherapist-in-bellandur',
      title: 'Physiotherapist in Bellandur',
      city: 'Bangalore',
      area: 'Bellandur',
      metaTitle: 'Physiotherapist in Bellandur | Home Physiotherapy Bangalore',
      metaDescription: 'Professional physiotherapy services in Bellandur, Bangalore. Expert home visit care for effective rehabilitation.',
      content: '<p>Professional physiotherapy services in Bellandur with qualified home visit therapists. Comprehensive care in the comfort of your home.</p>',
    },
    {
      slug: 'physiotherapist-in-jp-nagar',
      title: 'Physiotherapist in JP Nagar',
      city: 'Bangalore',
      area: 'JP Nagar',
      metaTitle: 'Physiotherapist in JP Nagar | Home Visit Physio',
      metaDescription: 'Expert physiotherapy services in JP Nagar, Bangalore. Professional home visit physiotherapists for comprehensive care.',
      content: '<p>Expert physiotherapy care in JP Nagar with professional home visit services. Personalized treatment plans for optimal recovery.</p>',
    },
    {
      slug: 'home-physiotherapist-in-jayanagar',
      title: 'Home Physiotherapist in Jayanagar',
      city: 'Bangalore',
      area: 'Jayanagar',
      metaTitle: 'Home Physiotherapist in Jayanagar | Physiotherapy at Home',
      metaDescription: 'Professional home physiotherapy services in Jayanagar, Bangalore. Expert care delivered to your doorstep.',
      content: '<p>Professional home physiotherapy services in Jayanagar with experienced therapists. Convenient and effective care at your home.</p>',
    },
    {
      slug: 'physiotherapist-in-sarjapur-road',
      title: 'Physiotherapist in Sarjapur Road',
      city: 'Bangalore',
      area: 'Sarjapur Road',
      metaTitle: 'Physiotherapist in Sarjapur Road | Home Visit Physio Bangalore',
      metaDescription: 'Expert physiotherapy services in Sarjapur Road, Bangalore. Professional home visit care for all rehabilitation needs.',
      content: '<p>Get expert physiotherapy services in Sarjapur Road with our professional home visit therapists. Personalized care for faster recovery.</p>',
    },
  ];

  for (const location of locationData) {
    await db.insert(locations).values(location).onDuplicateKeyUpdate({ set: { title: location.title } });
  }

  console.log('✅ Database seeding completed successfully!');
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
