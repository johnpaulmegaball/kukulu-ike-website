// =========================================================
// Kūkulu ʻIke — STEM Path Quiz data (stem-path-quiz.html only)
// Pure data, no logic. Edit questions, weights, or career info
// here without touching js/stem-quiz.js.
//
// How scoring works: every answer gives 2 points to exactly one
// of the 6 domain keys below. After all 10 questions, whichever
// domain(s) have the most points are shown as the student's
// top match(es).
//
// The 6 domain keys (used everywhere below and in stem-quiz.js):
//   engineering, computing, life, earth, physical, design
// =========================================================

// ---- The 10 quiz questions ----
// Each option has a "domain" (one of the 6 keys above) and a
// "weight" (points added to that domain if picked). Keeping every
// weight at 2 keeps the math easy to follow and easy to tweak.
var QUIZ_QUESTIONS = [
  {
    text: "A group project just got assigned. What role do you naturally take?",
    options: [
      { text: "Sketch out how it should be built", domain: "engineering", weight: 2 },
      { text: "Organize the info and map out a plan", domain: "computing", weight: 2 },
      { text: "Ask “why,” and want to test the idea first", domain: "physical", weight: 2 },
      { text: "Make sure it actually looks and feels good", domain: "design", weight: 2 }
    ]
  },
  {
    text: "Which Saturday sounds the most fun to you?",
    options: [
      { text: "Taking something apart to see how it works", domain: "engineering", weight: 2 },
      { text: "Coding, modding a game, or messing with an app", domain: "computing", weight: 2 },
      { text: "Exploring a beach, forest, or tide pool", domain: "earth", weight: 2 },
      { text: "Building or sketching something with your hands", domain: "design", weight: 2 }
    ]
  },
  {
    text: "Which science topic makes you lean in?",
    options: [
      { text: "How bridges, machines, and robots work", domain: "engineering", weight: 2 },
      { text: "How the human body fights off illness", domain: "life", weight: 2 },
      { text: "Volcanoes, weather, or the ocean", domain: "earth", weight: 2 },
      { text: "How the universe or numbers work", domain: "physical", weight: 2 }
    ]
  },
  {
    text: "Which headline would you actually click on?",
    options: [
      { text: "“Marine biologists discover a new species in the deep ocean”", domain: "earth", weight: 2 },
      { text: "“New app uses AI to predict traffic before it happens”", domain: "computing", weight: 2 },
      { text: "“Scientists discover why some people age slower than others”", domain: "life", weight: 2 },
      { text: "“Study finds a surprising pattern hidden in prime numbers”", domain: "physical", weight: 2 }
    ]
  },
  {
    text: "Which class do you find yourself paying the most attention in?",
    options: [
      { text: "Math", domain: "physical", weight: 2 },
      { text: "Biology or Health", domain: "life", weight: 2 },
      { text: "Computer Science or Tech", domain: "computing", weight: 2 },
      { text: "Art, Shop, or Design", domain: "design", weight: 2 }
    ]
  },
  {
    text: "A documentary just started. Which one do you actually want to watch?",
    options: [
      { text: "Deep-sea creatures or climate change", domain: "earth", weight: 2 },
      { text: "Space exploration or physics", domain: "physical", weight: 2 },
      { text: "How video games or apps get made", domain: "computing", weight: 2 },
      { text: "How skyscrapers or robots get built", domain: "engineering", weight: 2 }
    ]
  },
  {
    text: "Which kind of puzzle do you enjoy most?",
    options: [
      { text: "Building or spatial puzzles, like Legos or 3D puzzles", domain: "engineering", weight: 2 },
      { text: "Visual puzzles, like optical illusions or pattern design", domain: "design", weight: 2 },
      { text: "Pattern and number puzzles", domain: "physical", weight: 2 },
      { text: "Identifying species, weather, or nature patterns", domain: "earth", weight: 2 }
    ]
  },
  {
    text: "If you joined a club tomorrow, which sounds the most fun?",
    options: [
      { text: "Robotics team", domain: "engineering", weight: 2 },
      { text: "Coding or game design club", domain: "computing", weight: 2 },
      { text: "Marine science or environmental club", domain: "earth", weight: 2 },
      { text: "Art, maker, or design club", domain: "design", weight: 2 }
    ]
  },
  {
    text: "Which question do you catch yourself wondering about most?",
    options: [
      { text: "“How could this be built better?”", domain: "engineering", weight: 2 },
      { text: "“How does this affect people’s health?”", domain: "life", weight: 2 },
      { text: "“What does the data actually show?”", domain: "computing", weight: 2 },
      { text: "“How does this affect the planet?”", domain: "earth", weight: 2 }
    ]
  },
  {
    text: "Pick a superpower you’d actually want:",
    options: [
      { text: "Perfect logical reasoning", domain: "physical", weight: 2 },
      { text: "The ability to design or build anything instantly", domain: "design", weight: 2 },
      { text: "Understanding any living thing, inside and out", domain: "life", weight: 2 },
      { text: "Instantly understanding any system or set of data", domain: "computing", weight: 2 }
    ]
  }
];

