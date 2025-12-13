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
    { word: "Ebullient", pronunciation: "ih-BUHL-yuhnt", definition: "Cheerful and full of energy; exuberant", category: "Nuanced Emotions", examples: ["Her ebullient personality brought life to even the most formal gatherings.", "The crowd's ebullient response exceeded all expectations."], context: "Perfect for describing enthusiastic positivity in an elevated manner." }
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