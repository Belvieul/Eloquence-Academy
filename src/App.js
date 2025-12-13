import React, { useState, useEffect } from 'react';
import { BookOpen, Star, Menu, X } from 'lucide-react';

const EloquenceAcademy = () => {
  const [currentView, setCurrentView] = useState('daily');
  const [savedWords, setSavedWords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dailyWord, setDailyWord] = useState(null);

const wordCollection = [
    { word: "Elucidate", pronunciation: "ih-LOO-si-dayt", definition: "To make something clear; to explain in detail", category: "Intellectual Discussion", examples: ["The professor took great care to elucidate the complex theoretical framework.", "Allow me to elucidate my position on this delicate matter."], context: "Ideal for academic discourse, formal presentations, and when clarifying nuanced positions in diplomatic settings." },
    { word: "Magnanimous", pronunciation: "mag-NAN-uh-muhs", definition: "Generous and forgiving, especially toward a rival or less powerful person", category: "Refined Compliments", examples: ["Her magnanimous gesture toward her former opponent won widespread admiration.", "It was magnanimous of him to acknowledge his achievements."], context: "Perfect for expressing noble character, particularly in victory or positions of power." },
    { word: "Ineffable", pronunciation: "in-EF-uh-buhl", definition: "Too great or extreme to be expressed in words", category: "Literary Expression", examples: ["The ineffable beauty of the ceremony left us speechless.", "There was an ineffable quality to her presence that commanded respect."], context: "Excellent for describing profound experiences, sublime beauty, or transcendent moments." },
    { word: "Perspicacious", pronunciation: "pur-spi-KAY-shuhs", definition: "Having keen insight or discernment; perceptive", category: "Refined Compliments", examples: ["Your perspicacious analysis of the situation proved invaluable.", "She made several perspicacious observations during the proceedings."], context: "Use when praising intellectual sharpness or insightful understanding." },
    { word: "Acquiesce", pronunciation: "ak-wee-ES", definition: "To accept or agree to something reluctantly but without protest", category: "Eloquent Agreement", examples: ["After considerable deliberation, the committee chose to acquiesce to the proposal.", "Though hesitant, she acquiesced to their request for additional time."], context: "Diplomatic way to express reluctant agreement while maintaining dignity." },
    { word: "Melancholic", pronunciation: "mel-uhn-KOL-ik", definition: "Expressing or characterized by pensive sadness", category: "Nuanced Emotions", examples: ["The melancholic atmosphere of the evening matched our contemplative mood.", "His melancholic disposition lent a certain depth to his observations."], context: "Perfect for describing thoughtful sadness or wistful emotional states." },
    { word: "Circumspect", pronunciation: "SUR-kuhm-spekt", definition: "Wary and unwilling to take risks; cautious", category: "Diplomatic Discourse", examples: ["We must remain circumspect in our approach to these sensitive negotiations.", "Her circumspect manner ensured no diplomatic incidents occurred."], context: "Essential for describing careful, calculated approaches in delicate situations." },
    { word: "Salient", pronunciation: "SAY-lee-uhnt", definition: "Most noticeable or important; prominent", category: "Intellectual Discussion", examples: ["The salient features of this proposal merit careful consideration.", "Allow me to highlight the salient points of our discussion."], context: "Excellent for drawing attention to key points in formal discourse." },
    { word: "Recalcitrant", pronunciation: "rih-KAL-si-truhnt", definition: "Having an obstinately uncooperative attitude", category: "Sophisticated Criticism", examples: ["The recalcitrant member refused to engage with reasonable compromise.", "His recalcitrant stance hindered progress on the matter."], context: "Diplomatic way to criticize stubborn resistance without being overtly harsh." },
    { word: "Ebullient", pronunciation: "ih-BUHL-yuhnt", definition: "Cheerful and full of energy; exuberant", category: "Nuanced Emotions", examples: ["Her ebullient personality brought life to even the most formal gatherings.", "The crowd's ebullient response exceeded all expectations."], context: "Perfect for describing enthusiastic positivity in an elevated manner." },
    { word: "Propitious", pronunciation: "pruh-PISH-uhs", definition: "Giving or indicating a good chance of success; favorable", category: "Diplomatic Discourse", examples: ["The circumstances appear propitious for reaching an agreement.", "This propitious moment should not be allowed to pass."], context: "Ideal for expressing optimism about timing or conditions diplomatically." },
    { word: "Obfuscate", pronunciation: "OB-fuh-skayt", definition: "To deliberately make something unclear or difficult to understand", category: "Sophisticated Criticism", examples: ["The report appears designed to obfuscate rather than clarify the issues.", "Let us not obfuscate the matter with unnecessary complexity."], context: "Refined way to accuse someone of being deliberately unclear." },
    { word: "Sanguine", pronunciation: "SANG-gwin", definition: "Optimistic or positive, especially in difficult situations", category: "Nuanced Emotions", examples: ["Despite the challenges, she remained sanguine about the outcome.", "His sanguine temperament proved invaluable during the crisis."], context: "Sophisticated way to describe optimism or hopefulness." },
    { word: "Demur", pronunciation: "dih-MUR", definition: "To raise doubts or objections; to express reluctance", category: "Eloquent Agreement", examples: ["I must demur from that characterization of events.", "She demurred politely when asked to take the lead role."], context: "Graceful way to express disagreement or hesitation." },
    { word: "Sagacious", pronunciation: "suh-GAY-shuhs", definition: "Having or showing keen mental discernment and good judgment", category: "Refined Compliments", examples: ["Your sagacious counsel has guided us through many difficulties.", "It was a sagacious decision to postpone the announcement."], context: "High praise for someone's wisdom and judgment." },
    { word: "Inscrutable", pronunciation: "in-SKROO-tuh-buhl", definition: "Impossible to understand or interpret", category: "Literary Expression", examples: ["His inscrutable expression revealed nothing of his thoughts.", "The committee's inscrutable decision-making process frustrated many."], context: "Perfect for describing mysterious or unfathomable qualities." },
    { word: "Ameliorate", pronunciation: "uh-MEEL-yuh-rayt", definition: "To make something bad or unsatisfactory better", category: "Diplomatic Discourse", examples: ["These measures should ameliorate the current situation considerably.", "We must work together to ameliorate these concerning conditions."], context: "Formal way to discuss improvement or making things better." },
    { word: "Didactic", pronunciation: "dy-DAK-tik", definition: "Intended to teach or instruct, sometimes in an overbearing way", category: "Sophisticated Criticism", examples: ["The presentation, while informative, struck a somewhat didactic tone.", "His didactic approach left little room for collaborative discussion."], context: "Subtle criticism of someone being overly instructive or preachy." },
    { word: "Loquacious", pronunciation: "loh-KWAY-shuhs", definition: "Tending to talk a great deal; talkative", category: "Literary Expression", examples: ["Our loquacious host ensured conversation never lagged.", "She was particularly loquacious on subjects close to her heart."], context: "Elegant way to describe someone who talks extensively." },
    { word: "Inexorable", pronunciation: "in-EK-ser-uh-buhl", definition: "Impossible to stop or prevent; relentless", category: "Literary Expression", examples: ["The inexorable march of progress cannot be halted.", "Time moves forward with inexorable certainty."], context: "Powerful word for describing unstoppable forces or inevitability." },
    { word: "Equanimity", pronunciation: "ee-kwuh-NIM-ih-tee", definition: "Mental calmness and composure, especially in difficult situations", category: "Nuanced Emotions", examples: ["She faced the crisis with remarkable equanimity.", "His equanimity under pressure inspired confidence in others."], context: "Refined way to praise composure and emotional balance." },
    { word: "Repudiate", pronunciation: "rih-PYOO-dee-ayt", definition: "To refuse to accept or be associated with; to reject", category: "Eloquent Agreement", examples: ["I must firmly repudiate these baseless allegations.", "The organization chose to repudiate its former stance on the matter."], context: "Strong, formal way to express rejection or disavowal." },
    { word: "Lugubrious", pronunciation: "loo-GOO-bree-uhs", definition: "Looking or sounding sad and dismal", category: "Nuanced Emotions", examples: ["The lugubrious atmosphere of the gathering reflected our collective grief.", "His lugubrious tone seemed somewhat excessive for the occasion."], context: "Sophisticated way to describe mournful or excessively sad demeanor." },
    { word: "Vicarious", pronunciation: "vy-KAIR-ee-uhs", definition: "Experienced in the imagination through the feelings or actions of another", category: "Nuanced Emotions", examples: ["We took vicarious pleasure in her well-deserved success.", "The audience experienced vicarious thrill through the protagonist's journey."], context: "Perfect for describing secondhand experiences or emotions." },
    { word: "Prevaricate", pronunciation: "prih-VAIR-ih-kayt", definition: "To speak or act evasively; to avoid telling the truth", category: "Sophisticated Criticism", examples: ["The witness appeared to prevaricate when questioned directly.", "Let us not prevaricate—the situation demands candor."], context: "Diplomatic way to accuse someone of being evasive or dishonest." },
    { word: "Venerable", pronunciation: "VEN-er-uh-buhl", definition: "Accorded great respect due to age, wisdom, or character", category: "Refined Compliments", examples: ["The venerable institution has served the community for generations.", "We are honored to welcome this venerable statesman."], context: "Respectful way to acknowledge age, experience, and distinction." },
    { word: "Propensity", pronunciation: "pruh-PEN-sih-tee", definition: "An inclination or natural tendency to behave in a particular way", category: "Intellectual Discussion", examples: ["Humans have a propensity to seek patterns even where none exist.", "His propensity for thorough analysis served him well."], context: "Formal way to discuss tendencies or inclinations." },
    { word: "Ethereal", pronunciation: "ih-THEER-ee-uhl", definition: "Extremely delicate and light; seemingly too perfect for this world", category: "Literary Expression", examples: ["The ethereal quality of the music transported us entirely.", "Her ethereal beauty seemed almost otherworldly."], context: "Perfect for describing delicate, heavenly, or transcendent qualities." },
    { word: "Redolent", pronunciation: "RED-uh-luhnt", definition: "Strongly reminiscent or suggestive of something", category: "Literary Expression", examples: ["The ceremony was redolent of earlier, more formal times.", "His speech was redolent with references to classical literature."], context: "Elegant way to say something evokes or reminds one of something else." },
    { word: "Taciturn", pronunciation: "TAS-ih-turn", definition: "Reserved or uncommunicative in speech; saying little", category: "Literary Expression", examples: ["His taciturn nature was often mistaken for aloofness.", "The normally taciturn director surprised us with an eloquent speech."], context: "Sophisticated way to describe someone who speaks little." },
    { word: "Indefatigable", pronunciation: "in-dih-FAT-ih-guh-buhl", definition: "Persisting tirelessly; incapable of being tired out", category: "Refined Compliments", examples: ["Her indefatigable efforts on behalf of the cause are legendary.", "He pursued the matter with indefatigable determination."], context: "High praise for someone's tireless energy and persistence." },
    { word: "Obsequious", pronunciation: "uhb-SEE-kwee-uhs", definition: "Obedient or attentive to an excessive or servile degree", category: "Sophisticated Criticism", examples: ["His obsequious manner toward superiors was rather distasteful.", "The obsequious flattery became increasingly transparent."], context: "Refined criticism of excessive deference or sycophantic behavior." },
    { word: "Quixotic", pronunciation: "kwik-SOT-ik", definition: "Exceedingly idealistic; unrealistic and impractical", category: "Sophisticated Criticism", examples: ["While admirable, the proposal strikes me as somewhat quixotic.", "His quixotic crusade, though noble, proved ultimately futile."], context: "Gentle way to criticize unrealistic idealism while acknowledging good intentions." },
    { word: "Pernicious", pronunciation: "per-NISH-uhs", definition: "Having a harmful effect in a gradual or subtle way", category: "Sophisticated Criticism", examples: ["The pernicious influence of misinformation cannot be overstated.", "These pernicious practices undermine the integrity of the institution."], context: "Strong word for criticizing harmful, insidious effects." },
    { word: "Magniloquent", pronunciation: "mag-NIL-uh-kwuhnt", definition: "Using high-flown or bombastic language", category: "Literary Expression", examples: ["His magniloquent prose obscured rather than clarified his meaning.", "The magniloquent introduction seemed excessive for the occasion."], context: "Describes grandiose, pompous speech - can be praise or gentle criticism." },
    { word: "Pellucid", pronunciation: "puh-LOO-sid", definition: "Translucently clear; easy to understand", category: "Refined Compliments", examples: ["Her pellucid explanation made the complex theory accessible to all.", "The pellucid prose of the document was a pleasure to read."], context: "High praise for clarity in communication or thought." },
    { word: "Surreptitious", pronunciation: "sur-uhp-TISH-uhs", definition: "Kept secret, especially because it would not be approved of", category: "Literary Expression", examples: ["He cast a surreptitious glance at the confidential documents.", "The surreptitious meeting raised concerns about transparency."], context: "Elegant way to describe secretive or stealthy actions." },
    { word: "Temerity", pronunciation: "tuh-MER-ih-tee", definition: "Excessive confidence or boldness; audacity", category: "Sophisticated Criticism", examples: ["He had the temerity to question the committee's judgment publicly.", "The temerity of such a proposal is quite astonishing."], context: "Refined way to express disapproval of someone's audacious behavior." },
    { word: "Intransigent", pronunciation: "in-TRAN-sih-juhnt", definition: "Unwilling to change one's views or agree about something", category: "Eloquent Agreement", examples: ["His intransigent position made negotiation virtually impossible.", "We cannot allow intransigent attitudes to derail these important talks."], context: "Diplomatic criticism of stubborn inflexibility." },
    { word: "Languid", pronunciation: "LANG-gwid", definition: "Displaying a disinclination for physical exertion; slow and relaxed", category: "Nuanced Emotions", examples: ["The languid afternoon stretched before us invitingly.", "Her languid movements suggested complete ease and comfort."], context: "Elegant way to describe relaxed, unhurried demeanor." },
    { word: "Munificent", pronunciation: "myoo-NIF-ih-suhnt", definition: "Characterized by great generosity; lavish", category: "Refined Compliments", examples: ["We are deeply grateful for your munificent contribution.", "His munificent patronage of the arts has benefited countless artists."], context: "High praise for exceptional generosity." },
    { word: "Phlegmatic", pronunciation: "fleg-MAT-ik", definition: "Having an unemotional and calm disposition", category: "Nuanced Emotions", examples: ["His phlegmatic response to the crisis proved reassuring.", "She maintained a phlegmatic demeanor throughout the ordeal."], context: "Sophisticated way to describe calm, unflappable temperament." },
    { word: "Prodigious", pronunciation: "pruh-DIJ-uhs", definition: "Remarkably or impressively great in extent, size, or degree", category: "Refined Compliments", examples: ["She possesses prodigious talent in multiple disciplines.", "The prodigious effort required for this undertaking cannot be underestimated."], context: "Strong praise for exceptional qualities or achievements." },
    { word: "Rarefied", pronunciation: "RAIR-uh-fyd", definition: "Distant from the lives of ordinary people; esoteric", category: "Literary Expression", examples: ["He moved in the rarefied circles of international diplomacy.", "The discussion ventured into rarefied theoretical territory."], context: "Describes exclusive, elevated, or highly specialized spheres." },
    { word: "Turgid", pronunciation: "TUR-jid", definition: "Swollen; or excessively ornate in style or language", category: "Sophisticated Criticism", examples: ["The turgid prose made the document unnecessarily difficult to parse.", "His turgid rhetoric obscured what might have been valid points."], context: "Refined criticism of overly pompous or inflated language." },
    { word: "Winsome", pronunciation: "WIN-suhm", definition: "Attractive or appealing in a fresh, innocent way", category: "Refined Compliments", examples: ["Her winsome charm won over even the most skeptical observers.", "The speaker's winsome manner made the complex topic accessible."], context: "Elegant compliment for appealing, charming qualities." },
    { word: "Assiduous", pronunciation: "uh-SIJ-oo-uhs", definition: "Showing great care and perseverance", category: "Refined Compliments", examples: ["His assiduous attention to detail ensured flawless execution.", "She pursued her research with assiduous dedication."], context: "High praise for diligent, careful work." },
    { word: "Bombastic", pronunciation: "bom-BAS-tik", definition: "High-sounding but with little meaning; inflated", category: "Sophisticated Criticism", examples: ["The bombastic speech was long on rhetoric but short on substance.", "His bombastic claims required considerable skepticism."], context: "Refined way to criticize pompous, empty rhetoric." },
    { word: "Clandestine", pronunciation: "klan-DES-tin", definition: "Kept secret or done secretively", category: "Literary Expression", examples: ["The clandestine meeting raised questions about proper procedure.", "Such clandestine arrangements undermine public trust."], context: "Formal way to describe secret or covert activities." },
    { word: "Deference", pronunciation: "DEF-er-uhns", definition: "Humble submission and respect", category: "Diplomatic Discourse", examples: ["He showed appropriate deference to the committee's expertise.", "Out of deference to tradition, we shall proceed as customary."], context: "Important diplomatic term for showing respectful yielding." },
    { word: "Effusive", pronunciation: "ih-FYOO-siv", definition: "Expressing feelings of gratitude or approval in an unrestrained manner", category: "Nuanced Emotions", examples: ["Her effusive praise, while sincere, seemed somewhat excessive.", "The delegation's effusive welcome exceeded all expectations."], context: "Describes enthusiastic, sometimes overly enthusiastic, expression." },
    { word: "Fastidious", pronunciation: "fa-STID-ee-uhs", definition: "Very attentive to accuracy and detail; meticulous", category: "Refined Compliments", examples: ["His fastidious preparation ensured nothing was overlooked.", "She maintained fastidious standards throughout the project."], context: "Praise for exceptional attention to detail and standards." },
    { word: "Garrulous", pronunciation: "GAR-uh-luhs", definition: "Excessively talkative, especially on trivial matters", category: "Sophisticated Criticism", examples: ["The garrulous witness required gentle redirection to stay on topic.", "His garrulous nature, while entertaining, consumed valuable time."], context: "Polite criticism of excessive, unfocused talking." },
    { word: "Hapless", pronunciation: "HAP-lis", definition: "Unfortunate; unlucky", category: "Literary Expression", examples: ["The hapless protagonist faced one misfortune after another.", "Our hapless competitors never quite recovered from their initial setback."], context: "Sympathetic way to describe someone beset by misfortune." },
    { word: "Iconoclast", pronunciation: "eye-KON-uh-klast", definition: "A person who attacks cherished beliefs or institutions", category: "Intellectual Discussion", examples: ["As an intellectual iconoclast, she challenged conventional wisdom.", "The iconoclast's views proved controversial but thought-provoking."], context: "Describes someone who challenges established norms or beliefs." },
    { word: "Judicious", pronunciation: "joo-DISH-uhs", definition: "Having or showing good judgment", category: "Refined Compliments", examples: ["Your judicious handling of this delicate matter is commendable.", "A judicious approach requires balancing competing interests carefully."], context: "High praise for wise, sensible decision-making." },
    { word: "Laconic", pronunciation: "luh-KON-ik", definition: "Using very few words; brief and concise", category: "Literary Expression", examples: ["His laconic reply spoke volumes nonetheless.", "The diplomat's laconic statement belied the complexity of negotiations."], context: "Sophisticated way to describe terseness in communication." },
    { word: "Mendacious", pronunciation: "men-DAY-shuhs", definition: "Not telling the truth; lying", category: "Sophisticated Criticism", examples: ["The mendacious claims require immediate correction.", "Such mendacious testimony undermines the entire proceeding."], context: "Formal, serious accusation of dishonesty." },
    { word: "Nefarious", pronunciation: "nuh-FAIR-ee-uhs", definition: "Wicked or criminal; extremely bad", category: "Sophisticated Criticism", examples: ["The nefarious scheme was eventually exposed.", "Such nefarious conduct cannot be tolerated in any form."], context: "Strong condemnation of evil or criminal behavior." },
    { word: "Ostentatious", pronunciation: "os-ten-TAY-shuhs", definition: "Characterized by vulgar or pretentious display", category: "Sophisticated Criticism", examples: ["The ostentatious display seemed rather gauche for the occasion.", "His ostentatious wealth was flaunted with little subtlety."], context: "Refined criticism of showy, excessive display." },
    { word: "Parsimonious", pronunciation: "par-sih-MOH-nee-uhs", definition: "Unwilling to spend money or use resources; stingy", category: "Sophisticated Criticism", examples: ["The parsimonious budget allocations hindered progress significantly.", "His parsimonious nature extended even to reasonable expenditures."], context: "Diplomatic criticism of excessive frugality or stinginess." },
    { word: "Querulous", pronunciation: "KWER-uh-luhs", definition: "Complaining in an annoying way", category: "Sophisticated Criticism", examples: ["The querulous tone of the letter suggested deep dissatisfaction.", "His querulous objections grew tiresome over time."], context: "Polite way to criticize constant, petty complaining." },
    { word: "Recondite", pronunciation: "REK-uhn-dyt", definition: "Little known; abstruse; dealing with very profound subjects", category: "Literary Expression", examples: ["The professor's recondite research was groundbreaking in its field.", "Such recondite matters require specialized expertise."], context: "Describes highly specialized, obscure knowledge or subjects." },
    { word: "Solicitous", pronunciation: "suh-LIS-ih-tuhs", definition: "Characterized by showing interest or concern", category: "Refined Compliments", examples: ["Her solicitous attention to guests' comfort was remarkable.", "The staff's solicitous manner ensured every need was anticipated."], context: "Praise for attentive, concerned care toward others." },
    { word: "Truculent", pronunciation: "TRUK-yuh-luhnt", definition: "Eager to argue or fight; aggressively defiant", category: "Sophisticated Criticism", examples: ["His truculent demeanor made productive dialogue nearly impossible.", "The truculent response suggested unwillingness to cooperate."], context: "Refined criticism of hostile, combative behavior." },
    { word: "Umbrage", pronunciation: "UM-brij", definition: "Offense or annoyance", category: "Nuanced Emotions", examples: ["She took umbrage at the suggestion of impropriety.", "No umbrage was intended by the casual remark."], context: "Formal way to express that someone took offense." },
    { word: "Verdant", pronunciation: "VUR-duhnt", definition: "Green with vegetation; or inexperienced", category: "Literary Expression", examples: ["The verdant countryside provided welcome respite from the city.", "Despite his verdant years, he showed remarkable maturity."], context: "Poetic way to describe lushness or youthful inexperience." },
    { word: "Wistful", pronunciation: "WIST-fuhl", definition: "Having or showing a feeling of vague longing", category: "Nuanced Emotions", examples: ["Her wistful expression suggested memories of happier times.", "He spoke in wistful tones about what might have been."], context: "Elegant way to describe gentle, nostalgic longing." },
    { word: "Zealous", pronunciation: "ZEL-uhs", definition: "Having or showing great energy or enthusiasm in pursuit of a cause", category: "Nuanced Emotions", examples: ["Her zealous advocacy for reform inspired many followers.", "The zealous pursuit of excellence defined the organization."], context: "Describes passionate dedication to a cause or goal." },
    { word: "Auspicious", pronunciation: "aw-SPISH-uhs", definition: "Conducive to success; favorable", category: "Diplomatic Discourse", examples: ["This marks an auspicious beginning to our partnership.", "The auspicious signs suggest a prosperous venture ahead."], context: "Formal way to express positive omens or promising circumstances." },
    { word: "Benevolent", pronunciation: "buh-NEV-uh-luhnt", definition: "Well-meaning and kindly", category: "Refined Compliments", examples: ["His benevolent leadership style fostered loyalty and dedication.", "The benevolent society has aided countless individuals."], context: "High praise for kindness and goodwill." },
    { word: "Capricious", pronunciation: "kuh-PRISH-uhs", definition: "Given to sudden changes of mood or behavior", category: "Sophisticated Criticism", examples: ["The capricious nature of the policy made planning difficult.", "His capricious decisions undermined confidence in his leadership."], context: "Refined criticism of unpredictable, inconsistent behavior." },
    { word: "Decorous", pronunciation: "DEK-er-uhs", definition: "In keeping with good taste and propriety", category: "Refined Compliments", examples: ["The decorous ceremony honored all traditions appropriately.", "Her decorous behavior set the standard for the occasion."], context: "Praise for appropriate, dignified conduct." },
    { word: "Egregious", pronunciation: "ih-GREE-juhs", definition: "Outstandingly bad; shocking", category: "Sophisticated Criticism", examples: ["This represents an egregious violation of established protocols.", "The egregious errors demand immediate rectification."], context: "Strong formal condemnation of particularly bad behavior or mistakes." },
    { word: "Felicitous", pronunciation: "fih-LIS-ih-tuhs", definition: "Well-chosen or suited to the circumstances", category: "Refined Compliments", examples: ["Your felicitous remarks captured the moment perfectly.", "The felicitous combination of elements produced excellence."], context: "High praise for appropriateness and skillful selection." },
    { word: "Gregarious", pronunciation: "grih-GAIR-ee-uhs", definition: "Fond of company; sociable", category: "Refined Compliments", examples: ["His gregarious nature made him an ideal ambassador.", "The gregarious atmosphere encouraged open dialogue."], context: "Praise for sociability and enjoyment of company." },
    { word: "Harbinger", pronunciation: "HAR-bin-jer", definition: "A person or thing that announces or signals the approach of another", category: "Literary Expression", examples: ["This development serves as a harbinger of changes to come.", "The spring flowers were harbingers of warmer days ahead."], context: "Elegant way to describe forerunners or signals of future events." },
    { word: "Ignominious", pronunciation: "ig-nuh-MIN-ee-uhs", definition: "Deserving or causing public disgrace or shame", category: "Sophisticated Criticism", examples: ["The ignominious defeat marked the end of an era.", "Such ignominious conduct reflects poorly on all involved."], context: "Formal way to describe shameful or disgraceful situations." },
    { word: "Juxtapose", pronunciation: "JUK-stuh-pohz", definition: "To place close together for contrasting effect", category: "Intellectual Discussion", examples: ["The exhibit juxtaposes classical and contemporary works brilliantly.", "Let us juxtapose these competing theories for comparison."], context: "Sophisticated way to discuss placing things side by side for comparison." },
    { word: "Laudable", pronunciation: "LAW-duh-buhl", definition: "Deserving praise and commendation", category: "Refined Compliments", examples: ["Your laudable efforts have not gone unnoticed.", "This represents a laudable commitment to excellence."], context: "Formal praise for praiseworthy actions or qualities." },
    { word: "Mitigate", pronunciation: "MIT-ih-gayt", definition: "To make less severe, serious, or painful", category: "Diplomatic Discourse", examples: ["We must take steps to mitigate the adverse effects.", "These measures should mitigate the risks considerably."], context: "Formal way to discuss reducing harm or severity." },
    { word: "Nascent", pronunciation: "NAY-suhnt", definition: "Just coming into existence and beginning to display signs of future potential", category: "Intellectual Discussion", examples: ["The nascent movement shows promise of significant growth.", "We are witnessing the nascent stages of transformation."], context: "Elegant way to describe something in early developmental stages." },
    { word: "Ostensible", pronunciation: "o-STEN-suh-buhl", definition: "Stated or appearing to be true, but not necessarily so", category: "Intellectual Discussion", examples: ["The ostensible reason differs from the actual motivation.", "Despite the ostensible agreement, tensions remained."], context: "Sophisticated way to question apparent versus actual truth." },
    { word: "Paucity", pronunciation: "PAW-sih-tee", definition: "The presence of something in only small or insufficient quantities", category: "Sophisticated Criticism", examples: ["The paucity of evidence undermines the conclusion.", "There exists a paucity of viable alternatives currently."], context: "Formal way to criticize insufficiency or scarcity." },
    { word: "Quintessential", pronunciation: "kwin-tuh-SEN-shuhl", definition: "Representing the most perfect or typical example", category: "Refined Compliments", examples: ["She is the quintessential diplomat - poised and perceptive.", "This represents the quintessential expression of the style."], context: "High praise for being the perfect example of something." },
    { word: "Reticent", pronunciation: "RET-ih-suhnt", definition: "Not revealing one's thoughts or feelings readily", category: "Literary Expression", examples: ["His reticent manner concealed deep convictions.", "She remained reticent about her personal involvement."], context: "Sophisticated way to describe reserved, uncommunicative behavior."},
{ word: "Tenacious", pronunciation: "tuh-NAY-shuhs", definition: "Holding firmly; persistent and determined", category: "Refined Compliments", examples: ["Her tenacious pursuit of justice inspired others.", "The tenacious defense secured an unlikely victory."], context: "High praise for persistence and determination." },
{ word: "Ubiquitous", pronunciation: "yoo-BIK-wih-tuhs", definition: "Present, appearing, or found everywhere", category: "Literary Expression", examples: ["The ubiquitous influence of technology shapes modern life.", "His ubiquitous presence at events became legendary."], context: "Sophisticated way to describe omnipresence." },
{ word: "Vociferous", pronunciation: "voh-SIF-er-uhs", definition: "Vehement or clamorous; expressing opinions loudly", category: "Sophisticated Criticism", examples: ["The vociferous opposition made reasoned debate difficult.", "Her vociferous support rallied many to the cause."], context: "Can describe both positive passion and negative noise." }
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

  useEffect(() => {
    loadSavedWords();
    setDailyWordFromDate();
  }, []);

  const loadSavedWords = () => {
    const saved = localStorage.getItem('saved-words');
    if (saved) {
      setSavedWords(JSON.parse(saved));
    }
  };

  const setDailyWordFromDate = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const wordIndex = dayOfYear % wordCollection.length;
    setDailyWord(wordCollection[wordIndex]);
  };

  const toggleSaveWord = (word) => {
    const isCurrentlySaved = savedWords.some(w => w.word === word.word);
    let newSavedWords;
    
    if (isCurrentlySaved) {
      newSavedWords = savedWords.filter(w => w.word !== word.word);
    } else {
      newSavedWords = [...savedWords, word];
    }
    
    setSavedWords(newSavedWords);
    localStorage.setItem('saved-words', JSON.stringify(newSavedWords));
  };

  const isSaved = (word) => {
    return savedWords.some(w => w.word === word.word);
  };

  const WordCard = ({ wordData, featured = false }) => (
    <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border border-gray-700 hover:border-amber-500 transition-all ${featured ? 'shadow-2xl' : 'shadow-lg'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className={`font-serif text-amber-400 ${featured ? 'text-5xl' : 'text-3xl'} mb-2`}>
            {wordData.word}
          </h2>
          <p className="text-gray-400 italic text-lg">/{wordData.pronunciation}/</p>
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
            <nav className="hidden md:flex space-x-6">
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
          </nav>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-12">
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