// ---- The 6 STEM domains and their specific career paths ----
// "fieldKey" matches the data-fields values already used on the
// Opportunity Explorer cards (see opportunities.html / opportunities.js)
// so results can link straight to a pre-filtered view of real
// opportunities in that field.
var QUIZ_DOMAINS = {
  engineering: {
    label: "Engineering & Building",
    icon: "🛠️",
    blurb: "You like figuring out how things are built, and you’re not afraid to get hands-on and build something that actually works.",
    paths: [
      {
        name: "Mechanical Engineering",
        icon: "⚙️",
        description: "Designs and builds machines and mechanical systems, from small parts to entire vehicles.",
        dayToDay: "Sketching designs, running simulations, 3D-printing or machining prototypes, then testing how they hold up under real-world stress.",
        hawaii: "Hawaiian Electric and Oceanit both hire mechanical engineers working on renewable energy and clean-tech projects right here on O‘ahu.",
        nextStep: "Join Moanalua’s Robotics Club to start building and testing your own designs.",
        fieldKey: "engineering"
      },
      {
        name: "Electrical Engineering & Robotics",
        icon: "🤖",
        description: "Designs the circuits, sensors, and control systems that make machines and robots actually move and respond.",
        dayToDay: "Wiring circuits, writing control code, debugging why a motor won’t respond, and testing a robot in competition.",
        hawaii: "O‘ahu’s FIRST Robotics teams, including Moanalua’s, rely on exactly this kind of electrical and controls work every season.",
        nextStep: "Moanalua High School Robotics and Moanalua Middle School Robotics are both hands-on ways to try this out.",
        fieldKey: "robotics"
      },
      {
        name: "Civil & Structural Engineering",
        icon: "🏗️",
        description: "Designs buildings, roads, and infrastructure built to handle Hawai‘i’s earthquakes, storms, and coastline.",
        dayToDay: "Reviewing site plans, running structural load calculations, and visiting construction sites to check a design is being built safely.",
        hawaii: "With sea-level rise and seismic activity both realities on the islands, O‘ahu civil engineers work on some of the most resilience-focused infrastructure in the country.",
        nextStep: "Check the Opportunity Explorer’s Engineering filter for programs that let you try structural design firsthand.",
        fieldKey: "engineering"
      },
      {
        name: "Aerospace & Space Systems Engineering",
        icon: "🚀",
        description: "Designs the vehicles, satellites, and systems that operate in the air and in space.",
        dayToDay: "Modeling flight or orbital paths, testing components in simulations, and troubleshooting systems before launch.",
        hawaii: "Hawai‘i plays a real role in space, from Maui’s satellite-tracking observatories to the Mauna Kea telescopes that support space research.",
        nextStep: "Look for space & aerospace-tagged programs in the Opportunity Explorer to get a taste of this field.",
        fieldKey: "space-aerospace"
      }
    ]
  },

  computing: {
    label: "Computing & Data",
    icon: "💻",
    blurb: "You think in systems and patterns, and you like making sense of information, or building the software that runs on it.",
    paths: [
      {
        name: "Software Development",
        icon: "👨‍💻",
        description: "Builds the applications, websites, and tools that people use every day.",
        dayToDay: "Writing and testing code, fixing bugs, and working with a team to ship something that actually works.",
        hawaii: "Software teams at companies like Oceanit build real tools for clients ranging from clean energy to research, all based in Honolulu.",
        nextStep: "The Opportunity Explorer’s Computer Science filter has coding-focused programs to get started.",
        fieldKey: "computer-science"
      },
      {
        name: "Data Science",
        icon: "📊",
        description: "Finds patterns in large sets of information to help people make better decisions.",
        dayToDay: "Cleaning messy data, building models, and turning numbers into charts and insights other people can actually use.",
        hawaii: "Data scientists support everything from Hawai‘i’s tourism forecasting to public health tracking across the islands.",
        nextStep: "Explore data-and-computing opportunities through the Opportunity Explorer.",
        fieldKey: "computer-science"
      },
      {
        name: "Robotics & AI Programming",
        icon: "🧠",
        description: "Writes the code that lets robots and machines sense their surroundings and make decisions.",
        dayToDay: "Training and testing algorithms, debugging robot behavior, and running trials to see if the code performs as expected.",
        hawaii: "FIRST Robotics teams on O‘ahu, including Moanalua’s, need programmers just as much as builders every season.",
        nextStep: "Moanalua’s Robotics Club is a great place to write code for a real robot.",
        fieldKey: "robotics"
      },
      {
        name: "Cybersecurity",
        icon: "🔒",
        description: "Protects networks, systems, and data from being hacked or misused.",
        dayToDay: "Testing systems for weaknesses, monitoring for suspicious activity, and helping fix vulnerabilities before they become a problem.",
        hawaii: "With military and government operations across O‘ahu, Hawai‘i has a growing need for cybersecurity talent.",
        nextStep: "Look for computer-science tagged opportunities in the Explorer to find your first project.",
        fieldKey: "computer-science"
      }
    ]
  },

  life: {
    label: "Life & Health Sciences",
    icon: "🧬",
    blurb: "You’re drawn to how living things work, and you want your STEM path to directly help people or other living things.",
    paths: [
      {
        name: "Biomedical Research",
        icon: "🧫",
        description: "Studies diseases and treatments to help develop new medicines and medical technology.",
        dayToDay: "Running lab experiments, analyzing results, and working alongside doctors and scientists to test new ideas.",
        hawaii: "UH Mānoa’s John A. Burns School of Medicine (JABSOM) runs biomedical research right here in Honolulu.",
        nextStep: "Moanalua High School’s HOSA Chapter is built exactly for students interested in health and medical careers.",
        fieldKey: "life-health"
      },
      {
        name: "Genetics & Molecular Biology",
        icon: "🧪",
        description: "Studies DNA and cells to understand how living things grow, function, and sometimes get sick.",
        dayToDay: "Running lab procedures, analyzing genetic data, and documenting results carefully so they can be repeated.",
        hawaii: "UH Mānoa runs active genetics and molecular biology research, including work connected to Hawai‘i’s unique native species.",
        nextStep: "The Opportunity Explorer’s Life & Health Sciences filter has research-focused programs worth a look.",
        fieldKey: "life-health"
      },
      {
        name: "Public Health & Epidemiology",
        icon: "🩺",
        description: "Studies how diseases spread and designs programs to keep whole communities healthy.",
        dayToDay: "Analyzing health data, tracking outbreaks, and helping design programs that keep communities safe.",
        hawaii: "Hawai‘i’s public health researchers played a major role in the state’s COVID-19 response and continue to track community health today.",
        nextStep: "HOSA at Moanalua High School is a strong starting point for public health interests too.",
        fieldKey: "life-health"
      },
      {
        name: "Clinical & Health Sciences (Pre-Med Path)",
        icon: "⚕️",
        description: "The path toward becoming a doctor, nurse, or other clinical health professional.",
        dayToDay: "Shadowing healthcare workers, studying anatomy and biology, and slowly building the hands-on experience medical school looks for.",
        hawaii: "JABSOM at UH Mānoa trains many of Hawai‘i’s future doctors, and several island hospitals offer shadowing opportunities for motivated students.",
        nextStep: "HOSA is the club most connected to this path, reach out and we can point you to mentors too.",
        fieldKey: "life-health"
      }
    ]
  },

  earth: {
    label: "Earth, Ocean & Environment",
    icon: "🌊",
    blurb: "You care about the planet, and you’re happiest learning about the ocean, the land, or the systems that shape them.",
    paths: [
      {
        name: "Marine Biology",
        icon: "🐠",
        description: "Studies ocean life, from coral reefs to whales, and how they’re affected by change.",
        dayToDay: "Diving or snorkeling for fieldwork, collecting samples, and analyzing data back in the lab.",
        hawaii: "UH Mānoa’s School of Ocean and Earth Science and Technology (SOEST) is one of the top marine science programs in the country, right on O‘ahu.",
        nextStep: "Check the Opportunity Explorer’s Environmental & Ocean Science filter for marine-focused programs.",
        fieldKey: "environmental-ocean"
      },
      {
        name: "Oceanography",
        icon: "🌊",
        description: "Studies the physics, chemistry, and currents of the ocean itself.",
        dayToDay: "Deploying ocean sensors, analyzing current and temperature data, and building models of how the ocean behaves.",
        hawaii: "Hawai‘i’s location makes it one of the best places in the world to study open-ocean systems firsthand.",
        nextStep: "SOEST-affiliated and Opportunity Explorer environmental programs are a great next step.",
        fieldKey: "environmental-ocean"
      },
      {
        name: "Volcanology & Geology",
        icon: "🌋",
        description: "Studies volcanoes, earthquakes, and the rock record to understand how the Earth changes.",
        dayToDay: "Collecting rock and gas samples, monitoring seismic activity, and tracking active volcanic sites.",
        hawaii: "The USGS Hawaiian Volcano Observatory, which monitors Kīlauea, is one of the most active volcano observatories on Earth.",
        nextStep: "Look for earth-science programs through the Opportunity Explorer’s Environmental & Ocean Science filter.",
        fieldKey: "environmental-ocean"
      },
      {
        name: "Environmental Science & Conservation",
        icon: "🌱",
        description: "Works to protect ecosystems and species, especially ones found nowhere else.",
        dayToDay: "Doing fieldwork to track species and habitats, analyzing environmental data, and working on conservation and restoration projects.",
        hawaii: "Hawai‘i has more endangered species per square mile than almost anywhere else, making local conservation work especially important.",
        nextStep: "The Opportunity Explorer’s Environmental & Ocean Science filter is the best place to start.",
        fieldKey: "environmental-ocean"
      }
    ]
  },

  physical: {
    label: "Physical Sciences & Math",
    icon: "⚛️",
    blurb: "You like getting to the bottom of how the universe actually works, through numbers, logic, and experiments.",
    paths: [
      {
        name: "Astronomy & Astrophysics",
        icon: "🔭",
        description: "Studies stars, planets, and the universe using telescopes and physics.",
        dayToDay: "Collecting and analyzing telescope data, running calculations, and working to understand what the data reveals about space.",
        hawaii: "Mauna Kea is home to some of the most powerful telescopes on Earth, making Hawai‘i a genuine hub for astronomy research.",
        nextStep: "Look for physics-tagged research and summer programs in the Opportunity Explorer.",
        fieldKey: "physics"
      },
      {
        name: "Physics",
        icon: "⚛️",
        description: "Studies the fundamental rules that govern matter, energy, and motion.",
        dayToDay: "Designing experiments, running calculations, and testing theories against real-world measurements.",
        hawaii: "UH Mānoa’s physics department collaborates with Mauna Kea’s observatories on cutting-edge research.",
        nextStep: "Moanalua’s Science Academic Team is a great way to build physics problem-solving skills.",
        fieldKey: "physics"
      },
      {
        name: "Mathematics & Statistics",
        icon: "➗",
        description: "Uses math to solve real problems, from analyzing risk to modeling how systems behave.",
        dayToDay: "Building models, checking assumptions, and turning abstract math into useful, real-world predictions.",
        hawaii: "Statisticians support everything from Hawai‘i’s tourism industry to climate modeling for the islands.",
        nextStep: "Moanalua’s Math Team (Middle and High School) is a natural next step.",
        fieldKey: "math"
      },
      {
        name: "Chemistry",
        icon: "🧪",
        description: "Studies the properties of matter and how substances react and combine.",
        dayToDay: "Running lab experiments, measuring reactions carefully, and documenting results with precision.",
        hawaii: "Hawai‘i’s chemists work across fields from pharmaceuticals to testing water quality around the islands.",
        nextStep: "The Opportunity Explorer’s Physics filter includes chemistry-adjacent research opportunities too.",
        fieldKey: "physics"
      }
    ]
  },

  design: {
    label: "Design & Making",
    icon: "🎨",
    blurb: "You think with your hands, and you care just as much about how something works as how it looks and feels to use.",
    paths: [
      {
        name: "Product & Industrial Design",
        icon: "📐",
        description: "Designs physical products, everything from tools to furniture to tech, balancing how they work and how they feel to use.",
        dayToDay: "Sketching concepts, building prototypes, and testing them with real users to see what actually works.",
        hawaii: "Local makerspaces and design-focused programs on O‘ahu give students a place to prototype real product ideas.",
        nextStep: "Moanalua’s STEM Club is a good hands-on place to start building and prototyping.",
        fieldKey: "engineering"
      },
      {
        name: "UX / UI & Interaction Design",
        icon: "🖥️",
        description: "Designs how people interact with apps, websites, and software.",
        dayToDay: "Sketching layouts, building mockups, and testing them with real users to see what’s confusing or what works well.",
        hawaii: "As more Hawai‘i companies build their own apps and tools, local demand for interaction designers keeps growing.",
        nextStep: "The Opportunity Explorer’s Computer Science filter includes design-adjacent programs worth checking out.",
        fieldKey: "computer-science"
      },
      {
        name: "Architecture",
        icon: "🏛️",
        description: "Designs buildings and spaces that are safe, functional, and fit the place they’re built.",
        dayToDay: "Sketching and modeling designs, checking that they meet building codes, and adjusting plans based on the site itself.",
        hawaii: "Hawai‘i architects often design specifically around local climate, culture, and the risk of natural disasters.",
        nextStep: "Check the Opportunity Explorer’s Engineering filter for design-and-build programs.",
        fieldKey: "engineering"
      },
      {
        name: "Digital Fabrication & Maker Engineering",
        icon: "🖨️",
        description: "Uses tools like 3D printers, laser cutters, and CNC machines to turn designs into real, physical objects.",
        dayToDay: "Modeling a design digitally, then fabricating, testing, and refining it until it actually works.",
        hawaii: "Robotics teams across O‘ahu, including Moanalua’s, rely on exactly these fabrication skills to build their competition robots.",
        nextStep: "Moanalua’s Robotics Club is the most hands-on way to try this out.",
        fieldKey: "robotics"
      }
    ]
  }
};
