import React, { useState, useEffect } from 'react';
import { BookOpen, Star, Menu, X, Volume2 } from 'lucide-react';

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

  const exitQuiz = () => {
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
          </nav>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-12">
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