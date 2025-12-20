import React, { useState, useEffect } from 'react';
import { BookOpen, Star, Menu, X, Volume2, Trophy, Award } from 'lucide-react';

const EloquenceAcademy = () => {
  const [currentView, setCurrentView] = useState('daily');
  const [savedWords, setSavedWords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dailyWord, setDailyWord] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [quizCompletionCount, setQuizCompletionCount] = useState(0);
  const [visitDays, setVisitDays] = useState([]);

const wordCollection = [
  // INTELLECTUAL DISCUSSION
  { word: "Elucidate", pronunciation: "ih-LOO-si-dayt", definition: "To make something clear; to explain in detail", category: "Intellectual Discussion", examples: ["The professor took great care to elucidate the complex theoretical framework.", "Allow me to elucidate my position on this delicate matter."], context: "Ideal for academic discourse, formal presentations, and when clarifying nuanced positions in diplomatic settings." },
  { word: "Perspicacious", pronunciation: "pur-spi-KAY-shuhs", definition: "Having keen insight and good judgment; perceptive", category: "Intellectual Discussion", examples: ["Her perspicacious analysis revealed hidden patterns in the data that others had missed.", "A perspicacious observer would immediately notice the subtle inconsistencies."], context: "Use when praising intellectual sharpness, analytical abilities, or insightful understanding in professional settings." },
  { word: "Cogent", pronunciation: "KOH-juhnt", definition: "Clear, logical, and convincing", category: "Intellectual Discussion", examples: ["She presented a cogent argument that swayed even the most skeptical members.", "His cogent analysis left no room for doubt regarding the conclusion."], context: "Perfect for describing compelling reasoning, well-structured arguments, or persuasive presentations." },
  { word: "Esoteric", pronunciation: "es-uh-TER-ik", definition: "Intended for or understood by only a small group with specialized knowledge", category: "Intellectual Discussion", examples: ["The professor's lecture delved into esoteric aspects of quantum mechanics.", "His interest in esoteric philosophy set him apart from mainstream academics."], context: "Excellent for discussing specialized, obscure, or arcane knowledge in academic or intellectual circles." },
  { word: "Didactic", pronunciation: "dy-DAK-tik", definition: "Intended to teach or instruct, sometimes excessively so", category: "Intellectual Discussion", examples: ["The novel's didactic tone made its moral lessons abundantly clear.", "His didactic approach to mentoring proved highly effective for junior colleagues."], context: "Can be neutral or mildly critical when describing overly instructional or preachy communication." },
  { word: "Empirical", pronunciation: "em-PEER-ih-kuhl", definition: "Based on observation or experience rather than theory", category: "Intellectual Discussion", examples: ["We must ground our conclusions in empirical evidence rather than speculation.", "Her research methodology relied on rigorous empirical observation."], context: "Essential for scientific, research-based, or data-driven discussions requiring evidence-based approaches." },
  { word: "Axiom", pronunciation: "AK-see-uhm", definition: "A statement accepted as true without proof; a self-evident principle", category: "Intellectual Discussion", examples: ["In mathematics, an axiom serves as a foundational truth from which theorems are derived.", "It has become an axiom of leadership that transparent communication fosters trust."], context: "Use in logic, mathematics, philosophy, or when establishing fundamental principles in any field." },
  { word: "Epistemology", pronunciation: "ih-pis-tuh-MOL-uh-jee", definition: "The study or theory of knowledge and how we acquire it", category: "Intellectual Discussion", examples: ["Epistemology explores fundamental questions about belief, truth, and justification.", "Her research focused on the epistemology of scientific knowledge and discovery."], context: "Philosophical term for discussing the nature, origins, and limits of human knowledge." },
  { word: "Paradigm", pronunciation: "PAIR-uh-dym", definition: "A typical example or pattern; a worldview or framework", category: "Intellectual Discussion", examples: ["The discovery represented a fundamental paradigm shift in our understanding of physics.", "We must challenge the existing paradigm if we hope to innovate."], context: "Often used to describe fundamental changes in thinking, frameworks, or dominant models in any field." },
  { word: "Extrapolate", pronunciation: "ik-STRAP-uh-layt", definition: "To estimate or conclude something by extending known information", category: "Intellectual Discussion", examples: ["We can extrapolate future market trends from current consumer behavior patterns.", "It would be premature to extrapolate such broad conclusions from limited data."], context: "Common in data analysis, forecasting, and research when extending findings beyond immediate evidence." },
  { word: "Dichotomy", pronunciation: "dy-KOT-uh-mee", definition: "A division into two contrasting or opposing parts", category: "Intellectual Discussion", examples: ["There exists a false dichotomy between artistic creativity and scientific rigor.", "The dichotomy between theory and practice is often overstated in academic discourse."], context: "Perfect for describing binary oppositions, false choices, or contrasting perspectives in analysis." },
  { word: "Juxtapose", pronunciation: "JUHK-stuh-pohz", definition: "To place side by side for comparison or contrast", category: "Intellectual Discussion", examples: ["The exhibition juxtaposes ancient artifacts with contemporary interpretations.", "By juxtaposing these competing theories, we can illuminate their fundamental differences."], context: "Essential in analysis, criticism, comparative studies, or when highlighting contrasts." },
  { word: "Antithesis", pronunciation: "an-TITH-uh-sis", definition: "The direct opposite of something; a contrast of ideas", category: "Intellectual Discussion", examples: ["Chaos represents the antithesis of order and systematic organization.", "His actions stood in stark antithesis to his publicly stated principles."], context: "Use when emphasizing complete opposition, contradiction, or stark contrast between concepts." },
  { word: "Hypothesis", pronunciation: "hy-POTH-uh-sis", definition: "A proposed explanation that can be tested through investigation", category: "Intellectual Discussion", examples: ["The scientist formulated a hypothesis regarding climate pattern variations.", "We must rigorously test this hypothesis through controlled experimentation."], context: "Fundamental to scientific method, research methodology, and systematic investigation." },
  { word: "Synthesis", pronunciation: "SIN-thuh-sis", definition: "The combination of components to form a connected whole", category: "Intellectual Discussion", examples: ["Her essay represented a brilliant synthesis of diverse philosophical sources.", "Scientific progress often requires the synthesis of seemingly disparate findings."], context: "Essential in academic writing, research, and when combining multiple elements into coherent wholes." },
  { word: "Postulate", pronunciation: "POS-chuh-layt", definition: "To suggest or assume as true for the basis of reasoning", category: "Intellectual Discussion", examples: ["Einstein postulated that the speed of light remains constant in all reference frames.", "We can postulate several plausible explanations for the observed phenomenon."], context: "Common in mathematics, science, philosophy, and theoretical discussions requiring foundational assumptions." },
  { word: "Corollary", pronunciation: "KOR-uh-ler-ee", definition: "A natural consequence or result; something that follows logically", category: "Intellectual Discussion", examples: ["A corollary of this economic theory is that resources will inevitably become scarce.", "Trust emerges as a natural corollary of consistent, transparent communication."], context: "Perfect for describing logical implications, natural consequences, or derivative conclusions." },
  { word: "Nomenclature", pronunciation: "NOH-muhn-klay-chur", definition: "A system of names or terms used in a particular field", category: "Intellectual Discussion", examples: ["Scientific nomenclature ensures consistency and precision across international research.", "Understanding the legal nomenclature proved essential for navigating the regulatory framework."], context: "Use when discussing terminology systems, classification schemes, or specialized vocabulary." },
  { word: "Taxonomy", pronunciation: "tak-SON-uh-mee", definition: "The practice of classification; a scheme of categories", category: "Intellectual Discussion", examples: ["Biological taxonomy systematically organizes living organisms into hierarchical groups.", "We require a clear conceptual taxonomy for these overlapping theoretical constructs."], context: "Originally biological, now broadly applied to any classification or organizational system." },
  { word: "Heuristic", pronunciation: "hyoo-RIS-tik", definition: "A practical method for problem-solving, often using trial and error", category: "Intellectual Discussion", examples: ["She employed a heuristic approach to navigate the complex optimization problem.", "Heuristic methods prove invaluable when optimal solutions are computationally impractical."], context: "Common in psychology, computer science, decision-making, and practical problem-solving contexts." },
  { word: "Pragmatic", pronunciation: "prag-MAT-ik", definition: "Dealing with things practically rather than theoretically", category: "Intellectual Discussion", examples: ["We require a pragmatic solution that addresses real-world constraints.", "His pragmatic approach valued demonstrable results over ideological purity."], context: "Emphasizes practical effectiveness, real-world application, and results-oriented thinking." },
  { word: "Quantify", pronunciation: "KWON-tuh-fy", definition: "To express or measure as a quantity; to put into numerical terms", category: "Intellectual Discussion", examples: ["The challenge lies in our ability to quantify these intangible cultural benefits.", "Can you quantify the projected return on investment for this initiative?"], context: "Important in research, analysis, business, and any data-driven discussion requiring measurement." },
  { word: "Substantiate", pronunciation: "suhb-STAN-shee-ayt", definition: "To provide evidence to support or prove the truth of something", category: "Intellectual Discussion", examples: ["You must substantiate these extraordinary claims with rigorous empirical data.", "The witness testimony substantially substantiated the prosecutor's narrative."], context: "Essential when requiring proof, evidence, or verification of claims and assertions." },
  { word: "Corroborate", pronunciation: "kuh-ROB-uh-rayt", definition: "To confirm or support with evidence", category: "Intellectual Discussion", examples: ["Multiple independent studies corroborate these initial research findings.", "Can anyone corroborate your recollection of the events in question?"], context: "Common in legal, scientific, investigative, and research contexts requiring verification." },
  { word: "Inference", pronunciation: "IN-fur-uhns", definition: "A conclusion reached based on evidence and reasoning", category: "Intellectual Discussion", examples: ["The detective drew a compelling inference from the circumstantial evidence presented.", "Statistical inference allows researchers to generalize from sample data to populations."], context: "Fundamental to logic, scientific method, critical thinking, and analytical reasoning." },
  { word: "Delineate", pronunciation: "dih-LIN-ee-ayt", definition: "To describe or outline precisely; to indicate the boundaries", category: "Intellectual Discussion", examples: ["The contract meticulously delineates each party's respective responsibilities and obligations.", "Could you delineate the fundamental distinctions between these theoretical approaches?"], context: "Perfect for clarifying boundaries, distinctions, responsibilities, or precise specifications." },
  { word: "Erudite", pronunciation: "ER-yoo-dyt", definition: "Having or showing great knowledge or learning", category: "Intellectual Discussion", examples: ["The erudite professor could discourse eloquently on virtually any historical period.", "His erudite commentary substantially enriched our collective understanding."], context: "High praise for scholarly knowledge, intellectual depth, and comprehensive learning." },
  { word: "Salient", pronunciation: "SAY-lee-uhnt", definition: "Most noticeable or important; prominent", category: "Intellectual Discussion", examples: ["The salient features of this proposal merit careful consideration.", "Allow me to highlight the salient points of our discussion."], context: "Excellent for drawing attention to key points in formal discourse." },
  { word: "Dialectic", pronunciation: "dy-uh-LEK-tik", definition: "The art of investigating truth through discussion and logical argument", category: "Intellectual Discussion", examples: ["The philosopher masterfully employed dialectic to explore fundamental ethical questions.", "Their intellectual debate exemplified the classical dialectic method of inquiry."], context: "Philosophical term for systematic logical discourse, debate, and the examination of ideas." },
  { word: "Reductionist", pronunciation: "ree-DUHK-shuh-nist", definition: "Analyzing complex things by reducing them to simpler components", category: "Intellectual Discussion", examples: ["Critics argue that reductionist approaches oversimplify the complexity of human behavior.", "The reductionist methodology proved insufficient for understanding emergent properties."], context: "Can be descriptive or critical in academic contexts discussing analytical approaches." },

  // REFINED COMPLIMENTS
  { word: "Magnanimous", pronunciation: "mag-NAN-uh-muhs", definition: "Generous and forgiving, especially toward a rival or less powerful person", category: "Refined Compliments", examples: ["Her magnanimous gesture toward her former opponent won widespread admiration.", "It was magnanimous of him to acknowledge his rival's achievements so graciously."], context: "Perfect for expressing noble character, particularly in victory or positions of power." },
  { word: "Affable", pronunciation: "AF-uh-buhl", definition: "Friendly, good-natured, and easy to talk to", category: "Refined Compliments", examples: ["Her affable manner immediately put all guests at ease.", "Despite his considerable success, he remained remarkably affable and approachable."], context: "Excellent compliment for warm, approachable nature and gracious social conduct." },
  { word: "Astute", pronunciation: "uh-STOOT", definition: "Having the ability to accurately assess situations and turn them to advantage", category: "Refined Compliments", examples: ["She made several astute observations regarding emerging market trends.", "His astute business acumen led to a series of remarkably successful ventures."], context: "High praise for sharp judgment, perceptiveness, and strategic thinking." },
  { word: "Benevolent", pronunciation: "buh-NEV-uh-luhnt", definition: "Well-meaning and kindly; characterized by doing good", category: "Refined Compliments", examples: ["The benevolent patron funded scholarships for hundreds of deserving students.", "Her benevolent nature manifested in every personal and professional interaction."], context: "Perfect for praising genuine kindness, charitable spirit, and altruistic character." },
  { word: "Gracious", pronunciation: "GRAY-shuhs", definition: "Courteous, kind, and pleasant, especially to those of lower status", category: "Refined Compliments", examples: ["She remained gracious in defeat, warmly congratulating her worthy opponent.", "His gracious hospitality made every visitor feel genuinely valued and welcome."], context: "Compliments elegance, kindness, good manners, and dignified comportment." },
  { word: "Judicious", pronunciation: "joo-DISH-uhs", definition: "Having or showing good judgment; wise and sensible", category: "Refined Compliments", examples: ["Her judicious allocation of limited resources ensured the project's ultimate success.", "He exercised judicious restraint by waiting for more complete information."], context: "Praises wisdom, sound decision-making, and measured thoughtfulness." },
  { word: "Sagacious", pronunciation: "suh-GAY-shuhs", definition: "Having keen mental discernment and good judgment; wise", category: "Refined Compliments", examples: ["The sagacious leader consistently anticipated challenges before they fully materialized.", "Her sagacious counsel proved invaluable during the organizational crisis."], context: "High praise for wisdom, foresight, and exceptional judgment." },
  { word: "Articulate", pronunciation: "ahr-TIK-yuh-lit", definition: "Able to express ideas clearly and effectively", category: "Refined Compliments", examples: ["She delivered an articulate presentation that thoroughly captivated the audience.", "His articulate explanation clarified the most complex aspects of the issue."], context: "Compliments clear, effective communication and expressive eloquence." },
  { word: "Charismatic", pronunciation: "kar-iz-MAT-ik", definition: "Possessing compelling charm that inspires devotion in others", category: "Refined Compliments", examples: ["The charismatic speaker effortlessly commanded everyone's undivided attention.", "Her charismatic personality naturally drew supporters to the cause."], context: "Praises magnetic personal appeal, influence, and inspiring presence." },
  { word: "Tenacious", pronunciation: "tuh-NAY-shuhs", definition: "Holding firmly; persistent in maintaining or seeking something valued", category: "Refined Compliments", examples: ["Her tenacious pursuit of justice inspired countless others to join the movement.", "His tenacious work ethic eventually led to well-deserved professional success."], context: "Compliments determination, persistence, and unwavering commitment." },
  { word: "Resilient", pronunciation: "rih-ZIL-yuhnt", definition: "Able to recover quickly from difficulties; adaptable", category: "Refined Compliments", examples: ["The resilient community rebuilt stronger than ever following the devastating disaster.", "Her remarkably resilient spirit enabled her to overcome numerous formidable obstacles."], context: "Praises strength in adversity, adaptability, and psychological fortitude." },
  { word: "Indefatigable", pronunciation: "in-dih-FAT-ih-guh-buhl", definition: "Persisting tirelessly; showing sustained enthusiastic action", category: "Refined Compliments", examples: ["His indefatigable efforts to improve community infrastructure earned widespread recognition.", "She proved an indefatigable advocate for comprehensive education reform."], context: "High praise for tireless dedication, inexhaustible energy, and sustained commitment." },
  { word: "Exemplary", pronunciation: "ig-ZEM-pluh-ree", definition: "Serving as a desirable model; representing the best of its kind", category: "Refined Compliments", examples: ["Her exemplary professional conduct consistently set the standard for colleagues.", "He demonstrated exemplary leadership throughout the prolonged organizational crisis."], context: "Praises someone or something as an ideal model worthy of emulation." },
  { word: "Venerable", pronunciation: "VEN-er-uh-buhl", definition: "Deserving respect because of age, wisdom, or character", category: "Refined Compliments", examples: ["The venerable professor had devoted fifty distinguished years to teaching.", "This venerable institution maintains a proud legacy spanning multiple centuries."], context: "Respectful term for age, experience, tradition, and accumulated wisdom." },
  { word: "Scrupulous", pronunciation: "SKROO-pyuh-luhs", definition: "Careful and thorough; having moral integrity", category: "Refined Compliments", examples: ["She maintained scrupulous attention to every minute detail of the project.", "His scrupulous honesty in all dealings earned widespread trust and respect."], context: "Praises thoroughness, precision, conscientiousness, and moral character." },
  { word: "Diligent", pronunciation: "DIL-ih-juhnt", definition: "Showing careful and persistent effort", category: "Refined Compliments", examples: ["Her diligent research methodology uncovered several previously unknown important findings.", "He proved a diligent student who invariably completed all assignments thoroughly."], context: "Compliments consistent hard work, attention, and sustained effort." },
  { word: "Industrious", pronunciation: "in-DUHS-tree-uhs", definition: "Diligent and hardworking", category: "Refined Compliments", examples: ["The industrious team completed the ambitious project well ahead of schedule.", "Her industrious nature led directly to numerous significant professional accomplishments."], context: "Praises productive hard work, efficiency, and sustained effort." },
  { word: "Meticulous", pronunciation: "muh-TIK-yuh-luhs", definition: "Showing great attention to detail; very careful and precise", category: "Refined Compliments", examples: ["His meticulous planning ensured that absolutely nothing was overlooked or forgotten.", "She maintained meticulous records documenting every transaction with perfect accuracy."], context: "Compliments thoroughness, precision, carefulness, and attention to detail." },
  { word: "Ingenious", pronunciation: "in-JEEN-yuhs", definition: "Clever, original, and inventive", category: "Refined Compliments", examples: ["Her ingenious solution elegantly resolved a long-standing intractable problem.", "The ingenious design masterfully combined aesthetic beauty with practical functionality."], context: "Praises creativity, cleverness, innovation, and skillful problem-solving." },
  { word: "Prodigious", pronunciation: "pruh-DIJ-uhs", definition: "Remarkably impressive in extent, size, or degree", category: "Refined Compliments", examples: ["Mozart demonstrated prodigious musical talent from his remarkably early childhood.", "Her prodigious memory enabled perfect recall of vast quantities of complex information."], context: "Emphasizes exceptional, extraordinary, or remarkable qualities and abilities." },
  { word: "Eloquent", pronunciation: "EL-uh-kwuhnt", definition: "Fluent and persuasive in speaking or writing", category: "Refined Compliments", examples: ["Her eloquent speech profoundly moved the audience to tears of inspiration.", "His eloquent writing style consistently captivated and engaged readers."], context: "High praise for expressive communication, rhetorical skill, and persuasive ability." },
  { word: "Stalwart", pronunciation: "STAWL-wurt", definition: "Loyal, reliable, and hardworking; dependable", category: "Refined Compliments", examples: ["He remained a stalwart supporter of the organization through difficult times.", "Her stalwart dedication never once wavered despite numerous setbacks."], context: "Praises steadfast loyalty, reliability, and unwavering commitment." },
  { word: "Intrepid", pronunciation: "in-TREP-id", definition: "Fearless and adventurous", category: "Refined Compliments", examples: ["The intrepid explorer fearlessly ventured into previously uncharted territories.", "Her intrepid spirit consistently led her to pursue ambitious and challenging goals."], context: "Compliments courage, boldness, and adventurous spirit." },
  { word: "Perspicacious", pronunciation: "pur-spi-KAY-shuhs", definition: "Having keen insight or discernment; perceptive", category: "Refined Compliments", examples: ["Your perspicacious analysis of the situation proved invaluable.", "She made several perspicacious observations during the proceedings."], context: "Use when praising intellectual sharpness or insightful understanding." },
  { word: "Noble", pronunciation: "NOH-buhl", definition: "Having high moral qualities; showing greatness of character", category: "Refined Compliments", examples: ["His noble sacrifice inspired generations to come.", "She demonstrated noble restraint in the face of provocation."], context: "High praise for moral excellence, dignity, and honorable character." },

  // LITERARY EXPRESSION
  { word: "Ineffable", pronunciation: "in-EF-uh-buhl", definition: "Too great or extreme to be expressed in words", category: "Literary Expression", examples: ["The ineffable beauty of the ceremony left us speechless.", "There was an ineffable quality to her presence that commanded respect."], context: "Excellent for describing profound experiences, sublime beauty, or transcendent moments." },
  { word: "Ephemeral", pronunciation: "ih-FEM-er-uhl", definition: "Lasting for a very short time; transitory", category: "Literary Expression", examples: ["Cherry blossoms embody ephemeral beauty, blooming brilliantly yet fading swiftly.", "Fame often proves ephemeral, present today yet vanished tomorrow without trace."], context: "Poetic term for fleeting beauty, temporary experiences, or transient phenomena." },
  { word: "Ethereal", pronunciation: "ih-THEER-ee-uhl", definition: "Extremely delicate and light; seeming too perfect for this world", category: "Literary Expression", examples: ["The dancer moved across the stage with ethereal, otherworldly grace.", "Morning mist bestowed upon the landscape an ethereal, dreamlike quality."], context: "Describes otherworldly beauty, delicate qualities, or spiritual lightness." },
  { word: "Serene", pronunciation: "suh-REEN", definition: "Calm, peaceful, and untroubled", category: "Literary Expression", examples: ["The mountain lake lay perfectly serene in the gentle morning light.", "She maintained a serene expression despite the surrounding chaos and confusion."], context: "Describes tranquil beauty, peaceful composure, or undisturbed calm." },
  { word: "Sublime", pronunciation: "suh-BLYM", definition: "Of such excellence, grandeur, or beauty as to inspire awe", category: "Literary Expression", examples: ["The mountain vista achieved truly sublime heights of natural beauty.", "Mozart's compositions reach sublime artistic peaks rarely equaled in musical history."], context: "Describes transcendent beauty, excellence, or experiences that inspire awe." },
  { word: "Resplendent", pronunciation: "rih-SPLEN-duhnt", definition: "Attractive and impressive through being richly colorful or sumptuous", category: "Literary Expression", examples: ["The grand ballroom appeared resplendent with elaborate golden decorations throughout.", "She looked absolutely resplendent in her exquisitely crafted wedding gown."], context: "Describes dazzling appearance, magnificent splendor, or brilliant visual beauty." },
  { word: "Luminous", pronunciation: "LOO-mih-nuhs", definition: "Full of or shedding light; bright and shining", category: "Literary Expression", examples: ["Her luminous eyes sparkled with unmistakable joy and genuine warmth.", "The masterwork painting possessed an extraordinary luminous quality throughout."], context: "Describes radiant beauty, glowing light, or brilliant illumination." },
  { word: "Pristine", pronunciation: "PRIS-teen", definition: "In its original condition; unspoiled; fresh and clean", category: "Literary Expression", examples: ["The pristine wilderness remained completely untouched by human presence or activity.", "Fresh snow lay in pristine perfection across the entire peaceful meadow."], context: "Describes pure, unspoiled beauty, original condition, or unblemished state." },
  { word: "Verdant", pronunciation: "VUR-duhnt", definition: "Green with grass or other rich vegetation", category: "Literary Expression", examples: ["The verdant hills rolled endlessly into the misty distance.", "Spring returned, bringing verdant new life to the awakening countryside."], context: "Poetic term for lush greenery, rich vegetation, or fertile landscapes." },
  { word: "Sanguine", pronunciation: "SANG-gwin", definition: "Optimistic or positive, especially in difficult situations", category: "Literary Expression", examples: ["Despite numerous setbacks, she remained remarkably sanguine about future prospects.", "His naturally sanguine disposition consistently lifted everyone's spirits."], context: "Literary term for cheerful optimism, hopeful outlook, or positive temperament." },
  { word: "Mellifluous", pronunciation: "meh-LIF-loo-uhs", definition: "Sweet or musical; pleasant to hear", category: "Literary Expression", examples: ["Her mellifluous voice thoroughly enchanted the captivated audience.", "The mellifluous tones of the violin filled the entire concert hall."], context: "Describes beautiful, flowing sound, musical speech, or harmonious expression." },
  { word: "Lambent", pronunciation: "LAM-buhnt", definition: "Softly bright or radiant; dealing lightly and gracefully with a subject", category: "Literary Expression", examples: ["Lambent firelight flickered gently across the shadowed walls.", "His lambent wit made even serious topics entertaining and accessible."], context: "Poetic term for gentle light, graceful expression, or subtle brilliance." },
  { word: "Susurrus", pronunciation: "soo-SUR-uhs", definition: "A whispering or rustling sound", category: "Literary Expression", examples: ["The gentle susurrus of leaves in the breeze proved remarkably soothing.", "A soft susurrus filled the quiet reading room of the library."], context: "Poetic word for soft sounds, rustling movements, or whispered expressions." },
  { word: "Halcyon", pronunciation: "HAL-see-uhn", definition: "Denoting a period of time in the past that was idyllically happy and peaceful", category: "Literary Expression", examples: ["She fondly recalled the halcyon days of her carefree childhood summers.", "Those were truly halcyon times before the war disrupted everything."], context: "Nostalgic term for peaceful, golden times or idealized past periods." },
  { word: "Iridescent", pronunciation: "ir-ih-DES-uhnt", definition: "Showing luminous colors that seem to change when seen from different angles", category: "Literary Expression", examples: ["The soap bubble displayed brilliantly iridescent colors in the sunlight.", "Hummingbird feathers possess an extraordinary iridescent quality when light strikes them."], context: "Describes shimmering beauty, rainbow-like colors, or changing luminous effects." },
  { word: "Gossamer", pronunciation: "GOS-uh-mur", definition: "Something very light, thin, and delicate", category: "Literary Expression", examples: ["Gossamer threads of spider silk glistened delicately with morning dew.", "She wore an elegant gown fashioned from gossamer fabric."], context: "Poetic term for delicate quality, airy lightness, or fragile beauty." },
  { word: "Zephyr", pronunciation: "ZEF-ur", definition: "A soft, gentle breeze", category: "Literary Expression", examples: ["A pleasant zephyr rustled softly through the blooming garden.", "The graceful sailboat moved effortlessly on the gentle evening zephyr."], context: "Poetic word for light wind, gentle breeze, or soft air movement." },
  { word: "Sonorous", pronunciation: "suh-NOR-uhs", definition: "Deep, full, and rich in sound; imposing or impressive in style", category: "Literary Expression", examples: ["The sonorous tones of the church bells rang out majestically.", "His sonorous voice commanded immediate attention from all listeners."], context: "Describes rich sound, resonant voice, or impressive auditory quality." },
  { word: "Serendipity", pronunciation: "ser-uhn-DIP-ih-tee", definition: "The occurrence of events by chance in a happy or beneficial way", category: "Literary Expression", examples: ["Finding that rare first edition proved pure serendipity.", "Their chance meeting represented a wonderful moment of serendipity."], context: "Describes fortunate coincidences, happy accidents, or lucky discoveries." },
  { word: "Bucolic", pronunciation: "byoo-KOL-ik", definition: "Relating to the pleasant aspects of the countryside and country life", category: "Literary Expression", examples: ["The painting depicted an idealized bucolic rural scene of tranquility.", "They escaped the hectic city for a peaceful bucolic retreat."], context: "Literary term for pastoral charm, rural beauty, or countryside pleasantness." },
  { word: "Crepuscular", pronunciation: "krih-PUHS-kyuh-lur", definition: "Relating to twilight; dim or shadowy", category: "Literary Expression", examples: ["The crepuscular light of evening cast long mysterious shadows everywhere.", "Deer are crepuscular animals, most active during dawn and dusk hours."], context: "Poetic term for twilight, dimness, or the mysterious quality of fading light." },
  { word: "Dulcet", pronunciation: "DUHL-sit", definition: "Sweet and soothing, often used of sound", category: "Literary Expression", examples: ["The dulcet tones of the concert harp filled the intimate room.", "She spoke in dulcet whispers that calmed everyone present."], context: "Describes pleasant sounds, melodious voices, or soothing auditory experiences." },
  { word: "Incandescent", pronunciation: "in-kan-DES-uhnt", definition: "Emitting light as a result of being heated; full of strong emotion", category: "Literary Expression", examples: ["The spectacular sunset sky blazed incandescent with vivid color.", "Her incandescent stage performance absolutely captivated the audience."], context: "Describes brilliant light, passionate intensity, or glowing radiance." },
  { word: "Pensive", pronunciation: "PEN-siv", definition: "Engaged in deep or serious thought, often with a hint of sadness", category: "Literary Expression", examples: ["She gazed out the rain-streaked window with a pensive expression.", "The melancholic music created a distinctly pensive, reflective mood."], context: "Describes thoughtful mood, reflective state, or contemplative sadness." },
  { word: "Lachrymose", pronunciation: "LAK-rih-mohs", definition: "Tearful or given to weeping; inducing tears", category: "Literary Expression", examples: ["The lachrymose farewell scene moved everyone to genuine tears.", "He possessed a rather lachrymose temperament, easily moved to emotion."], context: "Literary term for tearful quality, sad nature, or tendency toward weeping." },

  // ELOQUENT AGREEMENT
  { word: "Acquiesce", pronunciation: "ak-wee-ES", definition: "To accept or agree to something reluctantly but without protest", category: "Eloquent Agreement", examples: ["After considerable deliberation, the committee chose to acquiesce to the proposal.", "Though hesitant, she acquiesced to their request for additional time."], context: "Diplomatic way to express reluctant agreement while maintaining dignity." },
  { word: "Concur", pronunciation: "kuhn-KUR", definition: "To agree or have the same opinion", category: "Eloquent Agreement", examples: ["I wholeheartedly concur with your thorough assessment of the complex situation.", "The distinguished committee members concurred unanimously on the recommendation."], context: "Formal, elevated way to express agreement or shared opinion." },
  { word: "Assent", pronunciation: "uh-SENT", definition: "Express approval or agreement", category: "Eloquent Agreement", examples: ["The governing board gave their formal assent to the ambitious proposal.", "She nodded in silent yet unmistakable assent to the suggestion."], context: "Formal term for agreement, approval, or acceptance." },
  { word: "Ratify", pronunciation: "RAT-ih-fy", definition: "To formally approve or give consent to something, making it valid", category: "Eloquent Agreement", examples: ["Congress voted decisively to ratify the important international treaty.", "The agreement must be formally ratified by all participating member states."], context: "Official or legal term for formal approval or authorization." },
  { word: "Endorse", pronunciation: "en-DORS", definition: "To declare one's public approval or support of", category: "Eloquent Agreement", examples: ["The distinguished senator publicly endorsed the promising candidate.", "I wholeheartedly endorse this innovative and forward-thinking initiative."], context: "Public expression of support, recommendation, or backing." },
  { word: "Validate", pronunciation: "VAL-ih-dayt", definition: "To demonstrate or support the truth or value of", category: "Eloquent Agreement", examples: ["The empirical results validate our theoretical approach comprehensively.", "Her remarkable success validates many years of dedicated hard work."], context: "Confirming accuracy, worth, or legitimacy through evidence or support." },
  { word: "Affirm", pronunciation: "uh-FURM", definition: "To state or assert positively; to confirm", category: "Eloquent Agreement", examples: ["I can confidently affirm that the information is completely correct.", "The appellate court affirmed the lower court's well-reasoned decision."], context: "Strong, positive confirmation or emphatic agreement." },
  { word: "Sanction", pronunciation: "SANGK-shuhn", definition: "To give official permission or approval for an action", category: "Eloquent Agreement", examples: ["The oversight committee formally sanctioned the new comprehensive policy.", "This questionable behavior will not be sanctioned under any circumstances."], context: "Official authorization or approval (note: also means to punish)." },
  { word: "Espouse", pronunciation: "ih-SPOWZ", definition: "To adopt or support a cause, belief, or way of life", category: "Eloquent Agreement", examples: ["She passionately espouses progressive and innovative educational methods.", "The organization espouses environmental conservation and sustainable practices."], context: "Adopting, advocating for, or championing particular ideas or causes." },
  { word: "Capitulate", pronunciation: "kuh-PICH-uh-layt", definition: "To cease to resist; to surrender or give in", category: "Eloquent Agreement", examples: ["The opposing faction finally capitulated after prolonged negotiations.", "He steadfastly refused to capitulate to mounting external pressure."], context: "Surrender, yielding, or giving in after resistance or opposition." },
  { word: "Accede", pronunciation: "ak-SEED", definition: "To agree to a demand, request, or treaty", category: "Eloquent Agreement", examples: ["The government eventually acceded to the protesters' legitimate demands.", "After careful negotiation, both parties acceded to the mutually acceptable terms."], context: "Formal agreement, often after deliberation or consideration." },
  { word: "Comply", pronunciation: "kuhm-PLY", definition: "To act in accordance with a wish or command", category: "Eloquent Agreement", examples: ["All employees must comply strictly with established company policy.", "The new building complies fully with all current safety regulations."], context: "Following rules, requests, or requirements obediently." },
  { word: "Defer", pronunciation: "dih-FUR", definition: "To submit to another's wishes or opinion out of respect", category: "Eloquent Agreement", examples: ["I respectfully defer to your considerably greater expertise in this matter.", "He wisely deferred to the committee's more informed collective judgment."], context: "Yielding to another's authority, knowledge, or superior position." },
  { word: "Align", pronunciation: "uh-LYN", definition: "To place in agreement or bring into cooperation", category: "Eloquent Agreement", examples: ["Our organizational goals align perfectly with the stated mission.", "We must carefully align our diverse strategies for maximum effectiveness."], context: "Bringing into harmony, agreement, or coordinated cooperation." },
  { word: "Reconcile", pronunciation: "REK-uhn-syl", definition: "To make compatible or bring into agreement", category: "Eloquent Agreement", examples: ["We need to reconcile these apparently conflicting reports systematically.", "They successfully reconciled their significant differences through dialogue."], context: "Resolving disagreements, contradictions, or conflicting positions." },
  { word: "Consensus", pronunciation: "kuhn-SEN-suhs", definition: "General agreement among a group", category: "Eloquent Agreement", examples: ["The diverse team ultimately reached consensus on the best approach.", "There emerged broad consensus that significant change was urgently needed."], context: "Collective agreement, shared opinion, or general accord." },
  { word: "Unanimous", pronunciation: "yoo-NAN-uh-muhs", definition: "Fully in agreement; without dissent", category: "Eloquent Agreement", examples: ["The final decision proved unanimous among all voting members.", "There existed unanimous support for the ambitious proposal."], context: "Complete agreement by all parties without exception or dissent." },
  { word: "Corroborate", pronunciation: "kuh-ROB-uh-rayt", definition: "To confirm or give support to a statement or theory", category: "Eloquent Agreement", examples: ["The physical evidence corroborates her detailed testimony.", "Can anyone present corroborate your version of events?"], context: "Supporting claims with additional evidence or confirmation." },
  { word: "Substantiate", pronunciation: "suhb-STAN-shee-ayt", definition: "To provide evidence to support or prove the truth of", category: "Eloquent Agreement", examples: ["Please substantiate these claims with verifiable data.", "The comprehensive findings substantiate our initial hypothesis."], context: "Backing up assertions with proof or evidence." },
  { word: "Legitimize", pronunciation: "lih-JIT-ih-myz", definition: "To make something acceptable or valid", category: "Eloquent Agreement", examples: ["The research legitimizes the new approach to treatment.", "Public support helped legitimize the controversial policy."], context: "Conferring validity, approval, or official recognition." },

  // NUANCED EMOTIONS
  { word: "Melancholic", pronunciation: "mel-uhn-KOL-ik", definition: "Expressing or characterized by pensive sadness", category: "Nuanced Emotions", examples: ["The melancholic atmosphere of the evening matched our contemplative mood.", "His melancholic disposition lent a certain depth to his observations."], context: "Perfect for describing thoughtful sadness or wistful emotional states." },
  { word: "Ebullient", pronunciation: "ih-BUHL-yuhnt", definition: "Cheerful and full of energy; exuberant", category: "Nuanced Emotions", examples: ["Her ebullient personality brought life to even the most formal gatherings.", "The crowd's ebullient response exceeded all expectations."], context: "Perfect for describing enthusiastic positivity in an elevated manner." },
  { word: "Wistful", pronunciation: "WIST-fuhl", definition: "Having or showing a feeling of vague or regretful longing", category: "Nuanced Emotions", examples: ["She cast a wistful glance at the faded photograph from decades past.", "There existed something distinctly wistful in his bittersweet smile."], context: "Gentle sadness mixed with yearning, nostalgia, or tender longing." },
  { word: "Euphoric", pronunciation: "yoo-FOR-ik", definition: "Intensely happy and confident; elated", category: "Nuanced Emotions", examples: ["The championship team felt absolutely euphoric after their dramatic victory.", "She experienced a euphoric sense of liberation and newfound freedom."], context: "Extreme happiness, intense joy, or exhilarating excitement." },
  { word: "Morose", pronunciation: "muh-ROHS", definition: "Sullen and ill-tempered; gloomy", category: "Nuanced Emotions", examples: ["He became increasingly morose after receiving the disappointing news.", "Her morose mood persisted for several days following the setback."], context: "Bad-tempered sadness, sullen gloominess, or brooding disposition." },
  { word: "Elated", pronunciation: "ih-LAY-tid", definition: "Extremely happy and excited", category: "Nuanced Emotions", examples: ["She felt absolutely elated upon learning she had secured the position.", "The devoted fans were elated by their team's stunning victory."], context: "Great joy, pride, excitement, or triumphant happiness." },
  { word: "Forlorn", pronunciation: "for-LORN", definition: "Pitifully sad and abandoned or lonely", category: "Nuanced Emotions", examples: ["The abandoned house stood forlorn against the darkening sky.", "He made a forlorn attempt to explain the inexplicable situation."], context: "Sad, lonely, hopeless, or pitifully abandoned quality." },
  { word: "Jubilant", pronunciation: "JOO-bih-luhnt", definition: "Feeling or expressing great happiness and triumph", category: "Nuanced Emotions", examples: ["The jubilant crowd celebrated enthusiastically in the streets.", "She felt jubilant at her hard-earned success and recognition."], context: "Triumphant joy, celebratory happiness, or victorious elation." },
  { word: "Melancholy", pronunciation: "MEL-uhn-kol-ee", definition: "A deep, persistent sadness or sorrow", category: "Nuanced Emotions", examples: ["The haunting song evoked a profound melancholy in all listeners.", "A pervasive sense of melancholy filled the somber gathering."], context: "Deep, often unexplained sadness or persistent sorrowful mood." },
  { word: "Mirthful", pronunciation: "MURTH-fuhl", definition: "Full of merriment; characterized by happiness and laughter", category: "Nuanced Emotions", examples: ["The children's mirthful laughter filled the sunny park with joy.", "His mirthful expression proved wonderfully contagious to others."], context: "Joyful laughter, merriment, or cheerful happiness." },
  { word: "Despondent", pronunciation: "dih-SPON-duhnt", definition: "In low spirits from loss of hope or courage", category: "Nuanced Emotions", examples: ["He felt despondent after experiencing repeated failures and setbacks.", "Her despondent mood worried friends and family members alike."], context: "Hopeless sadness, deep discouragement, or dispirited depression." },
  { word: "Exultant", pronunciation: "ig-ZUHL-tuhnt", definition: "Triumphantly happy; showing great joy", category: "Nuanced Emotions", examples: ["The exultant team hoisted the championship trophy overhead.", "She felt exultant after successfully completing the grueling marathon."], context: "Triumphant joy, victorious happiness, or jubilant celebration." },
  { word: "Doleful", pronunciation: "DOHL-fuhl", definition: "Expressing sorrow; mournful", category: "Nuanced Emotions", examples: ["The violin played a doleful melody that touched every heart.", "His doleful expression clearly revealed his profound sadness."], context: "Expressing grief, sadness, sorrow, or mournful emotion." },
  { word: "Rapturous", pronunciation: "RAP-chur-uhs", definition: "Characterized by expressing or feeling great pleasure or enthusiasm", category: "Nuanced Emotions", examples: ["The audience responded with rapturous applause and standing ovations.", "She proved rapturous in her enthusiastic praise of the performance."], context: "Intense joy, ecstatic enthusiasm, or overwhelming pleasure." },
  { word: "Lugubrious", pronunciation: "loo-GOO-bree-uhs", definition: "Looking or sounding sad and dismal", category: "Nuanced Emotions", examples: ["His lugubrious tone depressed everyone within earshot.", "The lugubrious music perfectly matched the somber mood."], context: "Exaggeratedly mournful, affectedly sad, or overly gloomy." },
  { word: "Vivacious", pronunciation: "vih-VAY-shuhs", definition: "Attractively lively and animated", category: "Nuanced Emotions", examples: ["Her vivacious personality naturally drew people closer.", "The vivacious performance energized the entire audience thoroughly."], context: "Lively happiness, animated energy, or sparkling enthusiasm." },
  { word: "Plaintive", pronunciation: "PLAYN-tiv", definition: "Sounding sad and mournful", category: "Nuanced Emotions", examples: ["The plaintive call of a lone bird echoed across the valley.", "She spoke in plaintive tones that conveyed deep sorrow."], context: "Expressing sorrow or sadness, especially through sound or voice." },
  { word: "Buoyant", pronunciation: "BOY-uhnt", definition: "Cheerful and optimistic; resilient", category: "Nuanced Emotions", examples: ["Her buoyant spirit lifted everyone's mood significantly.", "Despite challenges, he maintained a buoyant attitude throughout."], context: "Light-hearted cheerfulness, resilient optimism, or uplifting spirit." },
  { word: "Somber", pronunciation: "SOM-bur", definition: "Dark or dull in color or tone; gloomy", category: "Nuanced Emotions", examples: ["The funeral maintained a somber atmosphere throughout the service.", "He delivered the unfortunate news in appropriately somber tones."], context: "Serious, sad, gloomy, or gravely subdued emotional quality." },
  { word: "Effervescent", pronunciation: "ef-ur-VES-uhnt", definition: "Vivacious and enthusiastic; bubbling with energy", category: "Nuanced Emotions", examples: ["Her effervescent personality proved wonderfully infectious.", "The crowd was effervescent with excitement and anticipation."], context: "Bubbly enthusiasm, lively energy, or sparkling vivacity." },
  { word: "Sullen", pronunciation: "SUHL-uhn", definition: "Bad-tempered and sulky; gloomy", category: "Nuanced Emotions", examples: ["He gave a sullen response to the reasonable question.", "The teenager's sullen attitude concerned parents and teachers alike."], context: "Moody disposition, resentful silence, or brooding ill-temper." },
  { word: "Exuberant", pronunciation: "ig-ZOO-bur-uhnt", definition: "Filled with or characterized by lively energy and excitement", category: "Nuanced Emotions", examples: ["The children's exuberant play filled the playground with joy.", "She delivered an exuberant performance that captivated everyone."], context: "Overflowing energy, abundant joy, or enthusiastic vitality." },
  { word: "Languid", pronunciation: "LANG-gwid", definition: "Displaying or having a disinclination for physical exertion; slow and relaxed", category: "Nuanced Emotions", examples: ["The hot afternoon made everyone feel languid and listless.", "She moved with languid grace across the stage."], context: "Weak, faint, relaxed from emotion, or pleasantly lazy quality." },
  { word: "Sanguine", pronunciation: "SANG-gwin", definition: "Optimistic or positive, especially in an apparently bad situation", category: "Nuanced Emotions", examples: ["Despite considerable setbacks, she remained remarkably sanguine.", "His naturally sanguine outlook proved refreshing to colleagues."], context: "Cheerful optimism, hopeful disposition, or positive outlook." },
  { word: "Pensive", pronunciation: "PEN-siv", definition: "Engaged in serious thought, often with sadness", category: "Nuanced Emotions", examples: ["She sat in pensive silence, lost in contemplation.", "His pensive mood suggested deep, troubled reflection."], context: "Thoughtful reflection, often tinged with melancholy or sadness." },

  // DIPLOMATIC DISCOURSE
  { word: "Circumspect", pronunciation: "SUR-kuhm-spekt", definition: "Wary and unwilling to take risks; cautious", category: "Diplomatic Discourse", examples: ["We must remain circumspect in our approach to these sensitive negotiations.", "Her circumspect manner ensured no diplomatic incidents occurred."], context: "Essential for describing careful, calculated approaches in delicate situations." },
  { word: "Tactful", pronunciation: "TAKT-fuhl", definition: "Having or showing skill in dealing with others without causing offense", category: "Diplomatic Discourse", examples: ["She provided a tactful response to the awkward question.", "His tactful handling of the difficult situation impressed all observers."], context: "Diplomatic sensitivity, skillful social navigation, or considerate communication." },
  { word: "Diplomatic", pronunciation: "dip-luh-MAT-ik", definition: "Skilled in dealing with sensitive matters or people", category: "Diplomatic Discourse", examples: ["He offered a diplomatic solution to the escalating conflict.", "Her diplomatic skills effectively prevented further escalation."], context: "Skillful navigation of difficult situations with tact and discretion." },
  { word: "Judicious", pronunciation: "joo-DISH-uhs", definition: "Having or done with good judgment; wise and careful", category: "Diplomatic Discourse", examples: ["A judicious use of limited resources ensured ultimate success.", "She made a judicious decision to postpone until conditions improved."], context: "Wise and careful decision-making, prudent judgment, or measured action." },
  { word: "Prudent", pronunciation: "PROO-duhnt", definition: "Acting with care and thought for the future", category: "Diplomatic Discourse", examples: ["It would be prudent to save substantial funds for emergencies.", "His prudent investments paid off handsomely over time."], context: "Wise caution, careful planning, or foresighted decision-making." },
  { word: "Discreet", pronunciation: "dih-SKREET", definition: "Careful and prudent, especially in speech; respectful of privacy", category: "Diplomatic Discourse", examples: ["She made discreet inquiries about the delicate situation.", "He remained discreet about the sensitive confidential information."], context: "Careful not to cause embarrassment, attract attention, or violate privacy." },
  { word: "Ameliorate", pronunciation: "uh-MEEL-yuh-rayt", definition: "To make something better; to improve", category: "Diplomatic Discourse", examples: ["The new policy aims to ameliorate difficult working conditions.", "Significant efforts were made to ameliorate the problematic situation."], context: "Formal term for improving circumstances, alleviating problems, or making better." },
  { word: "Conciliatory", pronunciation: "kuhn-SIL-ee-uh-tor-ee", definition: "Intended to pacify or placate; making peace", category: "Diplomatic Discourse", examples: ["He made a conciliatory gesture to mend the damaged relationship.", "Her conciliatory tone helped calm rising tensions effectively."], context: "Peace-making approach, soothing actions, or reconciliatory efforts." },
  { word: "Pragmatic", pronunciation: "prag-MAT-ik", definition: "Dealing with things sensibly and realistically", category: "Diplomatic Discourse", examples: ["We need a pragmatic approach to this complex problem.", "Her pragmatic solution gained widespread acceptance from all parties."], context: "Practical thinking, results-oriented approach, or realistic methodology." },
  { word: "Equitable", pronunciation: "EK-wih-tuh-buhl", definition: "Fair and impartial", category: "Diplomatic Discourse", examples: ["We must ensure an equitable distribution of available resources.", "The judge sought an equitable solution satisfying all parties."], context: "Fairness in treatment, just distribution, or impartial allocation." },
  { word: "Moderate", pronunciation: "MOD-ur-it", definition: "Average in amount, intensity, or degree; avoiding extremes", category: "Diplomatic Discourse", examples: ["He took a moderate position on the controversial issue.", "Her moderate views appealed to many diverse constituents."], context: "Balanced approach, middle-ground position, or avoidance of extremes." },
  { word: "Impartial", pronunciation: "im-PAR-shuhl", definition: "Treating all sides equally; fair and just", category: "Diplomatic Discourse", examples: ["The judge remained completely impartial throughout the lengthy trial.", "We require an impartial investigation into the allegations."], context: "Unbiased fairness, neutral judgment, or objective treatment." },
  { word: "Mitigate", pronunciation: "MIT-ih-gayt", definition: "To make less severe, serious, or painful", category: "Diplomatic Discourse", examples: ["The implemented measures will mitigate the negative impact significantly.", "He attempted to mitigate the considerable damage his actions caused."], context: "Reducing harm, lessening severity, or alleviating negative consequences." },
  { word: "Reconcile", pronunciation: "REK-uhn-syl", definition: "To restore friendly relations; to make compatible", category: "Diplomatic Discourse", examples: ["They worked diligently to reconcile their significant differences.", "The skilled mediator helped reconcile the opposing parties successfully."], context: "Restoring harmony, resolving conflicts, or bringing into agreement." },
  { word: "Placate", pronunciation: "PLAY-kayt", definition: "To make someone less angry or hostile", category: "Diplomatic Discourse", examples: ["He attempted to placate the angry customer with sincere apologies.", "Her genuine apology helped placate their legitimate concerns."], context: "Calming anger, soothing hostility, or appeasing dissatisfaction." },
  { word: "Assuage", pronunciation: "uh-SWAYJ", definition: "To make an unpleasant feeling less intense", category: "Diplomatic Discourse", examples: ["She tried earnestly to assuage his understandable fears.", "The clear explanation helped assuage widespread concerns."], context: "Soothing discomfort, relieving anxiety, or easing unpleasant feelings." },
  { word: "Mollify", pronunciation: "MOL-ih-fy", definition: "To appease the anger or anxiety of someone", category: "Diplomatic Discourse", examples: ["The sincere apology successfully mollified the offended party.", "He tried repeatedly to mollify her legitimate concerns."], context: "Pacifying anger, soothing distress, or calming upset feelings." },
  { word: "Temperate", pronunciation: "TEM-pur-it", definition: "Showing moderation or self-restraint", category: "Diplomatic Discourse", examples: ["His temperate response avoided unnecessary escalation.", "She maintained a temperate tone throughout the discussion."], context: "Controlled behavior, moderate response, or restrained communication." },
  { word: "Compromise", pronunciation: "KOM-pruh-myz", definition: "An agreement reached by each side making concessions", category: "Diplomatic Discourse", examples: ["Both parties reached a fair compromise after negotiation.", "Sometimes you must compromise to move forward productively."], context: "Mutual concessions, balanced agreement, or negotiated settlement." },
  { word: "Mediator", pronunciation: "MEE-dee-ay-tur", definition: "A person who attempts to make people involved in a conflict come to an agreement", category: "Diplomatic Discourse", examples: ["The experienced mediator helped both parties reach settlement.", "She served effectively as mediator in the complex dispute."], context: "Neutral party facilitating resolution, conflict management, or agreement." },

  // SOPHISTICATED CRITICISM
  { word: "Recalcitrant", pronunciation: "rih-KAL-si-truhnt", definition: "Having an obstinately uncooperative attitude", category: "Sophisticated Criticism", examples: ["The recalcitrant member refused to engage with reasonable compromise.", "His recalcitrant stance hindered progress on the matter."], context: "Diplomatic way to criticize stubborn resistance without being overtly harsh." },
  { word: "Pedantic", pronunciation: "pih-DAN-tik", definition: "Excessively concerned with minor details or rules; showing off learning", category: "Sophisticated Criticism", examples: ["His pedantic attention to trivial grammar annoyed colleagues.", "The professor's pedantic style made lectures unnecessarily tedious."], context: "Criticism of over-focus on trivial details or ostentatious display of knowledge." },
  { word: "Pretentious", pronunciation: "prih-TEN-shuhs", definition: "Attempting to impress by affecting greater importance or merit", category: "Sophisticated Criticism", examples: ["The restaurant's pretentious menu used unnecessarily fancy terminology.", "His pretentious manner alienated potential colleagues and friends."], context: "Criticism of false sophistication, affected importance, or showy behavior." },
  { word: "Obsequious", pronunciation: "uhb-SEE-kwee-uhs", definition: "Obedient or attentive to an excessive degree", category: "Sophisticated Criticism", examples: ["His obsequious behavior toward authority was rather embarrassing.", "The waiter's obsequious manner felt insincere and off-putting."], context: "Criticism of excessive flattery, servility, or fawning behavior." },
  { word: "Facile", pronunciation: "FAS-uhl", definition: "Ignoring complexities of an issue; superficial", category: "Sophisticated Criticism", examples: ["That represents a facile solution to a genuinely complex problem.", "Her facile explanation glossed over numerous important details."], context: "Criticism of oversimplification, superficiality, or shallow thinking." },
  { word: "Banal", pronunciation: "buh-NAL", definition: "So lacking in originality as to be obvious and boring", category: "Sophisticated Criticism", examples: ["The speech was filled with banal platitudes and clichés.", "His observations proved disappointingly banal and unoriginal."], context: "Criticism of lack of originality, triteness, or boring predictability." },
  { word: "Trite", pronunciation: "TRYT", definition: "Overused and consequently lacking in interest or originality", category: "Sophisticated Criticism", examples: ["The movie relied heavily on trite plot devices.", "Her writing was unfortunately filled with trite expressions."], context: "Criticism of clichéd ideas, overused expressions, or worn-out concepts." },
  { word: "Perfunctory", pronunciation: "pur-FUHNGK-tuh-ree", definition: "Carried out without real interest or care; mechanical", category: "Sophisticated Criticism", examples: ["He gave a perfunctory apology lacking genuine remorse.", "The inspection was perfunctory at best, missing obvious issues."], context: "Criticism of lack of genuine effort, mechanical execution, or superficial attention." },
  { word: "Spurious", pronunciation: "SPYUR-ee-uhs", definition: "False or fake; not genuine", category: "Sophisticated Criticism", examples: ["The argument was based on spurious reasoning and false premises.", "His credentials proved to be entirely spurious upon investigation."], context: "Criticism of falseness, invalidity, or deceptive appearance." },
  { word: "Nebulous", pronunciation: "NEB-yuh-luhs", definition: "Unclear, vague, or ill-defined", category: "Sophisticated Criticism", examples: ["The proposed plan remains frustratingly nebulous and poorly defined.", "His nebulous explanation left everyone thoroughly confused."], context: "Criticism of lack of clarity, vagueness, or imprecise definition." },
  { word: "Disingenuous", pronunciation: "dis-in-JEN-yoo-uhs", definition: "Not candid or sincere, typically by pretending ignorance", category: "Sophisticated Criticism", examples: ["His disingenuous claim of ignorance fooled absolutely no one.", "The apology felt disingenuous and insincere to all present."], context: "Criticism of insincerity, deception, or false innocence." },
  { word: "Vacuous", pronunciation: "VAK-yoo-uhs", definition: "Having or showing a lack of thought or intelligence", category: "Sophisticated Criticism", examples: ["The article was vacuous and offered no real insight.", "His vacuous smile suggested he wasn't actually listening."], context: "Criticism of emptiness, lack of substance, or intellectual vacancy." },
  { word: "Specious", pronunciation: "SPEE-shuhs", definition: "Superficially plausible but actually wrong", category: "Sophisticated Criticism", examples: ["The argument, though specious, convinced many uncritical listeners.", "Her reasoning was specious and ultimately misleading."], context: "Criticism of deceptively attractive but false logic or reasoning." },
  { word: "Anachronistic", pronunciation: "uh-nak-ruh-NIS-tik", definition: "Belonging to a period other than the one being portrayed", category: "Sophisticated Criticism", examples: ["The policy is anachronistic and no longer relevant.", "His views seem anachronistic in the modern world."], context: "Criticism of being out of date, outdated, or historically misplaced." },
  { word: "Fallacious", pronunciation: "fuh-LAY-shuhs", definition: "Based on mistaken belief; containing a logical fallacy", category: "Sophisticated Criticism", examples: ["The reasoning was fallacious from the very start.", "His fallacious arguments were easily debunked by experts."], context: "Criticism of flawed logic, mistaken reasoning, or logical errors." },
  { word: "Derivative", pronunciation: "dih-RIV-uh-tiv", definition: "Imitative of the work of another; not original", category: "Sophisticated Criticism", examples: ["The novel was criticized as derivative of earlier works.", "His artistic style is derivative of more famous predecessors."], context: "Criticism of lack of originality, imitation, or unoriginality." },
  { word: "Insipid", pronunciation: "in-SIP-id", definition: "Lacking flavor; lacking vigor or interest", category: "Sophisticated Criticism", examples: ["The performance was disappointingly insipid and lifeless.", "His insipid personality failed to engage audiences effectively."], context: "Criticism of dullness, blandness, or lack of interesting qualities." },
  { word: "Inconsequential", pronunciation: "in-kon-sih-KWEN-shuhl", definition: "Not important or significant", category: "Sophisticated Criticism", examples: ["The changes were largely inconsequential and had minimal impact.", "He dismissed her concerns as inconsequential without consideration."], context: "Criticism of lack of importance, insignificance, or trivial nature." },
  { word: "Untenable", pronunciation: "uhn-TEN-uh-buhl", definition: "Not able to be maintained or defended against attack or objection", category: "Sophisticated Criticism", examples: ["His position became untenable as contradictory evidence mounted.", "The theory is untenable in light of new data."], context: "Criticism of indefensibility, unsustainability, or logical weakness." },
  { word: "Contrived", pronunciation: "kuhn-TRYVD", definition: "Deliberately created rather than arising naturally; forced", category: "Sophisticated Criticism", examples: ["The plot twist felt contrived and unconvincing.", "His contrived enthusiasm failed to mask genuine disinterest."], context: "Criticism of artificiality, forced quality, or lack of authenticity." }
];

  const categories = [
    "Intellectual Discussion",
    "Refined Compliments",
    "Literary Expression",
    "Eloquent Agreement",
    "Nuanced Emotions",
    "Diplomatic Discourse",
    "Sophisticated Criticism"
  ];

  const allAchievements = [
    { id: 'first-word', name: 'First Steps', description: 'Save your first word', icon: '🎓', tier: 'bronze', requirement: 1, type: 'saved' },
    { id: 'collector', name: 'Collector', description: 'Save 10 words', icon: '📚', tier: 'silver', requirement: 10, type: 'saved' },
    { id: 'word-master', name: 'Word Master', description: 'Save 25 words', icon: '🌟', tier: 'gold', requirement: 25, type: 'saved' },
    { id: 'eloquence-expert', name: 'Eloquence Expert', description: 'Save 50 words', icon: '👑', tier: 'gold', requirement: 50, type: 'saved' },
    { id: 'quiz-novice', name: 'Quiz Novice', description: 'Complete your first quiz', icon: '🎯', tier: 'bronze', requirement: 1, type: 'quiz' },
    { id: 'perfect-score', name: 'Perfect Score', description: 'Get 10/10 on a quiz', icon: '🔥', tier: 'gold', requirement: 10, type: 'perfect' },
    { id: 'quiz-master', name: 'Quiz Master', description: 'Complete 5 quizzes', icon: '💯', tier: 'silver', requirement: 5, type: 'quiz' },
    { id: 'dedicated', name: 'Dedicated Learner', description: 'Visit 7 days in a row', icon: '🚀', tier: 'gold', requirement: 7, type: 'streak' },
    { id: 'explorer', name: 'Category Explorer', description: 'Save words from all 7 categories', icon: '⭐', tier: 'gold', requirement: 7, type: 'categories' }
  ];

  useEffect(() => {
    loadSavedWords();
    setDailyWordFromDate();
    loadAchievements();
    trackVisit();
  }, []);

  useEffect(() => {
    checkAchievements();
  }, [savedWords]);

  const loadSavedWords = async () => {
    try {
      const result = await window.storage.get('saved-words');
      if (result && result.value) {
        setSavedWords(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No saved words yet');
    }
  };

  const loadAchievements = async () => {
    try {
      const result = await window.storage.get('achievements');
      if (result && result.value) {
        setAchievements(JSON.parse(result.value));
      }
      
      const quizCount = await window.storage.get('quiz-count');
      if (quizCount && quizCount.value) {
        setQuizCompletionCount(parseInt(quizCount.value));
      }
      
      const visits = await window.storage.get('visit-days');
      if (visits && visits.value) {
        setVisitDays(JSON.parse(visits.value));
      }
    } catch (error) {
      console.log('No achievements yet');
    }
  };

  const checkAndUnlockAchievement = async (achievementId) => {
    if (achievements.includes(achievementId)) return;
    
    const achievement = allAchievements.find(a => a.id === achievementId);
    if (!achievement) return;
    
    const newAchievements = [...achievements, achievementId];
    setAchievements(newAchievements);
    
    try {
      await window.storage.set('achievements', JSON.stringify(newAchievements));
    } catch (error) {
      console.error('Failed to save achievement');
    }
    
    setShowAchievement(achievement);
    setTimeout(() => setShowAchievement(null), 5000);
  };

  const checkAchievements = async () => {
    if (savedWords.length >= 1 && !achievements.includes('first-word')) {
      checkAndUnlockAchievement('first-word');
    }
    if (savedWords.length >= 10 && !achievements.includes('collector')) {
      checkAndUnlockAchievement('collector');
    }
    if (savedWords.length >= 25 && !achievements.includes('word-master')) {
      checkAndUnlockAchievement('word-master');
    }
    if (savedWords.length >= 50 && !achievements.includes('eloquence-expert')) {
      checkAndUnlockAchievement('eloquence-expert');
    }
    
    const uniqueCategories = new Set(savedWords.map(w => w.category));
    if (uniqueCategories.size >= 7 && !achievements.includes('explorer')) {
      checkAndUnlockAchievement('explorer');
    }
  };

  const trackVisit = async () => {
    const today = new Date().toDateString();
    if (!visitDays.includes(today)) {
      const newVisits = [...visitDays, today];
      setVisitDays(newVisits);
      
      try {
        await window.storage.set('visit-days', JSON.stringify(newVisits));
      } catch (error) {
        console.error('Failed to track visit');
      }
      
      const sortedDays = newVisits.map(d => new Date(d)).sort((a, b) => a - b);
      let streak = 1;
      for (let i = sortedDays.length - 1; i > 0; i--) {
        const diff = (sortedDays[i] - sortedDays[i - 1]) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          streak++;
        } else {
          break;
        }
      }
      
      if (streak >= 7 && !achievements.includes('dedicated')) {
        checkAndUnlockAchievement('dedicated');
      }
    }
  };

  const setDailyWordFromDate = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const wordIndex = dayOfYear % wordCollection.length;
    setDailyWord(wordCollection[wordIndex]);
  };

  const toggleSaveWord = async (word) => {
    const isCurrentlySaved = savedWords.some(w => w.word === word.word);
    let newSavedWords;
    
    if (isCurrentlySaved) {
      newSavedWords = savedWords.filter(w => w.word !== word.word);
    } else {
      newSavedWords = [...savedWords, word];
    }
    
    setSavedWords(newSavedWords);
    
    try {
      await window.storage.set('saved-words', JSON.stringify(newSavedWords));
    } catch (error) {
      console.error('Failed to save words:', error);
    }
  };

  const isSaved = (word) => {
    return savedWords.some(w => w.word === word.word);
  };

  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech!');
    }
  };

  const startQuiz = () => {
    const shuffled = [...wordCollection].sort(() => Math.random() - 0.5);
    const questions = shuffled.slice(0, 10).map(word => {
      const wrongAnswers = wordCollection
        .filter(w => w.word !== word.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.definition);
      
      const allAnswers = [...wrongAnswers, word.definition].sort(() => Math.random() - 0.5);
      
      return {
        word: word.word,
        pronunciation: word.pronunciation,
        correctAnswer: word.definition,
        answers: allAnswers
      };
    });
    
    setQuizQuestions(questions);
    setCurrentQuestion(0);
    setScore(0);
    setQuizMode(true);
    setShowResult(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const exitQuiz = async () => {
    if (quizComplete) {
      const newCount = quizCompletionCount + 1;
      setQuizCompletionCount(newCount);
      
      try {
        await window.storage.set('quiz-count', newCount.toString());
      } catch (error) {
        console.error('Failed to save quiz count');
      }
      
      if (newCount >= 1 && !achievements.includes('quiz-novice')) {
        checkAndUnlockAchievement('quiz-novice');
      }
      if (newCount >= 5 && !achievements.includes('quiz-master')) {
        checkAndUnlockAchievement('quiz-master');
      }
      
      if (score === quizQuestions.length && !achievements.includes('perfect-score')) {
        checkAndUnlockAchievement('perfect-score');
      }
    }
    
    setQuizMode(false);
    setQuizQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  const WordCard = ({ wordData, featured = false }) => (
    <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border border-gray-700 hover:border-amber-500 transition-all ${featured ? 'shadow-2xl' : 'shadow-lg'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className={`font-serif text-amber-400 ${featured ? 'text-5xl' : 'text-3xl'} mb-2`}>
            {wordData.word}
          </h2>
          <div className="flex items-center space-x-2">
            <p className="text-gray-400 italic text-lg">/{wordData.pronunciation}/</p>
            <button
              onClick={() => speakWord(wordData.word)}
              className="text-amber-400 hover:text-amber-300 transition-colors p-1 hover:bg-gray-700 rounded"
              title="Listen to pronunciation"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <button
          onClick={() => toggleSaveWord(wordData)}
          className="text-amber-400 hover:text-amber-300 transition-colors"
        >
          <Star className={`w-6 h-6 ${isSaved(wordData) ? 'fill-amber-400' : ''}`} style={{ fill: isSaved(wordData) ? 'currentColor' : 'none' }} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-gray-400 uppercase text-xs tracking-wider mb-2">Definition</h3>
          <p className="text-gray-100 text-lg leading-relaxed">{wordData.definition}</p>
        </div>
        
        <div>
          <h3 className="text-gray-400 uppercase text-xs tracking-wider mb-2">Category</h3>
          <span className="inline-block bg-amber-900 bg-opacity-30 text-amber-300 px-3 py-1 rounded-full text-sm">
            {wordData.category}
          </span>
        </div>
        
        <div>
          <h3 className="text-gray-400 uppercase text-xs tracking-wider mb-2">Examples</h3>
          <div className="space-y-2">
            {wordData.examples.map((example, idx) => (
              <p key={idx} className="text-gray-300 italic pl-4 border-l-2 border-amber-700">
                {example}
              </p>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-gray-400 uppercase text-xs tracking-wider mb-2">Usage Context</h3>
          <p className="text-gray-300 leading-relaxed">{wordData.context}</p>
        </div>
      </div>
    </div>
  );

  const filteredWords = selectedCategory === 'all' 
    ? wordCollection 
    : wordCollection.filter(w => w.category === selectedCategory);

  if (!dailyWord) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-amber-400 text-2xl font-serif">Loading your eloquence...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-amber-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-amber-400" />
              <h1 className="font-serif text-3xl text-amber-400">The Eloquence Academy</h1>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-amber-400"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <nav className="hidden md:flex space-x-6 items-center">
              <button
                onClick={() => setCurrentView('daily')}
                className={`transition-colors ${currentView === 'daily' ? 'text-amber-400' : 'text-gray-400 hover:text-amber-300'}`}
              >
                Daily Word
              </button>
              <button
                onClick={() => setCurrentView('browse')}
                className={`transition-colors ${currentView === 'browse' ? 'text-amber-400' : 'text-gray-400 hover:text-amber-300'}`}
              >
                Browse Collection
              </button>
              <button
                onClick={() => setCurrentView('saved')}
                className={`transition-colors flex items-center space-x-2 ${currentView === 'saved' ? 'text-amber-400' : 'text-gray-400 hover:text-amber-300'}`}
              >
                <Star className="w-4 h-4" />
                <span>Saved ({savedWords.length})</span>
              </button>
              <button
                onClick={startQuiz}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                Take Quiz 🎯
              </button>
              <button
                onClick={() => setCurrentView('achievements')}
                className={`transition-colors flex items-center space-x-2 ${currentView === 'achievements' ? 'text-amber-400' : 'text-gray-400 hover:text-amber-300'}`}
              >
                <Trophy className="w-4 h-4" />
                <span>Achievements ({achievements.length}/{allAchievements.length})</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-amber-900">
          <nav className="flex flex-col space-y-4 px-6 py-4">
            <button
              onClick={() => { setCurrentView('daily'); setMenuOpen(false); }}
              className={`text-left transition-colors ${currentView === 'daily' ? 'text-amber-400' : 'text-gray-400'}`}
            >
              Daily Word
            </button>
            <button
              onClick={() => { setCurrentView('browse'); setMenuOpen(false); }}
              className={`text-left transition-colors ${currentView === 'browse' ? 'text-amber-400' : 'text-gray-400'}`}
            >
              Browse Collection
            </button>
            <button
              onClick={() => { setCurrentView('saved'); setMenuOpen(false); }}
              className={`text-left transition-colors flex items-center space-x-2 ${currentView === 'saved' ? 'text-amber-400' : 'text-gray-400'}`}
            >
              <Star className="w-4 h-4" />
              <span>Saved ({savedWords.length})</span>
            </button>
            <button
              onClick={() => { startQuiz(); setMenuOpen(false); }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors text-left"
            >
              Take Quiz 🎯
            </button>
            <button
              onClick={() => { setCurrentView('achievements'); setMenuOpen(false); }}
              className={`text-left transition-colors flex items-center space-x-2 ${currentView === 'achievements' ? 'text-amber-400' : 'text-gray-400'}`}
            >
              <Trophy className="w-4 h-4" />
              <span>Achievements ({achievements.length}/{allAchievements.length})</span>
            </button>
          </nav>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-12">
        {showAchievement && (
          <div className="fixed top-20 right-6 z-50 bg-gradient-to-br from-amber-500 to-amber-600 text-gray-900 px-6 py-4 rounded-lg shadow-2xl border-2 border-amber-300 animate-bounce">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8" />
              <div>
                <p className="font-bold text-lg">Achievement Unlocked!</p>
                <p className="text-sm">{showAchievement.icon} {showAchievement.name}</p>
              </div>
            </div>
          </div>
        )}

        {quizMode && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 max-w-3xl w-full border-2 border-amber-500 shadow-2xl">
              {!quizComplete ? (
                <>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-serif text-amber-400">Quiz Mode</h2>
                      <p className="text-gray-400">Question {currentQuestion + 1} of {quizQuestions.length}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 text-3xl font-bold">{score}</p>
                      <p className="text-gray-400 text-sm">Score</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-4xl font-serif text-amber-400 mb-2">
                      {quizQuestions[currentQuestion]?.word}
                    </h3>
                    <p className="text-gray-400 italic text-lg mb-6">
                      /{quizQuestions[currentQuestion]?.pronunciation}/
                    </p>
                    <p className="text-xl text-gray-300 mb-6">What does this word mean?</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {quizQuestions[currentQuestion]?.answers.map((answer, idx) => {
                      const isCorrect = answer === quizQuestions[currentQuestion].correctAnswer;
                      const isSelected = selectedAnswer === answer;
                      
                      let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all ";
                      
                      if (!showResult) {
                        buttonClass += "border-gray-600 hover:border-amber-500 hover:bg-gray-700 text-gray-200";
                      } else if (isSelected && isCorrect) {
                        buttonClass += "border-green-500 bg-green-900 bg-opacity-30 text-green-300";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "border-red-500 bg-red-900 bg-opacity-30 text-red-300";
                      } else if (isCorrect) {
                        buttonClass += "border-green-500 bg-green-900 bg-opacity-30 text-green-300";
                      } else {
                        buttonClass += "border-gray-600 text-gray-400";
                      }
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => !showResult && handleAnswerClick(answer)}
                          disabled={showResult}
                          className={buttonClass}
                        >
                          {answer}
                          {showResult && isCorrect && " ✓"}
                          {showResult && isSelected && !isCorrect && " ✗"}
                        </button>
                      );
                    })}
                  </div>

                  {showResult && (
                    <div className="flex gap-4">
                      <button
                        onClick={handleNextQuestion}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-3 rounded-lg transition-colors"
                      >
                        {currentQuestion + 1 < quizQuestions.length ? "Next Question →" : "See Results"}
                      </button>
                      <button
                        onClick={exitQuiz}
                        className="px-6 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-3 rounded-lg transition-colors"
                      >
                        Exit Quiz
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <h2 className="text-5xl font-serif text-amber-400 mb-4">Quiz Complete! 🎉</h2>
                  <p className="text-6xl font-bold text-amber-400 mb-4">{score}/{quizQuestions.length}</p>
                  <p className="text-2xl text-gray-300 mb-8">
                    {score === quizQuestions.length && "Perfect score! You're a vocabulary master! 👑"}
                    {score >= quizQuestions.length * 0.8 && score < quizQuestions.length && "Excellent work! 🌟"}
                    {score >= quizQuestions.length * 0.6 && score < quizQuestions.length * 0.8 && "Good job! Keep learning! 📚"}
                    {score < quizQuestions.length * 0.6 && "Keep practicing! You'll improve! 💪"}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={startQuiz}
                      className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors"
                    >
                      Try Again 🎯
                    </button>
                    <button
                      onClick={exitQuiz}
                      className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold rounded-lg transition-colors"
                    >
                      Exit Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'daily' && dailyWord && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-amber-400 mb-2">Word of the Day</h2>
              <p className="text-gray-400">Elevate your discourse with today's selection</p>
            </div>
            <WordCard wordData={dailyWord} featured={true} />
          </div>
        )}

        {currentView === 'browse' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-serif text-amber-400 mb-4">Browse Our Collection</h2>
              <p className="text-gray-400 mb-8">Explore words by category</p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full transition-all ${selectedCategory === 'all' ? 'bg-amber-500 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  All Words
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full transition-all ${selectedCategory === cat ? 'bg-amber-500 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid gap-8">
              {filteredWords.map((word, idx) => (
                <WordCard key={idx} wordData={word} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'saved' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-serif text-amber-400 mb-2">Your Saved Words</h2>
              <p className="text-gray-400">Your personal collection of eloquent vocabulary</p>
            </div>
            
            {savedWords.length === 0 ? (
              <div className="text-center py-20">
                <Star className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No saved words yet. Start building your collection!</p>
              </div>
            ) : (
              <div className="grid gap-8">
                {savedWords.map((word, idx) => (
                  <WordCard key={idx} wordData={word} />
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === 'achievements' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-serif text-amber-400 mb-2">Achievements</h2>
              <p className="text-gray-400 mb-4">Unlock badges as you master vocabulary</p>
              <p className="text-2xl text-amber-400 font-bold">{achievements.length} / {allAchievements.length} Unlocked</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {allAchievements.map(achievement => {
                const isUnlocked = achievements.includes(achievement.id);
                const tierColors = {
                  bronze: 'from-amber-700 to-amber-900',
                  silver: 'from-gray-400 to-gray-600',
                  gold: 'from-yellow-400 to-yellow-600'
                };
                
                const tierBorders = {
                  bronze: 'border-amber-700',
                  silver: 'border-gray-400',
                  gold: 'border-yellow-400'
                };
                
                let progress = 0;
                if (achievement.type === 'saved') {
                  progress = Math.min((savedWords.length / achievement.requirement) * 100, 100);
                } else if (achievement.type === 'quiz') {
                  progress = Math.min((quizCompletionCount / achievement.requirement) * 100, 100);
                } else if (achievement.type === 'perfect') {
                  progress = isUnlocked ? 100 : 0;
                } else if (achievement.type === 'categories') {
                  const uniqueCategories = new Set(savedWords.map(w => w.category));
                  progress = Math.min((uniqueCategories.size / achievement.requirement) * 100, 100);
                } else if (achievement.type === 'streak') {
                  const sortedDays = visitDays.map(d => new Date(d)).sort((a, b) => a - b);
                  let streak = 1;
                  for (let i = sortedDays.length - 1; i > 0; i--) {
                    const diff = (sortedDays[i] - sortedDays[i - 1]) / (1000 * 60 * 60 * 24);
                    if (diff === 1) {
                      streak++;
                    } else {
                      break;
                    }
                  }
                  progress = Math.min((streak / achievement.requirement) * 100, 100);
                }
                
                return (
                  <div
                    key={achievement.id}
                    className={`bg-gradient-to-br ${isUnlocked ? tierColors[achievement.tier] : 'from-gray-800 to-gray-900'} rounded-lg p-6 border-2 ${isUnlocked ? tierBorders[achievement.tier] : 'border-gray-700'} transition-all ${isUnlocked ? 'shadow-2xl' : 'opacity-60'}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-5xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif text-white mb-1">{achievement.name}</h3>
                        <p className="text-gray-200 mb-3">{achievement.description}</p>
                        
                        {!isUnlocked && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-300">
                              <span>Progress</span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {isUnlocked && (
                          <div className="flex items-center space-x-2 text-white">
                            <Award className="w-5 h-5" />
                            <span className="font-bold">UNLOCKED!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 border-t border-amber-900 mt-20 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p className="font-serif text-sm">Cultivate eloquence. Speak with distinction.</p>
        </div>
      </footer>
    </div>
  );
};

export default EloquenceAcademy;