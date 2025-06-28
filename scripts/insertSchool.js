import mongoose from "mongoose";
import { School } from "../src/database/models/school.js";

const schools = [
  {
    name: "Brookhouse Runda Campus",
    type: "Private Day School",
    fee: {
      min: 260000,
      max: 350000, // Day school only :cite[1]
    },
    location: {
      address: "Kiambu Road",
      city: "Nairobi",
      county: "Nairobi",
    },
    description:
      "Secondary campus opened in 2017 with specialized STEM programs and Model UN participation. Shares Brookhouse's academic rigor without boarding options :cite[2]:cite[6].",
    system: ["British National Curriculum", "IGCSE"],
    population: "Part of 800 total enrollment",
    level: "Year 7-13",
    category: "High School",
    images: [
      "https://d24d7vsshzrslo.cloudfront.net/sites/school93/files/styles/ins_card/public/2023-02/our-campuses-karen.jpg.jpeg?itok=luTpCAOK",
      "https://d24d7vsshzrslo.cloudfront.net/sites/school93/files/styles/ins_card/public/2023-02/our-campuses-runda.jpg.jpeg?itok=Z0qm9E7S",
    ],
  },
  {
    name: "Brookhouse International School (Karen Campus)",
    type: "Private International",
    fee: {
      min: 260000, // KES per annum (day school) :cite[3]
      max: 4500000, // Estimated boarding fees :cite[1]:cite[6]
    },
    location: {
      address: "Magadi Road, Off Langata Road",
      city: "Nairobi",
      county: "Nairobi",
    },
    description:
      "Premier British curriculum school in East Africa with 40+ years of academic excellence. Offers IGCSE/A-Levels and NCUK Foundation Year programs. Features VR-enhanced classrooms and Round Square experiential learning :cite[1]:cite[5].",
    system: [
      "British National Curriculum",
      "IGCSE",
      "A-Levels",
      "NCUK Foundation Year",
    ],
    population: "800 students (approx) :cite[2]",
    level: "Pre-school through Year 13",
    category: "Hybrid",
    images: [
      "https://d24d7vsshzrslo.cloudfront.net/sites/school93/files/styles/ins_card/public/2023-02/our-campuses-karen.jpg.jpeg?itok=luTpCAOK",
      "https://d24d7vsshzrslo.cloudfront.net/sites/school93/files/styles/ins_card/public/2023-02/our-campuses-runda.jpg.jpeg?itok=Z0qm9E7S",
    ],
  },
  {
    name: "Prestige Academy",
    type: "Private Christian",
    fee: {
      min: 300000, // Tuition not specified; likely tuition-based
      max: 250000, // Data unavailable
    },
    location: {
      address: "Not specified",
      city: "Nairobi", // Assumed from context; not explicitly stated
      county: "Nairobi",
    },
    description:
      "Christian-based school focused on academic excellence, character building, and holistic student growth. Offers Advanced Placement (AP) courses and NCAA-approved curriculum for student-athletes.",
    system: ["AP Courses", "NCAA-Approved"],
    population: "Not specified",
    level: "Elementary to High School",
    category: "Hybrid",
    images: [
      "https://anestarschools.co.ke/wp-content/uploads/2024/10/PSX_20241015_114106-768x513.jpg",
      "https://anestarschools.co.ke/wp-content/uploads/2022/06/Anestar-4-768x480.jpg",
    ],
  },
  {
    name: "Light Academy Secondary",
    type: "Private Boarding",
    fee: {
      min: 150000,
      max: 250000, // KES per term
    },
    location: {
      address: "Off Thika Road",
      city: "Kiambu",
      county: "Kiambu",
    },
    description:
      "High-performing mixed boarding school with consistent KCSE results (Mean Grade B in 2022). Features modern labs and sports facilities.",
    system: ["8-4-4", "CBC Transition"],
    population: "800 students",
    level: "Secondary",
    category: "High School",
    images: [
      "https://lightacademy.sc.ke/wp-content/uploads/primary-campus.jpg",
    ],
  },
  {
    name: "Light International School",
    type: "Private International",
    fee: {
      min: 300000,
      max: 500000, // KES per term
    },
    location: {
      address: "Karen",
      city: "Nairobi",
      county: "Nairobi",
    },
    description:
      "Cambridge curriculum school offering IGCSE and A-Levels. Partners with UK schools for exchange programs.",
    system: ["IGCSE", "A-Levels"],
    population: "600 students",
    level: "Secondary",
    category: "High School",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCKmthWsjyvEEReruxktRmWji8dXq2fVb9EA&s",
    ],
  },
  {
    name: "Light Academy Primary",
    type: "Private Christian",
    fee: {
      min: 80000,
      max: 150000, // KES per term (3 terms/year)
    },
    location: {
      address: "Mombasa Road",
      city: "Nairobi",
      county: "Nairobi",
    },
    description:
      "Christian-based primary school offering CBC curriculum with strong emphasis on STEM and moral values. Ranked among top private schools in Nairobi County.",
    system: ["CBC"],
    population: "1200 students",
    level: "Primary",
    category: "Primary",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQouRyTkhlmTvBNSaMyCrYD9M6O_bc1hzsz5g&s",
    ],
  },
  {
    name: "Brookhurst Elementary School",
    type: "Public",
    fee: {
      min: 0,
      max: 5000, // Estimated for non-subsidized activities
    },
    location: {
      address: "9821 William Dalton Way",
      city: "Garden Grove",
      county: "Orange County",
    },
    description:
      "Award-winning public school serving K-6 with 93% minority enrollment and 84% economically disadvantaged students. Ranked top 50% in California for math (37% proficiency) and reading (42% proficiency).",
    system: ["U.S. Public School Curriculum"],
    population: "410 students",
    level: "Primary",
    category: "Primary",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA7HYpn_dot5QjNvHkkX5mntRX9hy1rUczog&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA7HYpn_dot5QjNvHkkX5mntRX9hy1rUczog&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQORTfl9Pj1CyHyg-HkcF6vX7do2XzAqJE0kA&s",
    ],
  },
  {
    name: "Makini School (Ngong Road Campus)",
    type: "Private International",
    fee: {
      min: 60000,
      max: 150000, // Annual fees in KES (primary) :cite[3]
    },
    location: {
      address: "Ngong Road",
      city: "Nairobi",
      county: "Nairobi",
    },
    description:
      "Flagship campus offering CBC and Cambridge curricula. Ranked among Kenya's top private schools with 30+ students scoring above 400 in KCPE (2021). Features state-of-the-art ICT labs and sports facilities.",
    system: ["CBC", "Cambridge International"],
    population: "3200 students (across all campuses)",
    level: "Primary & Secondary",
    category: "Hybrid",
    images: [
      "https://educationnewshub.co.ke/makini-school-gallery/1.jpg", // Sample image link :cite[2]
    ],
  },
  {
    name: "Merishaw School",
    type: "Private International",
    fee: {
      min: 450000,
      max: 950000,
    },
    location: {
      address: "Muguga Green Road",
      city: "Nairobi",
      county: "Nairobi",
    },
    description:
      "Premium co-educational day school offering British curriculum with state-of-the-art STEM facilities. Affiliated with UK's Merishaw Group.",
    images: [
      "https://merishaw.sc.ke/gallery/1.jpg",
      "https://merishaw.sc.ke/gallery/campus.jpg",
    ],
    system: ["British Curriculum", "IGCSE", "A-Levels"],
    population: "800 students",
    level: "Primary & Secondary",
    category: "Hybrid",
  },
  {
    name: "Alliance High School",
    type: "National Public",
    fee: { min: 53000, max: 80000 },
    location: { address: "Alliance Lane", city: "Kikuyu", county: "Kiambu" },
    description:
      "Top national boys' boarding school founded in 1926, ranked #1 in KCSE performance",
    system: ["8-4-4", "CBC"],
    population: "2100 students",
    level: "Secondary",
    category: "High School",
    images: [
      "https://www.alliancehighschool.ac.ke/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-11-at-4.36.42-PM-1-300x300.jpeg",
      "https://www.alliancehighschool.ac.ke/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-11-at-4.36.39-PM-300x300.jpeg",
    ],
  },
  {
    name: "Kibera Primary School",
    type: "Public Day",
    fee: { min: 0, max: 5000 },
    location: { address: "Kibera Drive", city: "Nairobi", county: "Nairobi" },
    description:
      "Government-funded school serving informal settlements with high student density",
    system: ["CBC"],
    population: "3200 students",
    level: "Primary",
    category: "Primary",
    images: [
      "https://media.gettyimages.com/id/905936128/photo/pupils-play-as-they-run-up-a-flight-of-stairs-at-a-charity-run-primary-school-shining-hope-for.jpg?s=612x612&w=0&k=20&c=c5e1mRtAuJiqG2VMiESO7HFr68-M1WdKpvEH0QAi_lQ=",
      "https://media.gettyimages.com/id/905936092/photo/pupils-take-part-in-a-classroom-exercise-supervised-by-their-teacher-at-a-charity-run-primary.jpg?s=612x612&w=0&k=20&c=bxK0f1cTyXnb39jLjpH1RddzP0w2vsoVlLqbFyf1fHQ=",
    ],
  },
  {
    name: "University of Nairobi",
    type: "Public University",
    fee: { min: 120000, max: 500000 },
    location: { address: "University Way", city: "Nairobi", county: "Nairobi" },
    description:
      "Oldest university in Kenya (established 1970) offering STEM and humanities programs",
    system: ["Semester"],
    population: "71,000 students",
    level: "University",
    category: "Higher Education",
    images: [
      "https://media.gettyimages.com/id/2169317267/photo/students-gather-near-the-main-campus-tower-at-the-university-of-nairobi-main-campus-in.jpg?s=612x612&w=0&k=20&c=0fd1je0PdRSEX_qAmzLs6XeZ7LjKKudS_yIzNMXk1k0=",
      "https://media.gettyimages.com/id/2169320056/photo/students-walk-through-the-main-entrance-of-the-university-of-nairobi-campus-in-nairobi-on.jpg?s=612x612&w=0&k=20&c=h_YNjXifZn6GEujiS0GesrLVLw-AlSf924LVyrpy5z4=",
    ],
  },
  {
    name: "Braeburn International School",
    type: "Private International",
    fee: { min: 400000, max: 850000 },
    location: { address: "Gitanga Road", city: "Nairobi", county: "Nairobi" },
    description:
      "K-12 institution offering British curriculum and IB diploma programs",
    system: ["IGCSE", "A-Level", "CBC"],
    population: "1200 students",
    level: "Primary & Secondary",
    category: "Hybrid",
    images: [
      "https://braeburnschool.braeburn.com/media/images/FootballGirlsYR6_7.2e16d0ba.fill-1400x600.jpg",
      "https://braeburnschool.braeburn.com/media/images/YR6BOYSLEARNING.2e16d0ba.fill-1400x600.jpg",
    ],
  },

  {
    name: "Aga Khan Primary School",
    type: "Private International",
    fee: { min: 180000, max: 300000 },
    location: { address: "Mbarak Road", city: "Mombasa", county: "Mombasa" },
    description:
      "Montessori-based curriculum with focus on multilingual education",
    system: ["CBC", "Montessori"],
    images: [
      "https://www.agakhanschools.org/Content/img/AKAN/JuniorSchool.jpg",
      "https://www.agakhanschools.org/Content/img/AKAN/SeniorSchool.jpg",
    ],
    population: "600 students",
    level: "Primary",
    category: "Primary",
  },
  {
    name: "Kenyatta University",
    type: "Public University",
    fee: { min: 90000, max: 220000 },
    location: { address: "Kahawa Sukari", city: "Nairobi", county: "Kiambu" },
    description: "Leading university in teacher education and health sciences",
    system: ["Semester"],
    population: "43,000 students",
    level: "University",
    category: "Higher Education",
    images: [
      "https://i.pinimg.com/736x/41/c4/50/41c45055c9fbecccdad76a8117a2e325.jpg",
    ],
  },
  {
    name: "Peponi School",
    type: "Private",
    fee: { min: 650000, max: 1200000 },
    location: { address: "Ruaka Road", city: "Ruiru", county: "Kiambu" },
    description:
      "British-curriculum school offering primary through A-Level education",
    system: ["British Curriculum"],
    population: "900 students",
    level: "Primary & Secondary",
    category: "Hybrid",
    images: ["https://cdn.tuko.co.ke/images/720/d5c60cb634bdb0c9.webp?v=1"],
  },
  {
    name: "Starehe Boys' Centre",
    type: "Charitable Boarding",
    fee: { min: 10000, max: 30000 },
    location: {
      address: "General Waruinge St",
      city: "Nairobi",
      county: "Nairobi",
    },
    description:
      "Fully-funded secondary school for academically gifted needy students",
    system: ["8-4-4"],
    population: "1200 students",
    level: "Secondary",
    category: "High School",
    images: [
      "https://starehefoundation.org/wp-content/uploads/2020/10/SBC-NO-PIC-1-215x143.jpg",
      "https://starehefoundation.org/wp-content/uploads/2020/10/SBC-NO-PIC-20-215x143.jpg",
    ],
  },
  {
    name: "Rabai Mission Primary",
    type: "Public",
    fee: { min: 0, max: 2000 },
    location: { address: "Rabai Village", city: "Kaloleni", county: "Kilifi" },
    description:
      "Oldest formal school in Kenya (est. 1846) with historical significance",
    system: ["CBC"],
    population: "850 students",
    level: "Primary",
    category: "Primary",
  },
  {
    name: "Strathmore University",
    type: "Private University",
    fee: { min: 180000, max: 450000 },
    location: {
      address: "Ole Sangale Link",
      city: "Nairobi",
      county: "Nairobi",
    },
    description: "Business-focused institution with ACCA and CFA accreditation",
    system: ["Trimester"],
    population: "12,000 students",
    level: "University",
    category: "Higher Education",
    images: [
      "https://media.licdn.com/dms/image/v2/D4D22AQGM3VprqoPbhQ/feedshare-shrink_800/B4DZd5h3bZHAAo-/0/1750090630601?e=1753920000&v=beta&t=9rTolSK58FYFaB4Zeadcj4dqCmNkXEGNRlOi1sQLDsU",
      "",
    ],
  },
  {
    name: "Hillcrest International Schools",
    type: "Private",
    fee: { min: 350000, max: 780000 },
    location: { address: "Langata Road", city: "Nairobi", county: "Nairobi" },
    description: "K-12 institution with British curriculum and STEAM programs",
    system: ["British Curriculum", "CBC"],
    population: "1100 students",
    level: "Primary & Secondary",
    category: "Hybrid",
    images: [
      "https://hillcrest.ac.ke/media/images/20230207-Landingpage2.17ee784d.fill-1400x600.jpg",
      "",
    ],
  },
  {
    name: "Mangu High School",
    type: "Extra-County",
    fee: { min: 48000, max: 75000 },
    location: { address: "Mangu Lane", city: "Thika", county: "Kiambu" },
    description: "Top-performing boys' boarding school in STEM disciplines",
    system: ["8-4-4"],
    population: "1900 students",
    level: "Secondary",
    category: "High School",
    images: [
      "https://manguhighschool.wordpress.com/wp-content/uploads/2021/07/dn-mangu-high-school-gate.jpg?w=2000&h=",
      "https://manguhighschool.wordpress.com/wp-content/uploads/2021/07/dn-mangu-high-school-gate.jpg?w=2000&h=",
    ],
  },
  {
    name: "Kilimani Primary School",
    type: "Public",
    fee: { min: 5000, max: 15000 },
    location: { address: "Kilimani Road", city: "Nairobi", county: "Nairobi" },
    description:
      "Model CBC implementation school with digital learning resources",
    system: ["CBC"],
    population: "1800 students",
    level: "Primary",
    category: "Primary",
    images: [
      "https://media.gettyimages.com/id/1230423366/photo/pupils-of-kilimani-primary-school-attend-class-while-wearing-face-masks-following-the-full.jpg?s=612x612&w=0&k=20&c=uB7ORn075vulrDyji5X0Tk9E0ha3nCO6jdNYVI4Jcdg=",
    ],
  },
  {
    name: "Technical University of Kenya",
    type: "Public University",
    fee: { min: 80000, max: 180000 },
    location: {
      address: "Haile Selassie Ave",
      city: "Nairobi",
      county: "Nairobi",
    },
    description: "Specialized in engineering and applied technology programs",
    system: ["Semester"],
    population: "16,000 students",
    level: "University",
    category: "Higher Education",
    images: [
      "https://i.pinimg.com/736x/7b/9c/96/7b9c96bf9fa0718c765b3e33f56953fc.jpg",
      "",
    ],
  },
  {
    name: "Kabare Girls High School",
    type: "County Public",
    fee: { min: 35000, max: 50000 },
    location: { address: "Baricho Road", city: "Kabare", county: "Kirinyaga" },
    description:
      "Girls' boarding school founded through community coffee farmers' initiative (1911)",
    system: ["8-4-4", "CBC"],
    population: "1200 students",
    level: "Secondary",
    category: "High School",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6uJ2Ix0VL5L91EXlLgv2DrJdojN9gAXhk6Q&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr6J5rMD97Brcx_1OCylvlq7jntYLpRVZ_jw&s",
    ],
  },
  {
    name: "Kaimosi Friends Primary",
    type: "Public",
    fee: { min: 3000, max: 10000 },
    location: { address: "Kaimosi", city: "Chavakali", county: "Vihiga" },
    description:
      "Pioneer Quaker mission school (1903) emphasizing holistic education",
    system: ["CBC"],
    population: "950 students",
    level: "Primary",
    category: "Primary",
    images: [
      "https://plus.unsplash.com/premium_photo-1665520347153-5b54afc7575e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJpbWFyeSUyMHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    name: "Kisii School",
    type: "National Public",
    fee: { min: 42000, max: 68000 },
    location: { address: "Kisii-Nyamira Road", city: "Kisii", county: "Kisii" },
    description:
      "High-performance boys' school founded in 1932 with rugby tradition",
    system: ["8-4-4"],
    population: "2000 students",
    level: "Secondary",
    category: "High School",
  },
  {
    name: "Meru University",
    type: "Public University",
    fee: { min: 75000, max: 150000 },
    location: { address: "Meru-Nanyuki Highway", city: "Meru", county: "Meru" },
    description: "Specialized in agriculture and technology programs",
    system: ["Semester"],
    population: "14,000 students",
    level: "University",
    category: "Higher Education",
    images: [
      "https://www.must.ac.ke/wp-content/uploads/2020/09/Main-Administration-Block-600x472.jpg",
    ],
  },
  {
    name: "Nova Pioneer",
    type: "Private",
    fee: { min: 220000, max: 550000 },
    location: { address: "Moke Gardens", city: "Nairobi", county: "Nairobi" },
    description:
      "Pan-African network school offering CBC and Cambridge pathways",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-fM5Ex0R06Kmqr5TnVCsxJ5GZgZEFDZ1CQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzNJ_0KBxGxiqWcV6Sdw7RgQVuT0fr81hwQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlxHTJ7QwjODu8IrExzcqI-OoimaFRUeh_w&s",
    ],
    system: ["CBC", "Cambridge"],
    population: "1500 students",
    level: "Primary & Secondary",
    category: "Hybrid",
  },
];

export const insertSchools = async () => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    if (!connection) {
      console.log("Mongo db could not get connected !");
      return;
    } else {
      console.log("Mongo db was connected successfully for seeding the data !");
    }
    // const exist = await School.findMany({ schools });
    const newData = await School.insertMany(schools);
    console.log(`Inserted ${newData.length} schools successfully !`);

    await mongoose.disconnect();
    console.log("Db disconnected after insertion");
  } catch (error) {
    console.error("Error inserting schools:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};
